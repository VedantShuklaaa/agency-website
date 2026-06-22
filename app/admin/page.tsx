import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase/";
import AdminClient from "@/components/admin/adminClient";
import AdminLogin from "@/components/admin/adminLogin";

export default async function AdminPage() {
	const cookieStore = await cookies();
	const session = cookieStore.get("admin_session");
	const isAuthed = session?.value === process.env.ADMIN_SECRET;

	if (!isAuthed) {
		return <AdminLogin />;
	}

	const [{ data: blogs }, { data: categories }] = await Promise.all([
		supabase.from("blogs").select("*").order("created_at", { ascending: false }),
		supabase.from("categories").select("*").order("name"),
	]);

	return (
		<AdminClient
			initialBlogs={blogs ?? []}
			initialCategories={categories ?? []}
		/>
	);
}