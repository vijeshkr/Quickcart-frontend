import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import { Login } from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import SignUp from '../pages/SignUp';
import { AdminPanel } from '../pages/AdminPanel';
import AllUsers from '../pages/AllUsers';
import AllProducts from '../pages/AllProducts';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import SearchProduct from '../pages/SearchProduct';
import CategoryProduct from '../pages/CategoryProduct';

const router = createBrowserRouter([
    {
        path :'/',
        element : <App/>,
        children : [
            {
                path:'',
                element : <Home/>

            },
            {
                path : 'login',
                element : <Login/>
            },
            {
                path : 'forgot-password',
                element : <ForgotPassword/>
            },
            {
                path : 'sign-up',
                element : <SignUp/>
            },
            {
                path : 'product/:id',
                element : <ProductDetails/>
            },
            {
                path : 'admin',
                element : <AdminPanel/>,
                children : [
                    {
                        path: '',
                        element: <AllUsers/>
                    },
                    {
                        path: 'all-products',
                        element: <AllProducts/>
                    },
                ]
            },
            {
                path : 'cart',
                element : <Cart/>
            },
            {
                path : 'search',
                element : <SearchProduct/>
            },
            {
                path : "product-category",
                element : <CategoryProduct/>
            },
            
        ]
    }
])

export default router;