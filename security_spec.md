# Firestore Security Specification (`security_spec.md`)

## 1. Data Invariants
1. Production-mode default deny: Any unspecified path (`/{document=**}`) is strictly denied for all reads and writes.
2. Identity Integrity: All `/users/{userId}` and `/users/{userId}/private/{docId}` documents require a verified Google/Firebase account (`request.auth != null && request.auth.token.email_verified == true`), matching `request.auth.uid == userId`, and `incoming().uid == request.auth.uid`.
3. Path Variable Hardening: Document IDs (`userId`, `docId`, `orderId`) must match `^[a-zA-Z0-9_-]+$` and be <= 128 characters.
4. Temporal Integrity & Immutability: `createdAt` and `updatedAt` must equal `request.time`. On updates, `uid` and `createdAt` are immutable.
5. PII Isolation: `email` and `phone` live in `/users/{userId}/private/{docId}` and are readable/writable strictly by the verified owner (`userId == request.auth.uid`). No blanket `list` queries are permitted.
6. Guest Order Creation (Temporary Rule): Unauthenticated guests may ONLY `create` documents in `/orders/{orderId}` when `orderId == incoming().code`, `code` matches `^OCOP-[0-9]{6}-[A-Z0-9]{3}$`, `phone` matches `^0[0-9]{9}$`, `status == 'new'`, `paymentMethod in ['COD', 'Chuyển khoản']`, and `createdAt == request.time`. `get`, `list`, `update`, and `delete` on `/orders` are strictly denied (`false`).

## 2. Adversarial "Dirty Dozen" Payloads (Expected: `PERMISSION_DENIED`)
1. Unauthenticated read on `/users/user_1` -> Denied (`auth == null`).
2. Unverified email write on `/users/user_1` (`email_verified: false`) -> Denied.
3. Cross-user read on `/users/other_uid/private/info` -> Denied (`uid != userId`).
4. Cross-user write on `/users/other_uid` -> Denied (`uid != userId`).
5. Identity spoofing (`{ uid: "other_uid", ... }` written to `/users/my_uid`) -> Denied (`data.uid == request.auth.uid`).
6. Shadow / Ghost field injection (`isAdmin: true` in `/users` or `/orders`) -> Denied (`hasOnly(...)`).
7. Guest `get` or `list` on `/orders` -> Denied (`allow get, list: if false;`).
8. Guest `update` or `delete` on `/orders/OCOP-261117-A1B` -> Denied (`allow update, delete: if false;`).
9. Order forged status (`status: "completed"`) or invalid paymentMethod -> Denied.
10. Order invalid phone (`"12345"`) or empty `items: []` -> Denied.
11. Order client-forged timestamp (`createdAt != request.time`) or mismatched document ID (`orderId != code`) -> Denied.
12. Collection-wide `list` query scraping `/users` or `/orders` -> Denied.
