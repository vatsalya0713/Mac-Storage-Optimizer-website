// Minimal CSV encoder: quotes any field containing a comma, quote, or
// newline, and doubles embedded quotes — the standard RFC 4180 escaping,
// enough for the plain text/number fields this admin panel exports.
function csvField(value: unknown): string {
  const s = value === null || value === undefined ? '' : String(value)
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

export function toCsv(headers: string[], rows: unknown[][]): string {
  const lines = [headers.map(csvField).join(','), ...rows.map((row) => row.map(csvField).join(','))]
  return lines.join('\r\n')
}
