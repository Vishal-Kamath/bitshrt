import { db } from "@/lib/db";
import { DrizzleLink, logs } from "@/lib/db/schema";
import { NextRequest, userAgent } from "next/server";
import { v4 as uuid } from "uuid";

const analyse = async (link: DrizzleLink, req: NextRequest) => {
  const city = req.headers.get("x-vercel-ip-city");
  const country = req.headers.get("x-vercel-ip-country");
  const region = req.headers.get("x-vercel-ip-country-region");
  const latitude = req.headers.get("x-vercel-ip-latitude");
  const longitude = req.headers.get("x-vercel-ip-longitude");
  const ua = userAgent(req);

  const logId = uuid();
  await db.insert(logs).values({
    id: logId,
    linkId: link.id,
    city: city || "Unknown",
    country: country || "Unknown",
    latitude: latitude || "Unknown",
    longitude: longitude || "Unknown",
    region: region || "Unknown",

    browser: ua.browser.name || "Unknown",
    os: ua.os.name || "Unknown",
  });

  return;
};

export default analyse;
