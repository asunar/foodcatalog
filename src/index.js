import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class FoodFilter extends React.Component {
  render() {
    return (
      <div style={{ paddingTop: "30px" }}>
        <table
          className="table table-bordered"
          style={{ backgroundColor: "white" }}
        >
          <thead>
            <tr>
              <td>Filter By</td>
              <td>Product</td>
              <td>Category</td>
              <td>Color</td>
              <td>Clear Selection</td>
            </tr>
          </thead>
        </table>
      </div>
    );
  }
}

class FoodCatalog extends React.Component {
  render() {
    return (
      <div>
        <FoodFilter />

        <div className="card-columns">
          <FoodCardRow foods={this.props.foods} />
        </div>
      </div>
    );
  }
}

class FoodCardRow extends React.Component {
  render() {
    const foods = this.props.foods;
    return (
      <div>
        {foods.map(foodItem => (
          <FoodCard key={foodItem.key} food={foodItem} />
        ))}
      </div>
    );
  }
}

class FoodCard extends React.Component {
  render() {
    const { category, name, quantity, weight, description } = this.props.food;
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
  }
}
const FOODS = [
  {
    key: 1,
    category: "VEGETABLES",
    name: "Tomato",
    quantity: 2,
    weight: "3g",
    description: "The quick brown fox jumps over the lazy dog"
  },
  {
    key: 4,
    category: "FISH",
    name: "Salmon",
    quantity: 5,
    weight: "6g",
    description: "The quick brown fox jumps over the lazy dog"
  },
  {
    key: 2,
    category: "VEGETABLES",
    name: "Cabbage",
    quantity: 3,
    weight: "10g",
    description: "The quick brown fox jumps over the lazy dog"
  },
  {
    key: 5,
    category: "VEGETABLES",
    name: "Carrot",
    quantity: 4,
    weight: "7g",
    description: "The quick brown fox jumps over the lazy dog"
  },
  {
    key: 3,
    category: "VEGETABLES",
    name: "onion",
    quantity: 4,
    weight: "5g",
    description: "The quick brown fox jumps over the lazy dog"
  },
  {
    key: 6,
    category: "MEAT",
    name: "Pork",
    quantity: 6,
    weight: "7g",
    description: "The quick brown fox jumps over the lazy dog"
  }
];

ReactDOM.render(<FoodCatalog foods={FOODS} />, document.getElementById("root"));
