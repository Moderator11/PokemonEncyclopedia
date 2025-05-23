import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchPokemon, fetchPokemonSpecies } from "../apis/pokemon";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { addToMyList, removeFromMyList } from "../store/configs"; // adjust path if needed

function Detail() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { myList, myListMax } = useSelector((state) => state.idList);

  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [isError, setIsError] = useState(false);

  const id = parseInt(params.id);

  useEffect(() => {
    const loadPokemonInfo = async () => {
      const p = await fetchPokemon(params.id, true);
      const s = await fetchPokemonSpecies(params.id);
      if (p && s) {
        setPokemon(p);
        setSpecies(s);
      } else {
        setIsError(true);
      }
    };
    loadPokemonInfo();
  }, [params.id]);

  const isInMyList = myList.includes(id);

  const toggleAdd = () => {
    if (isInMyList) {
      dispatch(removeFromMyList(id));
    } else {
      if (myList.length >= myListMax) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `You can add up to ${myListMax} pokemons`,
        });
        return;
      }
      dispatch(addToMyList(id));
    }
  };

  const playCry = () => {
    if (pokemon?.cries?.latest) {
      const audio = new Audio(pokemon.cries.latest);
      audio.play();
    }
  };

  const englishEntry = species?.flavor_text_entries.find(
    (entry) => entry.language.name === "en"
  );

  return (
    <ContentWrapper>
      <DetailWrapper>
        {isError ? (
          <p>Cannot load detail</p>
        ) : (
          <>
            <DetailImage
              src={pokemon?.sprites.front_default}
              alt={`${pokemon?.name} sprite`}
            />
            <PokemonName>{pokemon?.name}</PokemonName>
            <p>Height: {pokemon?.height}</p>
            <p>Weight: {pokemon?.weight}</p>
            <p>Type: {pokemon?.types[0].type.name}</p>
            <h3>{englishEntry?.flavor_text}</h3>
            <Button onClick={playCry}>Play Cry 🔊</Button>
            <Button onClick={toggleAdd}>{isInMyList ? "Remove" : "Add"}</Button>
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
