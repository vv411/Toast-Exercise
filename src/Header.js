import React, {useState , useEffect} from 'react';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';

import { createMockFormSubmission , onMessage, saveLikedFormSubmission} from './service/mockServer';

export default function Header() {

  const [open, setOpen] = useState(false);
  const [toastData, setToastData] = useState({});

  useEffect(() => {
    onMessage(getNewToastData);
  }, []);

  //callback function to pass to the mockServer
  const getNewToastData = (obj) => {
    const data = obj.data;

    setOpen(true);
    setToastData({
        ...data
      });
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleLike = () => {

    setToastData(prev => ({
      ...prev,
      liked : true
    }));

    const attemptSaveForm = (maxAttempts  = 3) => {
      saveLikedFormSubmission(toastData)
      .then (res => res)
      .catch (err => {
        console.log(err);
        if (maxAttempts > 0) {
          attemptSaveForm (maxAttempts - 1);
        } else {
          console.log("Save failed");
        }

      })
    }

    attemptSaveForm();

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="primary" size="small" onClick={handleLike}>
        LIKE
      </Button>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
        <CloseIcon fontSize="small" />
        </IconButton>
    </React.Fragment>
    );

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{marginRight: 2}}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{flexGrow: 1}}>
            Toast Exercise
          </Typography>
          <Button
            variant="contained"
            size="small"
            color="secondary"
            onClick={() => createMockFormSubmission()}
          >
            New Submission
          </Button>
        </Toolbar>
      </AppBar>

      <Snackbar
        open={open}
        autoHideDuration={10000}
        close={handleClose}
        message={`${toastData.firstName} ${toastData.lastName} ${toastData.email}`}
        action={action}
      />

    </Box>
  );
}
