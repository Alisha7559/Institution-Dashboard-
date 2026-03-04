import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getInstituteEnquiry,
  updateEnquiry
} from "../../container/enquirycontainer/slice";

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
    <div style={{
      padding: "30px",
      backgroundColor: "#f4f6f9",
      minHeight: "100vh"
    }}>
      <h2 style={{
        marginBottom: "25px",
        color: "#0b2a4a",
        fontWeight: "600"
      }}>
        Institute Enquiries
      </h2>

      {enquiries.map((item) => {

        /* ✅ FIXED HERE */
        const studentName =
          item?.studentId?.studentname ||
          item?.name ||
          "N/A";

        const studentEmail =
          item?.studentId?.email ||
          item?.email ||
          "N/A";

        const studentPhone =
          item?.studentId?.phone ||
          item?.phone ||
          "N/A";

        const courseName =
          item?.courseId?.courseName ||
          item?.courseId?.name ||
          "N/A";

        return (
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
            <p><b>Student Name:</b> {studentName}</p>
            <p><b>Email:</b> {studentEmail}</p>
            <p><b>Phone:</b> {studentPhone}</p>
            <p><b>Qualification:</b> {item?.qualification || "N/A"}</p>
            <p><b>Course:</b> {courseName}</p>
            <p><b>Description:</b> {item?.description || "N/A"}</p>

            <p>
              <b>Status:</b>{" "}
              <span style={{
                padding: "5px 12px",
                borderRadius: "20px",
                fontSize: "13px",
                fontWeight: "500",
                backgroundColor:
                  item.status === "Approved"
                    ? "#d4edda"
                    : item.status === "Rejected"
                    ? "#f8d7da"
                    : "#fff3cd"
              }}>
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
                  style={approveBtn}
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
                  style={rejectBtn}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

const approveBtn = {
  padding: "8px 18px",
  marginRight: "10px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
  backgroundColor: "#040336",
  color: "#fff"
};

const rejectBtn = {
  padding: "8px 18px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
  backgroundColor: "#fd7e14",
  color: "#fff"
};