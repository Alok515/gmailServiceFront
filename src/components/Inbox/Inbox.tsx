
import { useEffect, useState } from "react";
import axios from 'axios';
import MUIDataTable from "mui-datatables";
import Columns from './Columns';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import  Box  from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Backdrop  from "@mui/material/Backdrop";
import { styled } from "@mui/material/styles";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';


const MUiDataModified = styled(MUIDataTable)(({ theme }) => ({
  whiteSpace: 'nowrap',
  position: 'relative',
  width: '100%',
  height: "95%"
}));

const Inbox = () => {
  // Mock email data
  const [messages, setMessage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };



  useEffect(()=>{
    fetchData()
  },[]);

  //const newData= useMemo(()=> messages, [messages]);

  const fetchData = async()=>{
    setLoading(true);
    await axios.get("https://us-central1-gmailapi-394514.cloudfunctions.net/GmailServiceApi/api/getMessages")
      .then(res => {
        //console.log(res.data.messages);
        setMessage(res.data.messages);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      })
  }

  const displayMsg = (rowData:any) =>{
    setRowData(rowData);
    handleOpen();
  }

  const handleDelete =async (e:any)=>{
    e.preventDefault();
    const idToDelete = String(rowData[0]);
    const url = `https://us-central1-gmailapi-394514.cloudfunctions.net/GmailServiceApi/api/deleteMessage?messageId=${idToDelete}`;
    await axios.delete(url)
      .then(res => {
        if(res.status === 200){
          alert("Success Msg deleted successfully");
          const Index = messages.findIndex(x => x.id === idToDelete);
          setMessage(msgs => msgs.filter((msg, i)=> i !== Index));

          console.log("deleted successfully");
        }
      })
      .catch(err => { console.error(err);})
  }

  const options = {
    search: true,
    download: false,
    print: false,
    viewColumns: true,
    filter: true,
    responsive: "standard",
    filterType: "dropdown",
    onRowClick: (rowData:any) => {displayMsg(rowData)},
    delete:false
  };


const card = (
  <>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Detailed Message
      </Typography>
      <Typography variant="h5" component="div">
        From: {rowData[1]}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Subject: {rowData[3]}
      </Typography>
      <Typography variant="body2">
        Message
        <br />
        {rowData[4]}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" variant="outlined">Close</Button>
      <Button size="medium" variant="outlined" 
      startIcon={<DeleteIcon/>}
      onClick={handleDelete}
      color="warning"
      >Delete</Button>
    </CardActions>
  </>
);


  return (<div className="flex justify-center items-center">
    {loading ? (
    <ThemeProvider theme={createTheme()}>
    <Box sx={{width:'100vh', height:'100vh'}}>
      <Skeleton/>
      <Skeleton animation="wave"/>
      <Skeleton animation="wave"/>
      <Skeleton animation="wave"/>
      <Skeleton animation="wave"/>
      <Skeleton animation="wave"/>
      <Skeleton animation="wave"/>
      <Skeleton animation={false}/>
      </Box>
      </ThemeProvider>
      ) : (

      <ThemeProvider theme={createTheme()}>
        <MUiDataModified 
      title={"Message List"}
      data={messages}
      columns={Columns}
      options={options}

      />
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <Card variant="outlined">{card}</Card>
      </Backdrop>
      </ThemeProvider>
    )}
    </div>
  );
};



export default Inbox;
