"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

export default function LoginPage() {
  const { status, data } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  async function handleGoogleLogin() {
    setIsLoading(true);

    try {
      await signIn("google", {
        callbackUrl: "/",
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (status === "authenticated") {
    return (
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-4 px-6 py-10">
        <h1 className="text-2xl font-semibold">Voce ja esta logado</h1>
        <p className="text-zinc-600">
          Sessao ativa como {data.user?.name ?? data.user?.email}.
        </p>
        <Link href="/" className="text-sm font-medium underline">
          Voltar para home
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 items-center px-6 py-10">
      <section className="w-full max-w-sm rounded-lg border border-zinc-200 bg-white p-6 text-zinc-950 shadow-sm">
        <h1 className="text-2xl font-semibold">Entrar</h1>
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="mt-6 w-full rounded-md bg-zinc-950 px-4 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Abrindo Google..." : "Logar com Google"}
        </button>
      </section>
    </main>
  );
}
