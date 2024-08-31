import {Navbar, Nav, Container, Badge, NavDropdown} from 'react-bootstrap';
import logo from "../assets/react.svg";
import {FaShoppingCart,FaUser} from "react-icons/fa"
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {logout} from '../slices/authSlice';
import { useUserlogoutMutation } from '../slices/userApiSlice';
import {toast} from 'react-toastify';
import {LinkContainer} from 'react-router-bootstrap';

function Header(){
   const {cartItems} = useSelector(state => state.cart);
   const {userInfo} = useSelector(state => state.auth);
   const [userlogout,{isLoading}] = useUserlogoutMutation();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const LogoutHandler = async () => {
   try{
       let resp = await userlogout().unwrap();
         dispatch(logout());
         toast.success(resp.message);
         navigate('/signin');
      }
      catch (err){
        toast.error(err.data.error)
     }
   } 
  return(
  <header>
    <Navbar variant='dark' bg="dark" expand = "md" collapseOnSelect>
       <Container>
          <NavLink to="/" className="navbar-brand"><img src={logo} alt='logo'/> Broadway</NavLink>
          <Navbar.Toggle aria-controls='navbar'/>
          <Navbar.Collapse id="navbar">
             <Nav className='ms-auto'>
                <NavLink to="/Cart" className="nav-link">
                  <FaShoppingCart />
                     Cart {" "} 
                     {
                        cartItems.length > 0 && (
                        <Badge bg='success' pill>
                        {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                        </Badge> )
                     }
                  </NavLink>
                  {
                     !userInfo ? (<NavLink to= "/Signin" className="nav-link">
                        <FaUser />
                           Signin
                           </NavLink>) : (
                              <NavDropdown title = {userInfo.name}>
                                 <NavDropdown.Item onClick={() => {navigate("/profile")}}>Profile</NavDropdown.Item>
                                 <NavDropdown.Item onClick={LogoutHandler}>Logout</NavDropdown.Item>
                           </NavDropdown>
                           )}
                            
                            {
                              userInfo && userInfo.isAdmin && (
                                 <NavDropdown title = "admin">
                                    <LinkContainer to="/admin/orders">
                                       <NavDropdown.Item>
                                       Orders
                                       </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/products">
                                       <NavDropdown.Item>
                                       Products
                                       </NavDropdown.Item>
                                    </LinkContainer>
                                 </NavDropdown>

                              )
                            }
                            
                  </Nav>
          </Navbar.Collapse>
       </Container>
    </Navbar>
 </header>
  )
}
               

export default Header;