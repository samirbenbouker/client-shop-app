import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "20vh" })}

`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
    color: #3fa093;
    background-color: #0a192f;
    border-radius: 5px 5px 5px 5px;
    margin-bottom: 20px;
    opacity: 80%;
`;

const Button = styled.button`
    border:none;
    padding: 10px;
    background-color: #0a192f;
    color:#3fa093;
    cursor: pointer;
    border-radius: 5px 5px 5px 5px;
    font-weight: 600;
    opacity: 80%;
`;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Link to={`/products/${item.cat}`}>
        <Image src={item.img} />
        <Info>
          <Title>{item.title}</Title>
          <Button>COMPRAR AHORA</Button>
        </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;
