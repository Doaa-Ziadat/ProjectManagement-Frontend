import React, { useState } from "react";
import styled from "styled-components";
import { ReactSession } from "react-client-session";

const Sidebar2 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function loginSubmit() {
    const data = { email: email, password: password };
    fetch(`${process.env.REACT_APP_API_URL}/login`, {
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
        // server has sent email&id
        ReactSession.set("userInfo", { email: d.email, id: d.id });
        if (d.success) window.location.href = " http://localhost:3000";
      });
  }

  return (
    <Container>
      <LogoWrapper>
        {/* <img src={logo} alt="" /> */}
        <h3>
          Project <span>Management</span>
        </h3>
      </LogoWrapper>
      <Form>
        <h3>Sign In</h3>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          id="email"
          placeholder="Enter Email"
          required
        />
        {/* <Status /> */}

        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <Status /> */}
        <button onClick={loginSubmit}>Log in</button>
      </Form>
      <div>
        {/* <Terms>
          By signing up, I agree to the Privacy Policy <br />
          and Terms of Service
        </Terms> */}
        <h4>
          Don't have an account?{" "}
          <a href="/Signup">
            <span>Sign up </span>
          </a>
        </h4>
      </div>
    </Container>
  );
};

const Container = styled.div`
  min-width: 450px;
  /* backdrop-filter: blur(35px); */
  background-color: rgba(255, 255, 255);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 0 2rem;

  @media (max-width: 900px) {
    width: 100vw;
    position: absolute;
    padding: 0;
  }

  h4 {
    color: #808080;
    font-weight: bold;
    font-size: 13px;
    margin-top: 2rem;
    span {
      color: #ff8d8d;
      cursor: pointer;
    }
  }
`;

const LogoWrapper = styled.div`
  img {
    height: 6rem;
  }
  h3 {
    text-align: center;
    color: #ff8d8d;
    font-size: 22px;
  }
  span {
    color: #5dc399;
    font-weight: 300;
    font-size: 18px;
  }
`;

const Form = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    color: #666666;
    margin-bottom: 2rem;
  }
  button {
    width: 75%;
    max-width: 350px;
    min-width: 250px;
    height: 40px;
    border: none;
    margin: 1rem 0;
    box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    background-color: #70edb9;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease-in;

    &:hover {
      transform: translateY(-3px);
    }
  }
  input {
    width: 80%;
    max-width: 350px;
    min-width: 250px;
    height: 40px;
    border: none;
    margin: 0.5rem 0;
    background-color: #f5f5f5;
    box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    padding: 0 1rem;
    transition: all 0.2s ease-in;

    &:hover {
      transform: translateY(-3px);
    }
  }
`;

const Status = styled.div`
  height: 10px;
  width: 10px;
  background-color: #9d9d9d;
  border-radius: 10px;
  margin-left: 1rem;

  input:focus + & {
    background: #ffa689;
  }
  input:invalid + & {
    background: #fe2f75;
  }
  input:valid + & {
    background: #70edb9;
  }
`;
const Terms = styled.p`
  padding: 0 1rem;
  text-align: center;
  font-size: 10px;
  color: #808080;
  font-weight: 300;
`;
export default Sidebar2;
