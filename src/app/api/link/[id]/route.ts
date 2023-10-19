import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { links, logs } from "@/lib/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const token = await getToken({ req });
  if (!token || !token.email) {
    return NextResponse.json(
      {
        message: "Unauthorized",
        type: "error",
      },
      {
        status: 400,
      }
    );
  }
  try {
    const { id } = context.params;
    const link = (
      await db.select().from(links).where(eq(links.id, id)).limit(1)
    )[0];
    const linkLogs = await db
      .select()
      .from(logs)
      .where(eq(logs.linkId, link.id));

    return NextResponse.json(
      {
        link,
        linkLogs,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    // console.log(err);
    return NextResponse.json(
      {
        message: "Something went wrong",
        type: "error",
      },
      {
        status: 500,
      }
    );
  }
}
