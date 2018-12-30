import React from "react";
import Picky from "react-picky";
import "react-picky/dist/picky.css"; // Include CSS

export default class FoodFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFilters: {
        Product: [],
        Category: [],
        Color: []
      }
    };
    this.filterUpdatedHandler = this.filterUpdatedHandler.bind(this);
  }

  filterUpdatedHandler(title, selectedFilters) {
    console.log(title);
    console.log(selectedFilters);

    const currentFilters = this.state.selectedFilters;
    currentFilters[title] = selectedFilters;

    this.setState({ selectedFilters: currentFilters });
  }

  render() {
    return (
      <div style={{ paddingTop: "3%" }}>
        <div
          style={{
            display: "flex",
            backgroundColor: "white",
            verticalAlign: "middle"
          }}
        >
          <div
            style={{
              width: "10%",
              lineHeight: "400%",
              color: "rgb(184, 184, 184)",
              paddingLeft: "2%",
              fontSize: "larger"
            }}
          >
            Filter By
          </div>
          <div style={{ width: "20%" }}>
            <FoodFilterItem
              title="Product"
              items={this.props.products}
              filterUpdatedHandler={this.filterUpdatedHandler}
            />
          </div>
          <div style={{ width: "20%" }}>
            <FoodFilterItem
              title="Category"
              items={this.props.categories}
              filterUpdatedHandler={this.filterUpdatedHandler}
            />
          </div>
          <div style={{ width: "20%" }}>
            <FoodFilterItem
              title="Color"
              items={this.props.colors}
              filterUpdatedHandler={this.filterUpdatedHandler}
            />
          </div>
          <div
            style={{
              flexGrow: "1",
              lineHeight: "400%",
              color: "rgb(32, 156, 234)",
              textAlign: "right",
              fontSize: "larger",
              paddingRight: "2%"
            }}
          >
            Clear Selection
          </div>
        </div>
      </div>
    );
  }
}

class FoodFilterItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      arrayValue: []
    };
    this.selectMultipleOption = this.selectMultipleOption.bind(this);
  }

  selectMultipleOption(value) {
    this.setState({ arrayValue: value });
    this.props.filterUpdatedHandler(this.props.title, value);
  }

  render() {
    return (
      <div>
        <span
          className="badge badge-warning"
          style={{
            backgroundColor: "yellow",
            position: "relative",
            top: "10px",
            left: "85%",
            //display: "block",
            visibility: this.state.arrayValue.length ? "visible" : "hidden",
            zIndex: 99
          }}
        >
          {this.state.arrayValue.length}
        </span>
        <Picky
          placeholder={this.props.title}
          value={this.state.arrayValue}
          options={this.props.items}
          onChange={this.selectMultipleOption}
          valueKey="id"
          labelKey="name"
          multiple={true}
          includeSelectAll={false}
          includeFilter={false}
          manySelectedPlaceholder={this.props.title}
          allSelectedPlaceholder={this.props.title}
          numberDisplayed={0}
        />
      </div>
    );
  }
}
