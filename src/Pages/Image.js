import React from 'react';

const Image=({image}) =>{
    const buff= new Buffer(image);
    const newimg=buff.toString('base64');
    return(
    <img src={`data:image/jpg;base64,${newimg}`} alt="images"/>
    )
}
export default Image