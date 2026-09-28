// Generates the Ed25519 keypair used to sign license tokens.
//   node scripts/generate-license-keypair.mjs
// - Put LICENSE_SIGNING_KEY in Vercel (web project) and .env.local. Never commit it.
// - Paste PUBLIC KEY into LicenseToken.publicKeyBase64 in the Swift app and ship a new app version.
import { generateKeyPairSync } from 'node:crypto'

const { publicKey, privateKey } = generateKeyPairSync('ed25519')
const priv = privateKey.export({ type: 'pkcs8', format: 'der' }).toString('base64')
const pub = publicKey.export({ type: 'spki', format: 'der' }).subarray(-32).toString('base64')

console.log(`LICENSE_SIGNING_KEY=${priv}`)
console.log(`PUBLIC KEY (Swift app): ${pub}`)
