import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Styles from "./Header.module.css";
import { fetcher } from "./Services/CategoryApi";

const Header = ({ cart }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allItemsBackup, setAllItemsBackup] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const searchTermRef = useRef();
  useEffect(() => {
    let data = fetcher("https://fakestoreapi.com/products/");
    data.then((d) => {
      setAllItems(d.data);
      setAllItemsBackup(d.data);
    });
  }, []);
  useEffect(() => {
    if (searchTerm) {
      setAllItems([
        ...allItems.filter((item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      ]);
    } else {
      setAllItems([...allItemsBackup]);
    }
  }, [searchTerm]);

  const handelInput = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleSearchClose = (e) => {
    setSearchTerm("");
    searchTermRef.current.value = "";
  };
  return (
    <>
      <div className={Styles.headerWrapper}>
        <Link to="/">
          <img
            className={Styles.logo}
            src="https://zerozilla.com/static/media/applogo.753908a08e13c14b01f7976de9884093.svg"
            alt="logo"
          />
        </Link>
        <div className={Styles.searchWrapper}>
          <input
            onChange={handelInput}
            type="search"
            placeholder="Search for product"
            ref={searchTermRef}
          />
          {searchTerm != "" ? (
            <div className={Styles.searchResult}>
              <div className={Styles.searchResultClose}>
                <button onClick={handleSearchClose}>
                  <img src="https://www.nicepng.com/png/detail/47-470104_high-contrast-dialog-close-close-button-png-icon.png"></img>
                </button>
              </div>
              {allItems.map((item, i) => (
                <Link to={"/product/" + item.id} key={i}>
                  <div className={Styles.searchResultList}>{item.title}</div>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
        <div className={Styles.proflieWraper}>
          <div className={Styles.cart}>{cart.length}</div>
          <Link to="/profile">
            <img
              className={Styles.profileImage}
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="logo"
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
