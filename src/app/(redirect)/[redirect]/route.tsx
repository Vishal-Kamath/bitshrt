import { NextRequest, NextResponse } from "next/server";
import urlParser from "./utils/urlParser";

export const GET = async (req: NextRequest) => {
  const parse = urlParser(req);

  return NextResponse.json(parse);
};
