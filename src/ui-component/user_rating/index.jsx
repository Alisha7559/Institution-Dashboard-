import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, CircularProgress, Box } from "@mui/material";

// ✅ Redux Action
import { getRating } from "../../container/RatingContainer/slice";

// ✅ Custom Table Components
import TableHead from "../../utils/TableHead";
import TableRows from "../../utils/TableRows";

export default function Feedback() {
  const dispatch = useDispatch();

  /* ===== REDUX STATE ===== */
  const { list , loading } = useSelector(
    (state) => state.rating|| {}
  );

  console.log("list",list);
  
  /* ===== FETCH ON LOAD ===== */
  useEffect(() => {
    dispatch(getRating());
  }, [dispatch]);

  /* ===== FORMAT DATA ===== */
  const formattedData = useMemo(() => {
    return (list || []).map((item) => ({
      _id: item._id,
      Student: item.studentid.email,
      course: item.courseid.courseName || "dfghj",
      rating: item.rating || 0,
      message: item.message || "-",
      createdOn: item.submitted_at || ""
    }));
  }, [list]);

  /* ========= TABLE CONFIG ========= */

  const keys = [
    "Student",
    "course",
    "rating",
    "message",
    "createdOn"
  ];

  const config = {
    Student: {
      label: "Student",
      type: "text"
    },
    course: {
      label: "Course",
      type: "text"
    },
    rating: {
      label: "Rating",
      type: "text"
    },
    message: {
      label: "Message",
      type: "text"
    },
    createdOn: {
      label: "Date",
      type: "date"
    }
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <h2>Student Feedback</h2>

      <Table>
        {/* ✅ Table Header */}
        <TableHead
          keys={keys}
          config={config}
          hasAction={false}
        />

        {/* ✅ Loading */}
        {loading ? (
          <Box sx={{ textAlign: "center", padding: "20px" }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableRows
            data={formattedData}
            keys={keys}
            config={config}
            currentPage={1}
            tableLimit={10}
            hasActionRow={false}
            slNo={true}
            msg="No Feedback Found"
          />
        )}
      </Table>
    </Box>
  );
}