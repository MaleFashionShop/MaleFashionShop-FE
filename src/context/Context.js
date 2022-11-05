import React, { createContext, useContext, useReducer, useEffect, useState } from 'react'
import faker from 'faker';
import { cartReducer, productReducer } from './Reducer';
import productApi from '../api/productApi';

const Cart = createContext();
faker.seed(99);

const Context = ({children}) => {
    const [fetchProducts, setFetchProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [filters, setFilters] = useState({});

    const [state, dispatch] = useReducer(cartReducer, {
        products: [],
        cart: []
    })

    useEffect(() => {
        loadProducts();
    }, [])

    const loadProducts = async () => {
        const response = await productApi.getAll();
        const newData = response.data.map((item) => ({
            ...item,
            price: item.price,
            name: item.name,
            inStock: item.quantity,
            image: item.featureImage,
            ratings: faker.random.arrayElement([1, 2, 3, 4, 5])
        }))
        console.log(newData)
        dispatch({
            type: 'ADD_PRODUCT_LIST',
            products: newData
        })
    }

    const [productState, productDispatch] = useReducer(productReducer, {
        byStock: false,
        byFastDelevery: false,
        byRating: 0,
        searchQuery: "",
        priceRange: 0
    })
  return (
    <div>
        <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
            {children}
        </Cart.Provider>
    </div>
  )
}

export default Context

export const CartState = () =>{
    return useContext(Cart)
}