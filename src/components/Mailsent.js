import { Typography } from "@mui/material";

export function Mailsent() {
  return (
    <div className="mailsent">
      <Typography sx={{ fontFamily: "Aladin" }} variant="h3">
        Forgot Password
      </Typography>
      <Typography variant="h6">
        Verification mail sent to the Registered Email
      </Typography>
    </div>
  );
}
