import { useState } from "react";
import Header from "./header/Header";
import "./navbar.css"
function Navbar({logo}) {

    const [isOpen, setIsOpen] = useState(false);

    const openSidebar = () => {
        setIsOpen(true);
    };

    const closeSidebar = () => {
        setIsOpen(false);
    };

    return (
        <>
        <Header logo={logo} />
        </>
    )
}

export default Navbar;