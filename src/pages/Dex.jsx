import styled from "styled-components";
import pocketBall from "../assets/pocketBall.png";
import Card from "./Card";
import { useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { myListKey, myListMaxKey } from "../shared/storageManager";
import { CardContext, IdListContext } from "../context/globalContexts";

function Dex() {
  const { myListMax, idList, setIdList, myList, setMyList } =
    useContext(IdListContext);

  const addButtonHandler = (id) => {
    if (myList.length >= myListMax) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `You can add up to ${myListMax} pokemons`,
      });
      return;
    }

    const newList = [...myList, id];
    localStorage.setItem(myListKey, JSON.stringify(newList));
    setMyList(newList);
    setIdList((list) =>
      list.filter((v) => {
        return v !== id;
      })
    );
  };

  const removeButtonHandler = (id) => {
    const newList = myList.filter((v) => {
      return v !== id;
    });
    localStorage.setItem(myListKey, JSON.stringify(newList));
    setMyList(newList);
    setIdList((list) => [...list, id].sort((a, b) => a - b));
  };

  useEffect(() => {
    localStorage.setItem(myListMaxKey, JSON.stringify(myListMax));
    const importedList = JSON.parse(localStorage.getItem(myListKey));
    if (importedList) {
      setMyList(importedList);
      setIdList((list) =>
        list.filter((v) => {
          let has = false;
          for (let i = 0; i < importedList.length; i++) {
            if (v === importedList[i]) {
              has = true;
              break;
            }
          }
          return !has;
        })
      );
    }
  }, []);

  return (
    <>
      <TopBoxWrapper>
        <h2>My Pokemons</h2>
        <PocketBallPlaceHolder>
          <CardContext.Provider
            value={{ buttonHandler: removeButtonHandler, type: "Remove" }}
          >
            {myList.map((i) => {
              return <Card key={i} id={i} />;
            })}
          </CardContext.Provider>
          {Array.from(
            { length: myListMax - myList.length },
            (_, i) => i + 1
          ).map((i) => {
            return <PocketBall key={i} />;
          })}
        </PocketBallPlaceHolder>
      </TopBoxWrapper>
      <BottomBoxWrapper>
        <CardPlaceHolder>
          <CardContext.Provider
            value={{ buttonHandler: addButtonHandler, type: "Add" }}
          >
            {idList.map((i) => {
              return <Card key={i} id={i} />;
            })}
          </CardContext.Provider>
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
