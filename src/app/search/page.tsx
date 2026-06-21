import { getGame } from "@/lib/rawgapi";
import Populargames from "@/components/estructure/populargames";

interface SearchPageProps {
  searchParams: Promise<{
    query?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  function capitalizeWords(text: string): string {
    return text
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }
  const { query } = await searchParams;

  const games = query ? await getGame(query) : null;

  return (
    <div className="max-w-7xl mx-auto mt-12">
      <h1 className="text-4xl text-white font-heading mb-8">
        Resultados para: {query && capitalizeWords(query)}
      </h1>

      {games && <Populargames populargames={games} />}
    </div>
  );
}
