import React from "react";
import PropTypes from "prop-types";
import Helmet from "../../components/helmet/Helmet";
import Form from "../../components/form/Form";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./register.scss";
const Register = (props) => {
  const formik = useFormik({
    initialValues: {
      full_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      full_name: Yup.string()
        .required("Họ tên không được để trống")
        .matches(
          /[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/,
          "Tên không hợp lệ"
        )
        .min(3, "Từ 3 ký tự trở lên"),
      email: Yup.string()
        .required("Email không được để trống")
        .matches(
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
          "Email không hợp lệ"
        ),
      password: Yup.string()
        .required("Mật khẩu không được để trống")
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
      confirm_password: Yup.string()
        .required("Mật khẩu không được để trống")
        .oneOf([Yup.ref('password'), null], "Mật khẩu không trùng khớp"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleSubmit = () => {
    formik.handleSubmit();
  };

  return (
    <Helmet title="Đăng kí">
      <div className="register-wrapper">
        <div className="register">
          <h2 className="register-title">Đăng kí</h2>
          <Form>
            <Form.FormGroup
              name="full_name"
              type="text"
              id="name"
              label="Họ và tên"
              value={formik.values.full_name}
              onChange={formik.handleChange}
              textError={formik.errors.full_name}
            ></Form.FormGroup>
            <Form.FormGroup
              name="email"
              type="email"
              id="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              textError={formik.errors.email}
            ></Form.FormGroup>
            <Form.FormGroup
              name="password"
              type="password"
              id="password"
              label="Mật khẩu"
              value={formik.values.password}
              onChange={formik.handleChange}
              textError={formik.errors.password}
            ></Form.FormGroup>
            <Form.FormGroup
              name="confirm_password"
              type="password"
              id="confirm_password"
              label="Nhập lại mật khẩu"
              value={formik.values.confirm_password}
              onChange={formik.handleChange}
              textError={formik.errors.confirm_password}
            ></Form.FormGroup>
          </Form>
          <div className="register-bottom">
            <div onClick={handleSubmit} className="register-btn">
              Đăng kí
            </div>
            <div className="register-link">
              <div className="register-link__text">Đã có tài khoản ?</div>
              <Link to="/dang-nhap" className="register-link__login">
                Đăng nhập
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

Register.propTypes = {};

export default Register;
