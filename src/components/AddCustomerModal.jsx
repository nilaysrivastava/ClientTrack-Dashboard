import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import axios from "axios";

const AddCustomerModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "",
    rate: 0,
    balance: 0,
    deposit: 0,
  });

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/createCustomer",
        formData
      );
      if (response.status === 201) {
        onClose();
        window.location.reload();
      }
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullScreen={fullScreen}>
      <DialogTitle>Add Customer</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="description"
          label="Description"
          type="text"
          fullWidth
          value={formData.description}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="status"
          label="Status"
          type="text"
          fullWidth
          value={formData.status}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="rate"
          label="Rate"
          type="number"
          fullWidth
          value={formData.rate}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="balance"
          label="Balance"
          type="number"
          fullWidth
          value={formData.balance}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="deposit"
          label="Deposit"
          type="number"
          fullWidth
          value={formData.deposit}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCustomerModal;
