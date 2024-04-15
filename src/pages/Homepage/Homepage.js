import Leagues from "../../components/Leagues/Leagues";
import "./Homepage.scss";
import Header from "../../components/Header/Header";
import Nav from "../../components/Nav/Nav";

export default function Homepage() {
  return (
    <>
        <Header />
        <Nav />
      <main>
        <Leagues />
      </main>
    </>
  );
}
