import {LOGO_URL} from './../utils/constant';
import {useState} from 'react';
import { Link } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus';

const HeaderComponent = () =>{
    let [btnName, setBtnName] = useState('Login');

    const onlineStatus = useOnlineStatus();

    return (
        <div className='headerLayout flex justify-between mb-5 shadow-lg items-center max-h-full bg-purple-100'>
            <div>
            <img className='w-1/6 max-h-full' src={LOGO_URL}></img>
            </div>
            <div className='w-5/6 max-h-full flex justify-end'>
                <ul className='flex flex-row gap-5 p-2 items-cente'>
                    <li>Online Status : {onlineStatus ? '🟢' : '🔴'}</li>
                    <li><Link to="/">Home </Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
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