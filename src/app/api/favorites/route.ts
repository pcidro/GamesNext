import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return Response.json({ error: "Not Authorized" }, { status: 401 });
  }

  const { externalId, name, coverUrl, slug, genres = [] } = await req.json();

  const game = await prisma.game.upsert({
    where: { externalId },
    update: {},
    create: { externalId, name, coverUrl, slug, genres: genres || null },
  });

  const existing = await prisma.favorite.findUnique({
    where: { userId_gameId: { userId: session.user.id, gameId: game.id } },
  });

  if (existing) {
    return Response.json({ error: "Já favoritado" }, { status: 409 });
  }

  const favorite = await prisma.favorite.create({
    data: { userId: session.user.id, gameId: game.id },
  });

  return Response.json(favorite, { status: 201 });
}
