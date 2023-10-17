import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq, or } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, image } = body;
    const userId = uuid();

    // check if user name or email already exists
    const checkIfUserExists = await db
      .select()
      .from(users)
      .where(or(eq(users.name, name), eq(users.email, email)));

    if (checkIfUserExists.length) {
      return NextResponse.json(
        {
          message:
            checkIfUserExists[0].email === email
              ? "User email already exists"
              : "User name already exists",
          type: "warning",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.insert(users).values({
      id: userId,
      name,
      email,
      emailVerified: false,
      password: hashedPassword,
      provider: "Credentials",
      image,
    });

    return NextResponse.json(
      {
        message: `User ${name} was successfully registered`,
        type: "success",
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
