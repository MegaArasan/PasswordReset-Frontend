import { TextField, Typography, Button } from "@mui/material";
import Signup_image from "../Signup_image.png";
import { useHistory } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import MailIcon from "@mui/icons-material/Mail";
import PersonIcon from "@mui/icons-material/Person";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import PasswordIcon from "@mui/icons-material/Password";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API_URL } from "../globalconstant.js";

export function Signup() {
  const history = useHistory();
  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        phoneno: "",
        password: "",
        confirmpassword: "",
      },
      validationSchema: formvalidationSchema,
      onSubmit: (newuser) => {
        // console.log("onSubmit", newuser);
        adduser(newuser);
      },
    });
  const adduser = (newuser) => {
    fetch(`${API_URL}/signup`, {
      method: "POST",
      body: JSON.stringify(newuser),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        const Status = response.status;
        return Status;
      })
      .then((Status) =>
        Status === 200 ? history.push("/login") : alert("Email already Exists")
      );
  };
  return (
    <div className="signup">
      <Typography sx={{ fontFamily: "Aladin" }} variant="h4">
        Create an Account
      </Typography>
      <Typography variant="p" sx={{ fontSize: "20px" }}>
        It's quick and easy
      </Typography>
      <div className="signuppage">
        <div className="userdetail">
          <form onSubmit={handleSubmit}>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
              id="name"
              name="name"
              required
              label="Name"
              sx={{ margin: "4px" }}
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              error={errors.name && touched.name}
              helperText={errors.name && touched.name && errors.name}
            />
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailIcon />
                  </InputAdornment>
                ),
              }}
              id="email"
              name="email"
              required
              label="Email"
              sx={{ margin: "4px" }}
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={errors.email && touched.email}
              helperText={errors.email && touched.email && errors.email}
            />
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ContactPhoneIcon />{" "}
                  </InputAdornment>
                ),
              }}
              id="phoneno"
              name="phoneno"
              required
              label="Phone No"
              sx={{ margin: "4px" }}
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phoneno}
              error={errors.phoneno && touched.phoneno}
              helperText={errors.phoneno && touched.phoneno && errors.phoneno}
            />
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PasswordIcon />
                  </InputAdornment>
                ),
              }}
              id="password"
              name="password"
              required
              label="Password"
              sx={{ margin: "4px" }}
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              error={errors.password && touched.password}
              helperText={
                errors.password && touched.password && errors.password
              }
            />
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PasswordIcon />
                  </InputAdornment>
                ),
              }}
              id="confirmpassword"
              name="confirmpassword"
              required
              label="Confirm Password"
              sx={{ margin: "4px" }}
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmpassword}
              error={errors.confirmpassword && touched.confirmpassword}
              helperText={
                errors.confirmpassword &&
                touched.confirmpassword &&
                errors.confirmpassword
              }
            />
            <br />
            <Button type="submit" variant="contained">
              Sign Up
            </Button>
          </form>
        </div>
        <div className="othersignup">
          <img src={Signup_image} alt="signup" className="signupimage" />
        </div>
      </div>
      <Typography variant="p">Already have an Account?</Typography>

      <Button onClick={() => history.push("/login")} variant="text">
        Log In
      </Button>
    </div>
  );
}

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const formvalidationSchema = Yup.object({
  name: Yup.string().required("Why not fill your name 🤯"),
  email: Yup.string().email().required("please fill the email field"),
  phoneno: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Why not fill this phone no 🤯")
    .min(8, "Please Enter the valid phone number")
    .max(10, "Please Enter the valid phone number"),
  password: Yup.string()
    .required("Please Enter your password")
    .min(8, "Too short password")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  confirmpassword: Yup.string()
    .required("Please Enter your password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});
