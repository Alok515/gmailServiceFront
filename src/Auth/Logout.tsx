import { useEffect} from "react"
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const Logout = () => {
  const toast = useToast();
  useEffect(()=>{
    toast.promise(axios.get('https://us-central1-gmailapi-394514.cloudfunctions.net/GmailServiceApi/api/logout')
      .then((res :any) => {
        if(res.status === 200){
          
          localStorage.removeItem("user");
          setTimeout(()=>{
            window.location.href = '/';
          },1000);
        }
      }), {
        success: { title: 'Logout Success', description: 'Looks great Redirecting....' },
          error: { title: 'Error Occured', description: 'Something wrong' },
          loading: { title: 'Logging Out...', description: 'Please wait' },
      });
      
  },[]);
  return <div className="m-20 p-20 text-5xl">
    
  </div>
}

export default Logout;