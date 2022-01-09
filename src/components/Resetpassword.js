import { TextField, Typography, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { API_URL } from "../globalconstant.js";

export function Resetpassword() {
  const { id } = useParams();
  // console.log(id);
  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        password: "",
        confirmpassword: "",
        token: id,
      },
      validationSchema: formvalidationSchema,
      onSubmit: (updatepass) => {
        // console.log(updatepass);
        user(updatepass);
      },
    });
  const user = (updatepass) => {
    fetch(`${API_URL}/resetpassword`, {
      method: "POST",
      body: JSON.stringify(updatepass),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        const Status = response.status;
        return Status;
      })
      .then((Status) =>
        Status === 200
          ? window.location.replace("/successmsg")
          : alert("Invalid credentials")
      );
  };
  return (
    <div className="resetpassword">
      <Typography
        sx={{
          fontFamily: "Aladin",
          fontSize: { xs: "35px", sm: "45px", md: "60px" },
        }}
        variant="h2"
      >
        Update Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          sx={{ margin: "10px" }}
          id="password"
          name="password"
          required
          label="Password"
          variant="standard"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          error={errors.password && touched.password}
          helperText={errors.password && touched.password && errors.password}
        />
        <TextField
          fullWidth
          sx={{ margin: "10px" }}
          id="confirmpassword"
          name="confirmpassword"
          required
          label="Confirm Password"
          variant="standard"
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
        <Button type="submit" variant="contained">
          Confirm Password
        </Button>
      </form>
    </div>
  );
}

const formvalidationSchema = Yup.object({
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
