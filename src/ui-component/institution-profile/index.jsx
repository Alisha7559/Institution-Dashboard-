
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Grid, Paper, Divider, Button } from "@mui/material";
import { userMe } from "container/LoginContainer/slice";
import ProfileModal from "../dashboard/ProfileModal";
import ChangePasswordModal from "../dashboard/changepasswordmodal";

export default function InstitutionProfile() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.login.userData);
  const [loading, setLoading] = useState(true);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await dispatch(userMe());
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [dispatch]);

  if (loading) return <Typography>Loading...</Typography>;
  if (!userData || Object.keys(userData).length === 0)
    return <Typography>No profile data found.</Typography>;

  const InfoItem = ({ label, value }) => (
    <Box mb={2}>
      <Typography variant="caption" sx={{ color: "#64748b" }}>
        {label}
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 500 }}>
        {value || "N/A"}
      </Typography>
    </Box>
  );

  return (
    <Box p={4} bgcolor="rgb(230, 237, 248)">
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h3" sx={{ fontWeight: 600 }}>
          Institution Profile
        </Typography>
        <Box display="flex" gap={2}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#0f172a", textTransform: "none", borderRadius: 2 }}
            onClick={() => setOpenProfileModal(true)}
          >
            Edit Profile
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#0f172a", textTransform: "none", borderRadius: 2 }}
            onClick={() => setOpenPasswordModal(true)}
          >
            Change Password
          </Button>
        </Box>
      </Box>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
        {/* Profile Image */}
        <Box textAlign="left" mb={3}>
          {userData?.profileImage ? (
            <img
              src={`http://localhost:7000/uploads/${userData.profileImage}`}
              alt="Profile"
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                objectFit: "cover",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />
          ) : (
            <Box
              sx={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                bgcolor: "#cbd5e1",
                display: "inline-block",
              }}
            />
          )}
        </Box>

        {/* Basic Info */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <InfoItem label="Institution Name" value={userData.institutionName} />
            <InfoItem label="Institution Type" value={userData.institutionType} />
            <InfoItem label="Year Established" value={userData.yearEstablished} />
            <InfoItem label="Registration Number" value={userData.registrationNumber} />
            <InfoItem label="Accreditation Authority" value={userData.accreditationAuthority} />
            <InfoItem label="GST Number" value={userData.gstNumber} />
          </Grid>

          <Grid item xs={12} md={6}>
            <InfoItem label="Official Email" value={userData.officialEmail} />
            <InfoItem label="Official Phone" value={userData.officialPhone} />
            <InfoItem label="Website" value={userData.website} />
            <InfoItem
              label="Address"
              value={`${userData.address || ""}, ${userData.city || ""}, ${
                userData.state || ""
              }, ${userData.country || ""} - ${userData.postalCode || ""}`}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Certificates */}
        {userData?.certificate && userData.certificate.length > 0 && (
          <Box>
            <Typography variant="h3" sx={{ mb: 2, fontWeight: 600 }}>
              Registration Certificates
            </Typography>

            <Grid container spacing={2}>
              {(Array.isArray(userData.certificate)
                ? userData.certificate
                : [userData.certificate]
              ).map((file, idx) => (
                <Grid item xs={12} md={4} key={idx}>
                  {file.endsWith(".pdf") ? (
                    <iframe
                      src={`http://localhost:7000/uploads/${file}`}
                      width="100%"
                      height="300px"
                      style={{ borderRadius: 12, border: "1px solid #e2e8f0" }}
                      title={`Certificate ${idx + 1}`}
                    />
                  ) : (
                    <Box textAlign="center">
                      <img
                        src={`http://localhost:7000/uploads/${file}`}
                        alt={`Certificate ${idx + 1}`}
                        style={{
                          maxWidth: "50%",
                          borderRadius: 12,
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        }}
                      />
                    </Box>
                  )}
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Paper>

      {/* Modals */}
      {openProfileModal && (
        <ProfileModal
          key={userData?.id}
          user={userData}
          mode="edit"
          onClose={() => setOpenProfileModal(false)}
        />
      )}

      {openPasswordModal && (
        <ChangePasswordModal
          open={openPasswordModal}
          onClose={() => setOpenPasswordModal(false)}
        />
      )}
    </Box>
  );
}