import {Box, Typography, Grid} from '@mui/material';
import React from 'react';
import Carousel from 'react-material-ui-carousel'


export default function OptionBox(props) {
    
    // OptionBox menü tasarımı için oluşturuldu. 

    // PROPS
    
    // iconFile : Resim dosyasının ismi. Bu resim dosyası src/img klasöründe olmalı !
    
    // icon : Eğer ikonu bir komponent olarak vermek istiyorsan mesela Material UI içinden hazır bir ikon import etmişsen
    // iconFile proponu null olarak bırakıp bu propa direk komponenti gir.
    // title, description

    return (
        <Box sx = {{flexGrow : 1, m : 3}}>
            <Grid container spacing={5}>
                <Grid item xs={4} justifyContent="flex-end" display="flex">
                    {props.icons && 
                        <Carousel sx ={{height:'250px', width:'500px'}}>
                        {
                            props.icons.map( (item, i) => <img src={item} sx={{minHeight:'250px', maxHeight:'250px'}} width="350" key={i}></img> )
                        }
                        </Carousel>
                    }
                    {props.iconFile && !props.icons && 
                    <img src={props.iconFile} height="100%" width="350"></img>
                    }
                </Grid>
                <Grid item xs={8}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Typography variant="h5">{props.title}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}
