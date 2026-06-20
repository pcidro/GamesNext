import GamePage from "@/components/estructure/game";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
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

  if (!session) {
    return;
  }

  const favorite = await prisma.favorite.findFirst({
    where: { userId: session.user.id, game: { externalId: Number(id) } },
  });

  const rating = await prisma.rating.findFirst({
    where: {
      userId: session.user.id,
      game: {
        externalId: Number(id),
      },
    },
  });

  return (
    <div>
      <GamePage
        session={session}
        game={game}
        isFavorited={!!favorite}
        rating={rating?.score ?? null}
      />
    </div>
  );
}
