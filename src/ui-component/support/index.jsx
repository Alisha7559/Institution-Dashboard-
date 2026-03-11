import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getSupportTypes,
  createSupportRequest,
  getMyRequests
} from "../../container/supportcontainer/slice";

import {
  Box,
  Select,
  MenuItem,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Paper,
  Dialog
} from "@mui/material";


const Support = () => {

const dispatch = useDispatch();

const { types, requests } = useSelector(state => state.support);

const [supportType, setSupportType] = useState("");
const [message, setMessage] = useState("");

const [open,setOpen] = useState(false);



/* ================= LOAD DATA ================= */

useEffect(() => {

dispatch(getSupportTypes());
dispatch(getMyRequests());

}, [dispatch]);



/* ================= SEND REQUEST ================= */

const sendRequest = () => {

if (!supportType || !message) {

alert("Please fill all fields");
return;

}

dispatch(createSupportRequest({
supportType,
message
}));

setMessage("");
setSupportType("");
setOpen(false);

};



return (

<Box sx={{p:3}}>

{/* ================= HEADER ================= */}

<Box
display="flex"
justifyContent="space-between"
alignItems="center"
mb={3}
>

<Typography
variant="h5"
sx={{
fontWeight:600,
color:"#0f172a"
}}
>
Support
</Typography>


<Button
variant="contained"
onClick={()=>setOpen(true)}
sx={{
background:"#0f172a",
"&:hover":{background:"#020617"}
}}
>
+ Add Request
</Button>

</Box>



{/* ================= REQUEST TABLE ================= */}

<Paper
sx={{
borderRadius:3,
overflow:"hidden",
borderLeft:"5px solid #ea580c"
}}
>

<Table>

<TableHead>

<TableRow sx={{background:"#f8fafc"}}>

<TableCell><b>Support Type</b></TableCell>
<TableCell><b>Message</b></TableCell>
<TableCell><b>Status</b></TableCell>
<TableCell><b>Reply</b></TableCell>

</TableRow>

</TableHead>


<TableBody>

{requests?.length > 0 ? (

requests.map((r) => (

<TableRow key={r._id} hover>

<TableCell>{r.supportType?.name}</TableCell>

<TableCell>{r.message}</TableCell>

<TableCell
sx={{
fontWeight:600,
color:r.status==="replied" ? "green" : "#ea580c"
}}
>
{r.status}
</TableCell>

<TableCell>
{r.reply ? r.reply : "-"}
</TableCell>

</TableRow>

))

) : (

<TableRow>

<TableCell colSpan={4} align="center">
No Requests Found
</TableCell>

</TableRow>

)}

</TableBody>

</Table>

</Paper>



{/* ================= ADD REQUEST MODAL ================= */}

<Dialog
open={open}
onClose={()=>setOpen(false)}
>

<Box sx={{p:3,width:420}}>

<Typography variant="h6" mb={2}>
Create Support Request
</Typography>


<Select
fullWidth
value={supportType}
onChange={(e) => setSupportType(e.target.value)}
displayEmpty
>

<MenuItem value="">
Select Support Type
</MenuItem>

{types.map(t => (

<MenuItem key={t._id} value={t._id}>
{t.name}
</MenuItem>

))}

</Select>


<TextField
label="Message"
fullWidth
multiline
rows={4}
sx={{ mt:2 }}
value={message}
onChange={(e)=>setMessage(e.target.value)}
/>


<Button
variant="contained"
fullWidth
sx={{
mt:3,
background:"#ea580c",
"&:hover":{background:"#c2410c"}
}}
onClick={sendRequest}
>
Send Request
</Button>

</Box>

</Dialog>


</Box>

);

};

export default Support;