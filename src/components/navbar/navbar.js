import logo from './logo-1.png';
import { Link } from "react-router-dom"
import { useRef, useState } from 'react'
import './navbar.css'
function Navbar() {
    let navRef = useRef()
    let [show, setShow] = useState(false)

    const handleLink = () => {
            navRef.current.classList.add("close-list")
            navRef.current.classList.remove("open-list")
            setShow(!show)
    }
    const handleOpenClose = () => {
        if (!show) {
            navRef.current.classList.add("open-list")
            navRef.current.classList.remove("close-list")
            setShow(!show)
        } else {
            navRef.current.classList.add("close-list")
            navRef.current.classList.remove("open-list")
            setShow(!show)
        }
    }
    return (
        <>
            <nav id="nav" className="navbar navbar-expand-lg navbar-light">
                <Link className="navbar-brand" to="../home">
                    <img className="nav-logo" src={logo} alt="logo"></img>
                </Link>
                <button onClick={handleOpenClose} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-item nav-link" to="../home">Home</Link>
                        <Link className="nav-item nav-link" to="../menu">Menu</Link>
                        <Link className="nav-item nav-link" to="../aboutus">About Us</Link>
                        <Link className="nav-item nav-link" to="../contactus">Contact Us</Link>
                        <Link className="nav-item nav-link" to="../cart">Cart</Link>

                    </div>
                </div>
            </nav>
            <div ref={navRef} className="navbar-nav close-list extra-list">
                <Link onClick={handleLink} className="nav-item nav-link" to="../home">Home</Link>
                <Link onClick={handleLink} className="nav-item nav-link" to="../menu">Menu</Link>
                <Link onClick={handleLink} className="nav-item nav-link" to="../aboutus">About Us</Link>
                <Link onClick={handleLink} className="nav-item nav-link" to="../contactus">Contact Us</Link>
                <Link onClick={handleLink} className="nav-item nav-link" to="../cart">Cart</Link>
            </div>
        </>
    )
}

export default Navbar