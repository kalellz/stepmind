import { betterAuth, BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "./db";

export const auth = betterAuth({
    database: prismaAdapter(db, { provider: "postgresql" }),
    emailAndPassword: {
        enabled: true,
    },
    trustedOrigins: ["http://localhost:8080"],
    useSecureCookies: false,
    defaultCookieAttributes: {
        sameSite: "none",
        secure: false,
    },
});