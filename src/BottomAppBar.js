import React from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Icon from "@material-ui/core/Icon";
import { Button, Modal } from "@material-ui/core";
import { ExpensesForm } from "./components/ExpensesForm";
import { IncomesForm } from "./components/IncomesForm";
import { positions } from "@material-ui/system";
import costs from "./icons/costs.svg";
import revenues from "./icons/revenues.svg";


const useStyles = makeStyles(theme => ({
  text: {
    padding: theme.spacing(2, 2, 0)
  },
  // paper: {
  //   paddingBottom: 50
  // },
  list: {
    marginBottom: theme.spacing(2)
  },
  subheader: {
    backgroundColor: theme.palette.background.paper
  },
  appBar: {
    top: "auto",
    bottom: 0
  },
  grow: {
    flexGrow: 1
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto"
  },
  paper: {
    position: "absolute",
    height: "auto",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 4),
    outline: "none",
    top: "20%",
    left: 0,
    right: 0,
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-around"
  },
  paperButton: {
    position: "absolute",
    height: "auto",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 4),
    outline: "none",
    top: "60%",
    left: 0,
    right: 0,
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-around"
  }
}));

export default function BottomAppBar(props) {
  const { onFormInput } = props;
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [openExpenses, setOpenExpenses] = React.useState(false);
  const [openIncomes, setOpenIncomes] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenExpenses = () => {
    setOpenExpenses(true);
  };

  const handleCloseExpenses = () => {
    setOpenExpenses(false);
  };
  const handleOpenIncomes = () => {
    setOpenIncomes(true);
  };

  const handleCloseIncomes = () => {
    setOpenIncomes(false);
  };

  const onFormInputted = data => {
    onFormInput(data);
    setOpenExpenses(false);
    setOpenIncomes(false);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <SimpleModal />

      <CssBaseline />

      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <NavLink exact to="/">
            <IconButton edge="start" color="inherit" aria-label="Charts">
              <Icon fontSize="large">dashboard</Icon>
            </IconButton>
          </NavLink>
          <NavLink to="/history">
            <IconButton
              edge="start"
              color="inherit"
              label="History"
              aria-label="History"
            >
              <Icon fontSize="large">list_alt</Icon>
            </IconButton>
          </NavLink>
          <Fab
            color="secondary"
            aria-label="Add"
            className={classes.fabButton}
            onClick={handleOpen}
          >
            <AddIcon />
          </Fab>
          <div className={classes.grow} />
          <NavLink to="/Charts">
            <IconButton color="inherit" aria-label="Charts">
              <Icon fontSize="large">assessment</Icon>
            </IconButton>
          </NavLink>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );

  function SimpleModal() {
    return (
      <React.Fragment>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        >
          <div className={classes.paperButton}>
            <Button
              style={{ fontSize: 20, marginLeft: 10 }}
              color="secondary"
              variant="contained"
              onClick={handleOpenExpenses}
            >
              Dodaj wydatki
              <img src={costs} alt="costs" />
            </Button>
            <Button
              style={{ fontSize: 20, marginLeft: 10 }}
              color="primary"
              variant="contained"
              onClick={handleOpenIncomes}
            >
              Dodaj przychody
              <img src={revenues} alt="revenues" />
            </Button>
          </div>
        </Modal>

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={openExpenses}
          onClose={handleCloseExpenses}
        >
          <div className={classes.paper}>
            <ExpensesForm onFormInput={onFormInputted} />
          </div>
        </Modal>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={openIncomes}
          onClose={handleCloseIncomes}
        >
          <div className={classes.paper}>
            <IncomesForm onFormInput={onFormInputted} />
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}
