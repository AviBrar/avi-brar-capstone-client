import './Account.scss';

export default function Account(){
    return(
        <>
            <section className='account'>
                <div>
                    <h1>Account</h1>
                    <p>Username: Avi</p>
                    <p>Password: ***<button>change password</button></p>
                    <p>Account Type: Administrator</p>
                    <p>Next Payment: November 20, 2024</p>
                </div>
            </section>
        </>
    )
}