import Populargames from "@/components/estructure/populargames";
import { getPopularGames } from "@/lib/rawgapi";
import { GameResponse } from "@/types/game-type";

export default async function AppPage() {
  const popularGames: GameResponse = await getPopularGames();
  return (
    <div className="max-w-300 w-full mx-auto mt-4">
      <h1 className="text-5xl mb-3.5 text-center text-white font-heading">
        Jogos Populares
      </h1>
      <Populargames populargames={popularGames} />
    </div>
  );
}
