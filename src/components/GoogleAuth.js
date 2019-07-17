import React, { Component } from "react";

class GoogleAuth extends Component {
  state = { isSignedIn: null };
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "287185686136-hf7blhu8q12rf584pk561eunnvsoj6m1.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return <div>I don't know if we are signed in</div>;
    } else if (this.state.isSignedIn) {
      return <div>I'm signed in</div>;
    } else {
      return <div>I am not signed in</div>;
    }
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

export default GoogleAuth;
