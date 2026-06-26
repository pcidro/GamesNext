"use client";

import Image from "next/image";
import Link from "next/link";
import { Game } from "@/types/game-type";
import { useState } from "react";
import { Session } from "next-auth";
import { ModalRating } from "../layout/modalrating";
import RatingStars from "../layout/stars";

interface gameProps {
  game: Game;
  session: Session | null;
  isFavorited: boolean;
  rating: number | null;
}

export default function GamePage({
  game,
  session,
  isFavorited,
  rating,
}: gameProps) {
  const [isSaved, setIsSaved] = useState(isFavorited);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRating, setUserRating] = useState<number | null>(rating);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function addFavoriteGame() {
    setLoading(true);
    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          externalId: game.id,
          name: game.name,
          coverUrl: game.background_image,
          slug: game.slug,
          genres: game.genres,
        }),
      });

      if (res.ok) {
        setIsSaved(true);
        setUserRating(userRating);
      }
    } catch (error) {
      console.error("Erro ao favoritar jogo:", error);
    } finally {
      setLoading(false);
    }
  }

  async function removeFavoriteGame() {
    const res = await fetch(`/api/favorites/${game.id}`, { method: "DELETE" });
    if (res.ok) setIsSaved(false);
  }

  async function handleRating() {
    if (userRating === null) {
      setError(true);
      return;
    }

    const res = await fetch("/api/rate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: game.name,
        score: userRating,
        externalId: game.id,
        coverUrl: game.background_image,
        slug: game.slug,
      }),
    });
    if (res.ok) {
      setIsModalOpen(false);
    }
    const data = await res.json();
    console.log(data);
  }

  return (
    <div>
      <section className="relative min-h-screen bg-zinc-950 text-white">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden">
          {game.background_image && (
            <Image
              src={game.background_image}
              alt={game.name}
              fill
              className="object-cover object-center"
              priority
            />
          )}
          <div className="absolute inset-0 bg-linear-to-b from-zinc-950/30 to-zinc-950/80" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10 lg:px-10 lg:py-14">
          <div className="grid gap-6 lg:grid-cols-[280px_1fr] lg:gap-12">
            {/* Poster */}
            <div className="lg:sticky lg:top-20">
              <Image
                src={game.background_image}
                alt={`Capa de ${game.name}`}
                width={280}
                height={420}
                className="aspect-2/3 w-full rounded-xl object-cover shadow-2xl"
              />
            </div>

            {/* Info */}
            <div className="flex flex-col gap-8">
              <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                {game.name}
              </h1>

              {/* Ratings */}
              <div className="flex flex-wrap items-center gap-8">
                {game.rating && (
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-semibold tracking-widest uppercase text-zinc-300">
                      Rating
                    </span>

                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl text-emerald-400">★</span>

                      <span className="text-3xl font-bold">{game.rating}</span>

                      <span className="text-zinc-400">/5</span>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold tracking-widest uppercase text-zinc-300">
                    Sua avaliação
                  </span>

                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl text-emerald-400">★</span>

                    <span className="text-3xl font-bold">{userRating}</span>

                    <span className="text-zinc-400">/5</span>
                  </div>
                </div>
              </div>

              {/* Genres */}
              {game.genres?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {game.genres.slice(0, 5).map((genre) => (
                    <span
                      key={genre.id}
                      className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium transition hover:bg-white/15"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Meta */}
              <div className="flex flex-col gap-4 border-y border-white/10 py-6">
                {game.released && (
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                      Lançamento
                    </span>

                    <span className="font-medium">{game.released}</span>
                  </div>
                )}

                {game.developers?.[0] && (
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                      Desenvolvedor
                    </span>

                    <span className="font-medium">
                      {game.developers[0].name}
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              {game.description_raw && (
                <p className="max-w-4xl text-base leading-7 text-zinc-300 md:text-lg">
                  {game.description_raw.slice(0, 414)}
                </p>
              )}

              {/* Actions */}
              <div className="mt-4 flex flex-wrap items-center gap-4">
                {session?.user ? (
                  <>
                    {isSaved ? (
                      <button
                        onClick={removeFavoriteGame}
                        className="rounded-md bg-red-600 px-7 py-3 text-sm font-semibold uppercase tracking-wide transition hover:-translate-y-0.5 hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/30"
                      >
                        {loading ? "Removendo..." : "Remover dos meus jogos"}
                      </button>
                    ) : (
                      <button
                        onClick={addFavoriteGame}
                        className="rounded-md bg-emerald-400 px-7 py-3 text-sm font-semibold uppercase tracking-wide text-black transition hover:-translate-y-0.5 hover:bg-emerald-300 hover:shadow-lg hover:shadow-emerald-400/30"
                      >
                        {loading
                          ? "Adicionando..."
                          : "Adicionar aos meus jogos"}
                      </button>
                    )}

                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="rounded-md border border-white/20 bg-white/10 px-7 py-3 text-sm font-semibold uppercase tracking-wide transition hover:-translate-y-0.5 hover:bg-white/15"
                    >
                      Rankear jogo
                    </button>
                    <ModalRating
                      handleRating={handleRating}
                      isOpen={isModalOpen}
                      error={error}
                      onClose={() => setIsModalOpen(false)}
                    >
                      <RatingStars
                        value={userRating}
                        onChange={setUserRating}
                      />
                    </ModalRating>
                  </>
                ) : (
                  <p className="text-sm leading-6 text-zinc-300">
                    Faça{" "}
                    <Link
                      href="/login"
                      className="font-semibold text-emerald-400 hover:underline"
                    >
                      Login
                    </Link>{" "}
                    ou{" "}
                    <Link
                      href="/login"
                      className="font-semibold text-emerald-400 hover:underline"
                    >
                      Crie
                    </Link>{" "}
                    uma conta para rankear seus jogos.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
