import React, {useState} from 'react';
import Filter from './components/Filter';
import Products from './components/Products';
import Cart from "./components/Cart";
import data from "./data.json";

function App () {

  const [products, setProducts] = useState(data.products);
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");
  const [cartItems, setCartItems] = useState([]);

  

  //add to cart 
  const addToCart = (product) => {
    const cartItemsObj = cartItems.slice();
    console.log(cartItemsObj);
    let alreadyInCart = false;
    cartItemsObj.forEach((item) => {
      if(item._id === product._id){
        item.count++;
      alreadyInCart = true;
      }
    });
    if(!alreadyInCart) {
      cartItemsObj.push({ ...product, count: 1});
    }
      setCartItems(cartItemsObj);
  } 
  //remove to cart 
  const removeFromCart = (product) => {
  const cartItemsObj = cartItems.slice();
  setCartItems(cartItemsObj.filter(x=>x._id !== product._id));
  }
  //Sort Products 
  const sortProducts = (e) =>{
    const sort = e.target.value;
    setSort(e.target.value);
    setProducts(data.products.slice().sort((a,b) =>
      sort === "lowest"
      ?a.price > b.price 
      ? 1
      :-1
      :sort === "highest"
      ? a.price < b.price
      ? 1
      :-1
      :a._id < b._id
      ? 1:-1,
    ));  
    };

    //Filter Products by Sizes
    const filterProducts = (e) =>{
      console.log(e.target.value);
      if(e.target.value === ""){
        setSize(e.target.value);
        setProducts(data.products)
        console.log(`This is the value of ${size}`);
        console.log(`This is the value of ${products}`);
      }else{
        setSize(e.target.value);
        setProducts(data.products.filter(
        (product) => product.availableSizes.indexOf(e.target.value) >= 0
      ));
      }
    }
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main"> 
            <Filter 
            count={products.length}
            size={size}
            sort={sort}
            sortProducts={sortProducts}
            filterProducts={filterProducts}
            />
            <Products products={products} addToCart={addToCart}/> 
            </div>
            <div className="sidebar">
              <Cart cartItems={cartItems} removeFromCart={removeFromCart}  />
            </div>
          </div>
        </main>
        <footer>
          All rights is reserved.
        </footer>
      </div>
    );
}

export default App;
