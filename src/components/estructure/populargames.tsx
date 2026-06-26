"use client";

import { GameResponse } from "@/types/game-type";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Populargames({
  populargames,
}: {
  populargames: GameResponse;
}) {
  const [clickedGameId, setClickedGameId] = useState<number | null>(null);

  return (
    <>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2 md:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] md:gap-6 list-none">
        {populargames.results.map((game) => {
          const isLoading = clickedGameId === game.id;

          return (
            <li
              key={game.id}
              className="group relative overflow-hidden rounded-2xl aspect-3/4 cursor-pointer bg-[#1a1a2e] shadow-[0_4px_15px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-full w-full">
                <Image
                  src={game.background_image}
                  alt={game.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/90 via-black/50 to-transparent p-5">
                <h3
                  className={`text-lg font-semibold text-white transition-opacity duration-300 ${!isLoading && "group-hover:opacity-0"}`}
                >
                  {game.name}
                </h3>

                <Link
                  href={`/game/${game.id}`}
                  onClick={() => setClickedGameId(game.id)}
                  className={`absolute bottom-7 left-8 rounded-lg bg-[#00ff7f] px-4 py-2 font-medium text-white transition-all duration-300 hover:bg-green-300 cursor-pointer ${
                    isLoading
                      ? "opacity-100 pointer-events-none bg-[#00ff7f]"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {isLoading ? "Carregando..." : "Ver detalhes"}
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
