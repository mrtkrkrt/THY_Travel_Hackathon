import React from "react";
import "./card.style.css";

function Card(props) {
  return (
    <div className="wrap">
      <div className="search-container">
        <ul className="result-container">
          <li className="ticket t1">
            <div className="ticket-wrapper">
              <div className="train-info">
                <span className="train-num">Turkish airlines dl31</span>
                <span className="date">
                  {props.date.slice(-2) +
                    "." +
                    props.date.slice(-4, -2) +
                    "." +
                    props.date.slice(0, 4)}
                </span>
              </div>
              <div className="ticket-info">
                <div className="station-info dep">
                  <span className="time">
                    {props.departureTime.slice(-4, -2) +
                      ":" +
                      props.departureTime.slice(-2)}
                  </span>
                  <span className="station">{props.departurePlace}</span>
                </div>

                <div className="transfer-info">
                  <span className="duration">3 Saat 45 Dakika</span>
                  <ul className="stops"></ul>
                </div>

                <div className="station-info arr">
                  <span className="time">
                    {props.arrivalTime.slice(-4, -2) +
                      ":" +
                      props.arrivalTime.slice(-2)}
                  </span>
                  <span className="station">{props.arrivalPlace}</span>
                </div>
              </div>
            </div>
            <div className="punchline">
              <div className="punch-notch punch-left"></div>
              <div className="punch-notch punch-right"></div>
            </div>
            <div className="ticket-wrapper">
              <div className="btn info">i</div>
              <div className="btn buy">SATIN AL</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Card;
