"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import GoogleIcon from "@mui/icons-material/Google";

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  async function handleGoogleLogin() {
    setIsLoading(true);

    try {
      await signIn("google", {
        callbackUrl: "/",
      });
    } catch (error) {
      setIsLoading(false);
    }
  }

  if (status === "loading" || status === "authenticated") {
    return (
      <main className="flex min-h-[calc(100vh-80px)] w-full items-center justify-center bg-black">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
      </main>
    );
  }

  return (
    <main className="flex min-h-[calc(100vh-80px)] w-full items-center justify-center bg-black px-4 py-8 text-white sm:px-6 lg:px-8">
      <section className="grid w-full max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl shadow-emerald-500/10 lg:min-h-[640px] lg:grid-cols-[1.12fr_0.88fr]">
        <div className="relative min-h-[280px] w-full sm:min-h-[380px] lg:min-h-full">
          <Image
            src="/img/loginimg.jpg"
            alt="Pessoa jogando em frente a uma tela"
            fill
            priority
            sizes="(min-width: 1024px) 56vw, 100vw"
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-zinc-950" />
        </div>

        <div className="relative flex items-center justify-center bg-zinc-950 px-6 py-10 sm:px-10 lg:px-14 z-10">
          <div className="w-full max-w-sm">
            <p className="font-body text-sm font-semibold uppercase tracking-[0.18em] text-emerald-500">
              Games DB
            </p>
            <h1 className="mt-3 font-heading text-3xl font-bold text-white sm:text-4xl">
              Bem-vindo de volta
            </h1>
            <p className="mt-3 font-body text-sm leading-6 text-zinc-400">
              Entre com sua conta Google para continuar descobrindo novos jogos.
            </p>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-md bg-[var(--primary)] px-4 py-3 text-sm font-semibold text-zinc-950 transition-all duration-200 hover:bg-emerald-300 hover:shadow-[0_0_15px_rgba(52,211,153,0.4)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-950 border-t-transparent" />
              ) : (
                <>
                  <GoogleIcon fontSize="small" />
                  <span>Logar com Google</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
