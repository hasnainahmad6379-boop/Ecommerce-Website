import React from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../context/ShopContext";
import { useContext } from "react";
import dropDown_icon from "../components/Assets/dropdown_icon.png";
import Item from "../components/Items/Items";
const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="shopcategory-indexsort">
        <p>
          <span>Showing 1-12</span> of {all_product.length} results
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropDown_icon} alt="Sort" />
        </div>
      </div>
      <div className="shopcategory-products">
        {all_product.map((item, i) => {
          if (props.category === item.category) {
            return (
              <Item
                key={i}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
      <div className="loadmore">Explore More</div>
    </div>
  );
};

export default ShopCategory;
