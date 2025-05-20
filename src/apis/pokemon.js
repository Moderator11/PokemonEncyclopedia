const POKEMON_API_URL = "https://pokeapi.co";

export async function fetchPokemonList(limit, offset) {
  try {
    const response = await fetch(
      `${POKEMON_API_URL}/api/v2/evolution-chain?&limit=${limit}&offset=${offset}`
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchPokemon(id, detail = false) {
  try {
    const response = await fetch(`${POKEMON_API_URL}/api/v2/pokemon/${id}`);
    const json = await response.json();
    const pokemon = {
      id: json.id,
      name: json.name,
      sprite: json.sprites.front_default,
    };
    return detail ? json : pokemon;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchPokemonSpecies(id) {
  try {
    const response = await fetch(
      `${POKEMON_API_URL}/api/v2/pokemon-species/${id}`
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
    return null;
  }
}
