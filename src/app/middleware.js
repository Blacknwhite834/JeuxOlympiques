// middleware.js

import { NextResponse } from "next/server";

export function middleware(req) {
  const result = {
    message: "working",
  };

  return new NextResponse(JSON.stringify(result), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
