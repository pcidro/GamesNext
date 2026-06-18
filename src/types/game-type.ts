export type GameResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Game[];
};

type Developer = {
  id: number;
  name: string;
};

type genres = {
  id: number;
  name: string;
  slug: string;
};

export type Game = {
  id: number;
  developers?: Developer[];
  slug: string;
  name: string;
  genres: genres[];
  description_raw: string;
  released: string;
  background_image: string;
  rating: number;
};
