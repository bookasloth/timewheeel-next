// Self-check for webhook signature handling against the running app.
//   node --env-file=.env.local scripts/check-webhook.mjs [baseUrl]
import { createHmac } from "node:crypto";
import assert from "node:assert/strict";

const base = process.argv[2] ?? "http://localhost:3000";
const key = process.env.ZOHO_PAY_WEBHOOK_SIGNING_KEY;
assert(key, "ZOHO_PAY_WEBHOOK_SIGNING_KEY not set");

// payment.failed is acknowledged without touching orders, so this is safe to run against live.
const body = JSON.stringify({ event_type: "payment.failed", event_object: { payment: { payment_id: "1" } } });
const t = Date.now();
const sign = (k, b) => `t=${t},v=${createHmac("sha256", k).update(`${t}.${b}`).digest("hex")}`;
const send = (sig, b = body) =>
  fetch(`${base}/api/zoho/webhook`, { method: "POST", headers: { "X-Zoho-Webhook-Signature": sig }, body: b }).then((r) => r.status);

assert.equal(await send(sign(key, body)), 200, "valid signature should be accepted");
assert.equal(await send(sign("wrong-key", body)), 401, "wrong key should be rejected");
assert.equal(await send(sign(key, body), body + " "), 401, "tampered body should be rejected");
assert.equal(await send(""), 401, "missing header should be rejected");
console.log("webhook signature checks passed");
