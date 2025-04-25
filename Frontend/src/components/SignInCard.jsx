import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
// import ForgotPassword from "./ForgotPassword";
import { AuthContext } from "../contexts/AuthContexts";
import { Snackbar } from "@mui/material";
import { Card } from "./SignInDesign";

export default function SignInCard() {
  const [fullname, setFullname] = React.useState();
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();
  const [error, setError] = React.useState();
  const [message, setMessage] = React.useState();

  const [formState, setFormState] = React.useState(0);

  const [fullnameError, setFullnameError] = React.useState(false);
  const [fullnameErrorMessage, setFullnameErrorMessage] = React.useState("");
  const [usernameError, setUsernameError] = React.useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validateInputs = () => {
    let isValid = true;

    if (formState === 1 && (!fullname || fullname.trim() === "")) {
      setFullnameError(true);
      setFullnameErrorMessage("Please enter your name");
      isValid = false;
    } else {
      setFullnameError(false);
      setFullnameErrorMessage("");
    }

    if (!username || username.trim() === "") {
      setUsernameError(true);
      setUsernameErrorMessage("Please enter your username");
      isValid = false;
    } else {
      setUsernameError(false);
      setUsernameErrorMessage("");
    }

    if (!password) {
      setPasswordError(true);
      setPasswordErrorMessage("Password required");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  let handleAuth = async () => {
    try {
      if (formState === 0) {
        let result = await handleLogin(username, password);
        setUsername("")
        setPassword("");
      }
      if (formState === 1) {
        let result = await handleRegister(fullname, username, password);
        console.log(result);
        setMessage(result);
        setOpen(true);
        setUsername("")
        setError("");
        setFormState(0);
        setPassword("");
      }
    } catch (e) {
      // Extract the actual string safely
      let message = e?.response?.data?.message;

      console.log("message to show:", message);
      setError(message);
    }
  };

  const handleClick = () => {
    validateInputs();
    handleAuth();
  };

  return (
    <Card variant="outlined">
      <Box sx={{ display: { xs: "flex", md: "none" } }}></Box>

      <div>
        <Button
          variant={formState === 0 ? "contained" : "outlined"}
          
          onClick={() => {
            setFormState(0);
            setOpen(false);
          }}
        >
          Sign in
        </Button>
        <Button
          variant={formState === 1 ? "contained" : "outlined"}
          onClick={() => {
            setFormState(1);
            setOpen(false);
          }}
        >
          Sign Up
        </Button>
      </div>
      <Box
        component="form"
        noValidate
        sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2}}
      >
        {formState === 1 ? (
          <FormControl>
            <FormLabel htmlFor="fullname">Full Name</FormLabel>
            <TextField
              error={fullnameError}
              helperText={fullnameErrorMessage}
              id="fullname"
              type="fullname"
              name="fullname"
              placeholder=""
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={fullnameError ? "error" : "primary"}
              onChange={(e) => setFullname(e.target.value)}
            />
          </FormControl>
        ) : (
          <></>
        )}

        <FormControl>
          <FormLabel htmlFor="username">Username</FormLabel>
          <TextField
            error={usernameError}
            helperText={usernameErrorMessage}
            id="username"
            type="username"
            name="username"
            placeholder=""
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={usernameError ? "error" : "primary"}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <Box sx={{ display: "flex", justifyContent: "space-between",}}>
            <FormLabel htmlFor="password">Password</FormLabel>
            {/* {formState === 0 && (
              <Link
                component="button"
                type="button"
                onClick={handleClickOpen}
                variant="body2"
                sx={{ alignSelf: "baseline", color: "#fff",}}
              >
                Forgot your password?
              </Link>
            )} */}
          </Box>

          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="password"
            placeholder=""
            type="password"
            id="password"
            autoComplete="current-password"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={passwordError ? "error" : "primary"}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        {/* {formState === 0 && open && (
          <ForgotPassword open={open} handleClose={handleClose} />
        )} */}

        {error && <p style={{ color: "red" }}>{error}</p>}
        <p style={{ color: "green" }}>{message}</p>

        <Snackbar open={open} autoHideDuration={4000} message={message} />

        <Button
          type="button"
          fullWidth
          variant="contained"
          onClick={handleClick}
        >
          {formState === 0 ? "Login" : "Register"}
        </Button>
      </Box>
    </Card>
  );
}
