import React, { useState, useEffect} from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CategoryApi from '../../api/CategoryApi';
import BrandApi from '../../api/BrandApi';
import { CartState } from '../../context/Context';
import SingleProduct from '../SingleProduct';
import Filter from '../Filter';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import './Shop.css'

const Shop = () => {
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [age, setAge] = React.useState('');

    

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


    const handleClick = () => {
        console.info('You clicked the Chip.');
      };

      const handleChange = (event) => {
        setAge(event.target.value);
        productDispatch({
          type: "SORT_BY_PRICE",
          payload: event.target.value,
        })
        
      };

    

      const {
        state: { products },
        productDispatch,
        productState: { sort, priceRange, byStock, byFastDelivery, byRating, searchQuery },
      } = CartState();
  
      const transformProducts = () => {
          let sortedProducts = products;
          if (sort) {
              sortedProducts = sortedProducts.sort((a, b) =>
                sort === "lowToHigh" ? a.price - b.price : b.price - a.price
              );
          }

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

          if (priceRange) {
            sortedProducts = sortedProducts.filter(
                (prod) => prod.price <= priceRange
            );
            }
  
          if (searchQuery) {
              sortedProducts = sortedProducts.filter((prod) =>
                prod.name.toLowerCase().includes(searchQuery)
              );
          }
  
          return sortedProducts;
      }

  return (
    <>
        <div>
        {/* Breadcrumb Section Begin */}
        {/* <div className="breadcrumb-option">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb__text">
                  <h4>Shop</h4>
                  <div className="breadcrumb__links">
                    <a href="./index.html">Home</a>
                    <span>Shop</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* Breadscrum Section End */}
        {/* Shop Section Begin */}
        <section className="shop spad">
          <div className="container">
            <div className="row">
              <Filter/>
              <div className="col-lg-9">
                <div className="shop__product__option">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className="shop__product__option__left">
                        <p>Showing 1-12 of 126 results</p>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small">Sort by Price:</InputLabel>
                        <Select
                          labelId="demo-select-small"
                          id="demo-select-small"
                          value={age}
                          label="Sort by Price:"
                          onChange={handleChange}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value='lowToHigh'>Low to Hight</MenuItem>
                          <MenuItem value='highToLow'>Hight To Low</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </div>
                {/* <div className="row">
                  <div className="col-lg-4 col-md-6 col-sm-6">
                    <div className="product__item">
                      <div className="product__item__pic set-bg" data-setbg="img/product/product-2.jpg">
                        <ul className="product__hover">
                          <li><a href="#"><img src="img/icon/heart.png" alt="" /></a></li>
                          <li><a href="#"><img src="img/icon/compare.png" alt="" /> <span>Compare</span></a>
                          </li>
                          <li><a href="#"><img src="img/icon/search.png" alt="" /></a></li>
                        </ul>
                      </div>
                      <div className="product__item__text">
                        <h6>Piqué Biker Jacket</h6>
                        <a href="#" className="add-cart">+ Add To Cart</a>
                        <div className="rating">
                          <i className="fa fa-star-o" />
                          <i className="fa fa-star-o" />
                          <i className="fa fa-star-o" />
                          <i className="fa fa-star-o" />
                          <i className="fa fa-star-o" />
                        </div>
                        <h5>$67.24</h5>
                        <div className="product__color__select">
                          <label htmlFor="pc-4">
                            <input type="radio" id="pc-4" />
                          </label>
                          <label className="active black" htmlFor="pc-5">
                            <input type="radio" id="pc-5" />
                          </label>
                          <label className="grey" htmlFor="pc-6">
                            <input type="radio" id="pc-6" />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6">
                    <div className="product__item sale">
                      <div className="product__item__pic set-bg" data-setbg="img/product/product-3.jpg">
                        <span className="label">Sale</span>
                        <ul className="product__hover">
                          <li><a href="#"><img src="img/icon/heart.png" alt="" /></a></li>
                          <li><a href="#"><img src="img/icon/compare.png" alt="" /> <span>Compare</span></a>
                          </li>
                          <li><a href="#"><img src="img/icon/search.png" alt="" /></a></li>
                        </ul>
                      </div>
                      <div className="product__item__text">
                        <h6>Multi-pocket Chest Bag</h6>
                        <a href="#" className="add-cart">+ Add To Cart</a>
                        <div className="rating">
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star-o" />
                        </div>
                        <h5>$43.48</h5>
                        <div className="product__color__select">
                          <label htmlFor="pc-7">
                            <input type="radio" id="pc-7" />
                          </label>
                          <label className="active black" htmlFor="pc-8">
                            <input type="radio" id="pc-8" />
                          </label>
                          <label className="grey" htmlFor="pc-9">
                            <input type="radio" id="pc-9" />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6">
                    <div className="product__item">
                      <div className="product__item__pic set-bg" data-setbg="img/product/product-4.jpg">
                        <ul className="product__hover">
                          <li><a href="#"><img src="img/icon/heart.png" alt="" /></a></li>
                          <li><a href="#"><img src="img/icon/compare.png" alt="" /> <span>Compare</span></a>
                          </li>
                          <li><a href="#"><img src="img/icon/search.png" alt="" /></a></li>
                        </ul>
                      </div>
                      <div className="product__item__text">
                        <h6>Diagonal Textured Cap</h6>
                        <a href="#" className="add-cart">+ Add To Cart</a>
                        <div className="rating">
                          <i className="fa fa-star-o" />
                          <i className="fa fa-star-o" />
                          <i className="fa fa-star-o" />
                          <i className="fa fa-star-o" />
                          <i className="fa fa-star-o" />
                        </div>
                        <h5>$60.9</h5>
                        <div className="product__color__select">
                          <label htmlFor="pc-10">
                            <input type="radio" id="pc-10" />
                          </label>
                          <label className="active black" htmlFor="pc-11">
                            <input type="radio" id="pc-11" />
                          </label>
                          <label className="grey" htmlFor="pc-12">
                            <input type="radio" id="pc-12" />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6">
                    <div className="product__item sale">
                      <div className="product__item__pic set-bg" data-setbg="img/product/product-6.jpg">
                        <span className="label">Sale</span>
                        <ul className="product__hover">
                          <li><a href="#"><img src="img/icon/heart.png" alt="" /></a></li>
                          <li><a href="#"><img src="img/icon/compare.png" alt="" /> <span>Compare</span></a>
                          </li>
                          <li><a href="#"><img src="img/icon/search.png" alt="" /></a></li>
                        </ul>
                      </div>
                      <div className="product__item__text">
                        <h6>Ankle Boots</h6>
                        <a href="#" className="add-cart">+ Add To Cart</a>
                        <div className="rating">
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star-o" />
                        </div>
                        <h5>$98.49</h5>
                        <div className="product__color__select">
                          <label htmlFor="pc-16">
                            <input type="radio" id="pc-16" />
                          </label>
                          <label className="active black" htmlFor="pc-17">
                            <input type="radio" id="pc-17" />
                          </label>
                          <label className="grey" htmlFor="pc-18">
                            <input type="radio" id="pc-18" />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6">
                    <div className="product__item">
                      <div className="product__item__pic set-bg" data-setbg="img/product/product-7.jpg">
                        <ul className="product__hover">
                          <li><a href="#"><img src="img/icon/heart.png" alt="" /></a></li>
                          <li><a href="#"><img src="img/icon/compare.png" alt="" /> <span>Compare</span></a>
                          </li>
                          <li><a href="#"><img src="img/icon/search.png" alt="" /></a></li>
                        </ul>
                      </div>
                      <div className="product__item__text">
                        <h6>T-shirt Contrast Pocket</h6>
                        <a href="#" className="add-cart">+ Add To Cart</a>
                        <div className="rating">
                          <i className="fa fa-star-o" />
                          <i className="fa fa-star-o" />
                          <i className="fa fa-star-o" />
                          <i className="fa fa-star-o" />
                          <i className="fa fa-star-o" />
                        </div>
                        <h5>$49.66</h5>
                        <div className="product__color__select">
                          <label htmlFor="pc-19">
                            <input type="radio" id="pc-19" />
                          </label>
                          <label className="active black" htmlFor="pc-20">
                            <input type="radio" id="pc-20" />
                          </label>
                          <label className="grey" htmlFor="pc-21">
                            <input type="radio" id="pc-21" />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6">
                    <div className="product__item">
                      <div className="product__item__pic set-bg" data-setbg="img/product/product-8.jpg">
                        <ul className="product__hover">
                          <li><a href="#"><img src="img/icon/heart.png" alt="" /></a></li>
                          <li><a href="#"><img src="img/icon/compare.png" alt="" /> <span>Compare</span></a>
                          </li>
                          <li><a href="#"><img src="img/icon/search.png" alt="" /></a></li>
                        </ul>
                      </div>
                      <div className="product__item__text">
                        <h6>Basic Flowing Scarf</h6>
                        <a href="#" className="add-cart">+ Add To Cart</a>
                        <div className="rating">
                          <i className="fa fa-star-o" />
                          <i className="fa fa-star-o" />
                          <i className="fa fa-star-o" />
                          <i className="fa fa-star-o" />
                          <i className="fa fa-star-o" />
                        </div>
                        <h5>$26.28</h5>
                        <div className="product__color__select">
                          <label htmlFor="pc-22">
                            <input type="radio" id="pc-22" />
                          </label>
                          <label className="active black" htmlFor="pc-23">
                            <input type="radio" id="pc-23" />
                          </label>
                          <label className="grey" htmlFor="pc-24">
                            <input type="radio" id="pc-24" />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6">
                    <div className="product__item">
                      <div className="product__item__pic set-bg" data-setbg="img/product/product-9.jpg">
                        <ul className="product__hover">
                          <li><a href="#"><img src="img/icon/heart.png" alt="" /></a></li>
                          <li><a href="#"><img src="img/icon/compare.png" alt="" /> <span>Compare</span></a>
                          </li>
                          <li><a href="#"><img src="img/icon/search.png" alt="" /></a></li>
                        </ul>
                      </div>
                      <div className="product__item__text">
                        <h6>Piqué Biker Jacket</h6>
                        <a href="#" className="add-cart">+ Add To Cart</a>
                        <div className="rating">
                          <i className="fa fa-star-o" />
                          <i className="fa fa-star-o" />
                          <i className="fa fa-star-o" />
                          <i className="fa fa-star-o" />
                          <i className="fa fa-star-o" />
                        </div>
                        <h5>$67.24</h5>
                        <div className="product__color__select">
                          <label htmlFor="pc-25">
                            <input type="radio" id="pc-25" />
                          </label>
                          <label className="active black" htmlFor="pc-26">
                            <input type="radio" id="pc-26" />
                          </label>
                          <label className="grey" htmlFor="pc-27">
                            <input type="radio" id="pc-27" />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6">
                    <div className="product__item sale">
                      <div className="product__item__pic set-bg" data-setbg="img/product/product-10.jpg">
                        <span className="label">Sale</span>
                        <ul className="product__hover">
                          <li><a href="#"><img src="img/icon/heart.png" alt="" /></a></li>
                          <li><a href="#"><img src="img/icon/compare.png" alt="" /> <span>Compare</span></a>
                          </li>
                          <li><a href="#"><img src="img/icon/search.png" alt="" /></a></li>
                        </ul>
                      </div>
                      <div className="product__item__text">
                        <h6>Multi-pocket Chest Bag</h6>
                        <a href="#" className="add-cart">+ Add To Cart</a>
                        <div className="rating">
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star-o" />
                        </div>
                        <h5>$43.48</h5>
                        <div className="product__color__select">
                          <label htmlFor="pc-28">
                            <input type="radio" id="pc-28" />
                          </label>
                          <label className="active black" htmlFor="pc-29">
                            <input type="radio" id="pc-29" />
                          </label>
                          <label className="grey" htmlFor="pc-30">
                            <input type="radio" id="pc-30" />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6">
                    <div className="product__item">
                      <div className="product__item__pic set-bg" data-setbg="img/product/product-11.jpg">
                        <ul className="product__hover">
                          <li><a href="#"><img src="img/icon/heart.png" alt="" /></a></li>
                          <li><a href="#"><img src="img/icon/compare.png" alt="" /> <span>Compare</span></a>
                          </li>
                          <li><a href="#"><img src="img/icon/search.png" alt="" /></a></li>
                        </ul>
                      </div>
                      <div className="product__item__text">
                        <h6>Diagonal Textured Cap</h6>
                        <a href="#" className="add-cart">+ Add To Cart</a>
                        <div className="rating">
                          <i className="fa fa-star-o" />
                          <i className="fa fa-star-o" />
                          <i className="fa fa-star-o" />
                          <i className="fa fa-star-o" />
                          <i className="fa fa-star-o" />
                        </div>
                        <h5>$60.9</h5>
                        <div className="product__color__select">
                          <label htmlFor="pc-31">
                            <input type="radio" id="pc-31" />
                          </label>
                          <label className="active black" htmlFor="pc-32">
                            <input type="radio" id="pc-32" />
                          </label>
                          <label className="grey" htmlFor="pc-33">
                            <input type="radio" id="pc-33" />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6">
                    <div className="product__item sale">
                      <div className="product__item__pic set-bg" data-setbg="img/product/product-12.jpg">
                        <span className="label">Sale</span>
                        <ul className="product__hover">
                          <li><a href="#"><img src="img/icon/heart.png" alt="" /></a></li>
                          <li><a href="#"><img src="img/icon/compare.png" alt="" /> <span>Compare</span></a>
                          </li>
                          <li><a href="#"><img src="img/icon/search.png" alt="" /></a></li>
                        </ul>
                      </div>
                      <div className="product__item__text">
                        <h6>Ankle Boots</h6>
                        <a href="#" className="add-cart">+ Add To Cart</a>
                        <div className="rating">
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star-o" />
                        </div>
                        <h5>$98.49</h5>
                        <div className="product__color__select">
                          <label htmlFor="pc-34">
                            <input type="radio" id="pc-34" />
                          </label>
                          <label className="active black" htmlFor="pc-35">
                            <input type="radio" id="pc-35" />
                          </label>
                          <label className="grey" htmlFor="pc-36">
                            <input type="radio" id="pc-36" />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6">
                    <div className="product__item">
                      <div className="product__item__pic set-bg" data-setbg="img/product/product-13.jpg">
                        <ul className="product__hover">
                          <li><a href="#"><img src="img/icon/heart.png" alt="" /></a></li>
                          <li><a href="#"><img src="img/icon/compare.png" alt="" /> <span>Compare</span></a>
                          </li>
                          <li><a href="#"><img src="img/icon/search.png" alt="" /></a></li>
                        </ul>
                      </div>
                      <div className="product__item__text">
                        <h6>T-shirt Contrast Pocket</h6>
                        <a href="#" className="add-cart">+ Add To Cart</a>
                        <div className="rating">
                          <i className="fa fa-star-o" />
                          <i className="fa fa-star-o" />
                          <i className="fa fa-star-o" />
                          <i className="fa fa-star-o" />
                          <i className="fa fa-star-o" />
                        </div>
                        <h5>$49.66</h5>
                        <div className="product__color__select">
                          <label htmlFor="pc-37">
                            <input type="radio" id="pc-37" />
                          </label>
                          <label className="active black" htmlFor="pc-38">
                            <input type="radio" id="pc-38" />
                          </label>
                          <label className="grey" htmlFor="pc-39">
                            <input type="radio" id="pc-39" />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6">
                    <div className="product__item">
                      <div className="product__item__pic set-bg" data-setbg="img/product/product-14.jpg">
                        <ul className="product__hover">
                          <li><a href="#"><img src="img/icon/heart.png" alt="" /></a></li>
                          <li><a href="#"><img src="img/icon/compare.png" alt="" /> <span>Compare</span></a>
                          </li>
                          <li><a href="#"><img src="img/icon/search.png" alt="" /></a></li>
                        </ul>
                      </div>
                      <div className="product__item__text">
                        <h6>Basic Flowing Scarf</h6>
                        <a href="#" className="add-cart">+ Add To Cart</a>
                        <div className="rating">
                          <i className="fa fa-star-o" />
                          <i className="fa fa-star-o" />
                          <i className="fa fa-star-o" />
                          <i className="fa fa-star-o" />
                          <i className="fa fa-star-o" />
                        </div>
                        <h5>$26.28</h5>
                        <div className="product__color__select">
                          <label htmlFor="pc-40">
                            <input type="radio" id="pc-40" />
                          </label>
                          <label className="active black" htmlFor="pc-41">
                            <input type="radio" id="pc-41" />
                          </label>
                          <label className="grey" htmlFor="pc-42">
                            <input type="radio" id="pc-42" />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className='productContainer'>
                    {
                        transformProducts().map((prod, index) => (
                        <SingleProduct prod = {prod} key={index}/>
                        ))
                    }
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="product__pagination">
                      <a className="active" href="#">1</a>
                      <a href="#">2</a>
                      <a href="#">3</a>
                      <span>...</span>
                      <a href="#">21</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Shop Section End */}
      </div>
    </>
  )
}

export default Shop