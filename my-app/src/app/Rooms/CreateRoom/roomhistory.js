import React, { useState } from 'react';

import { Typography, Grid } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

import RoomCard from './roomcard'
import useStyles from './styles';


function RoomHistory() {

    const user = JSON.parse(localStorage.getItem('profile'));
    const classes = useStyles();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

   /*
    * Changes the current page to the value received
    *
    * @param {Event} e event when user clicks on the pagination buttons
    * @param {Value} value next page number
    *
    */
    const handlePaginationChange = (event, value) => {

        setCurrentPage(value);

    };

   /*
    * Count total number of pages for pagination
    * 
    * @param {Array} arr list of all study methods
    * 
    */
    const countPages = (arr) => {

        return Math.ceil(arr.length / itemsPerPage);

    }

    const sortCount = (arr) => {

        if (arr) {

            const newArr = arr;

            for (let i = 0; i < newArr.length; i++) {

                for (let j = 0; j < (newArr.length - 1) - i; j++) {

                    if (newArr[j].count < newArr[j + 1].count) {

                        const temp = newArr[j];
                        newArr[j] = newArr[j + 1];
                        newArr[j + 1] = temp;

                    }

                }

            }

            return newArr;

        } else {

            return arr;

        }

    }

    return (

        <>
            {user.result.pastrooms && 
                <>
                { user.result.pastrooms.length > 0 ? (
                    <>
                        <Typography variant="h6">
                            Choose from past rooms
                        </Typography>

                        {sortCount(user.result.pastrooms).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((room) => (
                            <Grid key={room._id} item xs={12} sm={6} md={6}>
                                <RoomCard room={room} />
                            </Grid>
                        ))}
                        <Pagination 
                            count={countPages(user.result.pastrooms)}
                            page={currentPage}
                            onChange={handlePaginationChange}
                            defaultPage={1}
                            color="primary"
                            size="large"
                            showFirstButton
                            showLastButton
                            classes={classes.pagination}
                        />
                    </> 

                ) : (
                    <>     
                    </>

                )

            }
            </>

        }

        </>

    )
}

export default RoomHistory;
