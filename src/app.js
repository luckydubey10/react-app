import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import HeaderComponent from './components/Header';
import BodyComponent from './components/Body';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
// import AboutComponent from './components/About';
import ContactComponent from './components/Contact';
import ErrorComponent from './components/Error';
import RestaurantMenu from './components/RestaurantMenu';

const AboutComponent = lazy(()=> import('./components/About'))

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
        {/** */}
        <Outlet/>
    </div>
    )}

const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <AppComponent/>,
        errorElement: <ErrorComponent/>,
        children:[
            {
                path: '/',
                element: <BodyComponent/>
            },
            {
                path: 'about',
                element: <Suspense fallback={'Loading...'}><AboutComponent/></Suspense>
            },
            {
                path: 'contact',
                element: <ContactComponent/>
            },
            {
                path: 'restaurant/:resId',
                element: <RestaurantMenu/>
            }
        ]
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<RouterProvider router={appRouter}/>);
