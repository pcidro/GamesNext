import Populargames from "@/components/estructure/populargames";
import { getPopularGames } from "@/lib/rawgapi";
import { GameResponse } from "@/types/game-type";

export default async function AppPage() {
  const popularGames: GameResponse = await getPopularGames();
  return (
    <div className="max-w-300 w-full mx-auto mt-4">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="relative mb-8 text-center text-5xl font-heading text-white after:absolute after:left-1/2 after:top-full after:mt-3 after:h-1 after:w-20 after:-translate-x-1/2 after:rounded-full after:bg-(--primary)">
          Jogos <span className="text-(--primary)">Populares</span>
        </h1>
        <p className="mb-4 text-zinc-400">
          Descubra os jogos mais populares do momento e acompanhe os títulos
          mais bem avaliados pelos jogadores.
        </p>
      </div>
      <Populargames populargames={popularGames} />
    </div>
  );
}
