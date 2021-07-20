import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {selectAllFavouriteStudyMethods, fetchFavourites} from '../Library/LibrarySlice';

import { Card, CardContent, Typography } from '@material-ui/core';

function FavouriteMethods() {

    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem('profile'));
    const favouritesList = useSelector(selectAllFavouriteStudyMethods);
    const favouritesStatus = useSelector((state) => state.library.favouritesStatus);

    useEffect(() => {
        if (favouritesStatus === 'idle' && user) {
          dispatch(fetchFavourites({ userid: user.result._id}))
        }
        
        // eslint-disable-next-line
    }, [favouritesStatus, dispatch]);

    return (

        <>
        {favouritesStatus === 'succeeded' && (
            <>
            <Card>
                <CardContent>
                    <Typography  variant="h6" align="center">Favourited Study Methods:</Typography>
                    {!(favouritesList.length > 0) ? (
                        <>
                            <Typography  variant="subtitle2" align="center">No favourites at the moment</Typography>
                        </>
                    ): (
                        <>
                        {favouritesList.map(sm => {
                            return <Typography  variant="subtitle2" align="center">{sm.studymethodname}</Typography>
                        })}
                        </>
                    )}
                </CardContent>
            </Card>
            </>
        )}
        </>

    )


}

export default FavouriteMethods;