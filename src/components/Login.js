import { TextField, Typography, Button } from "@mui/material";
import login_image from "../login_image.jpg";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import { useState } from "react";
import { API_URL } from "../globalconstant.js";

export function Login() {
  const [value, setvalue] = useState({ showPassword: false });
  const handleClickShowPassword = () => {
    setvalue({
      showPassword: !value.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const history = useHistory();
  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },

      validationSchema: formvalidationSchema,
      onSubmit: (userdata) => {
        console.log("onSubmit", userdata);
        olduser(userdata);
      },
    });
  const olduser = (userdata) => {
    fetch(`${API_URL}/login`, {
      method: "POST",
      body: JSON.stringify(userdata),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        const Status = response.status;
        return Status;
      })
      .then((Status) =>
        Status === 200
          ? history.push("/dashboard")
          : alert("Invalid Credentials")
      );
  };
  return (
    <div className="login">
      <Typography sx={{ fontFamily: "Aladin" }} variant="h4">
        Log In to your Account
      </Typography>
      <div className="loginpage">
        <div className="userdata">
          <form onSubmit={handleSubmit}>
            <TextField
              label="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={errors.email && touched.email}
              helperText={errors.email && touched.email && errors.email}
              id="email"
              name="email"
              sx={{ margin: "5px" }}
              placeholder=" Enter Your Email"
              required
            />
            <TextField
              label="password"
              id="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              error={errors.password && touched.password}
              helperText={
                errors.password && touched.password && errors.password
              }
              sx={{ margin: "5px" }}
              placeholder="Enter Your Password"
              required
              type={value.showPassword ? "text" : "password"}
              end={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {value.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <br />
            <Button type="submit" variant="contained">
              Log In
            </Button>
          </form>
          <Button
            sx={{ fontSize: "12px" }}
            onClick={() => history.push("/forgotpassword")}
            variant="text"
          >
            Forgot password?
          </Button>
        </div>

        <div className="otherlogin">
          <img src={login_image} alt="login" className="loginimage" />
        </div>
      </div>
      <Typography variant="p">Need an Account?</Typography>
      <Button variant="text" onClick={() => history.push("/signup")}>
        Signup
      </Button>
    </div>
  );
}

const formvalidationSchema = Yup.object({
  email: Yup.string().email().required("please fill the email field"),
  password: Yup.string().required("Please Enter your password"),
});
