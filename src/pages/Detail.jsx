import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchPokemon, fetchPokemonSpecies } from "../apis/pokemon";

function Detail() {
  const navigate = useNavigate();
  const params = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);

  useEffect(() => {
    const loadPokemonInfo = async () => {
      setPokemon(await fetchPokemon(params.id, true));
      setSpecies(await fetchPokemonSpecies(params.id));
    };
    loadPokemonInfo();
  }, []);

  return (
    <ContentWrapper>
      <DetailWrapper>
        <DetailImage
          src={pokemon?.sprites.front_default}
          alt={`${name} sprite`}
        />
        <PokemonName>{pokemon?.name}</PokemonName>
        <p>Height: {pokemon?.height}</p>
        <p>Weight: {pokemon?.weight}</p>
        <p>Type: {pokemon?.types[0].type.name}</p>
        <p>{species?.flavor_text_entries[0].flavor_text}</p>
        {pokemon && (
          <audio controls>
            <source src={pokemon?.cries.latest} type="audio/ogg" />
            Your browser does not support the audio tag.
          </audio>
        )}
      </DetailWrapper>
      <Button onClick={() => navigate("/dex")}>
        <h4>Go back to main</h4>
      </Button>
    </ContentWrapper>
  );
}

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const DetailImage = styled.img`
  height: 25vw;
`;

const PokemonName = styled.h1`
  color: red;
`;

const Button = styled.button`
  border-radius: 10px;
  padding: 10px;
  background-color: #c50000;
  color: white;
`;

const ContentWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Detail;
