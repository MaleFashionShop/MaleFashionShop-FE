import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { CartState } from '../context/Context'
import Rating from './Rating'
import {BsHeart, BsSearch} from 'react-icons/bs'
import {MdOutlineCompareArrows} from 'react-icons/md'

const SingleProduct = ({ prod }) => {

    const {
        state: {cart},
        dispatch
    } = CartState();


  return (
    <div className='col-md-3 col-lg-3'>
        <div className='products'>
            {/* <Card>
                <Card.Img variant='top' src={prod.image} alt={prod.name}/>
                <Card.Body>
                    <Card.Title>{prod.name}</Card.Title>
                    <Card.Subtitle style={{ paddingBottom: 10 }}>
                        <span>${prod.price}</span>
                        {prod.fastDelivery ? (
                        <div>Fast Delivery</div>
                        ) : (
                        <div>4 days delivery</div>
                        )}
                        <Rating rating={prod.ratings} />
                    </Card.Subtitle>
                    {
                    cart.some(p=>p.id === prod.id)?(
                        <Button onClick={() => {
                            dispatch({
                                type: 'REMOVE_FROM_CART',
                                payload: prod,
                            });
                        }} variant='danger'>
                            Remove from Cart
                        </Button>
                    ):(
                        <Button onClick={() => {
                            dispatch({
                                type: 'ADD_TO_CART',
                                payload: prod,
                            });
                        }} disabled={!prod.inStock}>
                            {!prod.inStock ? "Out of Stock" : "Add to Cart"}
                        </Button>
                    )
                    }
                    
                    
            </Card.Body>
            </Card> */}
            <div class="product__item">
                <div className="product__item__pic set-bg" style={{ backgroundImage: `url('${prod.image}')` }}>
                    <span class="label">New</span>
                    <ul class="product__hover">
                        <li><a href="#"><BsHeart/></a></li>
                        <li><a href="#"><MdOutlineCompareArrows/> <span>Compare</span></a></li>
                        <li><a href="#"><BsSearch/></a></li>
                    </ul>
                </div>
                <div class="product__item__text">
                    <h6>{prod.name}</h6>
                    <a href="#" onClick={() => {
                            dispatch({
                                type: 'ADD_TO_CART',
                                payload: prod,
                            });
                        }}  class="add-cart">+ Add To Cart</a>
                    <Rating rating={prod.ratings} />
                    <h5>${prod.price}</h5>
                    <div class="product__color__select">
                        <label for="pc-1">
                            <input type="radio" id="pc-1"/>
                        </label>
                        <label class="active black" for="pc-2">
                            <input type="radio" id="pc-2"/>
                        </label>
                        <label class="grey" for="pc-3">
                            <input type="radio" id="pc-3"/>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SingleProduct