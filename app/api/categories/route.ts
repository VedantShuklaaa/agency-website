import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { rateLimit } from "@/lib/rateLimit";

export async function GET() {
	try {
		const { data, error } = await supabaseAdmin
			.from("categories")
			.select("*")
			.order("name");

		if (error) {
			console.error("GET /api/categories error:", error);
			return NextResponse.json({ error: error.message, details: error }, { status: 500 });
		}

		return NextResponse.json(data ?? []);
	} catch (err) {
		console.error("GET /api/categories crash:", err);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}

export async function POST(req: NextRequest) {
	try {
		const ip = req.headers.get("x-forwarded-for") ?? "unknown";
		if (!rateLimit(ip, 10, 60_000)) {
			return NextResponse.json({ error: "Too many requests" }, { status: 429 });
		}

		const secret = req.headers.get("x-admin-secret");
		if (secret !== process.env.ADMIN_SECRET) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const body = await req.json();
		const name = body?.name?.trim();

		if (!name) {
			return NextResponse.json({ error: "Name required" }, { status: 400 });
		}

		const { data, error } = await supabaseAdmin
			.from("categories")
			.insert([{ name }])
			.select()
			.single();

		if (error) {
			console.error("POST /api/categories error:", error);
			return NextResponse.json({ error: error.message, details: error }, { status: 500 });
		}

		return NextResponse.json(data, { status: 201 });
	} catch (err) {
		console.error("POST /api/categories crash:", err);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}