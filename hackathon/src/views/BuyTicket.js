import React from "react";
import { Box, Button, TextField, InputAdornment } from "@mui/material";
import { useState } from "react";
import Card from "../components/flightCard/Card";

function BuyTicket() {
  const [flightDeparture, setFlightDeparture] = useState("");
  const [flightArrival, setFlightArrival] = useState("");
  const [currentDate, setCurrentDate] = useState(getCurrentDate());
  const [result, setResult] = useState();
  const [flightDate, setFlightDate] = useState(
    getCurrentDate().replace(/-/g, "")
  );

  const handleChangeFlightDeparture = (event) => {
    setFlightDeparture(event.target.value.toUpperCase());
  };

  const handleChangeFlightArrival = (event) => {
    setFlightArrival(event.target.value.toUpperCase());
  };

  const handleChangeFlightDate = (event) => {
    setFlightDate(event.target.value.replace(/-/g, ""));
    setCurrentDate(event.target.value);
  };

  function getCurrentDate() {
    var date = new Date();

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var today = year + "-" + month + "-" + day;
    return today;
  }

  async function searchFlight() {
    fetch("https://api-yapayzoid-thy-hackathon.glitch.me/flights", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: String(flightDate),
        scheduledDepartureAirport: String(flightDeparture),
        scheduledArrivalAirport: String(flightArrival),
      }),
    })
      .then((response) => response.json())
      .then((data) => setResult(data));
    // const content = await rawResponse.json();
    // setResult(content);
  }

  return (
    <div>
      <div>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          marginTop={3}
        >
          <TextField
            label="Kalkış Havalimanı"
            id="flightNo"
            sx={{ m: 1, width: "25ch" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
            onChange={handleChangeFlightDeparture}
          />
          <TextField
            label="Varış Havalimanı"
            id="flightNo"
            sx={{ m: 1, width: "25ch" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
            onChange={handleChangeFlightArrival}
          />
          <TextField
            label="Uçuş Tarihi"
            id="flightDate"
            sx={{ m: 1, width: "25ch" }}
            type="date"
            value={currentDate}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
            onChange={handleChangeFlightDate}
          />
          <Button
            variant="contained"
            color="error"
            size="large"
            onClick={searchFlight}
          >
            Uçuş Ara
          </Button>
        </Box>
      </div>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        marginTop={3}
      >
        {result &&
          result.data &&
          result.data.map((element, index) => {
            console.log(element);
            return (
              <Card
                date={element.date}
                departureTime={element.scheduledLocalDepartureDatetime}
                departurePlace={element.scheduledDepartureAirport}
                arrivalTime={element.scheduledLocalArrivalDatetime}
                arrivalPlace={element.scheduledArrivalAirport}
                key={index}
              ></Card>
            );
          })}
      </Box>
    </div>
  );
}

export default BuyTicket;
