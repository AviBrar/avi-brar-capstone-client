import './Loginpage.scss'
import {useNavigate, Link} from 'react-router-dom';


export default function Loginpage(){

    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate("/")
    }

    return(
        <>
            <div className='login-page'>
                <div className='login-page__user'>
                    <label htmlFor='userName'>UserName:</label>
                    <input type="text" name='userName' id='userName' placeholder='Enter Username' className='login-page__user-input'/>
                </div>
                <div className='login-page__pass'>
                    <label htmlFor='password'>Password:</label>
                    <input type='password' name='password' id='password' placeholder='Enter Password' className='login-page__pass-input'/>
                </div>
                <button onClick={handleSubmit}>
                    Login
                </button>
            </div>
        </>
    )
}