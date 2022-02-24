import { useState } from "react";
import styled from "styled-components";
import bgImg from "../assets/bg.png";
import Main from "./Main";
import Sidebar from "./Sidebar";
function Signup(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function loginSubmit() {
    const data = { email: email, password: password };
    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((dataa) => {
        return dataa.json();
      })
      .then((d) => {
        console.log(d);
        if (d.success) window.location.href = " http://localhost:3000";
      });
  }

  const Container = styled.div`
    background: #eefcff;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  `;
  const Wrapper = styled.div`
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    display: flex;
  `;

  return (
    <Container>
      <Wrapper>
        <Sidebar />

        <Main />
      </Wrapper>
    </Container>
  );
}

export default Signup;
