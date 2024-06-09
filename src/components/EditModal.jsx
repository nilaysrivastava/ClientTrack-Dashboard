import React, { useState, useEffect } from "react";
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

const EditModal = ({ open, onClose, content, onSave }) => {
  const [formData, setFormData] = useState(content);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setFormData(content);
  }, [content]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullScreen={fullScreen}>
      <DialogTitle>Edit Details</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          value={formData?.name || ""}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="description"
          label="Description"
          type="text"
          fullWidth
          value={formData?.description || ""}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="status"
          label="Status"
          type="text"
          fullWidth
          value={formData?.status || ""}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="rate"
          label="Rate"
          type="number"
          fullWidth
          value={formData?.rate || ""}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="balance"
          label="Balance"
          type="number"
          fullWidth
          value={formData?.balance || ""}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="deposit"
          label="Deposit"
          type="number"
          fullWidth
          value={formData?.deposit || ""}
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

export default EditModal;
