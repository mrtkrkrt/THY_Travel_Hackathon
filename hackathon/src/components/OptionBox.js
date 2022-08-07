import {Box, Typography, Grid, Paper, ButtonBase} from '@mui/material';
import Carousel from 'react-material-ui-carousel'
import { styled } from '@mui/material/styles';
import React, { useState, useEffect } from 'react';


export default function OptionBox(props) {
    
    
    return (
        <Paper
      sx={{
        p: 2,
        flexGrow: 1,
        backgroundColor: '#CC2424'}}
    >
      <Grid container spacing={2}>
        <Grid item xs={8}>
            <Carousel sx={{ width: props.optionBoxWidth, height: props.optionBoxHeight }}>
            {props.icons && props.icons.map((e,i) => {
                return(
                    <img key = {i} alt="complex" src={props.icons[i]} 
                    width = {props.optionBoxWidth} height = {props.optionBoxHeight}/>
                )
            })}
            </Carousel>
          
        </Grid>
        <Grid item xs={4} sm container>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                
        <Typography fontSize={10} variant="button" color={'white'} component="div">
            {props.title}
        </Typography>
            </Grid>
            <Grid item xs={12}>
            <Typography fontSize={10} variant="body1" color={'white'} component="div">
            {props.info}
            </Typography>
            </Grid>
        </Grid>
        
        </Grid>
        </Grid>
    </Paper>)
}
