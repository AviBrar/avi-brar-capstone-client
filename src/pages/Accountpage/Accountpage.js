import Account from '../../components/Account/Account';
import './Accountpage.scss';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';

export default function Accountpage(){
    return(
        <>
        <Header />
        <Nav />
      <main>
        <Account />
      </main>
    </>
    )
}