import * as React from 'react';
import {useEffect} from 'react';
import {ArgumentAxis, BarSeries, Chart, Title, ValueAxis,} from '@devexpress/dx-react-chart-material-ui';
import {getNumberOfShotjes} from "../shotjesDao";
import Card from "@material-ui/core/Card";
import makeStyles from "@material-ui/core/styles/makeStyles";


export default function ShotGraph() {

    const classes = makeStyles((theme) => ({
        root: {
            maxWidth: 345,

            height: 0,
            paddingTop: '56.25%', // 16:9


            transform: 'rotate(0deg)',
            marginLeft: 'auto',

        },
    }));

    var [data, setData] = React.useState([]);

    useEffect(() => {

        async function fetchProduct() {

            setData(await getNumberOfShotjes());

        }
        fetchProduct()

    }, []);


        return (
            <Card className={classes.root}>
                <Chart
                    data={data}
                >

                    <BarSeries
                        valueField="aantal"
                        argumentField="naam"
                    />
                    <ArgumentAxis />
                    <ValueAxis />
                    <Title text="Ranking the shotjes" />
                </Chart>
            </Card>
        );
}
