import firebase from 'firebase/app'
import MaterialTable from "material-table";

export async function getShotjes() {
    try {
        require("firebase/firestore");

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

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        var db = firebase.firestore();

        var verloopdatum = new Date();
        verloopdatum.setMonth(verloopdatum.getMonth() - 2);
        const snapshot = await db.collection('shotjes').where("datum", ">=", verloopdatum).get();
        var map =  snapshot.docs.map(doc => doc.data());
        const formatData = await FormatShotjes(map);
        return formatData;
    }
    catch (e) {
        console.log(e);
    }

}
export async function FormatShotjes(map){
    let data = map;
    for(let key in data){
        try {
            data[key].datum = data[key].datum.toDate();
        }
        catch (e) {

        }
    }
    return data;
}

export async function getNumberOfShotjes(){
    var countData = [
        { naam: 'Daan', aantal: 0},
        { naam: 'Merel', aantal: 0},
        { naam: 'Ines', aantal: 0},
        { naam: 'Thom', aantal: 0},
        { naam: 'Domi', aantal: 0},
        { naam: 'Marlot', aantal: 0},
        { naam: 'Yash', aantal: 0},
        { naam: 'Toine', aantal: 0},
        { naam: 'Fleur', aantal: 0},
        { naam: 'Ellen', aantal: 0},
    ];
    const data = await getShotjes();
    for (let key in data){
        try{countData.find(x => x.naam === data[key].ontvanger).aantal += 1;
        }
        catch (e) {
            console.log(e)
        }

    }
    return countData;
}

export async function addShotje(shotje){
    require("firebase/firestore");
    console.log(shotje);
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

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    if(shotje.datum == null || shotje.datum === ''){
        var date = new Date();

        shotje.datum = date;


    }

    var db = firebase.firestore();
    db.collection("shotjes").add({
        ontvanger: shotje.ontvanger,
        uitdeler: shotje.uitdeler,
        datum: shotje.datum,
        id: Math.floor(Math.random() * 1000000) + 1,
        uitgedeeld: 'false'

    })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            return true;
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
            return false;
        });

}

export async function removeShotje(id){
    var db = firebase.firestore();
    var query = db.collection('shotjes').where('id','==',id);
    query.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            return doc.ref.delete();
        });
    });

}

    async function getMax(arr) {
        var data = await arr;
        var maxProp = null;
        var maxValue = -1;
        for (var prop in await data) {
            if (await data.hasOwnProperty(prop)) {
                var value = await data[prop];
                if (value > maxValue) {
                    maxProp = prop;
                    maxValue = value;
                    await maxValue;
                }
            }
        }
    }
