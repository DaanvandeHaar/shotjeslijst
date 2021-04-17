import React from 'react';
import googleCloudImage from '../google-cloud.png'

var style = {
    backgroundColor: "#F8F8F8",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",

}

var style = {
    display: 'block',
    padding: '20px',
    height: '60px',
};

var img = {
    paddingTop: '40px',
    paddingBottom: '40px',
    maxWidth: '50%'
};


function Footer({ children }) {
    return (
            <div style={style}>
                <img src={googleCloudImage} style={img} />
            </div>
    )
}

export default Footer
