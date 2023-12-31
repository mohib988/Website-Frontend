import React, { useState, useEffect } from "react";
import "./CartPage.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartItem from "../components/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart, removeProductFromCart, removeProductFromCartCompletely } from "../reduxStore/reducer";
import { removeListener } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { getDistributors, getOrderHistory } from "../actions/action";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const { cart } = useSelector(state => state.centralStore)
  const navigate = useNavigate()
  const calculateTotalPrice = (cart) => {
    let totalPrice = 0;
    for (const item of cart) {
      totalPrice += item.quantity *item.price-(item.discount*item.price/1000)
    }

    return totalPrice;
  };

  const calculateTotalItems = (cart) => {
    let totalItems = 0;
    for (const item of cart) {
      totalItems += item.quantity;

      
    }
    return totalItems;
  };

  const dispatch = useDispatch()
  useEffect(() => {
    // Retrieve cart from local storage
    if (cart && cart.length > 0) {
      setCartItems(cart);
    } else {
      setCartItems([]);
    }
  }, [cart]);

  return (
    <div>
      <Navbar />
      <div className="cart-title">
        {/* <h2 className="underline">Cart</h2> */}
      </div>
      <div className="cart-page-main min-h-screen">
        <div className="cart-page-section-left">
          <h2 className="cart-page-section-title">
            Cart Items ({cartItems.length} Items)
          </h2>
          
          {
          
          cartItems.length===0?
          <div className="mx-auto w-max h-[50vh] mt-20">
              <h1 className="text-2xl font-bold">No Item Found</h1>
            </div> :
          
          cartItems.map((item) => (item &&
            <div key={item.id} className="cart-page-cart-item">
              <CartItem product={item} onIncrement={() => dispatch(addProductToCart(item))}
                onDecrement={() => removeProductFromCart(item)} />
            </div>
          ))}
        </div>

        <div className="cart-page-section-right">
          <h2 className="cart-page-section-title">Cart Summary</h2>
          <div className="cart-summary">
            <div className="cart-summary-row">
              <span className="cart-summary-label">Total Products:</span>
              <span className="cart-summary-value">{cart.length}</span>
            </div>
            <hr />
            <div className="cart-summary-row cart-summary-total">
              <span className="cart-summary-label">Total Quantity:</span>
              <span className="cart-summary-value">{calculateTotalItems(cart)}</span>
            </div>
            <hr />
            {/* <div className="cart-summary-row"> */}
              {/* <span className="cart-summary-label">Discount:</span> */}
              {/* <span className="cart-summary-value">PKR {calculateDiscount()}</span> */}
            {/* </div> */}
            <hr />
            <div className="cart-summary-row">
              <span className="cart-summary-label">Total Price:</span>
              <span className="cart-summary-value">PKR {calculateTotalPrice(cart)}</span>
            </div>
          </div>
          <button className="btn-primary checkout-btn" onClick={() => {
            const a=(JSON.parse(localStorage.getItem("authToken")))

            if(a==null){
              navigate("/signin",{replace:true})
            }
            if (cart.length === 0) {
              alert("Cart is empty")
              return
            }
          if(a!=null && cart.length>0){
            navigate("/addressForm")
          }
          }}>Checkout</button>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
