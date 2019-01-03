import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import FoodFilter from "./components/FoodFilter.js";
import DonutChart from "./components/DonutChart.js";
import AddProducts from "./components/AddProducts.js";
import "./index.css";

class FoodCatalogViewSelector extends React.Component {
  constructor(props) {
    super(props);

    this.isFiltered = this.isFiltered.bind(this);
    this.matchingProducts = this.matchingProducts.bind(this);
  }

  matchingProducts(selectedFilters) {
    //TODO: Refactor to remove duplication
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

  isFiltered(selectedFilters) {
    return Object.keys(selectedFilters) //Iterate over each property (Category, Color, Product)
      .map(x => selectedFilters[x]) //Get filter value for each property
      .some(x => x.length > 0); //Check if any filter array is not empty.
  }

  render() {
    const isFiltered = this.isFiltered(this.props.selectedFilters);
    if (!isFiltered) {
      return <FoodCards foods={this.props.foods} />;
    } else {
      return (
        <FilteredFoodCatalog
          matchingProducts={this.matchingProducts(this.props.selectedFilters)}
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
    const matchingProducts = this.props.matchingProducts;
    return (
      <div>
        <div style={{ paddingTop: "5%" }}>Matching Products</div>
        {matchingProducts.map(mp => (
          <MatchingProduct key={mp.key} food={mp} />
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
    this.filtersUpdated = this.filtersUpdated.bind(this);
  }

  filtersUpdated(selectedFilters) {
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

const MatchingProduct = props => {
  const { category, name, color } = props.food;

  const colorPercentages = color.map(x => ({
    color: x.toLowerCase(),
    percent: (1 / color.length).toFixed(2)
  }));
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          borderRightStyle: "solid",
          borderRightWidth: "thin",
          borderRightColor: "#eae8e8",
          width: "20%"
        }}
      >
        <h5>{category}</h5>

        <div style={{ width: "151px", height: "92px" }}>
          <img
            src={`/images/${name}.png`}
            alt={name}
            className="img-thumbnail"
          />
          <p style={{ textAlign: "center" }}>{name}</p>
        </div>
      </div>

      <div style={{ width: "80%", overflow: "visible" }}>
        <DonutChart colorPercentages={colorPercentages} />
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

const SideBar = props => {
  return (
    <div
      style={{
        width: "15vw",
        background: "rgb(31, 70, 106)",
        color: "white",
        height: "100vh",
        overflow: "auto"
      }}
      {...props}
    >
      <div
        style={{
          textAlign: "center",
          fontWeight: "500",
          padding: "30px"
        }}
      >
        <img
          src="/images/shoppingBag.png"
          alt="Shopping Bag"
          style={{ textAlign: "center" }}
        />
        <div style={{ paddingTop: "15%", paddingBottom: "7%" }}>
          <Link to="/addProducts">
            <button
              className="btn btn-primary"
              type="button"
              style={{
                backgroundColor: "white",
                color: "rgb(32, 156, 234)",
                fontWeight: "700"
              }}
            >
              ADD PRODUCTS
            </button>
          </Link>
        </div>
        <hr style={{ borderColor: "inherit", color: "rgb(147, 166, 183)" }} />
        <ul style={{ listStyleType: "none", padding: 10, textAlign: "left" }}>
          <li style={{ marginBottom: "10%" }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              DASHBOARD
            </Link>
          </li>
          <li style={{ marginBottom: "10%", color: "rgb(147, 166, 183)" }}>
            PRODUCTS
          </li>
          <li style={{ marginBottom: "10%" }}>REPORTS</li>
        </ul>
      </div>
    </div>
  );
};

const App = () => {
  function addProductHandler(product) {
    debugger;
    let nextKey = Math.max.apply(null, FOODS.map(x => x.key)) + 1;
    product.key = nextKey;
    FOODS.push(product);
  }
  return (
    <Router>
      <Root>
        <SideBar />
        <ContentArea>
          <div
            style={{
              backgroundColor: "rgb(243, 239, 239)",
              padding: "3% 8% 3% 8%"
            }}
          >
            <Route exact={true} path="/" component={Dashboard} />
            <Route
              path="/addProducts"
              render={props => (
                <AddProducts
                  categories={uniqueCategoryList}
                  colors={uniqueColorList}
                  addProductHandler={addProductHandler}
                  {...props}
                />
              )}
            />
          </div>
        </ContentArea>
      </Root>
    </Router>
  );
};

const Root = props => (
  <div
    style={{
      display: "flex"
    }}
    {...props}
  />
);

const ContentArea = props => (
  <div
    style={{
      flex: 1,
      height: "100vh",
      overflow: "auto"
    }}
  >
    <div {...props} />
  </div>
);

const Dashboard = props => (
  <div style={{ backgroundColor: "rgb(243, 239, 239)" }}>
    <div>
      <FoodCatalog
        foods={FOODS}
        selectedFilters={{ Product: [], Category: [], Color: [] }}
      />
    </div>
  </div>
);

const FOODS = [
  {
    key: 1,
    category: "VEGETABLES",
    name: "Tomato",
    quantity: 10,
    weight: "3g",
    description: "The quick brown fox jumps over the lazy dog",
    color: ["Red", "Green"]
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
    color: ["Green", "Purple"]
  },
  {
    key: 5,
    category: "VEGETABLES",
    name: "Carrot",
    quantity: 10,
    weight: "3g",
    description: "The quick brown fox jumps over the lazy dog",
    color: ["Orange", "Yellow", "Purple"]
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

ReactDOM.render(<App />, document.getElementById("root"));
