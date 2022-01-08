import { Typography, Button } from "@mui/material";
import { TextField, InputAdornment } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import forgot_password from "../forgot_password.jpg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

export function ForgotPassword() {
  const history = useHistory();
  const { handleChange, handleBlur, handleSubmit, values, errors } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: formvalidationSchema,
    onSubmit: (email) => {
      console.log(email);
      forgotpass(email);
    },
  });
  const forgotpass = (email) => {
    fetch(`http://localhost:2000/forgotpassword`, {
      method: "POST",
      body: JSON.stringify(email),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        const Status = response.status;
        return Status;
      })
      .then((Status) =>
        Status === 200
          ? history.push("/forgotpassword/mailsent")
          : alert("Please enter the registered email")
      );
  };
  return (
    <div className="forgot">
      <div className="forgotpassword">
        <div className="forgotpic">
          <img
            src={forgot_password}
            alt="forgotimage"
            className="forgotimage"
          />
        </div>
        <div className="forgotpass">
          <Typography sx={{ fontFamily: "Aladin", margin: "5px" }} variant="h4">
            Forgot Password
          </Typography>
          <hr />
          <br />
          <Typography>Please enter the registered email</Typography>
          <br />
          <form onSubmit={handleSubmit}>
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
              placeholder="Enter Your Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              helperText={errors.email}
            />
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

const formvalidationSchema = Yup.object({
  email: Yup.string().email().required("Please Enter the valid Email"),
});
