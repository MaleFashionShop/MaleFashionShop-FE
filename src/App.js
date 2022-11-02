import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";

import Home from "./components/Home";
import Cart from "./components/Cart";

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <div>
        <Route exact path='/'>
          <Home/>
        </Route>
        <Route exact path='/cart'>
          <Cart/>
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
