import React, {createContext, useContext, useReducer, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Icon, InlineIcon } from '@iconify/react';
import diceIcon from '@iconify/icons-mdi/dice';
import loginIcon from '@iconify/icons-mdi/login';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import makeStyles from "@material-ui/core/styles/makeStyles";
import DobbelForm from "./DobbelForm";
import Login from "./LoginForm";
import { shadows } from '@material-ui/system';
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    toolbar: {
        minHeight: 128,
        alignItems: 'flex-start',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        alignSelf: 'flex-end',
        flexWrap: 'wrap',
    },
    iconButton: {
        width: 100, height: 100,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function ProminentAppBar() {
    const [dobbelOpen, setDobbelOpen] = React.useState(false);
    const [loginOpen, setLoginOpen] = React.useState(false);

    const handleDobbelOpen = () => {
        setDobbelOpen(true);
    };
    const handleDobbelClose = () => {
       setDobbelOpen(false)
    };

    const handleLoginOpen = () => {
        setLoginOpen(true);
    };
    const handleLoginClose = () => {
        setLoginOpen(false)
    };


    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Box boxShadow={3}>
            <AppBar position="static" elevation={0}>
                <Toolbar className={classes.toolbar}>
                    <IconButton color={'inherit'} onClick={handleDobbelOpen}>
                        <Icon icon={diceIcon} width={40} height={40}/>
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Huize Achtersteboven
                    </Typography>
                    <IconButton color={'inherit'} onClick={handleLoginOpen}>
                        <Icon icon={loginIcon} width={32} height={32} />
                    </IconButton>
                </Toolbar>
            </AppBar>
            </Box>
            <Dialog onClose={handleDobbelClose}
                    aria-labelledby="customized-dialog-title"
                    open={dobbelOpen}
                    TransitionComponent={Transition}>
                <DialogTitle id="customized-dialog-title" onClose={handleDobbelClose}>
                </DialogTitle>
                <DialogContent dividers>
                    <DobbelForm/>
                </DialogContent>
            </Dialog>
            <Dialog onClose={handleLoginClose}
                    aria-labelledby="customized-dialog-title"
                    open={loginOpen}
                    TransitionComponent={Transition}>
                <DialogTitle id="customized-dialog-title" onClose={handleLoginClose}>
                </DialogTitle>
                <DialogContent dividers>
                    <Login/>
                </DialogContent>
            </Dialog>
        </div>

    );
}
