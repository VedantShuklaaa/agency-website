"use client";
import Image from "next/image";
import { useEffect, useReducer, useMemo, useCallback } from "react";

// ─── Types ───────────────────────────────────────────────
type Blog = {
	id: string;
	title: string;
	slug: string;
	description: string;
	category: string;
	tags: string[];
	date: string;
	image_url: string;
};

type Category = { id: string; name: string };

type FormState = {
	title: string;
	slug: string;
	description: string;
	category: string;
	tags: string;
	date: string;
	image_url: string;
};

// ─── Reducer ─────────────────────────────────────────────
type State = {
	authed: boolean;
	password: string;
	blogs: Blog[];
	categories: Category[];
	form: FormState;
	editId: string | null;
	imageFile: File | null;
	loading: boolean;
	fetching: boolean;
	message: string;
	error: string;
	newCategory: string;
};

type Action =
	| { type: "SET_PASSWORD"; payload: string }
	| { type: "SET_AUTHED" }
	| { type: "SET_BLOGS"; payload: Blog[] }
	| { type: "SET_CATEGORIES"; payload: Category[] }
	| { type: "SET_FORM"; payload: Partial<FormState> }
	| { type: "SET_EDIT"; payload: Blog }
	| { type: "SET_IMAGE"; payload: File | null }
	| { type: "SET_LOADING"; payload: boolean }
	| { type: "SET_FETCHING"; payload: boolean }
	| { type: "SET_MESSAGE"; payload: string }
	| { type: "SET_ERROR"; payload: string }
	| { type: "SET_NEW_CATEGORY"; payload: string }
	| { type: "RESET_FORM" };

const emptyForm: FormState = {
	title: "", slug: "", description: "",
	category: "", tags: "", date: "", image_url: "",
};

const initialState = (blogs: Blog[], categories: Category[]): State => ({
	authed: false,
	password: "",
	blogs,
	categories,
	form: emptyForm,
	editId: null,
	imageFile: null,
	loading: false,
	fetching: false,
	message: "",
	error: "",
	newCategory: "",
});

function reducer(state: State, action: Action): State {
	switch (action.type) {
		case "SET_PASSWORD": return { ...state, password: action.payload };
		case "SET_AUTHED": return { ...state, authed: true, error: "" };
		case "SET_BLOGS": return { ...state, blogs: action.payload };
		case "SET_CATEGORIES": return { ...state, categories: action.payload };
		case "SET_FORM": return { ...state, form: { ...state.form, ...action.payload } };
		case "SET_EDIT": return {
			...state,
			editId: action.payload.id,
			form: { ...action.payload, tags: action.payload.tags?.join(", ") ?? "" },
			imageFile: null, message: "", error: "",
		};
		case "SET_IMAGE": return { ...state, imageFile: action.payload };
		case "SET_LOADING": return { ...state, loading: action.payload };
		case "SET_FETCHING": return { ...state, fetching: action.payload };
		case "SET_MESSAGE": return { ...state, message: action.payload, error: "" };
		case "SET_ERROR": return { ...state, error: action.payload, message: "" };
		case "SET_NEW_CATEGORY": return { ...state, newCategory: action.payload };
		case "RESET_FORM": return {
			...state, form: emptyForm, editId: null,
			imageFile: null, message: "", error: "",
		};
		default: return state;
	}
}

// ─── Props ────────────────────────────────────────────────
type Props = {
	initialBlogs: Blog[];
	initialCategories: Category[];
};

