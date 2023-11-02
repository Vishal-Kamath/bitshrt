import { NextRequest } from "next/server";

const urlParser = (req: NextRequest) => {
  const origin = req.nextUrl.origin;
  const code = req.nextUrl.pathname.slice(9); // /api/bit/
  return { origin, code };
};

export default urlParser;
