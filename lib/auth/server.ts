import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { sendResetPasswordEmail, sendVerificationEmail } from "@/lib/email";

export const auth = betterAuth({
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
