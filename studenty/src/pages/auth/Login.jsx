import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./AuthSlice";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, Typography, Alert } from "@mui/material";
import { teal } from "@mui/material/colors";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("username", email);
    console.log("password", password);
    try {
      await dispatch(login({ email, password })).unwrap();
      navigate("/");
    } catch (err) {
      setError("Failed to login. Please check your credentials.");
    }
  };

  return (
    <Box
      className="flex items-center justify-center min-h-screen bg-primary"
      sx={{ width: "100vw", height: "100vh" }}
    >
      <Box
        className="p-8 rounded-lg shadow-lg"
        sx={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "white",
          borderRadius: "12px",
        }}
      >
        <Typography
          variant="h4"
          className="text-center mb-6 text-gray-900"
          gutterBottom
        >
          Login
        </Typography>
        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            InputProps={{
              style: { borderRadius: "8px" },
            }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{
              style: { borderRadius: "8px" },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{
              backgroundColor: teal[500],
              "&:hover": {
                backgroundColor: teal[700],
              },
            }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
}
