import AddTeam from '../../components/AddTeam/AddTeam';
import './AddTeampage.scss';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';

export default function AddTeampage(){
    return(
        <>
        <Header />
        <Nav />
      <main>
        <AddTeam />
      </main>
    </>
    )
}