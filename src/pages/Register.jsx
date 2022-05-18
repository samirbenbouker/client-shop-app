import { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import axios from "axios";
import { publicRequest } from "../requestMethods";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://logodownload.org/wp-content/uploads/2019/08/funko-logo.png")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: #0a192f;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  color: #ccd6f6
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const InputPassword = styled.input`
  -webkit-text-security: disc;
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
  color: #ccd6f6
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #3fa093;
  color: white;
  cursor: pointer;
  margin-right: 10px;
`;

const Error = styled.span`
  color: red;
  margin-top: 10px;
`;

const Register = () => {
  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [email, setEmail] = useState("")

  const [error, setError] = useState("")

  const history = useHistory()

  const handleCreateUser = async (e) => {
    e.preventDefault();
    if((name.length < 1) || (lastName.length < 1) || (username.length < 1) || (password.length < 1) || (confirmPassword.length < 1) || (email.length < 1)) {
      setError("HAY QUE LLENAR TODOS LOS CAMPOS")
    } else if(password !== confirmPassword) {
      setError("LA CONTRASEÑA Y LA CONFIRMACIÓN DE LA CONTRASEÑA TIENEN QUE SER IGUALES ")
    } else {
      try {
        const res = await publicRequest.post(
          "/auth/register",
          {
            username: username,
            email: email,
            password: password
          }
        )
        history.push("/")
      } catch (error) {
        setError("ERROR AL CREAR EL USUARIO")
      }
    }
  }

  return (
    <Container>
      <Wrapper>
        <Title>CREA UNA CUENTA</Title>
        <Form>
          <Input placeholder="nombre" onChange={(e) => setName(e.target.value)}/>
          <Input placeholder="apellido" onChange={(e) => setLastName(e.target.value)}/>
          <Input placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
          <Input placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
          <InputPassword placeholder="contraseña" onChange={(e) => setPassword(e.target.value)}/>
          <InputPassword placeholder="confirma contraseña" onChange={(e) => setConfirmPassword(e.target.value)}/>
          <Agreement>
            Al crear una cuenta, doy mi consentimiento para el procesamiento de mis datos personales.
            datos de acuerdo con el <b>POLITICA PRIVADA</b>
          </Agreement>
          <div style={{width: "100%"}}>
            <Button onClick={handleCreateUser}>CREAR</Button>
            <Button onClick={() => history.push("/")}>VOLVER</Button>
          </div>

        </Form>
        {error && <Error>{error}</Error>}
      </Wrapper>
    </Container>
  );
};

export default Register;
