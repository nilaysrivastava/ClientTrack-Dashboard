import React, { useState, useEffect } from "react";
import { Container, Paper, TextField, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DataTable from "./components/DataTable";
import AddCustomerModal from "./components/AddCustomerModal";
import { withStyles } from "@material-ui/core/styles";
import api from "./api";

const styles = (theme) => ({
  notchedOutline: {
    borderWidth: "2px",
    borderColor: "#2B61FF !important",
  },
  container: {
    [theme.breakpoints.down("sm")]: {
      padding: "10px",
    },
    [theme.breakpoints.up("md")]: {
      padding: "20px",
    },
  },
  paper: {
    padding: "20px",
    margin: "20px",
    overflowX: "auto",
    [theme.breakpoints.down("sm")]: {
      padding: "10px",
      margin: "10px",
    },
  },
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "2px",
    marginTop: "2px",
    fontSize: "1.8rem",
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.4rem",
    },
  },
  searchAndButton: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      gap: "10px",
    },
  },
  textField: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.up("md")]: {
      width: "30%",
    },
  },
  addButton: {
    backgroundColor: "#2B61FF",
    color: "white",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#2B61FF",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.up("md")]: {
      width: "auto",
    },
  },
  scrollableContent: {
    overflowX: "auto",
  },
});

const App = ({ classes }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false);
  const [data, setData] = useState([]);

  const handleSearchChange = (event) => setSearchQuery(event.target.value);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await api.get("/displayCustomers");
        setData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchQuery]);

  const handleAddCustomer = () => {
    setIsAddCustomerModalOpen(true);
  };

  const handleCloseAddCustomerModal = () => {
    setIsAddCustomerModalOpen(false);
  };

  return (
    <Container className={classes.container}>
      <div className={classes.title}>Client Track - Dashboard</div>
      <Paper elevation={3} className={classes.paper}>
        <div className={classes.searchAndButton}>
          <TextField
            className={classes.textField}
            label="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            variant="outlined"
            InputProps={{
              classes: {
                notchedOutline: classes.notchedOutline,
              },
            }}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddCustomer}
            className={classes.addButton}
          >
            Add Customer
          </Button>
        </div>
        <div className={classes.scrollableContent}>
          <DataTable data={data} searchQuery={searchQuery} />
        </div>
        <AddCustomerModal
          open={isAddCustomerModalOpen}
          onClose={handleCloseAddCustomerModal}
        />
      </Paper>
    </Container>
  );
};

export default withStyles(styles)(App);
