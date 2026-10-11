// Prints an ADMIN_CONSOLE_PASSWORD_HASH value for the /admin/login password.
// Usage: node scripts/hash-admin-password.mjs "the password"
import { randomBytes, scryptSync } from "node:crypto";

const password = process.argv[2];
if (!password) {
  console.error('Usage: node scripts/hash-admin-password.mjs "the password"');
  process.exit(1);
}
const salt = randomBytes(16);
console.log(`scrypt:${salt.toString("hex")}:${scryptSync(password, salt, 64).toString("hex")}`);
console.log(`ADMIN_CONSOLE_SECRET suggestion: ${randomBytes(32).toString("base64url")}`);
