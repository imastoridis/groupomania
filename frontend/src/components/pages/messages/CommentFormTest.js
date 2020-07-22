import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '50ch',
    },
  },
}));

const [state, setState] = useState({
    content: "",
    id: "",
    MessageId: "",
    newMessageError: null
})

// Variables
const token = Cookies.get('token')
const [comments, setComments] = useState([]);
const [error, setError] = useState(null);

//Handlechange for form
const handleChange = (e) => {
    const { id, value } = e.target
    setState(prevState => ({
        ...prevState,
        [id]: value
    }))
}

//HandleSubmit - creates new comment, adds it to DB 
const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
        "content": state.content,
        "MessageId": props
    }
    //Gets token for user
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    axios.post("http://localhost:8080/api/comment", payload)
        .then(function (response) {
            console.log(response)
            if (response.status === 201) {
                const comments = response.data
                setComments(comments)
                window.location.reload()
            }
            else if (response.data.code === 204) {
                console.log(error);
            }
            else {
                //props.showError("Username does not exists");
                console.log(response)
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}



export default function FormPropsTextFields() {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">

      <div>
         <TextField
         id="content"
         placeholder="votre commentaire*"
         value={state.content}
         onChange={handleChange}
          label="Commentaire"
          multiline
          variant="outlined"
        />
      </div>
      <div className="form__button">
                        <button type="submit" onClick={handleSubmit} id="submit" className="btn-style">Valider votre commentaire</button>
                    </div>
    </form>
  );
}
