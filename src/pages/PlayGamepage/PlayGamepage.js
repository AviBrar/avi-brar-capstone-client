import { useState } from "react";
import Header from "../../components/Header/Header";
import Nav from "../../components/Nav/Nav";
import "./PlayGamepage.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Game from "../../components/Game/Game";

export default function PlayGamepage() {
  return (
    <>
      <Header />
      <Nav />
      <main>
        <Game />
      </main>
    </>
  );
}
