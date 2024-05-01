import React from 'react';
import Lottie from 'lottie-react';
import empty from './Animation - 1714507273712.json';
function Empty () {
    return (
        <div style={{display: 'flex' , alignItems: 'center' ,justifyContent: 'center'}}>
            <Lottie animationData={empty} style={{ width: '400px', height: '400px' }}></Lottie>
        </div>
    );
};

export default Empty;