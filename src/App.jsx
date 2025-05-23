import styled from "styled-components";
import Router from "./shared/Router";
import { useState } from "react";
import { IdListContext } from "./context/globalContexts";

function App() {
  const myListMax = 6;
  const displayCount = 50;
  const [idList, setIdList] = useState(
    Array.from({ length: displayCount }, (_, i) => i + 1)
  );
  const [myList, setMyList] = useState([]);
  return (
    <IdListContext.Provider
      value={{ myListMax, idList, setIdList, myList, setMyList }}
    >
      <BackgroundWrapper>
        <Router />
      </BackgroundWrapper>
    </IdListContext.Provider>
  );
}

const BackgroundWrapper = styled.div`
  min-height: 100%;
  min-width: 100%;
  background-color: #ffdfad;
  display: inline-block;
`;

export default App;
