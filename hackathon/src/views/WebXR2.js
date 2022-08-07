import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom'

export default function WebXR() {
  const params = useParams()
  console.log(params.id)
  
  const iframeStyle = {
    position:'fixed',
    top:0, left:0, bottom:0, right:0,
    width:'100%', height:'100%', 
    border:'none',
    margin:0, 
    padding:0, 
    overflow:'hidden',
    zIndex:999999 
  }
  console.log("bbb")
  return (
    <div>
        <iframe title = "a" src={"/webxr2/a.html?id=" + params.id}
        style={iframeStyle} scrolling='no' 
        >
            Your browser doesn't support iframes
        </iframe>
    </div>
);
}