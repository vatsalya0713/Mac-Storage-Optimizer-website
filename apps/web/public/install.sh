#!/bin/bash
# MacDiskCleaner installer
#   curl -fsSL https://www.macdiskcleaner.com/install.sh | bash
#
# Downloads the latest release, verifies its published SHA-256, and installs it
# into /Applications. Files fetched with curl aren't quarantined by macOS, so
# there is no "unidentified developer" prompt.
set -euo pipefail

SITE="https://www.macdiskcleaner.com"
DEST="${INSTALL_DIR:-/Applications}"

say() { printf '%s\n' "$*"; }
die() { printf 'Error: %s\n' "$*" >&2; exit 1; }

[ "$(uname)" = "Darwin" ] || die "MacDiskCleaner is for macOS only."
MAJOR="$(sw_vers -productVersion | cut -d. -f1)"
[ "$MAJOR" -ge 14 ] || die "MacDiskCleaner needs macOS 14 (Sonoma) or later. You have $(sw_vers -productVersion)."

TMP="$(mktemp -d)"
MOUNT="$TMP/mnt"
cleanup() {
  hdiutil detach "$MOUNT" -quiet -force >/dev/null 2>&1 || true
  rm -rf "$TMP"
}
trap cleanup EXIT

say "Checking the latest version..."
curl -fsSL "$SITE/api/releases/latest?t=$(date +%s)" -o "$TMP/latest.json" || die "Couldn't reach macdiskcleaner.com."
VERSION="$(plutil -extract version raw -o - "$TMP/latest.json")"
URL="$(plutil -extract url raw -o - "$TMP/latest.json")"
SHA="$(plutil -extract sha256 raw -o - "$TMP/latest.json")"
[ -n "$VERSION" ] && [ -n "$URL" ] && [ -n "$SHA" ] || die "Release information was incomplete."

say "Downloading MacDiskCleaner $VERSION..."
# Goes through /api/download (not $URL directly) so this install is counted
# alongside browser downloads; it redirects to the exact same file $URL points to.
curl -fL --progress-bar "$SITE/api/download?src=installer" -o "$TMP/MacDiskCleaner.dmg" || die "Download failed."

say "Verifying checksum..."
ACTUAL="$(shasum -a 256 "$TMP/MacDiskCleaner.dmg" | awk '{print $1}')"
[ "$ACTUAL" = "$SHA" ] || die "Checksum mismatch — the download was discarded. Please try again."

say "Installing to $DEST..."
mkdir -p "$MOUNT"
hdiutil attach "$TMP/MacDiskCleaner.dmg" -nobrowse -readonly -quiet -mountpoint "$MOUNT" || die "Couldn't open the download."
APP="$(find "$MOUNT" -maxdepth 1 -name '*.app' | head -1)"
[ -n "$APP" ] || die "The download didn't contain the app."
NAME="$(basename "$APP")"

# Quit a running copy so it can be replaced.
if pgrep -x MacStorageOptimizer >/dev/null 2>&1; then
  say "Closing the running app..."
  osascript -e 'tell application "MacDiskCleaner" to quit' >/dev/null 2>&1 || true
  sleep 2
  pkill -x MacStorageOptimizer >/dev/null 2>&1 || true
fi

mkdir -p "$DEST" 2>/dev/null || true
if [ -w "$DEST" ]; then SUDO=""; else SUDO="sudo"; say "Administrator permission is needed to write to $DEST."; fi
$SUDO rm -rf "$DEST/$NAME"
$SUDO ditto "$APP" "$DEST/$NAME"
$SUDO xattr -dr com.apple.quarantine "$DEST/$NAME" >/dev/null 2>&1 || true

say ""
say "Installed MacDiskCleaner $VERSION at $DEST/$NAME"
if [ -z "${INSTALL_DIR:-}" ]; then
  open "$DEST/$NAME"
  say "Opening it now. Future updates install themselves from inside the app."
fi
