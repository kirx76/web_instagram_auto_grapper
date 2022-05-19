import "../styles/globals.css";
import App from "next/app";
import RootStore from "../stores/RootStore";
import { Provider } from "mobx-react";
import initRootStore from "../stores";

class WebInstagramAutoGrapper extends App {
  rootStore: RootStore;

  constructor(props) {
    super(props);
    this.rootStore = initRootStore(props.initialState);
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider {...this.rootStore}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}

export default WebInstagramAutoGrapper;
