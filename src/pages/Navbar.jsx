import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const Navbar = ({ openNavbar, setOpenNavber }) => {
  return (
    <NavbarContainer openNavbar={openNavbar}>
      <NavbarInnerContainer>
        <LeftContainer>
          <LogoWrapper>
            {/* <img src={logo} alt="" /> */}
            <h3>
              Project <span>Management</span>
            </h3>
          </LogoWrapper>
          <NavbarLinkContainer>
            <NavbarLink to="/">Home</NavbarLink>
            <NavbarLink to="/">Contact</NavbarLink>
            <NavbarLink to="/">About</NavbarLink>
          </NavbarLinkContainer>
        </LeftContainer>
        <RightContainer>
          <NavbarLink to="/Login">Log in</NavbarLink>
          <Button>
            <NavbarLink to="/SignUp">Get Started</NavbarLink>
          </Button>
          <LinksButton
            onClick={() => {
              setOpenNavber(!openNavbar);
            }}
          >
            {openNavbar ? <> &#10005;</> : <> &#8801;</>}
          </LinksButton>
        </RightContainer>
      </NavbarInnerContainer>
      {openNavbar && (
        <NavbarExtendedContainer>
          <NavbarLinkExtended to="/">Home</NavbarLinkExtended>
          <NavbarLinkExtended to="/">Contact</NavbarLinkExtended>
          <NavbarLinkExtended to="/">About</NavbarLinkExtended>
          <NavbarLinkExtended to="/Login">Log in</NavbarLinkExtended>
          <ButtonExtended>
            <NavbarLinkExtended to="/SignUp">Get Started</NavbarLinkExtended>
          </ButtonExtended>
        </NavbarExtendedContainer>
      )}
    </NavbarContainer>
  );
};

const NavbarContainer = styled.nav`
  width: 100%;
  height: ${(props) => (props.openNavbar ? "100vh" : "70px")};
  background-color: white;

  display: flex;
  flex-direction: column;

  @media (min-width: 900px) {
    height: 70px;
  }
`;

const LeftContainer = styled.div`
  flex: 70%;
  display: flex;
  align-items: center;
  column-gap: 50px;
  padding-left: 35px;
`;
const RightContainer = styled.div`
  flex: 30%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  column-gap: 45px;
  padding-right: 35px;
`;

const NavbarInnerContainer = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
`;

const NavbarLink = styled(Link)`
  color: black;
  font-size: large;
  text-decoration: none;
  margin: 10px;
  @media (max-width: 900px) {
    display: none;
  }
`;
const NavbarLinkExtended = styled(Link)`
  color: black;
  font-size: 22px;
  text-decoration: none;
  margin: 10px;
  font-weight: 300;
`;
const NavbarExtendedContainer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 30px;

  @media (min-width: 900px) {
    display: none;
  }
`;

const NavbarLinkContainer = styled.div`
  display: flex;
  column-gap: 30px;
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

const Button = styled.button`
  width: 150px;
  height: 40px;
  border: none;
  margin: 1rem 0;
  box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  background-color: #70edb9;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease-in;

  &:hover {
    /* transform: translateY(-3px); */
  }
  @media (max-width: 900px) {
    display: none;
  }
`;

const ButtonExtended = styled.button`
  width: 150px;
  height: 50px;
  border: none;
  margin: 1rem 0;
  box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  background-color: #70edb9;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease-in;

  &:hover {
    /* transform: translateY(-3px); */
  }
  @media (min-width: 900px) {
    display: none;
  }
`;

const LinksButton = styled.button`
  width: 70px;
  height: 50px;
  background: none;
  border: none;
  color: black;
  font-size: 45px;
  cursor: pointer;

  @media (min-width: 900px) {
    display: none;
  }
`;

export default Navbar;
