async function getFlight(e) {
  e.preventDefault();
  let flightDate = e.target.elements.flightDate.value.replace(/-/g, "");
  let flightNumber = e.target.elements.flightNo.value;
  const response = await getFlightData({
    date: String(flightDate),
    flightNumber: String(flightNumber),
  });
}

async function getFlightData(data) {
  const rawResponse = await fetch(
    "https://api-yapayzoid-thy-hackathon.glitch.me/",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const content = await rawResponse.json();

  console.log(content);
}

async function getFlightsByDate(data) {
  const rawResponse = await fetch(
    "https://api-yapayzoid-thy-hackathon.glitch.me/flights",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const content = await rawResponse.json();

  console.log(content);
}

function getCurrentDate(data) {
  var date = new Date();

  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;

  var today = year + "-" + month + "-" + day;
  return today;
}

document.getElementById("flightDate").value = getCurrentDate();
