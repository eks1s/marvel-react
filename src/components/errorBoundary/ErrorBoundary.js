import { Component } from "react";

import ErrorMassage from "../errorMassage/errorMassage";

class ErrorBoundary extends Component {
  state = {
    error: false,
  };

  componentDidCatch(error, info) {
    console.log(error, info);
    this.setState({ error: true });
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ margin: "0 auto" }}>
          <ErrorMassage />
        </div>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
