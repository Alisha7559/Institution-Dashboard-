import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  InputAdornment,
  IconButton,

} from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { userMe } from "container/LoginContainer/slice";
import CloseIcon from "@mui/icons-material/Close";

export default function ChangePasswordModal({ open, onClose }) {
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Snackbar state
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      setSnackbar({ open: true, message: "Passwords do not match", severity: "error" });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:7000/api/change-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Error updating password");

      setSnackbar({ open: true, message: data.message || "Password updated successfully", severity: "success" });

      await dispatch(userMe());

      setTimeout(() => {
        onClose();
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }, 1000);

    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: err.message, severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            width: 400,
            bgcolor: "white",
            p: 4,
            borderRadius: 2,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h3" sx={{ fontWeight: 600 }}>
              Change Password
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>


          {/* Old Password */}
<TextField
  label="Old Password"
  type={showOld ? "text" : "password"}
  fullWidth
  value={oldPassword}
  onChange={(e) => setOldPassword(e.target.value)}
  sx={{ mb: 2 }}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={() => setShowOld(prev => !prev)} edge="end">
          {showOld ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </InputAdornment>
    )
  }}
/>

{/* New Password */}
<TextField
  label="New Password"
  type={showNew ? "text" : "password"}
  fullWidth
  value={newPassword}
  onChange={(e) => setNewPassword(e.target.value)}
  sx={{ mb: 2 }}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={() => setShowNew(prev => !prev)} edge="end">
          {showNew ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </InputAdornment>
    )
  }}
/>

{/* Confirm Password */}
<TextField
  label="Confirm Password"
  type={showConfirm ? "text" : "password"}
  fullWidth
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
  sx={{ mb: 3 }}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={() => setShowConfirm(prev => !prev)} edge="end">
          {showConfirm ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </InputAdornment>
    ),
  }}
/>

          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            disabled={loading}
           
          >
            

            {loading ? "Updating..." : "Update Password"}
          </Button>
        </Box>
      </Modal>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}