import Navbar from '../Navbar Component/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer Component/Footer'

export default function Layout() {
  return (
    <>
    <Navbar />
    <Outlet />
    <Footer />
    </>
  )
}
