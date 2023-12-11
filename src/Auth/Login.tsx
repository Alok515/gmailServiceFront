
import { Box, Button, Text, Flex } from "@chakra-ui/react";
import {FaGoogle} from 'react-icons/fa6'
import axios from 'axios';
const Login = () => {


  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Implement login logic
    // Redirect to main app if successful
    axios.get('https://us-central1-gmailapi-394514.cloudfunctions.net/GmailServiceApi/gmailAuth')
      .then(res=>{
        if (res.status===200){
          const resData = res.data;
          if(resData.msg.localeCompare("Authenticated")!== 0){
            window.open(resData.uri,"_self");
          }
          else{
            localStorage.setItem("user","true");
            window.location.reload();
          }
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="flex justify-center items-center">
    <Box p={20}  border={"solid"}>
      <Flex justifyContent="center">
        <Text fontSize="3xl" fontWeight="bold">
          Login / Register
        </Text>
      </Flex>
        <Box mt={8}>
        <Text fontSize="2xl" fontWeight="bold">
          Login OR Register With Google
        </Text>
        </Box>
        <Box mt={8}>
          <Button type="submit" backgroundColor="silver" size="lg" onClick={handleSubmit} >
            Log In & Authorize With &nbsp;<FaGoogle/>
          </Button>
        </Box>
    </Box>
    </div>
  );
};

export default Login;
