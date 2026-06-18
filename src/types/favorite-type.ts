export type FavoriteType = {
  id: string;
  userId: string;
  gameId: string;
  createdAt: Date;
  game: {
    id: string;
    externalId: number;
    name: string;
    coverUrl: string | null;
    slug: string;
  };
};
