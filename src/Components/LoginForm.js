import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
// npm install --save-dev @iconify/react @iconify-icons/mdi
import { Icon, InlineIcon } from '@iconify/react';
import closeIcon from '@iconify-icons/mdi/close';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import firebase from 'firebase/app'
import { Alert } from '@material-ui/lab';
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
require("firebase/auth");


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Shotjeslijst.nl
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

export default function Login() {
    var [email, setEmail] = React.useState(null);
    var [password, setPassword] = React.useState(null);
    var [warningOpen, setWarningOpen] = React.useState(false);

    const handleEmailChange = async (event) => {
        await setEmail(event.target.value);
    };

    const handlePasswordChange = async (event) => {
        await setPassword(event.target.value);
    };

    const handleWarningOpen = () => {
        setWarningOpen(true)
    };

    const handleWarningClose = () => {
        setWarningOpen(false)
    };

    const classes = useStyles();

    async function login(){
        firebase.auth().signOut();
        await firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode + " ==> " + errorMessage);
        });
        await firebase.auth().onAuthStateChanged(async function (user) {
            if (await user) {
                window.location.reload()
            } else {
                handleWarningOpen();
            }
        });
    }

    return (
        <Container component="main" maxWidth="xs">
            <Collapse in={warningOpen}>
                <Alert severity="error"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setWarningOpen(false);
                            }}
                        >
                            <Icon fontSize="inherit"  icon={closeIcon}/>
                        </IconButton>
                    }
                >
                    Wrong username or password!
                </Alert>
            </Collapse>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField  id="email" label="email" variant="outlined" fullWidth onFocus={handleEmailChange} onChange={handleEmailChange} value={email} margin="normal" />

                    <TextField id="password" label="password" variant="outlined" type="password" onFocus={handlePasswordChange} onChange={handlePasswordChange} fullWidth value={password} margin="normal"/>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={login} >
                        Sign In
                    </Button>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}
