import React from "react";
import ReactDOM from "react-dom";
import FoodFilter from "./components/FoodFilter.js";
import "./index.css";

class FoodCatalogViewSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFilters: this.props.selectedFilters
    };
    this.isFiltered = this.isFiltered.bind(this);
  }
  isFiltered(selectedFilters) {
    debugger;
    return Object.keys(selectedFilters) //Iterate over each property (Category, Color, Product)
      .map(x => selectedFilters[x]) //Get filter value for each property
      .some(x => x.length > 0); //Check if any filter array is not empty.
  }

  render() {
    const isFiltered = this.isFiltered(this.state.selectedFilters);
    if (!isFiltered) {
      return <FoodCards foods={this.props.foods} />;
    } else {
      return (
        <FilteredFoodCatalog
          matchingProducts={this.props.matchingProducts}
          filtersUpdated={this.props.filtersUpdated}
        />
      );
    }
  }
}

class FilteredFoodCatalog extends React.Component {
  constructor(props) {
    super(props);

    this.filtersUpdated = this.filtersUpdated.bind(this);
  }

  filtersUpdated(selectedFilters) {
    this.props.filtersUpdated(selectedFilters);
  }

  render() {
    return (
      <div>
        {this.props.matchingProducts.map(x => (
          <p key={x.name}>{`${x.category + " - " + x.name}`}</p>
        ))}
      </div>
    );
  }
}

class FoodCatalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFilters: this.props.selectedFilters
    };
    this.matchingProducts = this.matchingProducts.bind(this);
    this.filtersUpdated = this.filtersUpdated.bind(this);
  }

  matchingProducts(selectedFilters) {
    const isProductFilter = selectedFilters.Product.length > 0;
    const isCategoryFilter = selectedFilters.Category.length > 0;
    const isColorFilter = selectedFilters.Color.length > 0;

    selectedFilters.Category = selectedFilters.Category.map(x =>
      x.toLowerCase()
    );

    selectedFilters.Color = selectedFilters.Color.map(x => x.toLowerCase());

    return this.props.foods.filter(
      x =>
        (!isProductFilter || selectedFilters.Product.includes(x.name)) && //name filter
        (!isCategoryFilter ||
          selectedFilters.Category.includes(x.category.toLowerCase())) && //category filter
        (!isColorFilter ||
          x.color.some(x => selectedFilters.Color.includes(x.toLowerCase()))) // is there any product color that matches one of selected color filters.
    );
  }

  filtersUpdated(selectedFilters) {
    debugger;
    this.setState({ selectedFilters: selectedFilters });
  }

  render() {
    return (
      <div>
        <FoodFilter
          products={uniqueProductList}
          categories={uniqueCategoryList}
          colors={uniqueColorList}
          filtersUpdated={this.filtersUpdated}
          selectedFilters={this.state.selectedFilters}
        />

        <FoodCatalogViewSelector
          foods={this.props.foods}
          selectedFilters={this.state.selectedFilters}
          matchingProducts={this.matchingProducts(this.state.selectedFilters)}
          filtersUpdated={this.filtersUpdated}
        />
      </div>
    );
  }
}

const FoodCards = props => {
  const foods = props.foods;

  return (
    <div>
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
    quantity: 10,
    weight: "3g",
    description: "The quick brown fox jumps over the lazy dog",
    color: ["Red"]
  },
  {
    key: 4,
    category: "FISH",
    name: "Salmon",
    quantity: 10,
    weight: "3g",
    description: "The quick brown fox jumps over the lazy dog",
    color: ["Orange"]
  },
  {
    key: 2,
    category: "VEGETABLES",
    name: "Cabbage",
    quantity: 10,
    weight: "3g",
    description: "The quick brown fox jumps over the lazy dog",
    color: ["Green"]
  },
  {
    key: 5,
    category: "VEGETABLES",
    name: "Carrot",
    quantity: 10,
    weight: "3g",
    description: "The quick brown fox jumps over the lazy dog",
    color: ["Orange"]
  },
  {
    key: 3,
    category: "VEGETABLES",
    name: "Onion",
    quantity: 10,
    weight: "3g",
    description: "The quick brown fox jumps over the lazy dog",
    color: ["Pink"]
  },
  {
    key: 6,
    category: "MEAT",
    name: "Pork",
    quantity: 10,
    weight: "7g",
    description: "The quick brown fox jumps over the lazy dog",
    color: ["Pink"]
  }
];

// TODO: Optimize (iterate once)
const uniqueProductList = Array.from(new Set(FOODS.map(x => x.name)));
const uniqueCategoryList = Array.from(new Set(FOODS.map(x => x.category)));
const uniqueColorList = Array.from(new Set(FOODS.flatMap(x => x.color)));

ReactDOM.render(
  //<FoodCatalogViewSelector foods={FOODS} />,
  <FoodCatalog
    foods={FOODS}
    selectedFilters={{ Product: [], Category: [], Color: [] }}
  />,
  document.getElementById("root")
);
