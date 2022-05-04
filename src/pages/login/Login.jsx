import React from "react";
import PropTypes from "prop-types";
import Form from "../../components/form/Form";

import "./login.scss";
const Login = (props) => {
  return (
    <div className="login-wrapper">
      <div className="login">
        <h2 className="login-title">Đăng nhập</h2>
        <Form>
          <Form.FormGroup
            id={"email"}
            name="email"
            label="Email"
            type="text"
           
          ></Form.FormGroup>
          <Form.FormGroup
            id={"pasword"}
            name="pasword"
            label="Mật khẩu"
            type="password"
            textError=""
          ></Form.FormGroup>
        </Form>
        <div className="login-bottom">
            <div className="login-btn">
            Đăng nhập
          </div>
          <div className="login-link">
            <div className="login-link__forgot">
              Quên mật khẩu ?
            </div>
            <div className="login-link__register">
              Đăng kí tài khoản
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

Login.propTypes = {};

export default Login;
