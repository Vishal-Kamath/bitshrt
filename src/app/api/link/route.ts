import { db } from "@/lib/db";
import { links, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
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
    const user = (
      await db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.email, token.email))
        .limit(1)
    )[0];
    if (!user.id) {
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

    const selectLinks = await db
      .select()
      .from(links)
      .where(eq(links.userId, user.id));

    return NextResponse.json(
      {
        links: selectLinks,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err);
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

export async function POST(req: NextRequest) {
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
    const body = await req.json();
    const { key, url } = body;

    const user = (
      await db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.email, token.email))
        .limit(1)
    )[0];
    if (!user.id) {
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

    const linkAlradyExists = await db
      .select({
        key: links.key,
      })
      .from(links)
      .where(eq(links.key, key));

    if (linkAlradyExists.length) {
      return NextResponse.json(
        {
          message: "Link already exists",
          type: "success",
        },
        {
          status: 400,
        }
      );
    }

    const linkId = uuid();
    await db.insert(links).values({
      id: linkId,
      userId: user.id,
      key,
      url,
    });

    return NextResponse.json(
      {
        message: "Link successfully generated",
        type: "error",
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err);
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
