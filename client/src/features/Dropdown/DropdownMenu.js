
import { useRef, useEffect } from "react";
import './Dropdown.css'

export const DropdownMenu = (props) => {


    const menuNode = useRef(null)


   
    useEffect(() => {

        const handleClick = (e) => {
           
            e.currentTarget.classList.toggle('dropdown-active')
            document.querySelectorAll('.dropdown-active').forEach(item => {
                if (e.currentTarget === item) return;
                item.classList.toggle('dropdown-active')
            });

        }

        const listenToDropdownClick = () => {

            if (!menuNode.current) return;

            menuNode.current.parentNode.addEventListener('click', handleClick)
        }
        listenToDropdownClick();

        return () => {
            menuNode.current?.parentNode.removeEventListener('click', handleClick)

        }
    }, [menuNode])


    return (

        <div ref={menuNode} className="menu"

        // style={
        //     isOpen ? 
        //     {opacity: "1", pointerEvents: "auto", transform: "translateY(0)"} 
        //     :
        //      {opacity: "0", pointerEvents: "none", transform: "translateY(-.25rem)"}
        // }
        >

            {props.children}
        </div>
    )
} 