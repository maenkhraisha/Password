import useLogout from "../hooks/useLogout"
import logo from  '../assets/img/logo512.png';
import {Link} from "react-router-dom";

function Nav() {
    const logout = useLogout();
  return (
    <nav className="nav">
        <img className='logo' src={logo} alt="" srcSet="" />
        <ul>          
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/passwords">Passwords</Link>
        </ul>
        <button onClick={logout}>logout</button>
    </nav>
  )
}

export default Nav