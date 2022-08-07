import React, { useState, useEffect } from "react";
import { List, ListItem, Box, Button, TextField, Grid } from "@mui/material";
import axios from "axios";
import OptionBox from "../components/OptionBox";
import non_latin_languages from "../data/non_latin_languages.js";
const LanguageDetect = require('languagedetect');
const lngDetector = new LanguageDetect();


export default function Accomodations() {
	const [options, setOptions] = useState([]);
	const [city, setCity] = useState("istanbul");

	const [optionBoxWidth, setOptionBoxWidth] = useState(0);
	const [optionBoxHeight, setOptionBoxHeight] = useState(0);

	useEffect(() => {
		const asyncFunction = async () => {
			if (window.innerWidth < 500) {
				setOptionBoxWidth(window.innerWidth / 2);
				setOptionBoxHeight(window.innerHeight / 4);
			} else {
				setOptionBoxWidth(window.innerWidth / 3);
				setOptionBoxHeight(window.innerHeight / 2);
			}

			let data = await axios.get(
				`https://api-yapayzoid-thy-hackathon.glitch.me/get_accomodations/${city}`
			);
            console.log(data)
			let list = data.data.accomodations.features.slice(2, 11);
			console.log(list);
			let optionsNew = [];
			for (let i = 0; i < list.length; i++) {
                if(non_latin_languages.includes(lngDetector.detect(list[i].properties.name, 1)[0][0]))
                    continue

				let keyword = `${city}+` + list[i].properties.name.replace(/ /g, "+");
				console.log(keyword);
				let image = await axios.get(
					`https://api-yapayzoid-thy-hackathon.glitch.me/get_image_about_keyword/${keyword}`
				);
				image = image.data;
				console.log(list[i]);

				let text = list[i].properties.rate;
				
				optionsNew.push({
					icons: image.urls,
					title: list[i].properties.name,
					rating: text,
				});
			}
			console.log("ii");
			setOptions(optionsNew);
			console.log(optionsNew);
		};
		asyncFunction();
	}, [city]);

	const textRef = React.createRef();

	return (
		<div>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
			>
				<TextField
								id="filled"
								label="City"
								defaultValue="istanbul"
								inputRef={textRef}
							/>
							<Button
								variant="contained"
								sx={{
									maxWidth: "120px",
									maxHeight: "55px",
									minWidth: "120px",
									minHeight: "55px",
									margin:"10px"
								}}
								onClick={(e) => {
									setCity(textRef.current.value);
								}}
							>
								Search
							</Button>

			</Box>
			{/* <Grid container spacing={3} marginTop={3}>
				<Grid item xs={6}>
					<Grid container spacing={2}>
						<Grid item xs={2} sm={2}/>
						<Grid item xs={6} sm={6}>
							<TextField
								id="outlined-helperText"
								label="City"
								defaultValue="istanbul"
								inputRef={textRef}
							/>
						</Grid>
						<Grid item xs={2} sm={2}>
							<Button
								variant="outlined"
								style={{
									maxWidth: "120px",
									maxHeight: "55px",
									minWidth: "120px",
									minHeight: "55px",
								}}
								onClick={(e) => {
									setCity(textRef.current.value);
								}}
							>
								Search
							</Button>
						</Grid>
						<Grid item xs={2} sm={2}/>
					</Grid>
				</Grid>
				<Grid item xs></Grid>
			</Grid> */}

			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				minHeight="80vh"
			>
				<List>
					{options.map((option, index) => {
						console.log(option, index);
						return (
							<div key={option.id}>
								<ListItem key={option.id} onClick={(e) => {}}>
									<OptionBox
										{...option}
										optionBoxWidth={optionBoxWidth}
										optionBoxHeight={optionBoxHeight}
									/>
								</ListItem>
							</div>
						);
					})}
				</List>
			</Box>
		</div>
	);
}
