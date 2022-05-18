import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logOut } from "../redux/userRedux";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
  background-color: #0a192f
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  color: #ccd6f6
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  color: #ccd6f6
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
  color: #ccd6f6
`;

const Logo = styled.h1`
  font-weight: bold;
  color: #3fa093;
  ${mobile({ fontSize: "24px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #ccd6f6;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  color: #ccd6f6;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const quantity = useSelector(state=>state.cart.quantity)
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = () => {
    dispatch(
      logOut()
    )
    history.push("/login")
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>ES</Language>
          {/* <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer> */}
        </Left>
        <Center>
          <Link to="/" style={{color:"black"}}>
            <button style={{background: "none", color: "inherit", border: "none", padding: 0, font: "inherit", cursor: "pointer", outline: "inherit" }}>
              <Logo>FUNKO</Logo>
            </button>
          </Link>
        </Center>
        <Right>
          {
            !user 
            ? <div style={{display: "flex"}}>
                <MenuItem>
                  <Link to="/register" style={{textDecoration: 'none', color: '#ccd6f6'}}>
                    REGISTRATE
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/login" style={{textDecoration: 'none', color: '#ccd6f6'}}>
                    SIGN IN
                  </Link>
                </MenuItem>
              </div>
            : <div>
                <MenuItem>
                  <button 
                    style={{background: "none", color: "inherit", border: "none", padding: 0, font: "inherit", cursor: "pointer", outline: "inherit" }}
                    onClick={handleLogout}  
                  >
                    LOGOUT
                  </button>
                </MenuItem>
            </div>
          }
          <Link to="/cart">
          <MenuItem>
            <Badge badgeContent={quantity} color="primary">
              <ShoppingCartOutlined style={{color: "#ccd6f6"}}/>
            </Badge>
          </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
