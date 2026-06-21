import Favoritegames from "@/components/estructure/favoritegames";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { FavoriteType } from "@/types/favorite-type";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export default async function FavoritesPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const favorites: FavoriteType[] = await prisma.favorite.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      game: true,
    },
  });

  return (
    <div>
      <Favoritegames favorites={favorites} />
    </div>
  );
}
