import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchPokemon, fetchPokemonSpecies } from "../apis/pokemon";
import { myListKey, myListMaxKey } from "../shared/storageManager";
import Swal from "sweetalert2";

function Detail() {
  const navigate = useNavigate();
  const params = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const loadPokemonInfo = async () => {
      let pokemon = await fetchPokemon(params.id, true);
      let species = await fetchPokemonSpecies(params.id);
      if (pokemon && species) {
        setPokemon(pokemon);
        setSpecies(species);
      } else {
        setIsError(true);
      }
    };
    loadPokemonInfo();
  }, []);

  const playCry = () => {
    if (pokemon?.cries?.latest) {
      const audio = new Audio(pokemon.cries.latest);
      audio.play();
    }
  };

  const englishEntry = species?.flavor_text_entries.find(
    (entry) => entry.language.name === "en"
  );

  const [isAdd, setIsAdd] = useState(true);

  const toggleAdd = () => {
    const importedList = localStorage.getItem(myListKey);
    const importedMax = localStorage.getItem(myListMaxKey);
    const list = JSON.parse(importedList);
    const max = parseInt(JSON.parse(importedMax) ?? "6");
    if (importedList) {
      if (list.includes(parseInt(params.id))) {
        localStorage.setItem(
          myListKey,
          JSON.stringify(
            list.filter((v) => {
              return v !== parseInt(params.id);
            })
          )
        );
        setIsAdd((v) => !v);
      } else {
        if (list.length >= max) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `You can add up to ${max} pokemons`,
          });
          return;
        }
        localStorage.setItem(
          myListKey,
          JSON.stringify([...list, parseInt(params.id)])
        );
        setIsAdd((v) => !v);
      }
    } else {
      localStorage.setItem(myListKey, JSON.stringify([parseInt(params.id)]));
      setIsAdd((v) => !v);
    }
  };

  useEffect(() => {
    const importedList = localStorage.getItem(myListKey);
    if (importedList) {
      let list = JSON.parse(importedList);
      if (list.includes(parseInt(params.id))) {
        setIsAdd(false);
      } else {
        setIsAdd(true);
      }
    } else {
      setIsAdd(true);
    }
  }, []);

  return (
    <ContentWrapper>
      <DetailWrapper>
        {isError ? (
          <p>Cannot load detail</p>
        ) : (
          <>
            <DetailImage
              src={pokemon?.sprites.front_default}
              alt={`${name} sprite`}
            />
            <PokemonName>{pokemon?.name}</PokemonName>
            <p>Height: {pokemon?.height}</p>
            <p>Weight: {pokemon?.weight}</p>
            <p>Type: {pokemon?.types[0].type.name}</p>
            <h3>{englishEntry?.flavor_text}</h3>
            <Button onClick={playCry}>Play Cry 🔊</Button>
            <Button onClick={toggleAdd}>{isAdd ? "Add" : "Remove"}</Button>
          </>
        )}
        <Button onClick={() => navigate("/dex")}>
          <h4>Go back to main</h4>
        </Button>
      </DetailWrapper>
    </ContentWrapper>
  );
}

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
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
  border: none;
`;

const ContentWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Detail;
