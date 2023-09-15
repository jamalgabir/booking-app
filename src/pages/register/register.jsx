import React, { useContext, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { useNavigate,Link} from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { AuthContext } from '../../context/auothContext';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="/" >
        JamalDev
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function SignUp() {
  const {dispatch} = useContext(AuthContext);
  const [user,setUser] = useState({
    username: undefined,
    email: undefined,
    password: undefined
  });
  const [alert,setAlert] = useState();
  const classes = useStyles();
 const navigate = useNavigate();
  const handleChange = (e) =>{
    return setUser((prev)=>({...prev,[e.target.name]:e.target.value}))
  };

  const handleclick = async (e) =>{
    e.preventDefault();
    if(!user.email||!user.password||!user.username){
      return setAlert("All input is required!")
    }

    try{
      dispatch({type:"LOGIN_START"})
        const res = await axios.post(`http://localhost:5000/auth/register`,user)
        dispatch({type:"LOGIN_SUCCESS",payload:res.data})
        localStorage.setItem("t_ken",JSON.stringify(res?.data?._id))
        navigate("/")
    }catch(error){
      if(error?.response?.data){
        return setAlert(error?.response?.data?.message)
      }else{
        return setAlert("There is server connection problem please try again latter!")

      }
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up 
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            
            
            <Grid item xs={12}>
              <TextField
              onChange={(e)=>handleChange(e)}
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              onChange={(e)=>handleChange(e)}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              onChange={(e)=>handleChange(e)}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          {alert&&<Alert variant="outlined" severity="warning">
        {alert}
      </Alert>}
          <Button
          onClick={(e)=>handleclick(e)}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}