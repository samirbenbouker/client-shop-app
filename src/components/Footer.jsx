import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: white
`;

const Logo = styled.h1`
  margin-right: 5px;
  color: #3fa093;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
  background-color: white
`;

const Title = styled.h3`
  margin-bottom: 30px;
  color: #3fa093;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  color: #3fa093;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  color: #3fa093;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#0a192f" })}

`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  color: #3fa093;
`;

const Payment = styled.img`
    width: 50%;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <SocialContainer>
          <Logo>FUNKO</Logo>
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="E60023">
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Enlaces útiles</Title>
        <List>
          <ListItem>
            <Link to="/" style={{color: "black",textDecoration: 'none',color: "#3fa093"}}>
              Home
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/cart" style={{color: "black",textDecoration: 'none', color: "#3fa093"}}>
              Cart
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/products/DC" style={{color: "black",textDecoration: 'none', color: "#3fa093"}}>
              DC
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/products/DISNEY" style={{color: "black",textDecoration: 'none',color: "#3fa093"}}>
              Disney
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/products/ONEPIECE" style={{color: "black",textDecoration: 'none', color: "#3fa093"}}>
              One Piece
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/products/NBA" style={{color: "black",textDecoration: 'none', color: "#3fa093"}}>
              NBA
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/products/STARWARS" style={{color: "black",textDecoration: 'none', color: "#3fa093"}}>
              Star Wars
            </Link>
          </ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contactanos</Title>
        <ContactItem>
          <Room style={{marginRight:"10px"}}/> Plaza Catalunya, Barcelona, 75
        </ContactItem>
        <ContactItem>
          <Phone style={{marginRight:"10px"}}/> +34 909 767 534
        </ContactItem>
        <ContactItem>
          <MailOutline style={{marginRight:"10px"}} /> funko@gmail.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;
