"use client";

import Image from "next/image";
import Link from "next/link";
import { ChangeEvent } from "react";
import { signOut, useSession } from "next-auth/react";
import { Heart, LogIn, LogOut } from "lucide-react";
import Input from "./input";
import { SearchContext } from "@/context/searchContext";

export default function Header() {
  const { status } = useSession();
  const { search, setSearch, setQuery } = SearchContext();
  const isAuthenticated = status === "authenticated";

  return (
    <header className="h-20 max-h-20 border-b  bg-zinc-900 px-6 font-heading ">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between">
        <Link
          href="/"
          className="relative flex h-16 w-28 shrink-0 items-center overflow-hidden"
        >
          <Image
            src="/img/logo.png"
            alt="GamesNext"
            width={128}
            height={128}
            priority
            className="absolute left-1/2 top-1/2 h-32 w-32 max-w-none -translate-x-1/2 -translate-y-1/2 object-contain"
          />
        </Link>

        <div className="w-full max-w-sm flex items-center">
          <Input
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            placeholder="Digite um jogo..."
          />
        </div>

        <nav className="flex items-center gap-2">
          {!isAuthenticated ? (
            <Link
              href="/login"
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-white/5 hover:text-[#00FF7F]"
            >
              <LogIn className="h-4 w-4" aria-hidden="true" />
              Entrar
            </Link>
          ) : (
            <>
              <Link
                href="/favorites"
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-white/5 hover:text-[#00FF7F]"
              >
                <Heart className="h-4 w-4" aria-hidden="true" />
                Favoritos
              </Link>

              <div className="h-6 w-px bg-zinc-700" aria-hidden="true" />

              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-white/5 hover:text-(--primary)"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                Sair
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
