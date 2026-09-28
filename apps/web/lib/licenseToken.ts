import { createPrivateKey, sign } from 'node:crypto'

// Signed, machine-bound license token. The desktop app embeds the matching
// public key and refuses to treat a Mac as Pro without a valid, unexpired
// token — so editing local storage (Keychain, files, defaults) or pointing
// the app at a fake server can't unlock Pro. The private key lives only in
// the LICENSE_SIGNING_KEY environment variable (PKCS8 DER, base64).
//
// Token format: base64url(payload JSON) + '.' + base64url(Ed25519 signature
// over the payload string).

const TOKEN_TTL_DAYS = 7

function b64url(input: Buffer | string) {
  return Buffer.from(input).toString('base64url')
}

export function issueLicenseToken({
  key,
  machineId,
  tier,
}: {
  key: string
  machineId: string
  tier: string
}): string | null {
  const material = process.env.LICENSE_SIGNING_KEY
  if (!material) {
    console.error('LICENSE_SIGNING_KEY is not set — cannot issue license tokens')
    return null
  }
  try {
    const privateKey = createPrivateKey({ key: Buffer.from(material, 'base64'), format: 'der', type: 'pkcs8' })
    const now = Math.floor(Date.now() / 1000)
    const payload = b64url(
      JSON.stringify({ v: 1, key, mid: machineId, tier, iat: now, exp: now + TOKEN_TTL_DAYS * 86_400 })
    )
    const signature = sign(null, Buffer.from(payload), privateKey)
    return `${payload}.${b64url(signature)}`
  } catch (error) {
    console.error('Failed to sign license token:', error instanceof Error ? error.message : error)
    return null
  }
}
