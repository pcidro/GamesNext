import GamePage from "@/components/estructure/game";
import { authOptions } from "@/lib/auth";
import { getGameById } from "@/lib/rawgapi";
import type { Game } from "@/types/game-type";
import { getServerSession } from "next-auth";
interface PageProps {
  params: Promise<{
    id: number;
  }>;
}

export default async function GameDetails({ params }: PageProps) {
  const { id } = await params;
  const game: Game = await getGameById(id);
  const session = await getServerSession(authOptions);

  return (
    <div>
      <GamePage session={session} game={game} />
    </div>
  );
}
