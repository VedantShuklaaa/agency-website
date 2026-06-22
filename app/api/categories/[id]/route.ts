import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { rateLimit } from "@/lib/rateLimit";
import { isAdminAuthed } from "@/lib/auth";

type Props = { params: Promise<{ id: string }> };

export async function DELETE(req: NextRequest, { params }: Props) {
	const ip = req.headers.get("x-forwarded-for") ?? "unknown";
	if (!rateLimit(ip, 10, 60_000))
		return NextResponse.json({ error: "Too many requests" }, { status: 429 });

	if (!(await isAdminAuthed())) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { id } = await params;
	const { error } = await supabaseAdmin.from("categories").delete().eq("id", id);

	if (error) return NextResponse.json({ error: error.message }, { status: 500 });
	return NextResponse.json({ success: true });
}