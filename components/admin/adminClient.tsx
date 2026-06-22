"use client";

import Image from "next/image";
import { useEffect, useReducer, useMemo, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

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

type State = {
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
	title: "",
	slug: "",
	description: "",
	category: "",
	tags: "",
	date: "",
	image_url: "",
};

const initialState = (blogs: Blog[], categories: Category[]): State => ({
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
		case "SET_BLOGS":
			return { ...state, blogs: action.payload };
		case "SET_CATEGORIES":
			return { ...state, categories: action.payload };
		case "SET_FORM":
			return { ...state, form: { ...state.form, ...action.payload } };
		case "SET_EDIT":
			return {
				...state,
				editId: action.payload.id,
				form: { ...action.payload, tags: action.payload.tags?.join(", ") ?? "" },
				imageFile: null,
				message: "",
				error: "",
			};
		case "SET_IMAGE":
			return { ...state, imageFile: action.payload };
		case "SET_LOADING":
			return { ...state, loading: action.payload };
		case "SET_FETCHING":
			return { ...state, fetching: action.payload };
		case "SET_MESSAGE":
			return { ...state, message: action.payload, error: "" };
		case "SET_ERROR":
			return { ...state, error: action.payload, message: "" };
		case "SET_NEW_CATEGORY":
			return { ...state, newCategory: action.payload };
		case "RESET_FORM":
			return {
				...state,
				form: emptyForm,
				editId: null,
				imageFile: null,
				message: "",
				error: "",
			};
		default:
			return state;
	}
}

type Props = {
	initialBlogs: Blog[];
	initialCategories: Category[];
};

export default function AdminClient({ initialBlogs, initialCategories }: Props) {
	const [state, dispatch] = useReducer(
		reducer,
		initialState(initialBlogs, initialCategories)
	);

	const {
		blogs,
		categories,
		form,
		editId,
		imageFile,
		loading,
		fetching,
		message,
		error,
		newCategory,
	} = state;

	const headers = useMemo(
		() => ({
			"Content-Type": "application/json",
		}),
		[]
	);

	const autoSlug = (title: string) =>
		title
			.toLowerCase()
			.trim()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/(^-|-$)/g, "");

	const fetchBlogs = useCallback(async () => {
		dispatch({ type: "SET_FETCHING", payload: true });
		try {
			const res = await fetch("/api/blogs");
			const data = await res.json();
			if (!res.ok) throw new Error(data?.error || "Failed to load blogs");
			dispatch({ type: "SET_BLOGS", payload: data });
		} catch (err) {
			dispatch({
				type: "SET_ERROR",
				payload: err instanceof Error ? err.message : "Failed to load blogs",
			});
		} finally {
			dispatch({ type: "SET_FETCHING", payload: false });
		}
	}, []);

	const fetchCategories = useCallback(async () => {
		try {
			const res = await fetch("/api/categories");
			const data = await res.json();
			dispatch({
				type: "SET_CATEGORIES",
				payload: Array.isArray(data) ? data : [],
			});
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
			body: fd,
		});

		const data = await res.json();
		return data.url ?? null;
	};

	const handleSubmit = async () => {
		if (!form.title || !form.slug || !form.category || !form.date) {
			return dispatch({
				type: "SET_ERROR",
				payload: "Please fill all required fields",
			});
		}

		dispatch({ type: "SET_LOADING", payload: true });

		try {
			const image_url = await uploadImage();
			if (!image_url) throw new Error("Image upload failed");

			const payload = {
				...form,
				image_url,
				tags: form.tags
					.split(",")
					.map((t) => t.trim())
					.filter(Boolean),
			};

			const res = await fetch(editId ? `/api/blogs/${editId}` : "/api/blogs/create", {
				method: editId ? "PUT" : "POST",
				headers,
				body: JSON.stringify(payload),
			});

			const data = await res.json();
			if (!res.ok) throw new Error(data?.error || "Something went wrong");

			dispatch({
				type: "SET_MESSAGE",
				payload: editId ? "Blog updated." : "Blog created.",
			});
			dispatch({ type: "RESET_FORM" });
			await fetchBlogs();
		} catch (err) {
			dispatch({
				type: "SET_ERROR",
				payload: err instanceof Error ? err.message : "Request failed",
			});
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
			dispatch({
				type: "SET_ERROR",
				payload: err instanceof Error ? err.message : "Delete failed",
			});
		}
	};

	const handleAddCategory = async () => {
		if (!newCategory.trim()) return;
		try {
			const res = await fetch("/api/categories", {
				method: "POST",
				headers,
				body: JSON.stringify({ name: newCategory.trim() }),
			});
			const data = await res.json().catch(() => null);
			if (!res.ok) throw new Error(data?.error || "Failed to add category");
			dispatch({ type: "SET_NEW_CATEGORY", payload: "" });
			dispatch({ type: "SET_MESSAGE", payload: "Category added." });
			await fetchCategories();
		} catch (err) {
			dispatch({
				type: "SET_ERROR",
				payload: err instanceof Error ? err.message : "Failed to add category",
			});
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
			dispatch({
				type: "SET_ERROR",
				payload: err instanceof Error ? err.message : "Failed to delete category",
			});
		}
	};

	const shouldReduceMotion = useReducedMotion();

	const pageVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				duration: shouldReduceMotion ? 0 : 0.35,
				staggerChildren: shouldReduceMotion ? 0 : 0.08,
			},
		},
	};

	const sectionVariants = {
		hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: shouldReduceMotion ? 0 : 0.4,
				ease: [0.22, 1, 0.36, 1] as const,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: shouldReduceMotion ? 0 : 0.3,
				ease: [0.22, 1, 0.36, 1] as const,
			},
		},
	};

	const feedbackVariants = {
		initial: { opacity: 0, y: shouldReduceMotion ? 0 : -8 },
		animate: {
			opacity: 1,
			y: 0,
			transition: { duration: shouldReduceMotion ? 0 : 0.25 },
		},
		exit: {
			opacity: 0,
			y: shouldReduceMotion ? 0 : -8,
			transition: { duration: shouldReduceMotion ? 0 : 0.2 },
		},
	};

	return (
		<motion.div
			className="min-h-screen bg-background text-foreground px-4 py-6 sm:px-6 lg:px-8 border-b border-zinc-300 dark:border-zinc-900"
			variants={pageVariants}
			initial="hidden"
			animate="visible"
		>
			<div className="mx-auto max-w-7xl">
				<motion.div
					variants={sectionVariants}
					className="mb-8 flex flex-col gap-3 border-b border-border pb-6 lg:flex-row lg:items-end lg:justify-between"
				>
					<div>
						<p className="mb-2 text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
							Editorial Admin
						</p>
						<h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
							Blog operations
						</h1>
					</div>

					<div className="flex items-center gap-2 text-xs text-muted-foreground">
						<Pill>{blogs.length} posts</Pill>
						<Pill>{categories.length} categories</Pill>
						<Pill>{editId ? "Editing" : "Create mode"}</Pill>

						<motion.button
							onClick={handleLogout}
							whileHover={shouldReduceMotion ? {} : { y: -1 }}
							whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
							className="rounded-full border border-border bg-card px-4 py-2 text-xs text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
						>
							Logout
						</motion.button>
					</div>
				</motion.div>

				<AnimatePresence mode="wait">
					{(error || message) && (
						<motion.div
							key={error ? `error-${error}` : `message-${message}`}
							variants={feedbackVariants}
							initial="initial"
							animate="animate"
							exit="exit"
							className={`mb-6 rounded-[10px] border px-4 py-3 text-sm ${error
								? "border-destructive/20 bg-destructive/10 text-destructive"
								: "border-primary/20 bg-primary/10 text-primary"
								}`}
						>
							{error || message}
						</motion.div>
					)}
				</AnimatePresence>

				<div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(380px,0.9fr)]">
					<motion.div variants={sectionVariants} className="space-y-6">
						<Section
							label="Editor"
							title={editId ? "Edit post" : "Create post"}
							action={editId ? <ResetBtn onClick={() => dispatch({ type: "RESET_FORM" })} /> : null}
						>
							<div className="grid gap-4 md:grid-cols-2">
								<Field label="Title *">
									<input
										value={form.title}
										onChange={(e) =>
											dispatch({
												type: "SET_FORM",
												payload: {
													title: e.target.value,
													slug: autoSlug(e.target.value),
												},
											})
										}
										placeholder="The future of nightlife branding"
										className={inputClass}
									/>
								</Field>

								<Field label="Slug *">
									<input
										value={form.slug}
										onChange={(e) =>
											dispatch({ type: "SET_FORM", payload: { slug: e.target.value } })
										}
										placeholder="the-future-of-nightlife-branding"
										className={inputClass}
									/>
								</Field>

								<Field label="Category *">
									<select
										value={form.category}
										onChange={(e) =>
											dispatch({ type: "SET_FORM", payload: { category: e.target.value } })
										}
										className={inputClass}
									>
										<option value="">Select category</option>
										{categories.map((c) => (
											<option key={c.id} value={c.name}>
												{c.name}
											</option>
										))}
									</select>
								</Field>

								<Field label="Date *">
									<input
										value={form.date}
										onChange={(e) =>
											dispatch({ type: "SET_FORM", payload: { date: e.target.value } })
										}
										placeholder="MAY 2026"
										className={inputClass}
									/>
								</Field>
							</div>

							<div className="mt-4 space-y-4">
								<Field label="Description">
									<textarea
										rows={5}
										value={form.description}
										onChange={(e) =>
											dispatch({
												type: "SET_FORM",
												payload: { description: e.target.value },
											})
										}
										placeholder="Write a concise editorial summary..."
										className={`${inputClass} resize-none py-3 h-auto min-h-[132px]`}
									/>
								</Field>

								<Field label="Tags (comma separated)">
									<input
										value={form.tags}
										onChange={(e) =>
											dispatch({ type: "SET_FORM", payload: { tags: e.target.value } })
										}
										placeholder="Nightlife, Culture, Community"
										className={inputClass}
									/>
								</Field>

								<Field label="Cover image (max 5MB)">
									<input
										type="file"
										accept="image/*"
										onChange={(e) =>
											dispatch({ type: "SET_IMAGE", payload: e.target.files?.[0] ?? null })
										}
										className={`${inputClass} file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-primary-foreground`}
									/>

									{(form.image_url || imageFile) && (
										<motion.div
											layout
											initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
											animate={{ opacity: 1, scale: 1 }}
											transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
											className="relative mt-3 h-52 overflow-hidden rounded-[22px] border border-border bg-card"
										>
											{imageFile ? (
												<img
													src={URL.createObjectURL(imageFile)}
													alt="Preview"
													className="h-full w-full object-cover"
												/>
											) : (
												<Image
													src={form.image_url}
													alt="Current cover"
													fill
													className="object-cover"
												/>
											)}
										</motion.div>
									)}
								</Field>
							</div>

							<div className="mt-6 flex gap-3">
								<motion.button
									onClick={handleSubmit}
									disabled={loading}
									whileHover={shouldReduceMotion ? {} : { y: -1, scale: 1.01 }}
									whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
									className="h-12 rounded-[10px] bg-primary px-6 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
								>
									{loading ? "Saving..." : editId ? "Update post" : "Create post"}
								</motion.button>

								{editId && (
									<motion.button
										onClick={() => dispatch({ type: "RESET_FORM" })}
										whileHover={shouldReduceMotion ? {} : { y: -1 }}
										whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
										className="h-12 rounded-[10px] border border-border bg-card px-6 text-sm text-card-foreground transition hover:bg-accent hover:text-accent-foreground"
									>
										Cancel
									</motion.button>
								)}
							</div>
						</Section>

						<Section
							label="Taxonomy"
							title="Categories"
							action={<Pill>{categories.length} total</Pill>}
						>
							<p className="mb-4 text-sm text-muted-foreground">
								Manage editorial categories used across blog entries.
							</p>

							<div className="flex gap-3">
								<input
									placeholder="New category name"
									value={newCategory}
									onChange={(e) =>
										dispatch({ type: "SET_NEW_CATEGORY", payload: e.target.value })
									}
									onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
									className={`${inputClass} flex-1`}
								/>

								<motion.button
									onClick={handleAddCategory}
									whileHover={shouldReduceMotion ? {} : { y: -1 }}
									whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
									className="h-12 rounded-[10px] bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
								>
									Add
								</motion.button>
							</div>

							<div className="mt-4 flex flex-wrap gap-2.5">
								{categories.length === 0 ? (
									<EmptyState text="No categories yet." />
								) : (
									categories.map((cat) => (
										<motion.div
											key={cat.id}
											layout
											variants={itemVariants}
											whileHover={shouldReduceMotion ? {} : { y: -2 }}
											className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-sm text-card-foreground"
										>
											<span>{cat.name}</span>
											<button
												onClick={() => handleDeleteCategory(cat.id)}
												className="inline-flex h-5 w-5 items-center justify-center rounded-full text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
											>
												×
											</button>
										</motion.div>
									))
								)}
							</div>
						</Section>
					</motion.div>

					<motion.aside
						variants={sectionVariants}
						whileHover={shouldReduceMotion ? {} : { y: -2 }}
						transition={{ duration: 0.2 }}
						className="rounded-[10px] border border-border bg-card p-5 text-card-foreground sm:p-6"
					>
						<div className="mb-6 flex items-end justify-between gap-4">
							<div>
								<p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
									Published list
								</p>
								<h2 className="mt-2 text-xl font-medium">All blogs</h2>
							</div>
							{fetching && <span className="text-xs text-muted-foreground">Refreshing…</span>}
						</div>

						<div className="space-y-3">
							{blogs.length === 0 ? (
								<EmptyState text="No blogs yet." />
							) : (
								blogs.map((blog) => (
									<motion.article
										key={blog.id}
										layout
										variants={itemVariants}
										whileHover={
											shouldReduceMotion
												? {}
												: { y: -2, borderColor: "hsl(var(--border))" }
										}
										transition={{ duration: 0.2 }}
										className="rounded-[10px]  bg-background/60 p-4"
									>
										<div className="flex items-start justify-between gap-4">
											<div className="min-w-0">
												<h3 className="truncate text-sm font-medium text-foreground">
													{blog.title}
												</h3>
												<p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
													{blog.category} · {blog.date}
												</p>

												{blog.tags?.length > 0 && (
													<div className="mt-3 flex flex-wrap gap-2">
														{blog.tags.slice(0, 4).map((tag) => (
															<span
																key={tag}
																className="rounded-full border border-border px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-muted-foreground"
															>
																{tag}
															</span>
														))}
													</div>
												)}
											</div>

											<div className="flex shrink-0 gap-2">
												<motion.button
													onClick={() => dispatch({ type: "SET_EDIT", payload: blog })}
													whileHover={shouldReduceMotion ? {} : { y: -1 }}
													whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
													className="rounded-full border border-border bg-card px-3 py-2 text-xs text-card-foreground transition hover:bg-accent hover:text-accent-foreground"
												>
													Edit
												</motion.button>

												<motion.button
													onClick={() => handleDelete(blog.id)}
													whileHover={shouldReduceMotion ? {} : { y: -1 }}
													whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
													className="rounded-full border border-destructive/20 bg-destructive/10 px-3 py-2 text-xs text-destructive transition hover:bg-destructive/15"
												>
													Delete
												</motion.button>
											</div>
										</div>
									</motion.article>
								))
							)}
						</div>
					</motion.aside>
				</div>
			</div>
		</motion.div>
	);
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
	return (
		<label className="block">
			<span className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
				{label}
			</span>
			{children}
		</label>
	);
}

