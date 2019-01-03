import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import CustomCheckbox from "./CustomCheckbox.js";
import QuantityPicker from "./QuantityPicker.js";
import SimpleReactFileUpload from "./react-file-upload.js";
import { noImageDataUrl } from "../ImageDataUrls.js"; //import UploadButtonStyles from "react-upload-button-v2/build/styles.css";

class AddProducts extends Component {
  constructor(props) {
    super(props);
    debugger;
    this.state = {
      name: "",
      category: "-1",
      weight: "",
      quantity: 0,
      description: "",
      color: [],
      imageDataUrl: noImageDataUrl,
      redirectMe: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
  }

  fileSelectedHandler(e) {
    this.setState({ imageDataUrl: e.target.result });
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    let colors = [];
    this.props.colors.forEach(c => {
      if (data.get(c) !== null) {
        colors.push(c);
      }
    });

    const newProduct = {
      name: data.get("name"),
      category: data.get("category"),
      quantity: data.get("quantity"),
      weight: data.get("weight"),
      description: data.get("description"),
      color: colors,
      imageDataUrl: this.state.imageDataUrl
    };
    this.props.addProductHandler(newProduct);
    this.setState({ redirectMe: true });
  }

  render() {
    if (this.state.redirectMe) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <div
                className="col"
                style={{ fontSize: "x-large", textDecoration: "none" }}
              >
                &lt; Back
              </div>
            </Link>
          </div>

          <div className="row">
            <div
              className="col"
              style={{ fontSize: "xx-large", fontWeight: "bold" }}
            >
              ADD PRODUCT
            </div>
            <div className="col" style={{ textAlign: "right" }}>
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                <button
                  type="submit"
                  className="btn"
                  style={{
                    backgroundColor: "orange",
                    color: "white",
                    fontWeight: "700"
                  }}
                >
                  SAVE PRODUCT
                </button>
              </Link>
            </div>
          </div>
          <hr
            style={{
              borderWidth: "thick",
              borderColor: "inherit",
              color: "black"
            }}
          />
          <div className="row">
            <div className="col-4">
              <div>
                <img
                  style={{ width: "100%" }}
                  src={this.state.imageDataUrl}
                  alt="No Image"
                />
              </div>
              <div>
                <SimpleReactFileUpload
                  fileSelectedHandler={this.fileSelectedHandler}
                />
              </div>
            </div>
            <div className="col">
              <div>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Product"
                    defaultValue=""
                  />
                  <select
                    className="form-control"
                    name="category"
                    placeholder="Category"
                    defaultValue={this.state.category}
                    onChange={this.categoryUpdated}
                  >
                    <option value={this.state.category} disabled>
                      Category
                    </option>
                    {this.props.categories.map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                  <QuantityPicker />
                  <input
                    type="text"
                    name="weight"
                    className="form-control"
                    id="weight"
                    placeholder="Weight"
                    defaultValue=""
                  />
                  <input
                    type="text"
                    name="description"
                    className="form-control"
                    id="description"
                    placeholder="Description"
                    defaultValue=""
                  />

                  <div className="container">
                    <div className="row" style={{ paddingBottom: "3%" }}>
                      Colors
                    </div>
                    <div className="row">
                      {this.props.colors.map(c => (
                        <div key={c} className="col-6">
                          <CustomCheckbox label={c} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr
            style={{
              borderWidth: "thick",
              borderColor: "inherit",
              color: "black"
            }}
          />

          <div className="row">
            <div className="col" style={{ textAlign: "right" }}>
              <button
                type="submit"
                className="btn"
                style={{
                  backgroundColor: "orange",
                  color: "white",
                  fontWeight: "700"
                }}
              >
                SAVE PRODUCT
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default AddProducts;
