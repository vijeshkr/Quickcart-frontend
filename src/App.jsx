import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from "./context";


function App() {


  return (
    <>
        <UserProvider>
        <ToastContainer position="top-center" />
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
        </UserProvider>
    </>
  )
}

export default App
