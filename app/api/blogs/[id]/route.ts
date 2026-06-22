import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { rateLimit } from "@/lib/rateLimit";

type Props = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, { params }: Props) {
	const ip = req.headers.get("x-forwarded-for") ?? "unknown";
	if (!rateLimit(ip, 10, 60_000)) {
		return NextResponse.json({ error: "Too many requests" }, { status: 429 });
	}

	const secret = req.headers.get("x-admin-secret");
	if (secret !== process.env.ADMIN_SECRET) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { id } = await params;
	const body = await req.json();

	const { data, error } = await supabaseAdmin
		.from("blogs")
		.update(body)
		.eq("id", id)
		.select()
		.single();

	if (error) return NextResponse.json({ error: error.message }, { status: 500 });

	return NextResponse.json(data);
}

export async function DELETE(req: NextRequest, { params }: Props) {
	const ip = req.headers.get("x-forwarded-for") ?? "unknown";
	if (!rateLimit(ip, 10, 60_000)) {
		return NextResponse.json({ error: "Too many requests" }, { status: 429 });
	}

	const secret = req.headers.get("x-admin-secret");
	if (secret !== process.env.ADMIN_SECRET) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { id } = await params;

	const { error } = await supabaseAdmin
		.from("blogs")
		.delete()
		.eq("id", id);

	if (error) return NextResponse.json({ error: error.message }, { status: 500 });

	return NextResponse.json({ success: true });
}