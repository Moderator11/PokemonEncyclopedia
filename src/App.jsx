import styled from "styled-components";
import Router from "./shared/Router";

function App() {
  return (
    <BackgroundWrapper>
      <Router />
    </BackgroundWrapper>
  );
}

const BackgroundWrapper = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  background-color: #ffdfad;
  display: inline-block;
`;

export default App;