function Section({
	label,
	title,
	action,
	children,
}: {
	label: string;
	title: string;
	action?: React.ReactNode;
	children: React.ReactNode;
}) {
	return (
		<section className="rounded-[10px] border border-border bg-card p-5 text-card-foreground sm:p-6">
			<div className="mb-6 flex items-start justify-between gap-4">
				<div>
					<p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
						{label}
					</p>
					<h2 className="mt-2 text-xl font-medium text-card-foreground">{title}</h2>
				</div>
				{action}
			</div>
			{children}
		</section>
	);
}

function Pill({ children }: { children: React.ReactNode }) {
	return (
		<span className="rounded-full border border-border bg-card px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
			{children}
		</span>
	);
}

function ResetBtn({ onClick }: { onClick: () => void }) {
	return (
		<motion.button
			onClick={onClick}
			whileHover={{ y: -1 }}
			whileTap={{ scale: 0.98 }}
			className="rounded-full border border-border bg-card px-4 py-2 text-xs uppercase tracking-[0.14em] text-card-foreground transition hover:bg-accent hover:text-accent-foreground"
		>
			Reset
		</motion.button>
	);
}

function EmptyState({ text }: { text: string }) {
	return (
		<div className="w-full rounded-[10px] border border-dashed border-border bg-card px-4 py-8 text-center text-sm text-muted-foreground">
			{text}
		</div>
	);
}

const inputClass =
	"h-12 w-full rounded-[10px] border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20";