// ─── Component ────────────────────────────────────────────
export default function AdminClient({ initialBlogs, initialCategories }: Props) {
	const [state, dispatch] = useReducer(reducer, initialState(initialBlogs, initialCategories));
	const { authed, password, blogs, categories, form, editId, imageFile, loading, fetching, message, error, newCategory } = state;

	const headers = useMemo(() => ({
		"x-admin-secret": password,
		"Content-Type": "application/json",
	}), [password]);

	const autoSlug = (title: string) =>
		title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

	// ─── Fetchers ──────────────────────────────────────────
	const fetchBlogs = useCallback(async () => {
		dispatch({ type: "SET_FETCHING", payload: true });
		try {
			const res = await fetch("/api/blogs");
			const data = await res.json();
			if (!res.ok) throw new Error(data?.error || "Failed to load blogs");
			dispatch({ type: "SET_BLOGS", payload: data });
		} catch (err) {
			dispatch({ type: "SET_ERROR", payload: err instanceof Error ? err.message : "Failed to load blogs" });
		} finally {
			dispatch({ type: "SET_FETCHING", payload: false });
		}
	}, []);

	const fetchCategories = useCallback(async () => {
		try {
			const res = await fetch("/api/categories");
			const data = await res.json();
			dispatch({ type: "SET_CATEGORIES", payload: Array.isArray(data) ? data : [] });
		} catch {
			dispatch({ type: "SET_ERROR", payload: "Failed to load categories" });
		}
	}, []);

	useEffect(() => {
		dispatch({ type: "SET_CATEGORIES", payload: initialCategories });
	}, [initialCategories]);

	useEffect(() => {
		dispatch({ type: "SET_BLOGS", payload: initialBlogs });
	}, [initialBlogs]);

	// ─── Handlers ──────────────────────────────────────────
	const handleLogin = () => {
		if (!password) return dispatch({ type: "SET_ERROR", payload: "Enter admin secret" });
		dispatch({ type: "SET_AUTHED" });
	};

	const handleLogout = async () => {
		await fetch("/api/admin/logout", { method: "POST" });
		window.location.href = "/admin";
	};

	const uploadImage = async (): Promise<string | null> => {
		if (!imageFile) return form.image_url || null;
		const fd = new FormData();
		fd.append("file", imageFile);
		const res = await fetch("/api/blogs/upload", {
			method: "POST",
			headers: { "x-admin-secret": password },
			body: fd,
		});
		const data = await res.json();
		return data.url ?? null;
	};

	const handleSubmit = async () => {
		if (!form.title || !form.slug || !form.category || !form.date) {
			return dispatch({ type: "SET_ERROR", payload: "Please fill all required fields" });
		}
		dispatch({ type: "SET_LOADING", payload: true });
		try {
			const image_url = await uploadImage();
			if (!image_url) throw new Error("Image upload failed");

			const payload = {
				...form, image_url,
				tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
			};

			const res = await fetch(editId ? `/api/blogs/${editId}` : "/api/blogs/create", {
				method: editId ? "PUT" : "POST",
				headers,
				body: JSON.stringify(payload),
			});

			const data = await res.json();
			if (!res.ok) throw new Error(data?.error || "Something went wrong");

			dispatch({ type: "SET_MESSAGE", payload: editId ? "Blog updated." : "Blog created." });
			dispatch({ type: "RESET_FORM" });
			await fetchBlogs();
		} catch (err) {
			dispatch({ type: "SET_ERROR", payload: err instanceof Error ? err.message : "Request failed" });
		} finally {
			dispatch({ type: "SET_LOADING", payload: false });
		}
	};

	const handleDelete = async (id: string) => {
		if (!confirm("Delete this blog?")) return;
		try {
			const res = await fetch(`/api/blogs/${id}`, { method: "DELETE", headers });
			const data = await res.json().catch(() => null);
			if (!res.ok) throw new Error(data?.error || "Delete failed");
			dispatch({ type: "SET_MESSAGE", payload: "Blog deleted." });
			await fetchBlogs();
		} catch (err) {
			dispatch({ type: "SET_ERROR", payload: err instanceof Error ? err.message : "Delete failed" });
		}
	};

	const handleAddCategory = async () => {
		if (!newCategory.trim()) return;
		try {
			const res = await fetch("/api/categories", {
				method: "POST", headers,
				body: JSON.stringify({ name: newCategory.trim() }),
			});
			const data = await res.json().catch(() => null);
			if (!res.ok) throw new Error(data?.error || "Failed to add category");
			dispatch({ type: "SET_NEW_CATEGORY", payload: "" });
			dispatch({ type: "SET_MESSAGE", payload: "Category added." });
			await fetchCategories();
		} catch (err) {
			dispatch({ type: "SET_ERROR", payload: err instanceof Error ? err.message : "Failed to add category" });
		}
	};

	const handleDeleteCategory = async (id: string) => {
		if (!confirm("Delete this category?")) return;
		try {
			const res = await fetch(`/api/categories/${id}`, { method: "DELETE", headers });
			const data = await res.json().catch(() => null);
			if (!res.ok) throw new Error(data?.error || "Failed to delete category");
			dispatch({ type: "SET_MESSAGE", payload: "Category deleted." });
			await fetchCategories();
		} catch (err) {
			dispatch({ type: "SET_ERROR", payload: err instanceof Error ? err.message : "Failed to delete category" });
		}
	};

	// ─── Login screen ──────────────────────────────────────
	if (!authed) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-6 text-white">
				<div className="w-full max-w-4xl rounded-[10px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
					<p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-zinc-500">Club CMS</p>
					<h1 className="text-3xl font-semibold tracking-tight">Admin access</h1>
					<p className="mt-2 text-sm leading-6 text-zinc-400">Enter the admin secret to manage posts.</p>
					<div className="mt-8 space-y-3">
						<label className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">Admin Secret</label>
						<input
							type="password"
							placeholder="••••••••••••"
							value={password}
							onChange={(e) => dispatch({ type: "SET_PASSWORD", payload: e.target.value })}
							onKeyDown={(e) => e.key === "Enter" && handleLogin()}
							className={inputClass}
						/>
					</div>
					{(error || message) && (
						<p className={`mt-4 text-sm ${error ? "text-red-400" : "text-green-400"}`}>{error || message}</p>
					)}
					<button onClick={handleLogin} className="mt-6 h-12 w-full rounded-[10px] bg-[#ff2d55] text-sm font-medium text-white transition hover:brightness-110">
						Continue
					</button>
				</div>
			</div>
		);
	}

	// ─── Main UI ───────────────────────────────────────────
	return (
		<div className="min-h-screen bg-[#0a0a0a] px-4 py-6 text-white sm:px-6 lg:px-8">
			<div className="mx-auto max-w-7xl">

				{/* Header */}
				<div className="mb-8 flex flex-col gap-3 border-b border-white/8 pb-6 lg:flex-row lg:items-end lg:justify-between">
					<div>
						<p className="mb-2 text-[11px] uppercase tracking-[0.24em] text-zinc-500">Editorial Admin</p>
						<h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Blog operations</h1>
					</div>
					<div className="flex items-center gap-2 text-xs text-zinc-500">
						<Pill>{blogs.length} posts</Pill>
						<Pill>{categories.length} categories</Pill>
						<Pill>{editId ? "Editing" : "Create mode"}</Pill>
					</div>
					<button
						onClick={handleLogout}
						className="rounded-full border border-white/10 px-4 py-2 text-xs text-zinc-400 transition hover:bg-white/[0.04]"
					>
						Logout
					</button>
				</div>

				{/* Feedback */}
				{(error || message) && (
					<div className={`mb-6 rounded-[10px] border px-4 py-3 text-sm ${error ? "border-red-500/20 bg-red-500/10 text-red-300" : "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"}`}>
						{error || message}
					</div>
				)}

				<div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(380px,0.9fr)]">
					<div className="space-y-6">

						{/* Blog form */}
						<Section label="Editor" title={editId ? "Edit post" : "Create post"} action={editId ? <ResetBtn onClick={() => dispatch({ type: "RESET_FORM" })} /> : null}>
							<div className="grid gap-4 md:grid-cols-2">
								<Field label="Title *">
									<input value={form.title} onChange={(e) => dispatch({ type: "SET_FORM", payload: { title: e.target.value, slug: autoSlug(e.target.value) } })} placeholder="The future of nightlife branding" className={inputClass} />
								</Field>
								<Field label="Slug *">
									<input value={form.slug} onChange={(e) => dispatch({ type: "SET_FORM", payload: { slug: e.target.value } })} placeholder="the-future-of-nightlife-branding" className={inputClass} />
								</Field>
								<Field label="Category *">
									<select
										value={form.category}
										onChange={(e) =>
											dispatch({ type: "SET_FORM", payload: { category: e.target.value } })
										}
										className={`${inputClass} bg-zinc-900 text-white`}
									>
										<option value="" className="bg-zinc-900 text-white">
											Select category
										</option>
										{categories.map((c) => (
											<option key={c.id} value={c.name} className="bg-zinc-900 text-white">
												{c.name}
											</option>
										))}
									</select>
								</Field>
								<Field label="Date *">
									<input value={form.date} onChange={(e) => dispatch({ type: "SET_FORM", payload: { date: e.target.value } })} placeholder="MAY 2026" className={inputClass} />
								</Field>
							</div>
							<div className="mt-4 space-y-4">
								<Field label="Description">
									<textarea rows={5} value={form.description} onChange={(e) => dispatch({ type: "SET_FORM", payload: { description: e.target.value } })} placeholder="Write a concise editorial summary..." className={`${inputClass} resize-none py-3`} />
								</Field>
								<Field label="Tags (comma separated)">
									<input value={form.tags} onChange={(e) => dispatch({ type: "SET_FORM", payload: { tags: e.target.value } })} placeholder="Nightlife, Culture, Community" className={inputClass} />
								</Field>
								<Field label="Cover image (max 5MB)">
									<input type="file" accept="image/*" onChange={(e) => dispatch({ type: "SET_IMAGE", payload: e.target.files?.[0] ?? null })} className={`${inputClass} file:mr-4 file:rounded-full file:border-0 file:bg-[#ff2d55] file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-white`} />
									{(form.image_url || imageFile) && (
										<div className="relative mt-3 h-52 overflow-hidden rounded-[22px] border border-white/10">
											{imageFile
												? <img src={URL.createObjectURL(imageFile)} alt="Preview" className="h-full w-full object-cover" />
												: <Image src={form.image_url} alt="Current cover" fill className="object-cover" />
											}
										</div>
									)}
								</Field>
							</div>
							<div className="mt-6 flex gap-3">
								<button onClick={handleSubmit} disabled={loading} className="h-12 rounded-[10px] bg-[#ff2d55] px-6 text-sm font-medium text-white transition hover:brightness-110 disabled:opacity-50">
									{loading ? "Saving..." : editId ? "Update post" : "Create post"}
								</button>
								{editId && (
									<button onClick={() => dispatch({ type: "RESET_FORM" })} className="h-12 rounded-[10px] border border-white/10 px-6 text-sm text-zinc-300 transition hover:bg-white/[0.04]">
										Cancel
									</button>
								)}
							</div>
						</Section>

						{/* Categories */}
						<Section label="Taxonomy" title="Categories" action={<Pill>{categories.length} total</Pill>}>
							<p className="mb-4 text-sm text-zinc-400">Manage editorial categories used across blog entries.</p>
							<div className="flex gap-3">
								<input placeholder="New category name" value={newCategory} onChange={(e) => dispatch({ type: "SET_NEW_CATEGORY", payload: e.target.value })} onKeyDown={(e) => e.key === "Enter" && handleAddCategory()} className={`${inputClass} flex-1`} />
								<button onClick={handleAddCategory} className="h-12 rounded-[10px] bg-[#ff2d55] px-5 text-sm font-medium text-white transition hover:brightness-110">Add</button>
							</div>
							<div className="mt-4 flex flex-wrap gap-2.5">
								{categories.length === 0
									? <EmptyState text="No categories yet." />
									: categories.map((cat) => (
										<div key={cat.id} className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3.5 py-2 text-sm text-zinc-300 transition hover:border-white/20">
											<span>{cat.name}</span>
											<button onClick={() => handleDeleteCategory(cat.id)} className="inline-flex h-5 w-5 items-center justify-center rounded-full text-zinc-500 transition hover:bg-red-500/15 hover:text-red-300">×</button>
										</div>
									))
								}
							</div>
						</Section>
					</div>

					{/* Blog list */}
					<aside className="rounded-[10px] border border-white/10 bg-white/[0.03] p-5 sm:p-6">
						<div className="mb-6 flex items-end justify-between gap-4">
							<div>
								<p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">Published list</p>
								<h2 className="mt-2 text-xl font-medium">All blogs</h2>
							</div>
							{fetching && <span className="text-xs text-zinc-500">Refreshing…</span>}
						</div>
						<div className="space-y-3">
							{blogs.length === 0
								? <EmptyState text="No blogs yet." />
								: blogs.map((blog) => (
									<article key={blog.id} className="rounded-[10px] border border-white/8 bg-black/20 p-4 transition hover:border-white/15">
										<div className="flex items-start justify-between gap-4">
											<div className="min-w-0">
												<h3 className="truncate text-sm font-medium">{blog.title}</h3>
												<p className="mt-1 text-xs uppercase tracking-[0.14em] text-zinc-500">{blog.category} · {blog.date}</p>
												{blog.tags?.length > 0 && (
													<div className="mt-3 flex flex-wrap gap-2">
														{blog.tags.slice(0, 4).map((tag) => (
															<span key={tag} className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-zinc-400">{tag}</span>
														))}
													</div>
												)}
											</div>
											<div className="flex shrink-0 gap-2">
												<button onClick={() => dispatch({ type: "SET_EDIT", payload: blog })} className="rounded-full border border-white/10 px-3 py-2 text-xs text-zinc-300 transition hover:bg-white/[0.05]">Edit</button>
												<button onClick={() => handleDelete(blog.id)} className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-300 transition hover:bg-red-500/15">Delete</button>
											</div>
										</div>
									</article>
								))
							}
						</div>
					</aside>
				</div>
			</div>
		</div>
	);
}

// ─── Small components ─────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
	return (
		<label className="block">
			<span className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-zinc-500">{label}</span>
			{children}
		</label>
	);
}

function Section({ label, title, action, children }: { label: string; title: string; action?: React.ReactNode; children: React.ReactNode }) {
	return (
		<section className="rounded-[10px] border border-white/10 bg-white/[0.03] p-5 sm:p-6">
			<div className="mb-6 flex items-start justify-between gap-4">
				<div>
					<p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">{label}</p>
					<h2 className="mt-2 text-xl font-medium text-white">{title}</h2>
				</div>
				{action}
			</div>
			{children}
		</section>
	);
}

function Pill({ children }: { children: React.ReactNode }) {
	return <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-zinc-500">{children}</span>;
}

function ResetBtn({ onClick }: { onClick: () => void }) {
	return <button onClick={onClick} className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.14em] text-zinc-300 transition hover:bg-white/[0.04]">Reset</button>;
}

function EmptyState({ text }: { text: string }) {
	return <div className="w-full rounded-[10px] border border-dashed border-white/10 px-4 py-8 text-center text-sm text-zinc-500">{text}</div>;
}

const inputClass = "w-full rounded-[10px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#ff2d55]/60 h-12";