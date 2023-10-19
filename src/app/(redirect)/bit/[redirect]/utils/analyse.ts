import { LOCALHOST_GEO } from "@/lib/constants/geo";
import { db } from "@/lib/db";
import { DrizzleLink, logs } from "@/lib/db/schema";
import { NextRequest, userAgent } from "next/server";
import { v4 as uuid } from "uuid";

const analyse = async (link: DrizzleLink, req: NextRequest) => {
  const geo = process.env.VERCEL_URL ? req.geo : LOCALHOST_GEO;
  const ua = userAgent(req);

  const logId = uuid();
  await db.insert(logs).values({
    id: logId,
    linkId: link.id,
    city: geo?.city || "Unknown",
    country: geo?.country || "Unknown",
    latitude: geo?.latitude || "Unknown",
    longitude: geo?.longitude || "Unknown",
    region: geo?.region || "Unknown",

    browser: ua.browser.name || "Unknown",
    os: ua.os.name || "Unknown",
  });
};

export default analyse;
