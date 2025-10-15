// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DefaultJWT, JWT } from "next-auth/jwt";

/**
 * This file defines the types used in auth.ts for configuring th
 */

declare module "next-auth" {
    interface User {
        id: string,
        role: string,
        username: string,
        email?: string | null;
        name?: string | null;
    };
    interface Session { // defines the object that is placed into a session when a user authenticates
        user: {
            id: string,
            role: string,
            username: string,
            email?: string | null;
            name?: string | null;
            image?: string | null;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT{
        id: string;
        role: string;
        username: string;
        email?: string | null;
        name?: string | null;
    }
}

