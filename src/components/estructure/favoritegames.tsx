"use client";

import { FavoriteType } from "@/types/favorite-type";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface favoriteProps {
  favorites: FavoriteType[];
}

export default function Favoritegames({ favorites }: favoriteProps) {
  const router = useRouter();
  const [searchGame, setSearchGame] = useState("");

  const filteredGames = favorites.filter((favorite) => {
    return favorite.game.name
      .toLowerCase()
      .trim()
      .includes(searchGame.toLowerCase().trim());
  });

  async function handleRemoveFavorite(favoritoId: number) {
    await fetch(`/api/favorites/${favoritoId}`, {
      method: "DELETE",
    });
    router.refresh();
  }

  return (
    <section className="min-h-scree px-4 py-10 text-white md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wide text-[#00ff7f]">
              Meus favoritos
            </span>
            <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">
              Favorite games
            </h1>
          </div>

          <div className="w-full md:max-w-md">
            <label htmlFor="search-game" className="sr-only">
              Pesquisar jogo
            </label>
            <input
              id="search-game"
              type="text"
              value={searchGame}
              onChange={(event) => setSearchGame(event.target.value)}
              placeholder="Pesquisar jogo"
              className="w-full rounded-lg border border-[#00ff7f]/40 bg-black/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/50 focus:border-[#00ff7f] focus:ring-2 focus:ring-[#00ff7f]/30"
            />
          </div>
        </div>

        {favorites.length === 0 ? (
          <div className="rounded-lg border border-white/10 bg-white/5 p-8 text-center">
            <p className="text-lg font-semibold text-white">
              Nenhum jogo favorito ainda.
            </p>
            <p className="mt-2 text-sm text-white/70">
              Quando você adicionar jogos, eles aparecem aqui.
            </p>
          </div>
        ) : filteredGames.length === 0 ? (
          <div className="rounded-lg border border-white/10 bg-white/5 p-8 text-center">
            <p className="text-lg font-semibold text-white">
              Nenhum jogo encontrado.
            </p>
            <p className="mt-2 text-sm text-white/70">
              Tente pesquisar por outro nome.
            </p>
          </div>
        ) : (
          <ul className="grid list-none grid-cols-[repeat(auto-fit,minmax(180px,220px))] gap-6">
            {filteredGames.map((favorite) => (
              <li
                key={favorite.id}
                className="group overflow-hidden rounded-lg border border-white/10 bg-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.35)] transition duration-300 hover:-translate-y-1 hover:border-[#00ff7f]/60"
              >
                <div className="relative aspect-3/4 w-full bg-black/50">
                  {favorite.game.coverUrl ? (
                    <Image
                      src={favorite.game.coverUrl}
                      alt={favorite.game.name}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center px-6 text-center text-sm font-semibold text-white/70">
                      Jogo sem imagem
                    </div>
                  )}

                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/35 to-transparent" />
                </div>

                <div className="flex flex-col gap-4 p-4">
                  <h2 className="line-clamp-2 min-h-14 text-lg font-semibold leading-7 text-white">
                    {favorite.game.name}
                  </h2>

                  <div className="flex flex-col gap-3">
                    <Link
                      href={`/game/${favorite.game.externalId}`}
                      className="rounded-md bg-[#00ff7f] px-4 py-2.5 text-center text-sm font-semibold text-black transition hover:bg-white"
                    >
                      Ver detalhes do jogo
                    </Link>

                    <button
                      onClick={() =>
                        handleRemoveFavorite(favorite.game.externalId)
                      }
                      type="button"
                      className="rounded-md border border-[#00ff7f]/50 bg-transparent px-4 py-2.5 text-sm font-semibold text-white transition hover:border-white hover:bg-white hover:text-black"
                    >
                      Remover jogo da lista
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
