import Hero from "@/components/estructure/hero";
import Populargames from "@/components/estructure/populargames";
import { getPopularGames, getGame } from "@/lib/rawgapi";
import { GameResponse } from "@/types/game-type";

interface PageProps {
  searchParams: Promise<{
    query?: string;
  }>;
}

export default async function AppPage({ searchParams }: PageProps) {
  const { query } = await searchParams;

  const games: GameResponse = query
    ? await getGame(query)
    : await getPopularGames();

  return (
    <>
      <Hero />
      <div id="jogos-populares" className="max-w-300 w-full mx-auto mt-12">
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="relative mb-8 text-center text-5xl font-heading text-white after:absolute after:left-1/2 after:top-full after:mt-3 after:h-1 after:w-20 after:-translate-x-1/2 after:rounded-full after:bg-(--primary)">
            Jogos <span className="text-(--primary)">Populares</span>
          </h1>
          <p className="mb-4 text-zinc-400">
            Descubra os jogos mais populares do momento e acompanhe os títulos
            mais bem avaliados pelos jogadores.
          </p>
        </div>
        <Populargames populargames={games} />
      </div>
    </>
  );
}
