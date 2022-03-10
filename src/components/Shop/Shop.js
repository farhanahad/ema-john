import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const [products,setProducts]=useState([]);
    const [cart,setCart]=useState([]);
    const [displayProducts,setDisplayProducts]=useState([])

    useEffect(()=>{
        console.log('Product api called')
        fetch('./products.json')
        .then(res=>res.json())
        .then(data=>{
            setProducts(data);
            setDisplayProducts(data);
            //console.log('Product received');
        })
    },[])

    useEffect(()=>{
        console.log('L S Called');
        const savedCart=getStoredCart();
        const storedCart=[];
       
        if(products.length){
            for(const key in savedCart){
                //console.log(key, savedCart[key]);
                const addedProduct=products.find(product=>product.key===key);
                //console.log(key,addedProduct);
                if(addedProduct){
                    const quantity=savedCart[key];
                    addedProduct.quantity=quantity;
                    //console.log(addedProduct);
                    storedCart.push(addedProduct);
                }
                
             }
             setCart(storedCart)
        }
    },[products])

    const handleAddToCart=(product)=>{
        const exists=cart.find(pd=>pd.key===product.key);
        let newCart=[];
        if(exists){
          const rest=cart.filter(pd => pd.key !== product.key);
          exists.quantity= exists.quantity+1;
          newCart=[...rest,product];
        }
        else{
            product.quantity=1;
            newCart=[...cart,product];
        }
      
        setCart(newCart);
        // save to local storage (for now)
        addToDb(product.key)
    }
    const handleSearch=event=>{
        //console.log(event.target.value);
        const searchText=event.target.value;
        const matchProducts=products.filter(product=>product.name.toLowerCase().includes(searchText.toLowerCase()));
        setDisplayProducts(matchProducts)
        console.log(matchProducts.length);
        
    }
    return (
        <>
        <div className="search-container">
            <input 
            type="text" 
            onChange={handleSearch}
            placeholder='Search Product' />
        </div>

        <div className='shop-container'>
            <div className="product-container">
                {/* <h3>Products:{products.length}</h3> */}
                {
                    displayProducts.map(product=><Product
                        key={product.key}
                        product={product}
                        handleAddToCart={handleAddToCart}
                        ></Product>)
                }
            </div>
            <div className="cart-container">
               <Cart cart={cart}>
                   <Link to="/review">
                       <button className='btn-regular'>Review your order</button>
                    </Link>
            </Cart>
            </div>
        </div>
        </>
    );
};

export default Shop;