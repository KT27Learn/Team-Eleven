import React, { useState } from 'react';

import Profile from './profile';
import History from './history';
import DetailedSession from './detailedsession'

import { Grow, Grid, Container, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@material-ui/core';

export default function ProfileHome() {

    const [detailedSesh, setDetailedSesh] = useState(false);

    return (

        <>
            <Grow in>
                <Container maxWidth="xl">
                    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <Profile />
                        </Grid>
                        <Grid item xs={12} sm={7}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Session History:</FormLabel>
                                <RadioGroup aria-label="position" name="position" defaultValue="top">
                                    <FormControlLabel
                                        value="end" 
                                        checked={!detailedSesh}
                                        control={<Radio color="primary" />}
                                        label="Compiled History"
                                        onClick={() => setDetailedSesh(false)}
                                    />
                                    <FormControlLabel 
                                        value="end" 
                                        checked={detailedSesh}
                                        control={<Radio color="primary" />} 
                                        label="Individual Sessions" 
                                        onClick={() => setDetailedSesh(true)}
                                    />
                                </RadioGroup>
                            </FormControl>
                            { detailedSesh ? (

                                <DetailedSession /> 

                            ) : (

                                <History/>

                            )
                            }
                                
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </>
    )

}
