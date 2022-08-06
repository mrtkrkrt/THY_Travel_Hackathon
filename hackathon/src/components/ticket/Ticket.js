import React from "react";
import "./Ticket.style.css";

function Ticket(props) {
  return (
    <div>
      <section id="mainTicket">
        <section className="row1">
          <section className="row1a">
            <label className="label1">Flight</label>
            <label className="label2">Destination</label>
            <label className="label3">passenger</label>

            <label className="label4">flight</label>
          </section>

          <section className="row1b">
            <span className="flightBrandName">Turkish Airlines DL31</span>
            <span className="destinationNames">
              {props.scheduledDepartureAirport +
                " -- " +
                props.scheduledArrivalAirport}
            </span>
            <span className="passengerName">Murat KARAKURT</span>

            <span className="flightBrandName1">Turkish airlines dl31</span>
          </section>
        </section>

        <section className="row2">
          <section className="row2a">
            <label className="a2a" htmlFor="">
              passenger
            </label>{" "}
            <label className="a2aa" htmlFor="">
              passenger
            </label>
          </section>

          <section className="row2b">
            <span className="passenger2a">Murat / KARAKURT</span>
            <span className="passenger2aa">Murat / KARAKURT</span>
          </section>
        </section>

        <section className="row3">
          <section className="row3a">
            <label className="a3a" htmlFor="">
              gate
            </label>
            <label className="a3b" htmlFor="">
              departure
            </label>
            <label className="a3c" htmlFor="">
              boarding zone
            </label>
            <label className="a3d" htmlFor="">
              seat
            </label>
            <label className="a3e" htmlFor="">
              departure
            </label>
          </section>

          <section className="row3b">
            <span className="s3a">a22</span>
            <span className="s3b">
              {props.scheduledLocalDepartureDatetime.slice(-4, -2) +
                ":" +
                props.scheduledLocalDepartureDatetime.slice(-2)}
              <span className="normal">
                {props.scheduledLocalDepartureDatetime.slice(6, 8) +
                  "." +
                  props.scheduledLocalDepartureDatetime.slice(4, 6) +
                  "." +
                  props.scheduledLocalDepartureDatetime.slice(0, 4)}
              </span>
            </span>
            <span className="s3c">d3</span>
            <span className="s3d">24c</span>
            <span className="s3e">3:15</span>
          </section>
        </section>
        <hr className="left"></hr>
        <hr className="right"></hr>
        <hr></hr>

        <section className="row4">
          <section className="row4a">
            <label className="a4a" htmlFor="">
              tracking
            </label>
            <label className="a4b" htmlFor="">
              data
            </label>
            <label className="a4c" htmlFor="">
              options
            </label>
            <label className="a4d" htmlFor="">
              options
            </label>
          </section>

          <section className="row4b">
            <span className="s4a">2 207 365 3958 3309 0</span>
            <span className="s4b">00 i78 d</span>
            <span className="s4c">1st cl</span>
            <img
              className="s4d"
              src="https://lemonecit.github.io/airplaneticket/images/barcode1.gif"
              alt=""
            ></img>
            <span className="s4e">1st cl</span>
            <img
              className="s4f"
              src="https://lemonecit.github.io/airplaneticket/images/barcode1.gif"
              alt=""
            ></img>
          </section>
        </section>

        <section className="row6">
          <section className="row6a">
            <img className="img1" src="/logo.png" alt=""></img>
            <img className="img2" src="/logo.png" alt=""></img>
          </section>
        </section>
      </section>
    </div>
  );
}

export default Ticket;
