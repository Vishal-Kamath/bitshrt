import { DrizzleUser } from "@/lib/db/schema";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DrizzleUser & DefaultSession["user"];
  }
}
