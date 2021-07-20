import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Typography, Grid, CircularProgress } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

import Post from '../Post/post';
import { selectAllPosts, fetchPosts } from '../discoverslice';
import useStyles from './styles';

function AllPosts({userid}) {

  const dispatch = useDispatch();
  const classes = useStyles();

  const postsList = useSelector(selectAllPosts);
  const postStatus = useSelector((state) => state.discover.status);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }

  }, [postStatus, dispatch])

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

  /*
   * Reverses the order of the array given to the function
   *
   * @param {Array} array array to be reversed
   *
   */
  const reverseArray = (arr) => {

    if (arr) {

      const lens = arr.length;
      let newSortedRooms = [];
    
      for (let i = 0; i < lens; i ++) {
  
        newSortedRooms.push(arr[lens - i - 1]);
  
      }
      return newSortedRooms;
    }

  }

  const checkUser = (post) => {

    return post.creatorid === userid;

  }

    return (   

        <>
        <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="center"
        >
          <Grid>
            <Typography variant="h5" align="left">Posts:</Typography>

          </Grid>
        {postStatus === 'loading' || postStatus === 'error'  ? <CircularProgress /> : (
            <>
              {reverseArray(postsList).filter(post => checkUser(post)).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((post) => (
                <Grid key={post._id} item xs={12} sm={6} md={6}>
                  <Post post={post} />
                </Grid>
              ))}
              <Pagination 
                count={countPages(postsList)}
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
        )}
        </Grid>
        </>
    )

}

export default AllPosts;