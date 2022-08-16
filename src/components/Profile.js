import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Styles from "./Header.module.css";
import { fetcher } from "./Services/CategoryApi";

const Profile = ({ cart }) => {
  const [allItemsBackup, setAllItemsBackup] = useState([]);
  const [allItems, setAllItems] = useState([]);
  useEffect(() => {
    let data = fetcher("https://fakestoreapi.com/products/");
    data.then((d) => {
      setAllItemsBackup(d.data);
    });
  }, []);
  useEffect(() => {
    if (cart.length > 0) {
      let filtered = allItemsBackup.filter((item) => cart.includes(item.id));
      setAllItems([...filtered]);
    }
  }, [cart, allItemsBackup]);
  console.log(cart);
  return (
    <div className={Styles.searchResult}>
      {allItems.map((item, i) => (
        <Link to={"/product/" + item.id} key={i}>
            <div className={Styles.card}>
                <img src={item.image} alt={item.title} />
              <span className={Styles.searchResultList}>{item.title}</span>  
            </div>
          
        </Link>
      ))}
    </div>
  );
};

export default Profile;
