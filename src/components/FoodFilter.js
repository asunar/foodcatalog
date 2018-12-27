import React from "react";
import "./filterItem.css";

export default class FoodFilter extends React.Component {
  render() {
    return (
      <div style={{ paddingTop: "30px" }}>
        <table
          id="filterTable"
          className="table table-bordered"
          style={{ backgroundColor: "white" }}
        >
          <thead>
            <tr>
              <td>Filter By</td>
              <td>
                <FoodFilterItem title="Product" />
              </td>
              <td>
                <FoodFilterItem title="Category" />
              </td>
              <td>
                <FoodFilterItem title="Color" />
              </td>
              <td>Clear Selection</td>
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
    this.state = { isChecked: false };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    this.setState(state => ({
      isChecked: !state.isChecked
    }));
  }

  render() {
    const divStyle = {
      backgroundColor: "red"
    };

    const id = `${this.props.title}Filter`;
    return (
      <div>
        <div
          id={id}
          className="dropdown-check-list"
          style={divStyle}
          tabIndex="100"
        >
          <span className="anchor" onClick={this.handleClick}>
            {this.props.title}
          </span>
          <ul
            id="items"
            className="items"
            style={{ display: this.state.isChecked ? "inline" : "none" }}
          >
            <li>
              <input type="checkbox" />
              Apple
            </li>
            <li>
              <input type="checkbox" />
              Orange
            </li>
            <li>
              <input type="checkbox" />
              Grapes
            </li>
            <li>
              <input type="checkbox" />
              Berry
            </li>
            <li>
              <input type="checkbox" />
              Mango
            </li>
            <li>
              <input type="checkbox" />
              Banana
            </li>
            <li>
              <input type="checkbox" />
              Tomato
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
