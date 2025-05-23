import styled from "styled-components";
import pocketBall from "../assets/pocketBall.png";
import Card from "./Card";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { myListKey, myListMaxKey } from "../shared/storageManager";
import { useSelector, useDispatch } from "react-redux";
import {
  addToMyList,
  removeFromMyList,
  setMyList,
  setMyListMax,
} from "../store/configs";

function Dex() {
  const dispatch = useDispatch();
  const { myList, idList, myListMax } = useSelector((state) => state.idList);

  const addButtonHandler = (id) => {
    if (myList.length >= myListMax) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `You can add up to ${myListMax} pokemons`,
      });
      return;
    }

    dispatch(addToMyList(id));
    localStorage.setItem(myListKey, JSON.stringify([...myList, id]));
  };

  const removeButtonHandler = (id) => {
    dispatch(removeFromMyList(id));
    const newList = myList.filter((v) => v !== id);
    localStorage.setItem(myListKey, JSON.stringify(newList));
  };

  useEffect(() => {
    localStorage.setItem(myListKey, JSON.stringify(myList));
  }, [myList]);

  useEffect(() => {
    localStorage.setItem(myListMaxKey, JSON.stringify(myListMax));
  }, [myListMax]);

  return (
    <>
      <TopBoxWrapper>
        <h2>My Pokemons</h2>
        <PocketBallPlaceHolder>
          {myList.map((i) => (
            <Card
              key={i}
              id={i}
              buttonHandler={removeButtonHandler}
              type={"Remove"}
            />
          ))}
          {Array.from(
            { length: myListMax - myList.length },
            (_, i) => i + 1
          ).map((i) => (
            <PocketBall key={i} />
          ))}
        </PocketBallPlaceHolder>
      </TopBoxWrapper>
      <BottomBoxWrapper>
        <CardPlaceHolder>
          {idList.map((i) => (
            <Card
              key={i}
              id={i}
              buttonHandler={addButtonHandler}
              type={"Add"}
            />
          ))}
        </CardPlaceHolder>
      </BottomBoxWrapper>
    </>
  );
}

const CardPlaceHolder = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  row-gap: 20px;
  margin: 20px;
`;

const PocketBallPlaceHolder = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  padding: 15px;
`;

const PocketBall = styled.div`
  width: 100px;
  height: 100px;
  border: 2px dashed #cccccc;
  border-radius: 10px;
  margin: 20px;
  background-image: url(${pocketBall});
  background-position: center;
  background-size: 50px;
  background-repeat: no-repeat;
`;

const TopBoxWrapper = styled.div`
  margin: 20px;
  border-radius: 10px;
  background-color: white;
  color: #c50000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BottomBoxWrapper = styled.div`
  display: inline-block;
  margin: 20px;
  background-color: rgb(240, 240, 240);
  border-radius: 10px;
`;

export default Dex;
