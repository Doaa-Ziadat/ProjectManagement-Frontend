import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../pages/Navbar";
import Footer from "./Footer";
import HomeContent from "./HomeContent";
import Sidenav from "./Sidenav";
import AddProject from "./AddProject";
function Home(props) {
  const [openNavbar, setOpenNavber] = useState(false);
  const [cookies, setcookies] = useState([]);
  const [isLoggedIn, setisLoggedIn] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/getCookies", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setcookies(data);
      });
  }, []);
  return (
    <div>
      {cookies.loggedIn ? (
        <Container2>
          <Sidenav />
          <Page>
            <AddProject />
            <Content></Content>
          </Page>
        </Container2>
      ) : (
        <Container1>
          <Navbar openNavbar={openNavbar} setOpenNavber={setOpenNavber} />
          {!openNavbar && <HomeContent />}
          {/* <Footer />) */}
        </Container1>
      )}
    </div>
  );
}

const Page = styled.div`
  display: flex;
  flex-direction: row;
`;
const Content = styled.div``;

const Container2 = styled.div`
  display: flex;
`;
const Container1 = styled.div`
  background-color: #055b5c;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100vh;
`;

export default Home;
