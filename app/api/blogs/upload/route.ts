import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { rateLimit } from "@/lib/rateLimit";
import { isAdminAuthed } from "@/lib/auth";

export async function POST(req: NextRequest) {
	const ip = req.headers.get("x-forwarded-for") ?? "unknown";
	if (!rateLimit(ip, 10, 60_000)) {
		return NextResponse.json({ error: "Too many requests" }, { status: 429 });
	}

	if (!(await isAdminAuthed())) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const formData = await req.formData();
	const file = formData.get("file") as File;

	if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

	// Max 5MB
	if (file.size > 5 * 1024 * 1024) {
		return NextResponse.json({ error: "File too large, max 5MB" }, { status: 400 });
	}

	const ext = file.name.split(".").pop();
	const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

	const { error } = await supabaseAdmin.storage
		.from("blog-images")
		.upload(fileName, file, { contentType: file.type });

	if (error) return NextResponse.json({ error: error.message }, { status: 500 });

	const { data } = supabaseAdmin.storage
		.from("blog-images")
		.getPublicUrl(fileName);

	return NextResponse.json({ url: data.publicUrl });
}