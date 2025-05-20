import styled from "styled-components";
import pocketBall from "../assets/pocketBall.png";
import Card from "./Card";

function Dex() {
  const displayCount = 10;
  const idList = Array.from({ length: displayCount }, (_, i) => i + 1);

  return (
    <>
      <TopBoxWrapper>
        <h2>나만의 포켓몬</h2>
        <PocketBallPlaceHolder>
          <PocketBall />
          <PocketBall />
          <PocketBall />
          <PocketBall />
          <PocketBall />
          <PocketBall />
        </PocketBallPlaceHolder>
      </TopBoxWrapper>
      <BottomBoxWrapper>
        <CardPlaceHolder>
          {idList.map((i) => {
            return <Card key={i} id={i} />;
          })}
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
  justify-content: space-around;
  flex-wrap: wrap;
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
