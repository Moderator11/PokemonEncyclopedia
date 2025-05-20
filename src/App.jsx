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
  min-height: 100%;
  min-width: 100%;
  background-color: #ffdfad;
  display: inline-block;
`;

export default App;
