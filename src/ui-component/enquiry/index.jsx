import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEnquiries, updateEnquiry } from "../../container/enquirycontainer/slice";

export default function InstituteEnquiries() {

  const dispatch = useDispatch();
  const { enquiries, loading, error } = useSelector(state => state.enquiry);

  useEffect(() => {
    dispatch(getEnquiries());
  }, [dispatch]);

  if (loading) return <p style={{padding:"20px"}}>Loading enquiries...</p>;
  if (error) return <p style={{padding:"20px",color:"red"}}>{error}</p>;
  if (enquiries.length === 0) return <p style={{padding:"20px"}}>No enquiries found.</p>;

  return (

    <div style={{padding:"25px"}}>

      {/* Heading */}

      <h2 style={{
        fontSize:"22px",
        fontWeight:"600",
        marginBottom:"20px"
      }}>
        Enquiries
      </h2>


      {/* Cards Container */}

      <div style={{
        display:"flex",
        flexWrap:"wrap",
        gap:"20px"
      }}>



        {enquiries.map((enquiry)=>{

          const statusColor =
            enquiry.status==="Pending"
            ? "#f4b400"
            : enquiry.status==="Approved"
            ? "#28a745"
            : "#dc3545";


          return(

            <div
            key={enquiry._id}

            style={{

              width:"420px",
              background:"#fff",
              borderRadius:"12px",
              padding:"20px",
              boxShadow:"0px 3px 10px rgba(0,0,0,0.15)",
              border:"1px solid #eee"

            }}

            >


              {/* Top Section */}

              <div style={{

                display:"flex",
                alignItems:"center",
                marginBottom:"15px"

              }}>


                {/* Circle Icon */}

                <div style={{

                  width:"45px",
                  height:"45px",
                  borderRadius:"50%",
                  background:"#2b6cb0",
                  color:"#fff",
                  display:"flex",
                  alignItems:"center",
                  justifyContent:"center",
                  fontSize:"20px",
                  fontWeight:"bold",
                  marginRight:"15px"

                }}>
                  {(enquiry.studentId?.name || enquiry.name)
                  ?.charAt(0)
                  .toUpperCase()}
                </div>


                {/* Name */}

                <div>

                  <div style={{

                    fontWeight:"600",
                    fontSize:"16px"

                  }}>
                    {enquiry.studentId?.name || enquiry.name}
                  </div>


                  <div style={{
                    color:"#666",
                    fontSize:"14px"
                  }}>
                    {enquiry.studentId?.phone || enquiry.phone}
                  </div>

                </div>

              </div>



              {/* Details */}

              <div style={{
                fontSize:"14px",
                marginBottom:"12px"
              }}>

                <div>
                  <b>Qualification:</b> {enquiry.qualification}
                </div>

                <div>
                  <b>Course:</b> {enquiry.courseId?.courseName || "N/A"}
                </div>

                <div>
                  <b>Description:</b> {enquiry.description}
                </div>

              </div>



              {/* Bottom Row */}

              <div style={{

                display:"flex",
                justifyContent:"space-between",
                alignItems:"center"

              }}>


                {/* Status */}

                <div style={{

                  padding:"6px 14px",
                  borderRadius:"20px",
                  color:"#fff",
                  fontSize:"13px",
                  fontWeight:"bold",
                  background:statusColor

                }}>
                  {enquiry.status}
                </div>



                {/* Buttons */}

                {enquiry.status==="Pending" && (

                  <div style={{display:"flex",gap:"10px"}}>

                    <button

                    style={{

                      border:"none",
                      background:"#28a745",
                      color:"#fff",
                      padding:"6px 14px",
                      borderRadius:"6px",
                      cursor:"pointer"

                    }}

                    onClick={()=>dispatch(updateEnquiry({

                      id: enquiry._id,
                      status:"Approved"

                    }))}

                    >
                      Approve
                    </button>



                    <button

                    style={{

                      border:"none",
                      background:"#dc3545",
                      color:"#fff",
                      padding:"6px 14px",
                      borderRadius:"6px",
                      cursor:"pointer"

                    }}

                    onClick={()=>dispatch(updateEnquiry({

                      id: enquiry._id,
                      status:"Rejected"

                    }))}

                    >
                      Reject
                    </button>

                  </div>

                )}


              </div>


            </div>

          )

        })}


      </div>

    </div>

  );
}