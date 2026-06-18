import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ externalId: string }> },
) {
  const { externalId } = await params;
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return Response.json({ error: "Not Authorized" }, { status: 401 });
  }

  try {
    await prisma.favorite.delete({
      where: {
        userId_gameId: {
          userId: session.user.id,
          gameId: (await prisma.game.findUnique({
            where: { externalId: Number(externalId) },
          }))!.id,
        },
      },
    });
    return Response.json({
      message: "Jogo deletado dos favoritos com sucesso!",
    });
  } catch (error) {
    console.log("Erro ao deletar:", error);
  }
  return Response.json(
    { error: "Não foi possível deletar o jogo dos favoritos" },
    { status: 400 },
  );
}
