import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { useState } from 'react';

function App(): JSX.Element {

  const [countFetch, setCountFetch] = useState<number>(0);
  const [isLoading, setIsloading] = useState<boolean>(false);

  async function makeRequests(count: number) {
    setIsloading(true);
    const requests = Array.from({ length: count }, () => fetch('http://alb-ec2-instances-asg-web-app-1520385946.us-east-1.elb.amazonaws.com', {mode: 'no-cors'}));
    await Promise.all(requests);
    
    setIsloading(false);
  }

  return (
    <Box sx={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
      <Typography variant='h4'>APP TO MAKE REQUEST TO http://alb-ec2-instances-asg-web-app-1520385946.us-east-1.elb.amazonaws.com/info</Typography>

      <Box mt={10} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
        <Typography fontSize={20}>Do you want to send {countFetch} request(s)?</Typography>
        <TextField value={countFetch} onChange={(event) => {setCountFetch(Number(event.target.value))}} />
      </Box>
      
      <Box mt={10}>
        {isLoading ? (
          <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
            <Typography>Making Request</Typography>
            <CircularProgress />
          </Box>
          ) : <Button variant='contained' onClick={()=>{makeRequests(countFetch)}}>Make request</Button>}
      </Box>
    </Box>
  );
}

export default App;
