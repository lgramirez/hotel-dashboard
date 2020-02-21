import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://digitalx.com.bo/">
        DigitalX
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignIn() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    logUser();
  };

  const handleChange = event => {
    console.log(event.target.name + " " + event.target.value);
    if (event.target.name === "userId") {
      setUserId(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  };

  const logUser = () => {
    const data = JSON.stringify({
      user: { username: userId, password: password }
    });
    console.log(data);
    fetch("http://api.digitalx.com.bo/json/log", {
      method: "POST",
      mode: "no-cors",
      body: data,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then(res => console.log(res.json()))
      .then(data => console.log(data))
      .catch(error => console.error("Error:", error));
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Ingresa a Pymer
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userId"
            label="ID de Usuario"
            name="userId"
            autoComplete="userId"
            autoFocus
            value={userId}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Recuérdame"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Ingresa
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Olvidaste la contraseña?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
