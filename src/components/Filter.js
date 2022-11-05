import React, { useState, useEffect} from 'react'
import { Button, Form } from "react-bootstrap";
import { CartState } from '../context/Context';
import Rating from './Rating';
import CategoryApi from '../api/CategoryApi';
import BrandApi from '../api/BrandApi';
import productApi from '../api/productApi';
import { cartReducer } from '../context/Reducer';
import { useReducer } from 'react';

import { Sidenav, Nav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';



const Filter = () => {

  const [categories, setCategories] = useState([]);
  // const [products, setProducst] = useState([]);
    const [brands, setBrands] = useState([]);

    const marks = [
      {
        value: 0,
        label: '0',
      },
      {
        value: 20,
        label: '200',
      },
      {
        value: 40,
        label: '300',
      },
      {
        value: 60,
        label: '400',
      },
    ];

    function valuetext(value) {
      return `${value}°C`;
    }

    useEffect(() => {
        loadCategories();
        loadBrands();
    }, [])

    const loadCategories = async () => {
        const response = await CategoryApi.getAll();
        setCategories(response.data);
    }

    const loadBrands = async () => {
        const response = await BrandApi.getAll();
        console.log(response);
        setBrands(response.data);
    }

    const {
        dispatch,
        productDispatch,
        productState: { byStock, byFastDelivery, sort, byRating },
      } = CartState();

      const handleClick = () => {
        console.info('You clicked the Chip.');
      };

      const [ price, setPrice ] = useState(100);

      // Triggered when the value gets updated while scrolling the slider:
      const handleInput = (e)=>{
        setPrice( e.target.value );

        productDispatch({
          type: "FILTER_BY_PRICE",
          payload: e.target.value
      });
      }
      
      const loadProductByCategory = async (id) =>{
        const response = await productApi.getProductByCategory(id).then((result) => {
          console.log(result);
          return result;
        })
        .catch((error) => {
          console.log(error);
          return null;
        });

        console.log(response.data)
        const newData = response.data.map((item) => ({
          ...item,
          price: item.price,
          name: item.name,
          inStock: item.quantity,
          image: item.featureImage,
          ratings: item.rating
      }))

        dispatch({
          type: 'ADD_PRODUCT_LIST',
          products: newData
      })
      }

      const constloadProductByBrand = async (id) =>{
        const response = await productApi.getProductByCategory(id).then((result) => {
          console.log(result);
          return result;
        })
        .catch((error) => {
          console.log(error);
          return null;
        });

        console.log(response.data)
        const newData = response.data.map((item) => ({
          ...item,
          price: item.price,
          name: item.name,
          inStock: item.quantity,
          image: item.featureImage,
          ratings: item.rating
      }))

        dispatch({
          type: 'ADD_PRODUCT_LIST',
          products: newData
      })


        
      }

      
    //   console.log(byStock, byFastDelivery, sort, byRating);
  return (
          <div className="col-lg-3">
            <div className="shop__sidebar">
              <div className="shop__sidebar__search">
                <form 
                  action="#"
                  onChange={(e) => {
                    productDispatch({
                        type: "FILTER_BY_SEARCH",
                        payload: e.target.value
                    });
                }} >
                  <input type="text" placeholder="Search..." />
                  <button type="submit"><span className="icon_search" /></button>
                </form>
              </div>
              <div style={{ width: 240 }}>
                <Sidenav defaultOpenKeys={['3', '4']}>
                <Sidenav.Body>
                    <Nav activeKey="1">
                    <Nav.Menu eventKey="1" title="Categories" icon={<MagicIcon />}>
                        {
                            categories.map((category) => (
                                <Nav.Item 
                                  onSelect={() =>
                                    loadProductByCategory(category.id)} eventKey= {category.id} >{category.name}
                                  </Nav.Item> 
                            ))
                        }
                    </Nav.Menu>
                    <Nav.Menu eventKey="2" title="Branding" icon={<MagicIcon />}>
                        {
                            brands.map((brand) => (
                                <Nav.Item onSelect={() =>
                                  loadProductByCategory(brand.id)} eventKey= {brand.id} >{brand.name}</Nav.Item> 
                            ))
                        }
                    </Nav.Menu>
                    <Nav.Menu  eventKey="3" title="Filter Price" icon={<MagicIcon />}>
                        <input min="0" max="2000" step="10" type="range"  onInput={ handleInput } />
                          <h1>Price: { price }</h1>
                          {/* { hotels.filter( hotel => { return hotel.price > parseInt(price, 10) }).map( hotel => {
                            return <p key={hotel.name}>{ hotel.name } | { hotel.price } &euro; </p>
                          })}  */}
                        {/* <Nav.Item eventKey="3-2">$50.00 - $100.00</Nav.Item>
                        <Nav.Item eventKey="3-3">$100.00 - $150.00</Nav.Item>
                        <Nav.Item eventKey="3-4">$200.00 - $250.00</Nav.Item> */}
                    </Nav.Menu>
                    {/* <Nav.Menu  eventKey="4" title="Size" icon={<GearCircleIcon />}>
                        <div style={{display: 'inline-block'}}>
                        <Nav.Item eventKey="4-1"><Chip label="S" onClick={handleClick}  /></Nav.Item>
                        <Nav.Item eventKey="4-2"><Chip label="S" onClick={handleClick}  /></Nav.Item>
                        <Nav.Item eventKey="4-3"><Chip label="S" onClick={handleClick}  /></Nav.Item>
                        <Nav.Item eventKey="4-4"><Chip label="S" onClick={handleClick}  /></Nav.Item>
                        <Nav.Item eventKey="4-5"><Chip label="S" onClick={handleClick}  /></Nav.Item>
                        </div>
                    </Nav.Menu> */}
                    </Nav>
                </Sidenav.Body>
                </Sidenav>
            </div>
            </div>
          </div>
  )
}

export default Filter