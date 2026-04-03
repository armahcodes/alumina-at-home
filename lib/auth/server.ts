import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { emailOTP } from "better-auth/plugins/email-otp";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { sendResetPasswordEmail, sendVerificationEmail, sendOTPEmail } from "@/lib/email";
import { buildTrustedOrigins } from "@/lib/auth/trusted-origins";

if (process.env.NODE_ENV === "development" && !process.env.BETTER_AUTH_SECRET?.trim()) {
  console.warn(
    "[better-auth] BETTER_AUTH_SECRET is not set. Generate one with `openssl rand -base64 32` and add it to .env.local (see .env.example)."
  );
}

/** App URL for cookies and callbacks; align with the origin users open in the browser. */
const authBaseURL =
  process.env.BETTER_AUTH_URL?.trim() ||
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL?.trim() ||
  undefined;

export const auth = betterAuth({
  baseURL: authBaseURL,
  trustedOrigins: buildTrustedOrigins(),
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema,
      user: schema.users,
    },
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    sendResetPassword: async ({ user, url }) => {
      await sendResetPasswordEmail(user.email, url);
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await sendVerificationEmail(user.email, url);
    },
  },
  plugins: [
    emailOTP({
      otpLength: 6,
      expiresIn: 300,
      disableSignUp: true,
      allowedAttempts: 5,
      sendVerificationOTP: async ({ email, otp, type }) => {
        await sendOTPEmail(email, otp, type);
      },
    }),
  ],
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // update session every 24 hours
  },
  user: {
    additionalFields: {
      hasCompletedOnboarding: {
        type: "boolean",
        defaultValue: false,
        input: false,
      },
      lastLoginAt: {
        type: "date",
        required: false,
        input: false,
      },
    },
  },
});

export type Auth = typeof auth;
