import {Flex, Button, Text, Box,
    Modal,
    ModalHeader,
    ModalOverlay,
    ModalCloseButton,
    ModalContent,
    ModalBody,
    ModalFooter,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    useDisclosure
} from '@chakra-ui/react'; 
import axios from 'axios';
import { useRef, useState } from 'react';

const Topbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [recipient, setRecipient] = useState(""); // State for recipient email
    const [subject, setSubject] = useState(""); // State for email subject
    const [body, setBody] = useState(""); // State for email body
    const emailRef = useRef(null)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSend = (e:any)=>{
        e.preventDefault();
        if(recipient==="" || subject==="" || body===""){
            alert("Please enter All The required information");
        }
        //handle form here
    const url="https://us-central1-gmailapi-394514.cloudfunctions.net/GmailServiceApi/api/sendMessage";
    axios.post(url, {
      to: recipient,
      subject: subject,
      text: body
    })
      .then(res=>{
        if(res.status===200){
          alert("success message sent");
        }
      })
      .catch(err=>console.log(err));
      setRecipient("");
      setSubject("");
      setBody("");
    onClose();
    }

  return (<>
    <Flex wrap="wrap" gap="20px" alignItems="center">
        <Box w="200px" h="50px">
        <Button onClick={onOpen} bg="lightblue">Compose</Button>
        </Box>
        <Box h="50px" textAlign="center">
            <Text>This is Gmail Service....@Alok</Text>
        </Box>
    </Flex>
    <Modal
          initialFocusRef={emailRef}
          //finalFocusRef={subRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Compose Email</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>To</FormLabel>
                <Input ref={emailRef} placeholder='To email' 
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                />
              </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>Subject</FormLabel>
                <Input placeholder='Important'
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Message</FormLabel>
                <Textarea placeholder='Message......' 
                value={body}
                onChange={(e) => setBody(e.target.value)}
                />
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={handleSend}>
                Send
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    </>
  )
}

export default Topbar

