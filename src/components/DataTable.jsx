import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Checkbox,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Grid,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InfoIcon from "@material-ui/icons/Info";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import ViewModal from "./ViewModal";
import EditModal from "./EditModal";

const DataTable = ({ searchQuery }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentRow, setCurrentRow] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          "http://localhost:4000/api/displayCustomers"
        );
        setData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          "http://localhost:4000/api/displayCustomers"
        );
        setData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchQuery]);

  const handleMenuOpen = (event, row) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setCurrentRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentRow(null);
  };

  const handleView = () => {
    setModalContent(currentRow);
    setViewModalOpen(true);
    handleMenuClose();
  };

  const handleEdit = () => {
    setModalContent(currentRow);
    setEditModalOpen(true);
    handleMenuClose();
  };

  const handleDelete = async () => {
    await axios.delete(
      `http://localhost:4000/api/deleteCustomer/${currentRow._id}`
    );
    setData(data.filter((item) => item._id !== currentRow._id));
    handleMenuClose();
  };

  const handleEditSave = async (updatedRow) => {
    try {
      const result = await axios.put(
        `http://localhost:4000/api/updateCustomer/${updatedRow._id}`,
        updatedRow
      );
      setData(
        data.map((item) => (item._id === updatedRow._id ? result.data : item))
      );
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

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

  const filteredData = data.filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const getRowStyle = (isSelected) => {
    return isSelected ? { backgroundColor: "#f0f8ff" } : {};
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={
                      selected.length > 0 && selected.length < data.length
                    }
                    checked={data.length > 0 && selected.length === data.length}
                    onChange={handleSelectAllClick}
                    style={{
                      color: selected.length > 0 ? "#2B61FF" : "#000000",
                    }}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Rate</TableCell>
                <TableCell>Balance</TableCell>
                <TableCell>Deposit</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                      style={getRowStyle(isItemSelected)}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                          style={{
                            color: selected.length > 0 ? "#2B61FF" : "#000000",
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell>
                        <span style={getStatusStyle(row.status)}>
                          {row.status}
                        </span>
                      </TableCell>
                      <TableCell>₹{row.rate}</TableCell>
                      <TableCell>
                        <Typography
                          style={{
                            color: row.balance < 0 ? "red" : "green",
                          }}
                        >
                          ₹{row.balance}
                        </Typography>
                      </TableCell>
                      <TableCell>₹{row.deposit}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          onClick={(event) => handleMenuOpen(event, row)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15, 20, 30, 50]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Grid>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleView} style={{ color: "#2B61FF" }}>
          <ListItemText primary="View" />
          <ListItemIcon>
            <InfoIcon fontSize="small" style={{ color: "#2B61FF" }} />
          </ListItemIcon>
        </MenuItem>
        <MenuItem onClick={handleEdit} style={{ color: "#2B61FF" }}>
          <ListItemText primary="Edit" />
          <ListItemIcon>
            <EditIcon fontSize="small" style={{ color: "#2B61FF" }} />
          </ListItemIcon>
        </MenuItem>
        <MenuItem onClick={handleDelete} style={{ color: "#FF2B55" }}>
          <ListItemText primary="Delete" />
          <ListItemIcon>
            <DeleteIcon fontSize="small" style={{ color: "#FF2B55" }} />
          </ListItemIcon>
        </MenuItem>
      </Menu>
      <ViewModal
        open={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        content={modalContent}
      />
      <EditModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        content={modalContent}
        onSave={handleEditSave}
      />
    </Grid>
  );
};

export default DataTable;
