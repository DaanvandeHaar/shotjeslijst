import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import {SelectProps as renderValue} from "@material-ui/core/Select/Select";
import {addShotje} from '../shotjesDao'
import firebase from 'firebase/app'
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

const bovenData = [ 'Daan','Ines', 'Domi', 'Merel', 'Thom'];
const benedenData = ['Marlot', 'Yash', 'Ellen', 'Fleur','Toine'];
const keukenData = ['Daan', 'Ines', 'Domi', 'Merel', 'Thom','Marlot', 'Yash', 'Ellen', 'Fleur', 'Toine'];
const waarData = ['boven', 'beneden', 'keuken'

];


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
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


export default function SignIn() {
    const classes = useStyles();

    var [waar, setWaar] = React.useState(null);
    var [wie, setWie] = React.useState(null);

    const handleWaarChange = async (event) => {
        await setWaar(event.target.value);
    };

    const handleWieChange = async (event) => {
        await setWie(event.target.value);
    };

    function DobbelShotje(){
        var user = firebase.auth().currentUser;
        if(user){
            switch (waar) {
                case 'Boven':
                    var bovenTemp = bovenData.slice(0);
                    console.log(bovenTemp);
                    bovenTemp.splice(bovenTemp.indexOf(wie.toString()), 1);
                    console.log(bovenTemp);
                    var uitdeler = bovenTemp.sample();
                    if (window.confirm("Shotje voor: " + wie.toString() + " uit te delen door: " + uitdeler))
                    {
                        addShotje({ontvanger: wie, uitdeler: uitdeler, datum: Date().now });

                    }
                    else {alert("Niet toegevoegd!")}
                    break;
                case 'Beneden':
                    var benedenTemp = benedenData.slice(0);
                    console.log(benedenTemp);
                    benedenTemp.splice(benedenTemp.indexOf(wie.toString()), 1);
                    console.log(benedenTemp);
                    var uitdeler = benedenTemp.sample();
                    if (window.confirm("Shotje voor: " + wie.toString() + " uit te delen door: " + uitdeler))
                    {
                        addShotje({ontvanger: wie, uitdeler: uitdeler, datum: Date().now });

                    }
                    else {alert("Niet toegevoegd!")}
                    break;
                case 'Keuken':
                    var keukenTemp = keukenData.slice(0);
                    console.log(keukenTemp);
                    keukenTemp.splice(keukenTemp.indexOf(wie.toString()), 1);
                    console.log(keukenTemp);
                    var uitdeler = keukenTemp.sample();
                    if (window.confirm("Shotje voor: " + wie.toString() + " uit te delen door: " + uitdeler))
                    {
                        addShotje({ontvanger: wie, uitdeler: uitdeler, datum: Date().now });

                    }
                    else {alert("Niet toegevoegd!")}
            }
        }
        else{
            alert('Log in!')
        }
    }


    Array.prototype.sample = function(){
        return this[Math.floor(Math.random()*this.length)];
    };


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <form className={classes.form} noValidate>
                    <Grid container spacing={3}>
                        <Grid item xs={30}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="age-native-simple">Waar?    </InputLabel>
                                <Select
                                    fullWidth
                                    native
                                    onChange={handleWaarChange}
                                    value={waar}
                                    inputProps={{
                                        name: 'Waar?',
                                        id: 'waar-simple',
                                    }}
                                >
                                    <option aria-label="None" value="   " />
                                    <option key={1} value="Keuken">Keuken</option>
                                    <option key={2} value="Boven">Boven</option>
                                    <option key={3} value="Beneden">Beneden</option>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={30}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="age-native-simple">Wie? </InputLabel>
                                <Select
                                    fullWidth
                                    native
                                    onChange={handleWieChange}
                                    value={wie}
                                    inputProps={{
                                        name: 'Wie?',
                                        id: 'wie-simple',
                                    }}
                                >
                                    <option aria-label="None" value="    " />
                                    <option key={1} value="Daan">Daan</option>
                                    <option key={2} value="Ines">Ines</option>
                                    <option key={3} value="Merel">Merel</option>
                                    <option key={4} value="Thom">Thom</option>
                                    <option key={5} value="Domi">Domi</option>
                                    <option key={6} value="Marlot">Marlot</option>
                                    <option key={7} value="Yash">Yash</option>
                                    <option key={8} value="Ellen">Ellen</option>
                                    <option key={9} value="Fleur">Fleur</option>
                                    <option key={10} value="Toine">Toine</option>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={DobbelShotje}
                    >
                        Gooi die steen
                    </Button>
                    <Grid container>
                        <Grid item>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}
