import { Add, Remove } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { Fragment, useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { deleteProduct, editProduct, emptyCart } from "../redux/cartRedux";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton, Snackbar } from "@material-ui/core";
import { Alert } from "@mui/material";

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div`
  
`;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  color: #3fa093;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  color: #3fa093;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
  color: #3fa093;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  color: #3fa093;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const ButtonCart = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #0a192f;
  color: #3fa093;
  font-weight: 600;
`;

const ButtonDeleteProduct = styled.button`
    width: 50%;
    padding: 10px;
    background-color: #0a192f;
    color: #3fa093;
    font-weight: 600;
    margin-top: 5px;
`
const Error = styled.span`
  color: red;
  margin-top: 10px;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false);

  const [email, setEmail] = useState("")
  const [authTarget, setAuthTarget] = useState("")
  const [numTarget, setNumTarget] = useState("")
  const [cvv, setCvv] = useState("")
  const [direction, setDirection] = useState("")

  const [error, setError] = useState("")

  const [openSB, setOpenSB] = useState(false)

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 500,
        });
        history.push("/success", {
          stripeData: res.data,
          products: cart, });
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, history]);

  const handleEmptyCart = () => {
    dispatch(
      emptyCart()
    )
  }

  const handleDeleteProduct = (product) => {
    dispatch(
      deleteProduct({product: product})
    )
  }

  const handleEditProduct = (edit, product) => {
    dispatch(
      editProduct({edit: edit, product: product})
    )
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSB = () => {

  }

  const action = (
    <Fragment>
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
        >
            {/* <CloseIcon fontSize="small" /> */}
        </IconButton>
    </Fragment>
  );

  const handleCheckout = () => {
    if((email.length < 1) || (authTarget.length < 1) || (numTarget.length < 1) || (cvv.length < 1) || (direction.length < 1)) {
      setError("RELLENAR TODOS LOS CAMPOS PARA FINALIZAR LA COMPRA")
    } else if(cvv.length !== 3 || numTarget.length !== 16 || isNaN(cvv) || isNaN(numTarget)) {
      setError("COMPRUEBA QUE EL CVV Y EL NUMERO DE LA TARGETA ESTEN BIEN")
    } else {
      handleEmptyCart()
      setOpenSB(true)
      setOpen(false)
    }
  }

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>TU CARRITO</Title>
        <Top>
          <Link to="/">
            <TopButton>CONTINUAR COMPRANDO</TopButton>
          </Link>
          <TopTexts>
            <TopText>Tu mochilla({cart.quantity})</TopText>
            {/* <TopText>Your Wishlist (0)</TopText> */}
          </TopTexts>
          <TopButton onClick={handleEmptyCart}>Vaciar carrito</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <Product>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Producto:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>Id Producto:</b> {product._id}
                    </ProductId>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    {/* <button 
                      style={{background: "none", color: "inherit", border: "none", padding: 0, font: "inherit", cursor: "pointer", outline: "inherit" }}
                      onClick={() => handleEditProduct("asc", product)}    
                    > */}
                      <Add />
                    {/* </button> */}
                    <ProductAmount>{product.quantity}</ProductAmount>
                    {/* <button 
                      style={{background: "none", color: "inherit", border: "none", padding: 0, font: "inherit", cursor: "pointer", outline: "inherit" }}
                      onClick={() => handleEditProduct("desc", product)}  
                    > */}
                      <Remove />
                    {/* </button> */}
                  </ProductAmountContainer>
                  <ProductPrice>
                   {product.price * product.quantity}€
                  </ProductPrice>
                  <ButtonDeleteProduct onClick={() => handleDeleteProduct(product)}>ELIMINAR PRODUCTO</ButtonDeleteProduct>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>TOTAL</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>{cart.total}€</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Gastos de envio</SummaryItemText>
              <SummaryItemPrice>5.90€</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText> {cart.total > 50 && "Descuento"}</SummaryItemText>
              <SummaryItemPrice> {cart.total > 50 && "-5.90€"}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>{cart.total > 50 ? cart.total-5.90 : cart.total}€</SummaryItemPrice>
            </SummaryItem>
            <ButtonCart onClick={() => setOpen(true)}>FINALIZAR COMPRA</ButtonCart>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>COMPRAR</DialogTitle>
              <DialogContent>
                <TextField
                  margin="dense"
                  id="email"
                  label="Correo Electronico"
                  type="email"
                  fullWidth
                  variant="standard"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  margin="dense"
                  id="authCreditCard"
                  label="Titular de la Tarjeta"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(e) => setAuthTarget(e.target.value)}
                />
                <div style={{display: "flex", justifyContent: "space-between"}}>
                  <TextField
                    margin="dense"
                    id="numTarget"
                    label="Numero de tarjeta"
                    type="text"
                    fullWidth
                    variant="standard"
                    sx={{marginRight: "10px"}}
                    onChange={(e) => setNumTarget(e.target.value)}
                  />
                  <TextField
                    margin="dense"
                    id="CVV"
                    label="CVV"
                    type="text"
                    fullWidth
                    variant="standard"
                    sx={{marginLeft: "10px"}}
                    onChange={(e) => setCvv(e.target.value)}
                  />
                </div>
                <TextField
                  margin="dense"
                  id="address"
                  label="Dirección"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(e) => setDirection(e.target.value)}
                />
                <TextField
                  margin="dense"
                  id="moreInfo"
                  label="Mas información"
                  type="text"
                  fullWidth
                  variant="standard"
                />
                {error && <Error>{error}</Error> }
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={handleCheckout}>Comprar</Button>
              </DialogActions>
            </Dialog>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
      <Snackbar
        open={openSB}
        autoHideDuration={2000}
        onClose={handleCloseSB}
        action={action}
      >
          <Alert onClose={handleCloseSB} severity="success" sx={{ width: '100%' }}>
            COMPRA REALIZADA CORRECTAMENTE
          </Alert>
      </Snackbar>
    </Container>
  );
};

export default Cart;
