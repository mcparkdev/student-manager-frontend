import React, { Component } from "react";
import { connect } from "react-redux";
import { Input, Form } from "antd";
import { Avatar } from "antd";
import styled from "styled-components";
import logo from "../school/logo2.jpg";
import { LoadingOutlined } from "@ant-design/icons";
import * as actions from "../redux/auth/authActions";

const LoginSearch = styled(Input.Password)`
  &&& {
    border-radius: 8px;
    width: 200px;
    height: 2em;
    backgroundcolor: rgba(255, 255, 255, 0.3);
    border: 0;
  }
`;

class Login extends Component {
  onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  checkPassword = (rule, value) => {
    this.props.onAuth("SuperAdmin", value);
    if (this.props.token !== undefined && this.props.token !== null) {
      // this.props.history.push("/");
      return Promise.resolve();
    } else return Promise.reject("암호가 올바르지 않습니다.");
  };
  render() {
    // console.log(this.props);
    return (
      <div className="login-screen">
        {/* <img src={logo} alt="Admin" /> */}
        <Avatar src={logo} size={60} />
        <div className="login-screen-username">재 콜롬비아 한국학교</div>

        <Form
          name="login"
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Form.Item
            hasFeedback
            name="password"
            rules={[
              {
                // required: true,
                // message: "암호를 입력해주세요",
                validator: this.checkPassword,
              },
            ]}
            validateTrigger="onSubmit"
          >
            <LoginSearch allowClear placeholder="암호" />
          </Form.Item>
        </Form>
        {this.props.loadingLogin && (
          <LoadingOutlined style={{ fontSize: "24px" }} />
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onAuth: (username, password) =>
    dispatch(actions.authLogin(username, password)),
});

export default connect(null, mapDispatchToProps)(Login);
