export async function getPopularGames(page = 1, pageSize = 24) {
  const apiKey = process.env.API_KEY;

  const url = `https://api.rawg.io/api/games?key=${apiKey}&page=${page}&page_size=${pageSize}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Erro na requisição dos jogos populares: ${response.status} ${response.statusText}`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Falha ao buscar jogos populares", error);
  }
}

export async function getGameById(id: number) {
  const apiKey = process.env.API_KEY;
  const url = `https://api.rawg.io/api/games/${id}?key=${apiKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Erro na requisição do jogo por ID: ${response.status} ${response.statusText}`,
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
