import {LOGO_URL} from './../utils/constant';
import {useState} from 'react';

const HeaderComponent = () =>{
    let [btnName, setBtnName] = useState('Login');
    return (
        <div className='headerLayout'>
            <img width="8%" height="8%" src={LOGO_URL}></img>
            <div className='navbar'>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Support</li>
                    <li>Cart</li>
                    <button className="login" onClick={()=>{
                        btnName == 'Login' ? setBtnName('Logout') : setBtnName('Login');
                        console.log('btn>>', btnName)
                    }}>{btnName}</button>
                </ul>
            </div>
        </div>
    )
}

export default HeaderComponent