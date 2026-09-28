import { createHash } from 'node:crypto'

// The session cookie holds a derived token, never the password itself, so a
// leaked cookie doesn't reveal the admin password (and changing the password
// invalidates every existing session).
export function sessionToken(password: string) {
  return createHash('sha256').update(`mdc-admin-session:v1:${password}`).digest('hex')
}
