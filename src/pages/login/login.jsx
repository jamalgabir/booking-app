
import  { useContext, useState } from 'react';
import { AuthContext } from '../../context/auothContext';
import "./login.css";
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { puplicRequest } from '../../components/RequestUrl';



function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" to="/">
          Jamal.Dev
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
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

const Login = () => {
    
    const navigate = useNavigate();
    const [credentials, setCrededtials] = useState({
        email:undefined,
        password:undefined,
    });
    const [alert,setAlert] = useState();
   const {dispatch} = useContext(AuthContext);
   
   const classes = useStyles();


   const handleChange = (e)=>{
    setCrededtials(prev=>({...prev,[e.target.name]: e.target.value}));
    
};
  
   
   const handleClick =async (e)=>{
    e.preventDefault()
     if(!credentials.email||!credentials.password){
      return setAlert("Email amd password is required!")
     }
      
    
    try{
      dispatch({type:"LOGIN_START"});
        const res = await puplicRequest.post(`/auth/login`,credentials)
        
        dispatch({type:"LOGIN_SUCCESS",payload:res.data})
        setAlert("")
        navigate('/');
               

    }catch(error){
      if(error?.response?.data){
        return setAlert(error?.response?.data?.message)
      }else{
        return setAlert("There is a server connection problem please try again latter!")

      }
      
      
    }
    
   }
   
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
          onChange={(e)=>handleChange(e)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={(e)=>handleChange(e)}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          {alert&&<Alert variant="outlined" severity="warning">
                  {alert}
          </Alert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e)=>handleClick(e)}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/forgot-password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}

export default Login
