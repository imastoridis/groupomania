import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import MessageModify from '../components/pages/messages/MessageModify';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));



export default function IconLabelButtons() {
  const classes = useStyles();
  


  const token = Cookies.get('token')
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {

    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    axios.delete("http://localhost:8080/api/messages", payload)
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="IconLabelButtons">

      {/* This Button uses a Font Icon, see the installation instructions in the Icon component docs. */}

      <Button
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<CloudUploadIcon />}
      >
        Upload
      </Button>


      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<DeleteIcon />}
        onClick={handleSubmit}
      >
        Delete
      </Button>
    </div >
  );
}
