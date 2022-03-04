import React from "react";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import Input from "./Input";
const Sidebar = () => {
  function signup(event) {
    event.preventDefault();
    console.log(event.target.elements);
    const data = {
      name: event.target.elements.name.value,
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
      passwordConfirm: event.target.elements.passwordConfirm.value,
    };
    fetch("http://localhost:4000/signup", {
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
        if (d.success) window.location.href = " http://localhost:3000/";
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
      <Form onSubmit={signup}>
        <h3>Sign Up</h3>
        <Input type="text" placeholder="Full Name" name="name" />
        <Input type="email" placeholder="Email" name="email" />
        <Input type="password" placeholder="Password" name="password" />
        <Input
          type="password"
          placeholder="Confirm Password"
          name="passwordConfirm"
        />
        <button>Sign Up</button>
      </Form>
      <div>
        <Terms>
          By signing up, I agree to the Privacy Policy <br />
          and Terms of Service
        </Terms>
        <h4>
          Already have an account?{" "}
          <a href="/Login">
            <span>Sign in</span>
          </a>
        </h4>
      </div>
    </Container>
  );
};

const Container = styled.div`
  min-width: 450px;
  /* backdrop-filter: blur(1px); */
  background-color: rgb(255, 255, 255);
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

const Form = styled.form`
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
`;

const Terms = styled.p`
  padding: 0 1rem;
  text-align: center;
  font-size: 10px;
  color: #808080;
  font-weight: 300;
`;
export default Sidebar;
