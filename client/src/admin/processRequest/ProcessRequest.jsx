import React,{useState} from 'react';
import axios from 'axios';
import { Accordion, Button,AccordionButton,AccordionItem,Box,AccordionIcon,AccordionPanel,Input,Grid,GridItem} from '@chakra-ui/react';


const ProcessRequest = () => {
    const [request,setRequest]=useState([]);
    const fetchAllProcessedRequest=async()=>{
        const {data}=await axios.get("/enrollment/requests/approved");
        setRequest(data);
        console.log(data);
    };
    const fetchAllNotProcessedRequest=async()=>{
        const {data}=await axios.get("/enrollment/requests");
        setRequest(data);
        console.log(data);
    };
    const handleApproveRequest=async(id,obj)=>{
        const {data}=await axios.get(`/enrollment/requests/approve/${id}`);
        console.log(data);
        fetchAllNotProcessedRequest();
    }

    const handleRejectRequest=async(id,obj)=>{
        const {data}=await axios.get(`/enrollment/requests/reject/${id}`);
        console.log(data);
        fetchAllNotProcessedRequest();
    }

  return (
    <React.Fragment>
         <Grid  h='100vh'
            templateRows='repeat(3, 3fr)'
            templateColumns='repeat(12, 1fr)'
            columnGap={1}
           >
        <GridItem colSpan={3} rowSpan={1} bg="yellow.400" area={'nav'} >
        <div>
        <Button colorScheme='yellow' margin='5px' onClick={()=>{
            fetchAllProcessedRequest();
        }}>Processed</Button>
        </div>
        <div>
        <Button colorScheme='yellow' margin='5px' onClick={()=>{
            fetchAllNotProcessedRequest();
        }}>NotProcessed</Button>
        </div>
        </GridItem>
        <GridItem colSpan={7}>
        <Accordion allowToggle>
            {
            request.map((r)=>
                <AccordionItem key={r._id}>
                <h2>
                <AccordionButton>
                    <Box flex='1' textAlign='left'>
                    {r.name}
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    <div>
                       <p>Name: <span>{r.name}</span></p> 
                       <p>DOB: <span>{r.DOB}</span></p> 
                       <p>Mobile:<span> {r.mobile}</span></p> 
                       <p>Email: <span>{r.email}</span></p> 
                       <p>School:<span> {r.school}</span></p>
                       <p>Organisation: <span>{r.organisation}</span></p> 
                       <p>EducationalBackground: <span>{r.educationalBackground}</span></p> 
                       <p>Occupation: <span>{r.occupation}</span></p> 
                       <p>Address: <span>{r.address}</span></p> 
                       {(r.approval=="pending")&&
                            <div>
                                <Button margin="2px" onClick={()=>{handleApproveRequest(r._id,r)}} colorScheme='yellow' size='sm'>
                                    Approve Request
                                </Button>
                                <Button margin="2px" onClick={()=>{handleRejectRequest(r._id,r)}} colorScheme='yellow' size='sm'>
                                    Reject Request
                                </Button>
                            </div>
                       }
                    </div>
                </AccordionPanel>
            </AccordionItem>
            )
            }   
            </Accordion>
            </GridItem>
            </Grid>
    </React.Fragment>
  )
}

export default ProcessRequest