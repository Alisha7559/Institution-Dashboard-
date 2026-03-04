import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInstituteEnquiry, updateEnquiry } from "../../container/enquirycontainer/slice";
import {Typography} from "@mui/material";
export default function InstituteEnquiries() {

  const dispatch = useDispatch();

  const enquiries = useSelector(state => state.enquiry?.list || []);
  const loading = useSelector(state => state.enquiry?.loading);
  const error = useSelector(state => state.enquiry?.error);

  useEffect(() => {
    dispatch(getInstituteEnquiry());
  }, [dispatch]);

  if (loading) return <p style={{ padding: "20px" }}>Loading enquiries...</p>;
  if (error) return <p style={{ color: "red", padding: "20px" }}>{error}</p>;
  if (!enquiries.length) return <p style={{ padding: "20px" }}>No enquiries found.</p>;

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#f4f6f9",
        minHeight: "100vh"
      }}
    >
            <Typography variant="h2" fontWeight="bold" mb={3}

        style={{
          marginBottom: "25px",
          color: "#0b2a4a",
          fontWeight: "600"
        }}
      >
        Institute Enquiries
      </Typography>

      {enquiries.map((item) => (
        <div
          key={item._id}
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "20px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
            borderLeft: "6px solid #fd7e14"
          }}
        >
          <p><b style={{ color: "#0b2a4a" }}>Student Name:</b> {item?.studentId?.studentname || "N/A"}</p>
          <p><b style={{ color: "#0b2a4a" }}>Email:</b> {item?.studentId?.email || "N/A"}</p>
          <p><b style={{ color: "#0b2a4a" }}>Phone:</b> {item?.studentId?.phone || "N/A"}</p>
          <p><b style={{ color: "#0b2a4a" }}>Qualification:</b> {item?.qualification || "N/A"}</p>
          <p><b style={{ color: "#0b2a4a" }}>Course:</b> {item?.courseId?.courseName || "N/A"}</p>
          <p><b style={{ color: "#0b2a4a" }}>Description:</b> {item?.description || "N/A"}</p>

          <p>
            <b style={{ color: "#0b2a4a" }}>Status:</b>{" "}
            <span
              style={{
                padding: "5px 12px",
                borderRadius: "20px",
                fontSize: "13px",
                fontWeight: "500",
                backgroundColor:
                  item.status === "Approved"
                    ? "#d4edda"
                    : item.status === "Rejected"
                    ? "#f8d7da"
                    : "#fff3cd",
                color:
                  item.status === "Approved"
                    ? "#040d37"
                    : item.status === "Rejected"
                    ? "#721c24"
                    : "#ea580c"
              }}
            >
              {item?.status}
            </span>
          </p>

          {item.status === "Pending" && (
            <div style={{ marginTop: "15px" }}>
              <button
                onClick={() =>
                  dispatch(updateEnquiry({
                    id: item._id,
                    status: "Approved"
                  }))
                }
                style={{
                  padding: "8px 18px",
                  marginRight: "10px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: "#040336",
                  color: "#fff",
                  fontWeight: "500"
                }}
              >
                Approve
              </button>

              <button
                onClick={() =>
                  dispatch(updateEnquiry({
                    id: item._id,
                    status: "Rejected"
                  }))
                }
                style={{
                  padding: "8px 18px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: "#ea580c",
                  color: "#fff",
                  fontWeight: "500"
                }}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}