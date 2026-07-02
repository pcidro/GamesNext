import FilteredGames from "@/components/estructure/filteredgames";
import { getGamesFiltered } from "@/lib/rawgapi";
import { GameResponse } from "@/types/game-type";

type SearchParams = Promise<{
  search?: string;
  genre?: string;
  platform?: string;
}>;

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { search, genre, platform } = await searchParams;

  const data: GameResponse = await getGamesFiltered(search, genre, platform);

  return (
    <div className="p-4 text-white">
      <h1 className="mb-4 text-2xl font-bold">
        Resultados para os jogos pesquisados:
      </h1>

      <FilteredGames filteredGames={data} />
    </div>
  );
}
