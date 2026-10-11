// ?error= codes that the auth routes send back to /login.
export const AUTH_ERRORS: Record<string, string> = {
  google: "Google sign-in didn't go through. Please try again.",
  link: "That link is invalid or has already been used. Log in below, or request a new one.",
  expired: "That link has expired. Log in below, or request a new one.",
  "other-browser":
    "That link was opened in a different browser from the one you used. If you were confirming your email, it's confirmed now: just log in. If you were resetting your password, request a new link from this browser.",
  unavailable: "Accounts aren't switched on yet. Please try again later.",
};
