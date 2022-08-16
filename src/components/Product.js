import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Cart } from "./Cart";
import { fetcher } from "./Services/CategoryApi";
import Styles from "./Product.module.css"

const Product = ({ cart, setCart }) => {
  let params = useParams();
  const [items, setItem] = useState([]);
  useEffect(() => {
    let data = fetcher("https://fakestoreapi.com/products/" + params.id);
    data.then((d) => {
      setItem(d.data);
    });
  }, [cart,params.id]);
  console.log(items);
  console.log("https://fakestoreapi.com/products/" + params.id);
  const updatCart = () => {
    setCart((c) => {
      if (c.includes(items.id)) {
        let index = c.indexOf(items.id);
        c.splice(index, 1);
      } else {
        c.push(items.id);
      }
      return [...c];
    });
  };
  console.log("cart",cart);
  return (
    <div className={Styles.productWrapper}>
      <img src={items.image} />
      <div  className={Styles.productContent}>
        <div className={Styles.title}>{items.title}</div>
        <div className={Styles.description}>{items.description}</div>
        <div className={Styles.price}>{"$" + items.price}</div>
        <button onClick={updatCart} className={Styles.updatCart}>
        {cart.includes(items.id)?'Remove from Cart':'Add to Cart'}
      </button>
      </div>
      
    </div>
  );
};

export default Product;
