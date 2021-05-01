import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import {addShotje} from '../shotjesDao'
import firebase from 'firebase/app'
import publicIp from "public-ip";
import makeStyles from "@material-ui/core/styles/makeStyles";
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

const bovenData = [ 'Daan','UnknownUser', 'Ellen', 'Merel', 'Thom'];
const benedenData = ['Marlot', 'Yash', 'Bob', 'Fleur','Toine'];
const keukenData = ['Daan', 'UnknownUser', 'Ellen', 'Merel', 'Thom','Marlot', 'Yash', 'Ellen', 'Fleur', 'Toine'];
const waarData = ['boven', 'beneden', 'keuken'];


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

export const getClientIp = async () => await publicIp.v4({
    fallbackUrls: [ "https://ifconfig.co/ip" ]
});


export default function Dobbel() {
    const classes = useStyles();

    var [waar, setWaar] = React.useState(null);
    var [wie, setWie] = React.useState(null);

    const handleWaarChange = async (event) => {
        await setWaar(event.target.value);
    };

    const handleWieChange = async (event) => {
        await setWie(event.target.value);
    };

    async function DobbelShotje() {
        var user = firebase.auth().currentUser;
        var ipAdr = await getClientIp();
        if (user) {
            switch (waar) {
                case 'Boven':
                    var bovenTemp = bovenData.slice(0);
                    console.log(bovenTemp);
                    bovenTemp.splice(bovenTemp.indexOf(wie.toString()), 1);
                    console.log(bovenTemp);
                    var uitdeler = bovenTemp.sample();

                    if (window.confirm("Shotje voor: " + wie.toString() + " uit te delen door: " + uitdeler)) {
                        await addShotje({
                            ontvanger: wie,
                            uitdeler: uitdeler,
                            datum: Date().now,
                            uitgedeeld: false,
                            metaData: {canceled: false, added: 'dobbel', ip: ipAdr.toString()},
                        });
                        break;
                    } else {
                        alert("Niet toegevoegd!");
                        await addShotje({
                            ontvanger: wie,
                            uitdeler: uitdeler,
                            datum: Date().now,
                            uitgedeeld: true,
                            metaData: {canceled: true, added: 'dobbel', ip: ipAdr.toString()}
                        });
                    }
                    break;
                case 'Beneden':
                    var benedenTemp = benedenData.slice(0);
                    console.log(benedenTemp);
                    benedenTemp.splice(benedenTemp.indexOf(wie.toString()), 1);
                    console.log(benedenTemp);
                    var uitdeler = benedenTemp.sample();

                    if (window.confirm("Shotje voor: " + wie.toString() + " uit te delen door: " + uitdeler)) {
                        await addShotje({
                            ontvanger: wie,
                            uitdeler: uitdeler,
                            datum: Date().now,
                            uitgedeeld: false,
                            metaData: {canceled: false, added: 'dobbel', ip: ipAdr.toString()},
                        });
                        break;
                    } else {
                        alert("Niet toegevoegd!");
                        await addShotje({
                            ontvanger: wie,
                            uitdeler: uitdeler,
                            datum: Date().now,
                            uitgedeeld: true,
                            metaData: {canceled: true, added: 'dobbel', ip: ipAdr.toString()}
                        });
                    }
                    break;

                case 'Keuken':
                    var keukenTemp = keukenData.slice(0);
                    console.log(keukenTemp);
                    keukenTemp.splice(keukenTemp.indexOf(wie.toString()), 1);
                    console.log(keukenTemp);
                    var uitdeler = keukenTemp.sample();

                    if (window.confirm("Shotje voor: " + wie.toString() + " uit te delen door: " + uitdeler)) {
                        await addShotje({
                            ontvanger: wie,
                            uitdeler: uitdeler,
                            datum: Date().now,
                            uitgedeeld: false,
                            metaData: {canceled: false, added: 'dobbel', ip: ipAdr.toString()},
                        });
                        break;
                    } else {
                        alert("Niet toegevoegd!");
                        await addShotje({
                            ontvanger: wie,
                            uitdeler: uitdeler,
                            datum: Date().now,
                            uitgedeeld: true,
                            metaData: {canceled: true, added: 'dobbel', ip: ipAdr.toString()}
                        });
                    }
            }
        } else {
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
                                    <option key={2} value="UnknownUser">UnknownUser</option>
                                    <option key={3} value="Merel">Merel</option>
                                    <option key={4} value="Thom">Thom</option>
                                    <option key={5} value="Bob">Bob</option>
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
