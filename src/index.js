import React from "react";
import ReactDOM from "react-dom";
import FoodFilter from "./components/FoodFilter.js";
import "./index.css";

const FoodCatalog = props => {
  const foods = props.foods;
  return (
    <div>
      <FoodFilter
        products={uniqueProductList}
        categories={uniqueCategoryList}
        colors={uniqueColorList}
      />

      <div style={{ paddingTop: "5%" }}>All Products</div>
      <div className="card-columns">
        {foods.map(foodItem => (
          <FoodCard key={foodItem.key} food={foodItem} />
        ))}
      </div>
    </div>
  );
};

const FoodCard = props => {
  const { category, name, quantity, weight, description } = props.food;
  return (
    <div className="card">
      <img src={`/images/${name}.png`} alt={name} className="card-img-top" />
      <div className="card-body foodCard">
        <span className="badge badge-pill badge-primary category">
          {category}
        </span>
        <h5 className="card-title foodTitle">{name}</h5>
        <table>
          <thead>
            <tr>
              <th className="categoryTableHeader">QUANTITY</th>
              <th className="categoryTableHeader">WEIGHT</th>
            </tr>
          </thead>
          <tbody>
            <tr className="categoryTableRow">
              <td>{quantity}pcs</td>
              <td>{weight}</td>
            </tr>
          </tbody>
        </table>
        <p className="card-text foodDescription">{description}</p>
      </div>
    </div>
  );
};
const FOODS = [
  {
    key: 1,
    category: "VEGETABLES",
    name: "Tomato",
    quantity: 2,
    weight: "3g",
    description: "The quick brown fox jumps over the lazy dog",
    color: "Red"
  },
  {
    key: 4,
    category: "FISH",
    name: "Salmon",
    quantity: 5,
    weight: "6g",
    description: "The quick brown fox jumps over the lazy dog",
    color: "Orange"
  },
  {
    key: 2,
    category: "VEGETABLES",
    name: "Cabbage",
    quantity: 3,
    weight: "10g",
    description: "The quick brown fox jumps over the lazy dog",
    color: "Green"
  },
  {
    key: 5,
    category: "VEGETABLES",
    name: "Carrot",
    quantity: 4,
    weight: "7g",
    description: "The quick brown fox jumps over the lazy dog",
    color: "Orange"
  },
  {
    key: 3,
    category: "VEGETABLES",
    name: "Onion",
    quantity: 4,
    weight: "5g",
    description: "The quick brown fox jumps over the lazy dog",
    color: "Pink"
  },
  {
    key: 6,
    category: "MEAT",
    name: "Pork",
    quantity: 6,
    weight: "7g",
    description: "The quick brown fox jumps over the lazy dog",
    color: "Pink"
  }
];

const uniqueProductList = Array.from(new Set(FOODS.map(x => x.name)));
const uniqueCategoryList = Array.from(new Set(FOODS.map(x => x.category)));
const uniqueColorList = Array.from(new Set(FOODS.map(x => x.color)));

ReactDOM.render(<FoodCatalog foods={FOODS} />, document.getElementById("root"));
