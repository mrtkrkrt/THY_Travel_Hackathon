import React, { useState, useEffect } from "react";
import { List, ListItem, Box, Button, TextField, Grid } from "@mui/material";
import axios from "axios";
import OptionBox from "../components/OptionBox";
import wtf from "wtf_wikipedia";

export default function TouristAttractions() {
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
				`https://api-yapayzoid-thy-hackathon.glitch.me/get_interesting_places/${city}`
			);
			let list = data.data.interestingPlaces.features.slice(1, 10);
			console.log(list);
			let optionsNew = [];
			for (let i = 0; i < list.length; i++) {
				let keyword = `${city}+` + list[i].properties.name.replace(/ /g, "+");
				console.log(keyword);
				let image = await axios.get(
					`https://api-yapayzoid-thy-hackathon.glitch.me/get_image_about_keyword/${keyword}`
				);
				image = image.data;
				console.log(list[i]);

				let text = "";
				let doc = await wtf.fetch(list[i].properties.name);
				if (doc) {
					let a = doc.json()["sections"][0];

					console.log(a);
					for (let i = 0; i < a.paragraphs.length; i++) {
						if (a.paragraphs[i].sentences.length == 0) continue;
						for (let j = 0; j < a.paragraphs[i].sentences.length; j++) {
							text += a.paragraphs[i].sentences[j].text;
						}
						break
					}
				}
				if(text !== "")
					text = text.slice(0,200) + " ..."
				optionsNew.push({
					icons: image.urls,
					title: list[i].properties.name,
					info: text,
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
