import React from 'react';
import ReactDOM from 'react-dom/client';
import HeaderComponent from './components/Header';
import BodyComponent from './components/Body';

/**
 * Header
 * - Logo
 * - Menus -> Home, About, Cart
 * Body
 * - search 
 * - restaurant tile cards
 * Footer
 * - copyright, links, disclaimer 
 */

/**Build App Component*/
const AppComponent = () =>{
    return (
    <div className='appLayout'>
        <HeaderComponent/>
        <BodyComponent/>
    </div>
    )}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<AppComponent/>);