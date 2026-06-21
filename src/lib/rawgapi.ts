const apiKey = process.env.API_KEY;

export async function getPopularGames() {
  const currentYear = new Date().getFullYear();

  const url = `https://api.rawg.io/api/games?key=${apiKey}&dates=${currentYear}-01-01,${currentYear}-12-31&ordering=-added&page_size=24`;

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

export async function getGame(query: string) {
  const url = `https://api.rawg.io/api/games?key=${apiKey}&search=${query}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Erro na busca do jogo: ${response.status} ${response.statusText}`,
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
