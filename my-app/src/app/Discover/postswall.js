import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Typography, Grid, CircularProgress, Button } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

import Post from './Post/post';
import { selectAllPosts, fetchPosts } from './discoverslice';
import useStyles from './styles';

function PostsWall() {

  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [user] = useState(JSON.parse(localStorage.getItem('profile')));
  const postsList = useSelector(selectAllPosts);
  const postStatus = useSelector((state) => state.discover.status);
  const [viewFriendsOnly, setViewFriendsOnly] = useState(false);
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
   * Routes user to create room page
   *
   */
  const createPost = () => {

    history.push('/createpost');

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

  const friendsFilter = (list) => {

    if (!viewFriendsOnly) {

      return list;

    } else {
      
      // eslint-disable-next-line
      return list.filter(post => {

        const result = user.result.friends.filter(friend => friend.friendid === post.creatorid);

        if (result.length > 0) {

          return post;

        }
        
      });

    }

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
          <Typography variant="h5" align="left">{viewFriendsOnly ? "Friends' Posts:" : "Posts:"}</Typography>
          </Grid>
          <Grid className={classes.searchBar}>
              {user ? (
                <>
                <Grid>
                  <Button variant="contained" color="primary" onClick={() => setViewFriendsOnly(!viewFriendsOnly)}>
                    {viewFriendsOnly ? 'View all Posts' : "View Only Friends' Posts"}
                  </Button>
                  <Button className={classes.postButton} variant="contained" color="secondary" onClick={createPost}>
                    Create Post
                  </Button>
                </Grid>
                <br />
                </>
              ) : (
                <>
                </>
              )}
          </Grid>
          {postStatus === 'loading' || postStatus === 'error'  ? <CircularProgress /> : (
            <>
              {reverseArray(friendsFilter(postsList)).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((post) => (
                <Grid key={post._id} item xs={12} sm={6} md={6}>
                  <Post post={post} />
                </Grid>
              ))}
              <Grid>
                <Pagination 
                  count={countPages(friendsFilter(postsList))}
                  page={currentPage}
                  onChange={handlePaginationChange}
                  defaultPage={1}
                  color="primary"
                  size="large"
                  showFirstButton
                  showLastButton
                  classes={classes.pagination}
                />
              </Grid>
            </> 
          )}
        </Grid>
        </>
    )
}

export default PostsWall;
