var express = require("express");
const axios = require("axios");
const fetch = require("node-fetch");
const cors = require("cors");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

function turkishtoEnglish(s){
    return s.replace(/Ğ/gim, "g")
    .replace(/Ü/gim, "u")
    .replace(/Ş/gim, "s")
    .replace(/I/gim, "i")
    .replace(/İ/gim, "i")
    .replace(/Ö/gim, "o")
    .replace(/Ç/gim, "c")
    .replace(/ğ/gim, "g")
    .replace(/ü/gim, "u")
    .replace(/ş/gim, "s")
    .replace(/ı/gim, "i")
    .replace(/ö/gim, "o")
    .replace(/ç/gim, "c");
};

const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = alpha.map((x) => String.fromCharCode(x));

const alphabet_lower = alphabet.map((x) => x.toLowerCase())

var app = express();
app.use(cors());
app.use(express.json());

function readJsonFile(file) {
  let bufferData = fs.readFileSync(file);
  let stData = bufferData.toString();
  let data = JSON.parse(stData);
  return data;
}

app.post("/", async function (req, res) {
  let body_ = JSON.parse(JSON.stringify(req.body));

  fetch(
    "https://api.turkishairlines.com/test/aodb-rest/searchFlightByFlightNumber",
    {
      method: "POST",
      headers: {
        apikey: "l7xxf90f2f436d3b48bba2a0d0ef5aec7008",
        apisecret: "885c340e96ac4c7a9638c021ccbe8a01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body_),
    }
  )
    .then((response) => response.text())
    .then((response) => res.json(JSON.parse(response)))
    .catch((error) => console.error(error));
});

app.post("/flights", async function (req, res) {
  let body_ = JSON.parse(JSON.stringify(req.body));

  fetch("https://api.turkishairlines.com/test/aodb-rest/searchFlightByDate", {
    method: "POST",
    headers: {
      apikey: "l7xxf90f2f436d3b48bba2a0d0ef5aec7008",
      apisecret: "885c340e96ac4c7a9638c021ccbe8a01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body_),
  })
    .then((response) => response.text())
    .then((response) => res.json(JSON.parse(response)))
    .catch((error) => console.error(error));
});

app.get("/get_image_about_keyword/:keyword", async function (req, res) {
  
    
  try {
    let keyword =  turkishtoEnglish(req.params.keyword).toLowerCase()
    
    let a = ""
    for(let i=0; i<keyword.length; i++){
      let includes1 = alphabet.includes(keyword[i])
      let includes2 = alphabet_lower.includes(keyword[i])
      if(!( includes1 || includes2))
      {
        
        a += '+'
      }
      else{
      console.log(keyword[i])
        
          a += keyword[i]        
      }
    }
    keyword = a
    console.log(a,"iiii")
    
    fs.readdir(path.resolve(__dirname, "images"), async (err, files) => {
      
      if (err) throw err;
      let found = false;
      for (let file of files) {
        if (keyword + ".json" === file) {
          return res.json(readJsonFile("images/" + keyword + ".json"));
          found = true;
        }
      }
        
        
        const { data } = await axios.get(
      `https://www.bing.com/images/search?q=${keyword}`
    );
    let a = [];
    const $ = cheerio.load(data);
    
      $(".iusc").each((_idx, el) => {
      let b = $(el)[0].attribs.m;
      a.push(b);
    });
    for (let i = 0; i < a.length; i++) {
      a[i] = JSON.parse(a[i]).murl;
    }
    
    a = a.slice(0,3)
    fs.writeFile("images/" + keyword + ".json",
      JSON.stringify({ "urls" : a}), 'utf-8',function (err) {
      if (err) throw err;
      return res.json(readJsonFile("images/" + keyword + ".json"))
    });
      
  }
  )
  } catch (error) {
    return res.json(error.message);
  }
});

app.get("/get_interesting_places/:cityName", async function (req, res) {
  try {
    let cityName = req.params.cityName;
    
      
    
    cityName = cityName.toLowerCase();
    
    
    fs.readdir(path.resolve(__dirname, "placesdata"), async (err, files) => {
      if (err) throw err;
      let found = false;
      for (let file of files) {
        if (cityName + ".json" === file) {
          return res.json(readJsonFile("./placesdata/" + cityName + ".json"));
          found = true;
        }
      }
      if (!found) {
        let cityInfo = await axios.get(
          `https://api.opentripmap.com/0.1/en/places/geoname?name=${cityName}&apikey=5ae2e3f221c38a28845f05b64f5ce98411fbc2e35e2dce3b2d5081aa`
        );
        cityInfo = cityInfo.data
        console.log(cityInfo)
        let interestingPlaces = await axios.get(
          `https://api.opentripmap.com/0.1/en/places/bbox?lon_min=${cityInfo.lon - 0.5}&lon_max=${cityInfo.lon + 0.5}&lat_min=${cityInfo.lat - 0.5}&lat_max=${cityInfo.lat + 0.5}&rate=3&apikey=5ae2e3f221c38a28845f05b64f5ce98411fbc2e35e2dce3b2d5081aa`
        );
        interestingPlaces = interestingPlaces.data
        console.log(interestingPlaces)
        
        fs.writeFile("placesdata/" + cityName + ".json",
          JSON.stringify({ "cityInfo" : cityInfo, "interestingPlaces" : interestingPlaces }), function (err) {
        if (err) throw err;
          return res.json(readJsonFile("./placesdata/" + cityName + ".json"))
        });
        
        
      }
    });
  } catch (err) {
    console.log("error")
    return res.json(err.message);
  }
});

app.get("/get_accomodations/:cityName", async (req,res) => {
  try {
    let cityName = req.params.cityName;

    cityName = cityName.toLowerCase();

    fs.readdir(path.resolve(__dirname, "accomodations"), async (err, files) => {
      if (err) throw err;
      let found = false;
      for (let file of files) {
        console.log(file)
        if (cityName + ".json" === file) {
          return res.json(readJsonFile("./accomodations/" + cityName + ".json"));
          found = true;
        }
      }
      if (!found) {
        console.log("iii")
        let cityInfo = await axios.get(
          `https://api.opentripmap.com/0.1/en/places/geoname?name=${cityName}&apikey=5ae2e3f221c38a28845f05b64f5ce98411fbc2e35e2dce3b2d5081aa`
        );
        cityInfo = cityInfo.data
        console.log(cityInfo)
        let accomodations = await axios.get(
          `https://api.opentripmap.com/0.1/en/places/bbox?lon_min=${cityInfo.lon - 0.5}&lon_max=${cityInfo.lon + 0.5}&lat_min=${cityInfo.lat - 0.5}&lat_max=${cityInfo.lat + 0.5}&rate=1&apikey=5ae2e3f221c38a28845f05b64f5ce98411fbc2e35e2dce3b2d5081aa&kinds=accomodations`
        );
        accomodations = accomodations.data
        console.log(accomodations)
        
        fs.writeFile("accomodations/" + cityName + ".json",
          JSON.stringify({ "cityInfo" : cityInfo, "accomodations" : accomodations }), function (err) {
        if (err) throw err;
          return res.json(readJsonFile("./accomodations/" + cityName + ".json"))
        });
        
        
      }
    });
  } catch (err) {
    return res.json(err.message);
  }
})

app.get("/get_foods/:cityName", async (req,res) => {
  try {
    let cityName = req.params.cityName;

    cityName = cityName.toLowerCase();

    fs.readdir(path.resolve(__dirname, "foods"), async (err, files) => {
      if (err) throw err;
      let found = false;
      for (let file of files) {
        console.log(file)
        if (cityName + ".json" === file) {
          return res.json(readJsonFile("./foods/" + cityName + ".json"));
          found = true;
        }
      }
      if (!found) {
        console.log("iii")
        let cityInfo = await axios.get(
          `https://api.opentripmap.com/0.1/en/places/geoname?name=${cityName}&apikey=5ae2e3f221c38a28845f05b64f5ce98411fbc2e35e2dce3b2d5081aa`
        );
        cityInfo = cityInfo.data
        console.log(cityInfo)
        let close_range = 0.2
        
        let foods = await axios.get(
          `https://api.opentripmap.com/0.1/en/places/bbox?lon_min=${cityInfo.lon - close_range}&lon_max=${cityInfo.lon + close_range}&lat_min=${cityInfo.lat - close_range}&lat_max=${cityInfo.lat + close_range}&rate=3&apikey=5ae2e3f221c38a28845f05b64f5ce98411fbc2e35e2dce3b2d5081aa&kinds=restaurants,cafes`
        );
        foods = foods.data
        console.log(foods)
        
        fs.writeFile("foods/" + cityName + ".json",
          JSON.stringify({ "cityInfo" : cityInfo, "foods" : foods }), function (err) {
        if (err) throw err;
          return res.json(readJsonFile("./foods/" + cityName + ".json"))
        });
        
        
      }
    });
  } catch (err) {
    return res.json(err.message);
  }
})

app.get("/deneme", async (req,res) => {  
  
  
})

app.listen(3000, function () {
  console.log("Listening on port 3000...");
});
