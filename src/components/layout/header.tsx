"use client";

import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { Heart, LogIn, LogOut, Search, X } from "lucide-react";
import Input from "./input";
import { SearchContext } from "@/context/searchContext";

export default function Header() {
  const { status } = useSession();
  const { search, setSearch } = SearchContext();
  const [searchMobileAberto, setSearchMobileAberto] = useState(false);
  const isAuthenticated = status === "authenticated";

  return (
    <header className="h-20 max-h-20 border-b border-zinc-800 bg-zinc-900 px-4 md:px-6 font-heading relative">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4">
        {!searchMobileAberto && (
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
        )}

        <div className="hidden md:flex w-full max-w-sm items-center">
          <Input
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            placeholder="Digite um jogo..."
          />
        </div>

        {searchMobileAberto && (
          <div className="absolute inset-x-0 top-0 z-50 flex h-full items-center bg-zinc-900 px-4 md:hidden gap-2">
            <div className="flex-1">
              <Input
                value={search}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSearch(e.target.value)
                }
                placeholder="Digite um jogo..."
              />
            </div>
            <button
              onClick={() => {
                setSearchMobileAberto(false);
                setSearch("");
              }}
              className="p-2 text-white/70 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        )}

        <nav className="flex items-center gap-1 sm:gap-2 ml-auto md:ml-0">
          <button
            onClick={() => setSearchMobileAberto(true)}
            className="flex md:hidden p-2 text-white/70 hover:text-white"
          >
            <Search className="w-5 h-5" />
          </button>

          {!isAuthenticated ? (
            <Link
              href="/login"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-white/5 hover:text-[#00FF7F]"
            >
              <LogIn className="h-5 w-5" aria-hidden="true" />
              <span className="hidden sm:inline">Entrar</span>
            </Link>
          ) : (
            <>
              <Link
                href="/favorites"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-white/5 hover:text-[#00FF7F]"
              >
                <Heart className="h-5 w-5" aria-hidden="true" />
                <span className="hidden md:block">Favoritos</span>
              </Link>

              <div className="h-6 w-px bg-zinc-700" aria-hidden="true" />

              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-white/5 hover:text-[#00FF7F] cursor-pointer"
              >
                <LogOut className="h-5 w-5" aria-hidden="true" />
                <span className="hidden md:block">Sair</span>
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
