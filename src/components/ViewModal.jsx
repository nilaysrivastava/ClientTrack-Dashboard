import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  useMediaQuery,
  useTheme,
  Typography,
} from "@material-ui/core";

const getStatusStyle = (status) => {
  switch (status) {
    case "Paid":
      return {
        backgroundColor: "#e0f2f1",
        color: "#004d40",
        padding: "2px 8px",
        borderRadius: "12px",
      };
    case "Due":
      return {
        backgroundColor: "#ffebee",
        color: "#b71c1c",
        padding: "2px 8px",
        borderRadius: "12px",
      };
    case "Inactive":
      return {
        backgroundColor: "#e0e0e0",
        color: "#424242",
        padding: "2px 8px",
        borderRadius: "12px",
      };
    case "Open":
      return {
        backgroundColor: "#e3f2fd",
        color: "#0d47a1",
        padding: "2px 8px",
        borderRadius: "12px",
      };
    default:
      return {};
  }
};

const ViewModal = ({ open, onClose, content }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog open={open} onClose={onClose} fullScreen={fullScreen}>
      <DialogTitle>View Details</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          <strong>Name:</strong> {content?.name}
        </Typography>
        <Typography variant="body1">
          <strong>Description:</strong> {content?.description}
        </Typography>
        <Typography variant="body1">
          <strong>Status:</strong>{" "}
          <span style={getStatusStyle(content?.status)}>{content?.status}</span>
        </Typography>
        <Typography variant="body1">
          <strong>Rate:</strong> ₹{content?.rate}
        </Typography>
        <Typography variant="body1">
          <strong>Balance:</strong>{" "}
          <span style={{ color: content?.balance < 0 ? "red" : "green" }}>
            ₹{content?.balance}
          </span>
        </Typography>
        <Typography variant="body1">
          <strong>Deposit:</strong> ₹{content?.deposit}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewModal;
