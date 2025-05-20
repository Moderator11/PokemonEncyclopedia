import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { fetchPokemon } from "../apis/pokemon";
import { useNavigate } from "react-router-dom";

function Card({ id }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [number, setNumber] = useState(0);
  const [sprite, setSprite] = useState("");

  useEffect(() => {
    const loadPokemonInfo = async () => {
      const pokemon = await fetchPokemon(id);
      setName(pokemon.name);
      setNumber(pokemon.id);
      setSprite(pokemon.sprite);
    };
    loadPokemonInfo();
  }, []);

  return (
    <CardWrapper
      onClick={() => {
        if (!number) return;
        navigate(`/detail/${number}`);
      }}
    >
      {!number ? (
        <Loader />
      ) : (
        <>
          <img src={sprite} alt={`${name} sprite`} />
          <h4>{name}</h4>
          <sub>No. {number}</sub>
          <Button
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Add
          </Button>
        </>
      )}
    </CardWrapper>
  );
}

const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  width: 48px;
  height: 48px;
  border: 5px solid #fff;
  border-bottom-color: #ff3d00;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${rotation} 1s linear infinite;
`;

const Button = styled.button`
  border: none;
  border-radius: 10px;
  background-color: #c50000;
  padding: 5px 20px 5px 20px;
  color: white;
  transition: all 0.25s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px gray solid;
  gap: 5px;
  padding: 10px;
  min-width: 125px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.35);
  transition: all 0.25s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 10px 10px -6px rgba(0, 0, 0, 0.3);
  }
`;

export default Card;
