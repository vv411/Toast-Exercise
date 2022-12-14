import React , { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { fetchLikedFormSubmissions } from './service/mockServer';

export default function Content() {

  const [LikedSubmissions, setLikedSubmissions] = useState([]);

  useEffect(() => {
    let result = [];

    const attemptReadForm = (maxAttempts = 3) => {
      fetchLikedFormSubmissions()
      .then(res => setLikedSubmissions(res.formSubmissions))
      .catch(err => {
        console.log(err);
        if (maxAttempts > 0) {
          attemptReadForm (maxAttempts - 1);
        } else {
          console.log("Read failed");
        }
      });
    }

    attemptReadForm();
  })

  return (
    <Box sx={{marginTop: 3}}>
      <Typography variant="h4">Liked Form Submissions</Typography>

      <Typography variant="body1" sx={{fontStyle: 'italic', marginTop: 1}}>
        {LikedSubmissions.map(item => (
          <p>{item.firstName} {item.lastName} {item.email}</p>
        ))}

      </Typography>

    </Box>
  );
}
