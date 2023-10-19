import { NextRequest } from "next/server";

const urlParser = (req: NextRequest) => {
  const origin = req.nextUrl.origin;
  const code = req.nextUrl.pathname.slice(5);
  return { origin, code };
};

export default urlParser;
