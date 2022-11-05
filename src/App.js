import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
// import Header from "./components/Header";
import Header from "./components/Header/Header";

import Home from "./components/Home/Home";
import Cart from "./components/Cart";
import Login from "./components/Login1";
import Register from "./components/Register";
import Shop from "./components/Shop/Shop";

function App(props) {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path='/login'>
            <Login/>
          </Route>
          <Route>
            <Header/>
            <Switch>
              <Route exact path='/'>
                <Home/>
              </Route>
              <Route exact path='/cart'>
                <Cart/>
              </Route>
              <Route exact path='/register'>
                <Register/>
              </Route>
              <Route exact path='/shop'>
                <Shop/>
              </Route>
            </Switch>
          </Route>
        </Switch>
          
        {/* <Route exact path='/products'>
          <ProductFeature/>
        </Route> */}
      </div>
      
    </BrowserRouter>
  );
}

export default App;
