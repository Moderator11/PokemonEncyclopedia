import { useNavigate } from "react-router-dom";
import pokemonLogo from "../assets/pokemonLogo.png";
import styled from "styled-components";

function Title() {
  const navigate = useNavigate();

  return (
    <ContentWrapper>
      <img src={pokemonLogo} alt="pokemonLogo" />
      <Button onClick={() => navigate("/dex")}>
        <h2>Start pokemon encyclopedia</h2>
      </Button>
    </ContentWrapper>
  );
}

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

export default Title;
