import React from "react";
import Picky from "react-picky";
import "react-picky/dist/picky.css"; // Include CSS

export default class FoodFilter extends React.Component {
  render() {
    return (
      <div style={{ paddingTop: "30px" }}>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th style={{ width: "10%" }}>Filter By</th>
              <th>
                <FoodFilterItem title="Product" items={this.props.products} />
              </th>
              <th>
                <FoodFilterItem
                  title="Category"
                  items={this.props.categories}
                />
              </th>
              <th>
                <FoodFilterItem title="Color" items={this.props.colors} />
              </th>
            </tr>
          </thead>
        </table>
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
    console.log("Val", value);
    this.setState({ arrayValue: value });
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
