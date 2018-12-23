import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class FoodCatalog extends React.Component {
  render() {
    return (
      <div className="container">
        <FoodCardRow foods={this.props.foods} />
      </div>
    );
  }
}

class FoodCardRow extends React.Component {
  render() {
    const foods = this.props.foods;
    return (
      <div className="row">
        {foods.map(foodItem => (
          <FoodCard key="1" food={foodItem} />
        ))}
      </div>
    );
  }
}

class FoodCard extends React.Component {
  render() {
    const { category, name, quantity, weight, description } = this.props.food;
    return (
      <div className="col" style={{ backgroundColor: "#bfe0bf" }}>
        <img src="/images/tomato.png" alt="tomato" />
        <div className="text" />
        <span className="badge badge-pill badge-primary">{category}</span>
        <h3>{name}</h3>
        <div>
          {quantity} - {weight}
        </div>
        <div>{description}</div>
      </div>
    );
  }
}
const FOODS = [
  {
    key: 1,
    category: "Vegetables",
    name: "Tomato",
    quantity: 2,
    weight: "3g",
    description: "I am a tomato"
  }
];

ReactDOM.render(<FoodCatalog foods={FOODS} />, document.getElementById("root"));
