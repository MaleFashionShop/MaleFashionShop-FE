import React from 'react'
import {
    Badge,
    Button,
    Container,
    Dropdown,
    FormControl,
    Nav,
    Navbar,
  } from "react-bootstrap";
  import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from 'mdb-react-ui-kit';
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';

import { CartState } from '../../context/Context';
import { AiFillDelete } from 'react-icons/ai'; 

const Header = () => {
   const {
    state: {cart},
    dispatch,
    productDispatch
   } =  CartState();

  return (
    <Navbar bg="dark" variant='dark' style={{height: 80}}>
        <Container>
            <Navbar.Brand>
                            <div class="header__logo">
                                <Link to="/"><img src="/assets/images/logo.png" alt=""/></Link>
                            </div>
            </Navbar.Brand>
            <Navbar.Text className='search'>
                <FormControl style={{width: 500, display: 'none'}} 
                            placeholder="Search a product" 
                            className="m-auto"
                            onChange={(e) => {
                                productDispatch({
                                    type: "FILTER_BY_SEARCH",
                                    payload: e.target.value
                                });
                            }}
                />
            </Navbar.Text>
            <div class="col-lg-6 col-md-6">
                    <nav class="header__menu mobile-menu">
                        <ul>
                            <li class="active"><a href="./index.html">Home</a></li>
                            <li><a href="./shop.html">Shop</a></li>
                            <li><a href="#">Pages</a>
                                <ul class="dropdown">
                                    <li><a href="./about.html">About Us</a></li>
                                    <li><a href="./shop-details.html">Shop Details</a></li>
                                    <li><a href="./shopping-cart.html">Shopping Cart</a></li>
                                    <li><a href="./checkout.html">Check Out</a></li>
                                    <li><a href="./blog-details.html">Blog Details</a></li>
                                </ul>
                            </li>
                            <li><a href="./blog.html">Blog</a></li>
                            <li><a href="./contact.html">Contacts</a></li>
                        </ul>
                    </nav>
            </div>
            <Nav>
                <Dropdown alignRight>
                    <Dropdown.Toggle variant="success">
                    <FaShoppingCart color="white" fontSize="25px" />
                    <Badge>{cart.length}</Badge>
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ minWidth: 370 }}>
                        {cart.length>0?(
                            <>
                                {cart.map(prod =>(
                                    <span className="cartitem" key={prod.id}>
                                    <img
                                      src={prod.image}
                                      className="cartItemImg"
                                      alt={prod.name}
                                    />
                                    <div className="cartItemDetail">
                                      <span>{prod.name}</span>
                                      <span>₹ {prod.price.split(".")[0]}</span>
                                    </div>
                                    <AiFillDelete
                                        fontSize="20px"
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                        dispatch({
                                            type: "REMOVE_FROM_CART",
                                            payload: prod,
                                        })
                                        }
                                    />
                                  </span>
                                ))}
                            </>
                        ):(
                            <span style={{ padding: 10 }}>Cart is Empty!</span>
                        )}

                        <Link to="/cart">
                            <Button style={{ width: "95%", margin: "0 10px" }}>
                            Go To Cart
                            </Button>
                        </Link>
                        
                    </Dropdown.Menu>
                </Dropdown>

            </Nav>
        </Container>
    </Navbar>
  )
}

export default Header