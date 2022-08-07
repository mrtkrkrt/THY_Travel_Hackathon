import React from "react";
import { Box, Button, TextField, InputAdornment } from "@mui/material";
import { useState } from "react";
import Ticket from "../components/ticket/Ticket";

function FlightInfo() {
  const [flightNo, setFlightNo] = useState("");
  const [flightDate, setFlightDate] = useState(
    getCurrentDate().replace(/-/g, "")
  );
  const [currentDate, setCurrentDate] = useState(getCurrentDate());
  const [result, setResult] = useState();

  const handleChangeFlightNo = (event) => {
    setFlightNo(event.target.value);
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
    const rawResponse = await fetch(
      "https://api-yapayzoid-thy-hackathon.glitch.me/",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: String(flightDate),
          flightNumber: String(flightNo),
        }),
      }
    );
    const content = await rawResponse.json();
    setResult(content);
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
            label="Uçuş Numarası"
            id="flightNo"
            sx={{ m: 1, width: "25ch" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
            onChange={handleChangeFlightNo}
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

      {result && result.data[0] && (
        <Ticket
          scheduledDepartureAirport={result.data[0].scheduledDepartureAirport}
          scheduledArrivalAirport={result.data[0].scheduledArrivalAirport}
          scheduledLocalDepartureDatetime={
            result.data[0].scheduledLocalDepartureDatetime
          }
        ></Ticket>
      )}
    </div>
  );
}

export default FlightInfo;
