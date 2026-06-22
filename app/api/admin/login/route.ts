import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
	const ip = req.headers.get("x-forwarded-for") ?? "unknown";
	if (!rateLimit(ip, 5, 60_000)) {
		return NextResponse.json({ error: "Too many attempts" }, { status: 429 });
	}

	const { secret } = await req.json();

	if (secret !== process.env.ADMIN_SECRET) {
		return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
	}

	const res = NextResponse.json({ success: true });

	res.cookies.set("admin_session", process.env.ADMIN_SECRET!, {
		httpOnly: true,      // not accessible via JS
		secure: true,        // HTTPS only
		sameSite: "strict",
		maxAge: 60 * 15,     // 15 minutes
		path: "/",
	});

	return res;
}