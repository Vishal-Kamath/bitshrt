import { NextRequest, NextResponse } from "next/server";
import urlParser from "./utils/urlParser";
import { db } from "@/lib/db";
import { links } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import analyse from "./utils/analyse";

export const GET = async (req: NextRequest) => {
  try {
    const parse = urlParser(req);
    const link = (
      await db.select().from(links).where(eq(links.key, parse.code))
    )[0];

    if (!link) return NextResponse.json({ link, parse });
    await analyse(link, req);

    return NextResponse.redirect(link.url);
  } catch (err) {
    return NextResponse.json({ err });
  }
};
