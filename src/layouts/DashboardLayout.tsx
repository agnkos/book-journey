import { Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import MenuBottom from "../components/MenuBottom";
import Menu from "../components/Menu";

const DashboardLayout = () => {
    const [toggle, setToggle] = useState(false)
    const menuRef = useRef<HTMLUListElement>(null)

    const toggleMenu = () => {
        setToggle(!toggle)
    }

    const closeMenu = () => {
        setToggle(false)
    }

    useEffect(() => {
        const closeOnClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLUListElement
            if (
                toggle &&
                menuRef.current &&
                !menuRef?.current?.contains(e.target as HTMLUListElement)
                &&
                !target?.classList.contains('burger-btn')
            ) {
                closeMenu()
            }
        }
        document.addEventListener('click', closeOnClickOutside);

        return () => {
            document.removeEventListener('click', closeOnClickOutside);
        };
    }, [toggle])

    return (
        <div className="min-h-screen max-h-screen flex flex-col justify-between">
            <Navbar toggleMenu={toggleMenu} toggle={toggle} />
            <div className="overflow-y-auto mt-14 mb-14 flex flex-col grow">
                <Menu
                    closeMenu={closeMenu}
                    toggle={toggle}
                    ref={menuRef} />
                <Outlet />
            </div>
            <MenuBottom />
        </div>
    )
}
export default DashboardLayout