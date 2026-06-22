import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { rateLimit } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
	// Rate limit
	const ip = req.headers.get("x-forwarded-for") ?? "unknown";
	if (!rateLimit(ip, 10, 60_000)) {
		return NextResponse.json({ error: "Too many requests" }, { status: 429 });
	}

	// Auth check
	const secret = req.headers.get("x-admin-secret");
	if (secret !== process.env.ADMIN_SECRET) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const body = await req.json();
	const { title, slug, description, category, tags, date, image_url } = body;

	if (!title || !slug) {
		return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
	}

	const { data, error } = await supabaseAdmin
		.from("blogs")
		.insert([{ title, slug, description, category, tags, date, image_url }])
		.select()
		.single();

	if (error) return NextResponse.json({ error: error.message }, { status: 500 });

	return NextResponse.json(data, { status: 201 });
}