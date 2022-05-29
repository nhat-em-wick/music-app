import React from "react";
import PropTypes from "prop-types";
import Form from "../../components/form/Form";
import Helmet from "../../components/helmet/Helmet";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./login.scss";
const Login = (props) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email không được để trống").matches(
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
          "Email không hợp lệ"
        ),
      password: Yup.string()
        .required("Mật khẩu không được để trống")
    }),
    onSubmit: (values) => {
      console.log(values);
    }
  });

  const handleSubmit = () => {
    formik.handleSubmit();
  }

  return (
    <Helmet title="Đăng nhập">
      <div className="login-wrapper">
        <div className="login">
          <h2 className="login-title">Đăng nhập</h2>
          <Form>
            <Form.FormGroup
              id={"email"}
              name="email"
              label="Email"
              type="text"
              value={formik.values.email}
              onChange={formik.handleChange}
              textError={formik.errors.email}
            ></Form.FormGroup>
            <Form.FormGroup
              id={"password"}
              name="password"
              label="Mật khẩu"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              textError={formik.errors.password}
            ></Form.FormGroup>
          </Form>
          <div className="login-bottom">
            <div onClick={handleSubmit} className="login-btn">Đăng nhập</div>
            <div className="login-link">
              <div className="login-link__forgot">Quên mật khẩu ?</div>
              <Link to="/dang-ki" className="login-link__register">
                Đăng kí tài khoản
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

Login.propTypes = {};

export default Login;
