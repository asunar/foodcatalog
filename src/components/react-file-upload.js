import React from "react";

class SimpleReactFileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onFormSubmit(e) {
    e.preventDefault(); // Stop form submit
    this.fileUpload(this.state.file).then(response => {
      console.log(response.data);
    });
  }
  onChange(e) {
    debugger;
    this.setState({ file: e.target.files[0] });
    let reader = new FileReader();
    reader.onload = this.props.fileSelectedHandler;
    reader.readAsDataURL(e.target.files[0]);
  }

  render() {
    return <input type="file" onChange={this.onChange} />;
  }
}

export default SimpleReactFileUpload;
