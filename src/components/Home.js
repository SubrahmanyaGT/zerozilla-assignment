import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetcher } from "./Services/CategoryApi";
import Styles from "./Home.module.css";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [curentCategory, setCurentCategory] = useState("");
  const [catList, setCatList] = useState([]);
  const changeCategory = (cat) => {
    setCurentCategory(cat);
  };
  useEffect(() => {
    //set the cat list
    if (curentCategory!='') {
      let data = fetcher("https://fakestoreapi.com/products/category/"+curentCategory);
      data.then((d) => {
        setCatList(d.data);
      });
    }
   
  }, [curentCategory]);
  useEffect(() => {
    let data = fetcher("https://fakestoreapi.com/products/categories");
    data.then((d) => {
      setCategories(d.data);
      setCurentCategory(d.data[0]);
    });
  }, []);

  console.log(catList);
  return (
    <>
    <div className={Styles.catWrapper}>
      {categories.map((category, i) => {
        return (
          <button
            className={Styles.catItems}
            onClick={() => changeCategory(category)}
            key={i}
          >
            {category}
          </button>
        );
      })}
    </div>
    <h1>{curentCategory}</h1>

    <div className={Styles.catListWrapper}>
      {catList.map((item,i)=>
         ( <Link to={'/product/'+item.id} key={i}>
          <div className={Styles.itemWrapper}>
          <img src={item.image} alt={item.description} />
          <div className={Styles.catDisrp}>{item.title}</div>
          </div>
          </Link>)
      )}
    </div>
    </>
  );
};

export default Home;
