import "./Header.scss";

export default function Header() {
    return(
        <>
            <div className="header">
                <div className="header__sidebar">
                    <ul>
                        <li>Home</li>
                        <li>Teams</li>
                        <li>Leagues</li>
                        <li>Players</li>
                        <li>Settings</li>
                    </ul>
                </div>
                <div className="header__title">
                    <h1>League Maestro</h1>
                </div>
                <div className="header__profile">
                    <button>Login/Register</button>
                </div>
            </div>
        </>
    )
}