import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


export default function Pages(){

    return (
<div>
        <nav>
          <ul>
            <li>
              <Link to="/webxr">WebXr Sayfası</Link>
            </li>
            <li>
            <Link to="/tourist-attractions">Turistik Yerler Sayfası</Link>
            </li>
          </ul>
        </nav>
        </div>
    )
    
}