import React, { Component } from "react";

class QuantityPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1
    };
  }
  render() {
    return (
      <div
        className="form-control"
        style={{ backgroundColor: "inherit", border: "none" }}
      >
        <div className="container">
          <div className="row">
            <div className="col" style={{ textAlign: "left" }}>
              Quantity
            </div>
            <div className="col">
              <img
                src="../images/decrement.png"
                alt="Decrement"
                onClick={() =>
                  this.setState({
                    quantity:
                      this.state.quantity - 1 < 1 ? 1 : this.state.quantity - 1
                  })
                }
              />
            </div>
            <div className="col">{this.state.quantity}</div>
            <div className="col">
              {" "}
              <img
                src="../images/increment.png"
                alt="Increment"
                onClick={() =>
                  this.setState({ quantity: this.state.quantity + 1 })
                }
              />
            </div>
          </div>
          <input type="hidden" name="quantity" value={this.state.quantity} />
        </div>
      </div>
    );
  }
}

export default QuantityPicker;
