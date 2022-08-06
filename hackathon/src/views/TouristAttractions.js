import React, { useState, useEffect } from "react";
import { List, ListItem, Box, Button, TextField, Grid } from "@mui/material";
import axios from "axios";
import OptionBox from "../components/OptionBox";

export default function TouristAttractions() {
	const [options, setOptions] = useState([]);
	const [city, setCity] = useState("istanbul");

	useEffect(() => {
		const asyncFunction = async () => {
			let data = await axios.get(
				`https://api-yapayzoid-thy-hackathon.glitch.me/get_interesting_places/${city}`
			);
			let list = data.data.interestingPlaces.features.slice(1, 10);
			console.log(list);
			let optionsNew = [];
			for (let i = 0; i < list.length; i++) {
				let keyword = `${city}+`+list[i].properties.name.replace(/ /g, "+");
				console.log(keyword);
				let image = await axios.get(
					`https://api-yapayzoid-thy-hackathon.glitch.me/get_image_about_keyword/${keyword}`
				);
				image = image.data;
				console.log(list[i]);
				optionsNew.push({
					iconFile: image[1],
                    icons: image.urls,
					title: list[i].properties.name,
				});
			}
			console.log("ii");
			setOptions(optionsNew);
			console.log(optionsNew);
		};
		asyncFunction();
	}, [city]);

    const textRef = React.createRef()

	return (
		<div>
			<Grid container spacing={3} marginTop={3}>
				<Grid item xs></Grid>
				<Grid item xs={4}>
                    <Grid container spacing={2}>
                        <Grid item>
                        <TextField
						id="outlined-helperText"
						label="City"
						defaultValue="istanbul"
                        inputRef={textRef}
					/>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" style={{maxWidth: '120px', maxHeight: '55px', minWidth: '120px', minHeight: '55px'}}
                            onClick={(e) => {setCity(textRef.current.value)}}
                            >Search</Button>
                        </Grid>

                    </Grid>
					
				</Grid>
				<Grid item xs></Grid>
			</Grid>

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
									<OptionBox {...option} />
								</ListItem>
							</div>
						);
					})}
				</List>
			</Box>
		</div>
	);
}
