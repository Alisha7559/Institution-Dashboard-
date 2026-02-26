import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEnquiries } from "../../container/enquirycontainer/slice";

const Enquiry = () => {

  const dispatch = useDispatch();

  const { enquiries = [], loading } = useSelector(
    (state) => state.enquiry || {}
  );

  useEffect(() => {
    dispatch(getEnquiries());
  }, [dispatch]);


  return (

    <div style={{ padding: "20px" }}>

      <h2>Enquiries</h2>

      {loading && <p>Loading...</p>}


      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
        gap: "20px"
      }}>


        {enquiries.map((enquiry) => (

          <div key={enquiry._id}

            style={{

              border: "1px solid #ddd",

              borderRadius: "10px",

              padding: "15px",

              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",

              background: "#fff"

            }}

          >

            {/* Name */}

            <h3>

              {enquiry.studentId?.name}

            </h3>


            {/* Email */}

            <p>

              {enquiry.studentId?.email}

            </p>


            {/* Phone */}

            <p>

              📞 {enquiry.studentId?.phone}

            </p>


            {/* Qualification */}

            <p>

              🎓 {enquiry.studentId?.qualification}

            </p>


            {/* Course */}

            <p>

              📘 Course:

              <b>

                {enquiry.courseId?.courseName}

              </b>

            </p>


          </div>

        ))}

      </div>

    </div>

  );

};

export default Enquiry;