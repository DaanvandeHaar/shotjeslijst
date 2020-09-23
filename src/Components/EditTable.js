import React, {useState ,useEffect} from 'react';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import {getShotjes,removeShotje, addShotje} from '../shotjesDao'
import firebase from 'firebase/app'
require("firebase/firestore");
require("firebase/auth")

// config for database
const firebaseConfig = {
    apiKey: "AIzaSyBzM2G6F07DP1K0Y4YEu9jBcgfGdAOw4JY",
    authDomain: "shotjeslijst.firebaseapp.com",
    databaseURL: "https://shotjeslijst.firebaseio.com",
    projectId: "shotjeslijst",
    storageBucket: "shotjeslijst.appspot.com",
    messagingSenderId: "1073361877449",
    appId: "1:1073361877449:web:63959a8e97617a82dc5018",
    measurementId: "G-2TCC64GNZC"
};

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};



export default function EditTable() {

    var [state, setState] = React.useState({
        columns: [
            { title: 'ID', field: 'id', type: 'numeric', editable: false},
            { title: 'Uitdeler', field: 'uitdeler' ,lookup: {
                    'Daan':'Daan',
                    'Merel': 'Merel',
                    'Ines': 'Ines',
                    'Thom': 'Thom',
                    'Domi': 'Domi',
                    'Marlot': 'Marlot',
                    'Toine': 'Toine',
                    'Ellen': 'Ellen',
                    'Yash' : 'Yash',
                    'Fleur': 'Fleur',}},
            { title: 'Ontvanger', field: 'ontvanger', lookup: {
                    'Daan':'Daan',
                    'Merel': 'Merel',
                    'Ines': 'Ines',
                    'Thom': 'Thom',
                    'Domi': 'Domi',
                    'Marlot': 'Marlot',
                    'Toine': 'Toine',
                    'Ellen': 'Ellen',
                    'Yash' : 'Yash',
                    'Fleur': 'Fleur',}},
            { title: 'Datum', field: 'datum', type:'date',},
        ],
    });


    var [data, setData] = React.useState([]);
    const [isLoading,setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        async function fetchProduct() {

            setData(await getShotjes());
            setIsLoading(false);

        }
        fetchProduct();
    }, []);

    const handleCreateShotje = async (shotje)  => {
        firebase.auth().onAuthStateChanged(async function(user) {
            if(user){
                await addShotje(shotje).then(async () => {
                    setData(await getShotjes());
            })}
            else{
            alert("Log in!")
            }
        });
    };

    const handleDeleteShotje = async (id)  => {
        setIsLoading(true);
        await removeShotje(id).then(async () => {
            setIsLoading(true);
            setTimeout(async function () {{
                setData(await getShotjes());
                }
            }, 450);
            setIsLoading(false);
        });

    };

    return (
        <MaterialTable
            options={{pageSize : 10,
                pageSizeOptions :[10,20,40],
                emptyRowsWhenPaging: false,
                addRowPosition: 'first',
            }}
            title="Shotjes"
            columns={state.columns}
            data={(data)}
            icons={tableIcons}
            isLoading={isLoading}
            editable={{
                isEditable: rowData => rowData.name === "id", // make id not editable
                onRowAdd: (newData) => handleCreateShotje(newData),
                onRowDelete: (oldData) => handleDeleteShotje(oldData.id)

            }}
        />

    );
}
