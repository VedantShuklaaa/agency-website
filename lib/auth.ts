import { cookies } from "next/headers";

export async function isAdminAuthed(): Promise<boolean> {
	const cookieStore = await cookies();
	const session = cookieStore.get("admin_session");
	return session?.value === process.env.ADMIN_SECRET;
}