import axios from 'axios';
import React, { useEffect, useState } from 'react'
import productApi from '../../api/productApi';
import { CartState } from '../../context/Context'
import Filter from '../Filter';
import SingleProduct from '../SingleProduct';
import Slider from '../Slider/Slider';
import '../styles.css';
import './Home.css'


const Home = () => {
    const {
      state: { products },
      productState: { sort, byStock, byFastDelivery, byRating, searchQuery },
    } = CartState();

    const transformProducts = () => {
        let sortedProducts = products;
        if (sort) {
            sortedProducts = sortedProducts.sort((a, b) =>
              sort === "lowToHigh" ? a.price - b.price : b.price - a.price
            );
        }

        // if (!byStock) {
        // sortedProducts = sortedProducts.filter((prod) => prod.inStock);
        // }

        // if (byFastDelivery) {
        //     sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
        //   }
      
        if (byRating) {
        sortedProducts = sortedProducts.filter(
            (prod) => prod.ratings >= byRating
        );
        }

        if (searchQuery) {
            sortedProducts = sortedProducts.filter((prod) =>
              prod.name.toLowerCase().includes(searchQuery)
            );
        }

        return sortedProducts;
    }

//    const {state: {products}} =  CartState()
//    console.log(products);
  return (
    <>
        <Slider/>
      <div className='container'>
        <div className='col-md-12 col-lg-12'>
          <div class="row">
                  <div class="col-lg-12">
                      <ul class="filter__controls">
                          <li class="active" data-filter="*">Best Sellers</li>
                          <li data-filter=".new-arrivals">New Arrivals</li>
                          <li data-filter=".hot-sales">Hot Sales</li>
                      </ul>
                  </div>
            </div>
          <div className='productContainer'>
              {   
                  transformProducts().map((prod, index) => (
                  <SingleProduct prod = {prod} key={index}/>
                  ))
              }
          </div>
        </div>
    </div>
    </>
    
  )
}

export default Home