import Hero from "@/components/estructure/hero";
import Populargames from "@/components/estructure/populargames";
import Upcominggames from "@/components/estructure/upcominggames";
import { getGame, getPopularGames, getUpcomingGames } from "@/lib/rawgapi";
import { GameResponse } from "@/types/game-type";

interface PageProps {
  searchParams: Promise<{
    query?: string;
  }>;
}

export default async function AppPage({ searchParams }: PageProps) {
  const { query } = await searchParams;

  let games: GameResponse | null = null;
  let popularGames: GameResponse | null = null;
  let upcomingGames: GameResponse | null = null;

  if (query) {
    games = await getGame(query);
  } else {
    [popularGames, upcomingGames] = await Promise.all([
      getPopularGames(),
      getUpcomingGames(),
    ]);
  }

  return (
    <>
      <Hero />
      <div id="jogos-populares" className="max-w-300 w-full mx-auto mt-12">
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-3xl relative mb-8 text-center md:text-5xl font-heading text-white after:absolute after:left-1/2 after:top-full after:mt-3 after:h-1 after:w-20 after:-translate-x-1/2 after:rounded-full after:bg-(--primary)">
            Jogos <span className="text-(--primary)">Populares</span>
          </h1>
          <p className="p-2 mb-4 text-zinc-400">
            Descubra os jogos mais populares do momento e acompanhe os títulos
            mais bem avaliados pelos jogadores.
          </p>
        </div>
        {games && <Populargames populargames={games} />}

        {popularGames && <Populargames populargames={popularGames} />}
        {upcomingGames && <Upcominggames upcominggames={upcomingGames} />}
      </div>
    </>
  );
}
