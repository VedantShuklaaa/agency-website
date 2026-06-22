"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleLogin = async () => {
		if (!password) return setError("Enter admin secret");
		setLoading(true);
		setError("");

		const res = await fetch("/api/admin/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ secret: password }),
		});

		const data = await res.json();

		if (!res.ok) {
			setError(data.error ?? "Login failed");
			setLoading(false);
			return;
		}

		router.refresh();
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-6 text-white">
			<div className="w-full max-w-4xl rounded-[28px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
				<p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-zinc-500">Club CMS</p>
				<h1 className="text-3xl font-semibold tracking-tight">Admin access</h1>
				<p className="mt-2 text-sm leading-6 text-zinc-400">Enter the admin secret to manage posts.</p>
				<div className="mt-8 space-y-3">
					<label className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">Admin Secret</label>
					<input
						type="password"
						placeholder="••••••••••••"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						onKeyDown={(e) => e.key === "Enter" && handleLogin()}
						className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#ff2d55]/60"
					/>
				</div>
				{error && <p className="mt-4 text-sm text-red-400">{error}</p>}
				<button
					onClick={handleLogin}
					disabled={loading}
					className="mt-6 h-12 w-full rounded-2xl bg-[#ff2d55] text-sm font-medium text-white transition hover:brightness-110 disabled:opacity-50"
				>
					{loading ? "Verifying..." : "Continue"}
				</button>
			</div>
		</div>
	);
}