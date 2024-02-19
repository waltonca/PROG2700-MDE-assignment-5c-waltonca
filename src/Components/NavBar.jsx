import { Link } from 'react-router-dom';
import './App.css';

const NavBar = () => {
 return (
    <>
        <h1>React-based Three-in-a-Row Game</h1>
        <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/sample">Sample Game</Link></li>
            <li><Link to="/random">Random Game</Link></li>
        </ul>
        </nav>
    </>
 );
};

export default NavBar;