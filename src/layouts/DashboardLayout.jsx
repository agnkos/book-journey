import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import MenuBottom from "../components/MenuBottom";
import Menu from "../components/Menu";

const DashboardLayout = () => {
    const [toggle, setToggle] = useState(false)

    const toggleMenu = () => {
        setToggle(!toggle)
    }

    const closeMenu = () => {
        setToggle(false)
    }

    return (
        <div className="min-h-screen max-h-screen flex flex-col justify-between">
            <Navbar toggleMenu={toggleMenu} toggle={toggle} />
            <div className="overflow-y-auto mt-14 mb-14 flex flex-col grow">
                <Menu closeMenu={closeMenu} toggle={toggle} />
                <Outlet />
            </div>
            <MenuBottom />
        </div>
    )
}
export default DashboardLayout