import React from "react";
import PropTypes from "prop-types";

import Form from "../../components/form/Form";

import "./register.scss";
const Register = (props) => {
  return (
    <div className="register-wrapper">
      <div className="register">
        <h2 className="register-title">Đăng kí</h2>
        <Form>
          <Form.FormGroup
            name="name"
            type="text"
            id="name"
            label="Họ và tên"
          ></Form.FormGroup>
          <Form.FormGroup
            name="email"
            type="email"
            id="email"
            label="Email"
          ></Form.FormGroup>
          <Form.FormGroup
            name="password"
            type="password"
            id="password"
            label="Mật khẩu"
          ></Form.FormGroup>
          <Form.FormGroup
            name="confirm_password"
            type="password"
            id="confirm_password"
            label="Nhập lại mật khẩu"
          ></Form.FormGroup>
        </Form>
        <div className="register-btn">
          Đăng kí
        </div>
        <div className="register-link">
          <div className="register-link__text">
            Đã có tài khoản ? 
          </div>
          <div className="register-link__login">
             Đăng nhập
          </div>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {};

export default Register;
