import React from "react";
import ReactDOM from "react-dom";
import FoodFilter from "./components/FoodFilter.js";
import "./index.css";

class FoodCatalogViewSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFilters: {
        Product: [],
        Category: [],
        Color: ["orange"]
      }
    };
    this.isFiltered = this.isFiltered.bind(this);
    this.matchingProducts = this.matchingProducts.bind(this);
  }
  isFiltered(selectedFilters) {
    return Object.keys(selectedFilters) //Iterate over each property (Category, Color, Product)
      .map(x => selectedFilters[x]) //Get filter value for each property
      .some(x => x.length > 0); //Check if any filter array is not empty.
  }

  isFilterTypeSelected(filterType, selectedFilters) {
    return selectedFilters[filterType].length > 0;
  }

  matchingProducts(selectedFilters) {
    const isProductFilter = selectedFilters.Product.length > 0;
    const isCategoryFilter = selectedFilters.Category.length > 0;
    const isColorFilter = selectedFilters.Color.length > 0;

    selectedFilters.Category = selectedFilters.Category.map(x =>
      x.toLowerCase()
    );

    selectedFilters.Color = selectedFilters.Color.map(x => x.toLowerCase());

    return FOODS.filter(
      x =>
        (!isProductFilter || selectedFilters.Product.includes(x.name)) && //name filter
        (!isCategoryFilter ||
          selectedFilters.Category.includes(x.category.toLowerCase())) && //category filter
        (!isColorFilter ||
          selectedFilters.Color.includes(x.color.toLowerCase()))
    );
  }

  render() {
    const isFiltered = this.isFiltered(this.state.selectedFilters);

    if (!isFiltered) {
      return <FoodCatalog foods={FOODS} />;
    } else {
      return (
        <FilteredFoodCatalog
          matchingProducts={this.matchingProducts(this.state.selectedFilters)}
        />
      );
    }
  }
}

const FilteredFoodCatalog = props => (
  <div>
    {props.matchingProducts.map(x => (
      <p key={x.name}>{`${x.category + " - " + x.name}`}</p>
    ))}
  </div>
);

class FoodCatalog extends React.Component {
  render() {
    const foods = this.props.foods;
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
  }
}

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
    quantity: 10,
    weight: "3g",
    description: "The quick brown fox jumps over the lazy dog",
    color: "Red"
  },
  {
    key: 4,
    category: "FISH",
    name: "Salmon",
    quantity: 10,
    weight: "3g",
    description: "The quick brown fox jumps over the lazy dog",
    color: "Orange"
  },
  {
    key: 2,
    category: "VEGETABLES",
    name: "Cabbage",
    quantity: 10,
    weight: "3g",
    description: "The quick brown fox jumps over the lazy dog",
    color: "Green"
  },
  {
    key: 5,
    category: "VEGETABLES",
    name: "Carrot",
    quantity: 10,
    weight: "3g",
    description: "The quick brown fox jumps over the lazy dog",
    color: "Orange"
  },
  {
    key: 3,
    category: "VEGETABLES",
    name: "Onion",
    quantity: 10,
    weight: "3g",
    description: "The quick brown fox jumps over the lazy dog",
    color: "Pink"
  },
  {
    key: 6,
    category: "MEAT",
    name: "Pork",
    quantity: 10,
    weight: "7g",
    description: "The quick brown fox jumps over the lazy dog",
    color: "Pink"
  }
];

// TODO: Optimize (iterate once)
const uniqueProductList = Array.from(new Set(FOODS.map(x => x.name)));
const uniqueCategoryList = Array.from(new Set(FOODS.map(x => x.category)));
const uniqueColorList = Array.from(new Set(FOODS.map(x => x.color)));

ReactDOM.render(
  <FoodCatalogViewSelector foods={FOODS} />,
  document.getElementById("root")
);
