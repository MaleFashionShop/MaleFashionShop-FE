import React, { useState, useEffect} from 'react'
import { Button, Form } from "react-bootstrap";
import { CartState } from '../context/Context';
import Rating from './Rating';
import CategoryApi from '../api/CategoryApi';
import BrandApi from '../api/BrandApi';

import { Sidenav, Nav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const Filter = () => {

  const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

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
        productDispatch,
        productState: { byStock, byFastDelivery, sort, byRating },
      } = CartState();

      const handleClick = () => {
        console.info('You clicked the Chip.');
      };

    //   console.log(byStock, byFastDelivery, sort, byRating);
  return (
    <div className="filters">
      <span className="title">Filter Products</span>
      <span>
        <Form.Check
          inline
          label="Ascending"
          name="group1"
          type="radio"
          id={`inline-1`}
          onChange={() =>
            productDispatch({
              type: "SORT_BY_PRICE",
              payload: "lowToHigh",
            })
          }
          checked={sort === "lowToHigh" ? true : false}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Descending"
          name="group1"
          type="radio"
          id={`inline-2`}
          onChange={() =>
            productDispatch({
              type: "SORT_BY_PRICE",
              payload: "highToLow",
            })
          }
          checked={sort === "highToLow" ? true : false}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Include Out of Stock"
          name="group1"
          type="checkbox"
          id={`inline-3`}
          onChange={() =>
            productDispatch({
              type: "FILTER_BY_STOCK",
            })
          }
          checked={byStock}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Fast Delivery Only"
          name="group1"
          type="checkbox"
          id={`inline-4`}
          onChange={() =>
            productDispatch({
              type: "FILTER_BY_DELIVERY",
            })
          }
          checked={byFastDelivery}
        />
      </span>
      <span>
        <label style={{ paddingRight: 10 }}>Rating: </label>
        <Rating
          rating={byRating}
          onClick={(i) =>
            productDispatch({
              type: "FILTER_BY_RATING",
              payload: i + 1,
            })
          }
          style={{ cursor: "pointer" }}
        />
      </span>
      <Button
        variant="light"
        onClick={() =>
            productDispatch({
              type: "CLEAR_FILTERS",
            })
          }
      >
        Clear Filters
      </Button>
            {/* <div className="col-lg-3">
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
                                  <Nav.Item  eventKey= {category.id} >{category.name}</Nav.Item> 
                              ))
                          }
                      </Nav.Menu>
                      <Nav.Menu eventKey="2" title="Branding" icon={<MagicIcon />}>
                          {
                              brands.map((brand) => (
                                  <Nav.Item eventKey= {brand.id} >{brand.name}</Nav.Item> 
                              ))
                          }
                      </Nav.Menu>
                      <Nav.Menu eventKey="3" title="Filter Price" icon={<MagicIcon />}>
                          <Nav.Item eventKey="3-1">$0.00 - $50.00</Nav.Item>
                          <Nav.Item eventKey="3-2">$50.00 - $100.00</Nav.Item>
                          <Nav.Item eventKey="3-3">$100.00 - $150.00</Nav.Item>
                          <Nav.Item eventKey="3-4">$200.00 - $250.00</Nav.Item>
                      </Nav.Menu>
                      <Nav.Menu  eventKey="4" title="Size" icon={<GearCircleIcon />}>
                          <div style={{display: 'inline-block'}}>
                          <Nav.Item eventKey="4-1"><Chip label="S" onClick={handleClick}  /></Nav.Item>
                          <Nav.Item eventKey="4-2"><Chip label="S" onClick={handleClick}  /></Nav.Item>
                          <Nav.Item eventKey="4-3"><Chip label="S" onClick={handleClick}  /></Nav.Item>
                          <Nav.Item eventKey="4-4"><Chip label="S" onClick={handleClick}  /></Nav.Item>
                          <Nav.Item eventKey="4-5"><Chip label="S" onClick={handleClick}  /></Nav.Item>
                          </div>
                      </Nav.Menu>
                      </Nav>
                  </Sidenav.Body>
                  </Sidenav>
              </div>
              </div>
            </div> */}
    </div>
  )
}

export default Filter