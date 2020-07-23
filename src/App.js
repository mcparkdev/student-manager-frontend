import React, { Component } from "react";

import { BrowserRouter as Router } from "react-router-dom";
import { Route, Redirect, Prompt } from "react-router-dom";
import "antd/dist/antd.css";
import "./App.css";
import { connect } from "react-redux";

import { ConfigProvider } from "antd";
import koKR from "antd/es/locale/ko_KR";
import moment from "moment";

import * as actions from "./redux/auth/authActions";

// import "../node_modules/react-grid-layout/css/styles.css";
// import "../node_modules/react-resizable/css/styles.css";
import Login from "./components/Login";
import Navbar from "./components/navbar/Navbar";
import Body from "./components/body/Body";
import { TransitionGroup, CSSTransition } from "react-transition-group";
// import styled from "styled-components";
// import Footer from "./components/footer/Footer";

moment.locale("ko");

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    console.log(this.props.isAuthenticated);
    return (
      <ConfigProvider locale={koKR}>
        <div className="App">
          <Router>
            <TransitionGroup className="transition-group">
              <CSSTransition
                key={window.location.key}
                timeout={{ enter: 300, exit: 300 }}
                classNames="fade"
              >
                {!this.props.isAuthenticated ? (
                  <React.Fragment>
                    <Route
                      exact
                      path="/login"
                      render={({ match, history }) => (
                        <Login
                          {...this.props}
                          match={match}
                          history={history}
                        />
                      )}
                    />
                    <Redirect to="/login" />
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Redirect to="/" />
                    <Navbar {...this.props} />
                    <Body {...this.props} />
                    {/* <Footer /> */}
                    <Prompt
                      when={!this.props.isAuthenticated}
                      message={(location) => {
                        return location.pathname.startsWith("/login")
                          ? "Unsaved settings will be lost. Are you sure?"
                          : true;
                      }}
                    />
                  </React.Fragment>
                )}
              </CSSTransition>
            </TransitionGroup>
          </Router>
        </div>
      </ConfigProvider>
    );
  }
}

// const Wrapper = styled.div`
//   .fade-enter {
//     opacity: 0.01;
//   }
//   .fade-enter.fade-enter-active {
//     opacity: 1;
//     transition: opacity 300ms ease-in;
//   }
//   .fade-exit {
//     opacity: 1;
//   }

//   .fade-exit.fade-exit-active {
//     opacity: 0.01;
//     transition: opacity 300ms ease-in;
//   }
//   div.transition-group {
//     position: relative;
//   }
//   section.route-section {
//     position: absolute;
//     width: 100%;
//     top: 0;
//     left: 0;
//   }
// `;

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null && state.auth.token !== undefined,
  token: state.auth.token,
  error: state.auth.error,
  loadingLogin: state.auth.loading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
