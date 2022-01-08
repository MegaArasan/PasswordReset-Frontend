import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";

export function Message() {
  const history = useHistory();
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Message</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Password Successfully Changed!!!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => history.push("/")}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
