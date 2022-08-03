import React, { useState, useEffect } from 'react';

export default function WebXR() {
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
  return (
    <div>
        <p>sfsdfsdf</p>
        <iframe title = "a" src="webxr.html"
        style={iframeStyle} scrolling='no' 
        >
            Your browser doesn't support iframes
        </iframe>
    </div>
);
}