export const endpoint =
  process.env.NODE_ENV === "production"
    ? "https://bitshrt.vercel.app"
    : "http://localhost:3000";
