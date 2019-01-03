import React from "react";
import Picky from "react-picky";
import "react-picky/dist/picky.css"; // Include CSS

export default class FoodFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFilters: this.props.selectedFilters
    };
    this.filterUpdatedHandler = this.filterUpdatedHandler.bind(this);
    this.clearSelection = this.clearSelection.bind(this);
  }

  getFiltersStartingState() {
    return {
      Product: [],
      Category: [],
      Color: []
    };
  }

  filterUpdatedHandler(title, selectedFilters) {
    const currentFilters = this.state.selectedFilters;
    currentFilters[title] = selectedFilters;

    this.setState({ selectedFilters: currentFilters });
    this.props.filtersUpdated(currentFilters);
  }

  clearSelection() {
    console.log("Clearing selection");
    this.setState({ selectedFilters: this.getFiltersStartingState() });
    this.props.filtersUpdated(this.getFiltersStartingState());
  }

  render() {
    return (
      <div>
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
            {/* TODO: Pass filter items product, category and color as props */}
            <FoodFilterItem
              title="Product"
              items={this.props.products}
              filterUpdatedHandler={this.filterUpdatedHandler}
              selectedItems={this.state.selectedFilters.Product}
            />
          </div>
          <div style={{ width: "20%" }}>
            <FoodFilterItem
              title="Category"
              items={this.props.categories}
              filterUpdatedHandler={this.filterUpdatedHandler}
              selectedItems={this.state.selectedFilters.Category}
            />
          </div>
          <div style={{ width: "20%" }}>
            <FoodFilterItem
              title="Color"
              items={this.props.colors}
              filterUpdatedHandler={this.filterUpdatedHandler}
              selectedItems={this.state.selectedFilters.Color}
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
            onClick={() => this.clearSelection()}
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
    this.selectMultipleOption = this.selectMultipleOption.bind(this);
  }

  selectMultipleOption(value) {
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
            visibility: this.props.selectedItems.length ? "visible" : "hidden",
            zIndex: 99
          }}
        >
          {this.props.selectedItems.length}
        </span>
        <Picky
          placeholder={this.props.title}
          value={this.props.selectedItems}
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
