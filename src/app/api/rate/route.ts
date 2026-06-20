import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return Response.json({ error: "Not Authorized" }, { status: 401 });
  }

  const { score, externalId, name, coverUrl, slug } = await req.json();

  if (score < 0 || score > 5) {
    return Response.json({ error: "Nota inválida" }, { status: 400 });
  }

  try {
    const game = await prisma.game.upsert({
      where: { externalId },
      update: {},
      create: { externalId, name, coverUrl, slug },
    });

    const rating = await prisma.rating.upsert({
      where: {
        userId_gameId: {
          userId: session.user.id,
          gameId: game.id,
        },
      },
      update: {
        score: score,
      },
      create: {
        userId: session.user.id,
        gameId: game.id,
        score: score,
      },
    });

    return Response.json(rating, { status: 201 });
  } catch {
    return Response.json("Falha para atribuir uma nota");
  }
}
