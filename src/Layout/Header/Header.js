import { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { authorContext } from '../../AuthContext/AuthContext';
import './Header.css';
import logo from '../../Images/logo-3.png';
const Header = () => {
    const {user} = useContext(authorContext);
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="dark" fixed="top">
                <Container>
                    <Navbar.Brand href="#home">
                        <Link to="/"><img className="logo-img" src={logo}/></Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="justify-content-end" style={{width:"100%"}}>
                            <Nav.Link href="#features">{user}</Nav.Link>
                            <Nav.Link href="#pricing"><Link className="navlink" to="/">Home</Link></Nav.Link>
                            <Nav.Link href="#pricing"><Link className="navlink" to="/list">List</Link></Nav.Link>
                            
                        </Nav>
                        
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header;