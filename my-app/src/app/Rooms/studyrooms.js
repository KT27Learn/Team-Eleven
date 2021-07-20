import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Typography, TextField, Grid, CircularProgress, Button } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import SearchIcon from '@material-ui/icons/Search';

import StudyRoom from './Room/room';
import { selectAllRooms, fetchRooms } from './roomsslice';
import useStyles from './styles';

function StudyRooms() {

  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [user] = useState(JSON.parse(localStorage.getItem('profile')));
  const roomlist = useSelector(selectAllRooms);
  const roomStatus = useSelector((state) => state.rooms.status);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [myRooms, setMyRooms] = useState(false);
  const itemsPerPage = 5;

  useEffect(() => {
    if (roomStatus === 'idle') {
      dispatch(fetchRooms())
    }

  }, [roomStatus, dispatch])

  /*
   * Sets the search term variable
   *
   * @param {Event} e event when user enters anything into the search bar
   *
   */
  const handleSearchChange = (e) => {

    setSearch(e.target.value);
    
  } 

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
   * Checks whether study method contains any words that matches the search term
   *
   * @param {Object} studymethod studymethod to checked
   *
   */
  const searchFilter = (room) => {

    if (search === '') {
      return room
    } else if (room.username.toLowerCase().includes(search.toLowerCase())) {
      return room
    } else if (room.description.toLowerCase().includes(search.toLowerCase())) {
      return room
    } else if (room.studymethod.toLowerCase().includes(search.toLowerCase())) {
      return room
    } else if (room.subject.toLowerCase().includes(search.toLowerCase())) {
      return room
    } else {

    }

  }

  /*
   * Routes user to create room page
   *
   */
  const createRoom = () => {

    history.push('/createroom');

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

  const showMyRooms = (arr) => {

    if (myRooms) {

      return arr.filter(room => room.userid === user.result._id)

    } else {

      return arr;

    }

  }

    return (   

        <>
        <Typography variant="h5" align="left">Live Rooms</Typography>
        <div className={classes.searchBar}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <SearchIcon />
            </Grid>
            <Grid item>
              <form noValidate autoComplete="off">
                <TextField 
                  name="search"
                  id="outlined-basic" 
                  label="Filter Rooms" 
                  variant="outlined" 
                  value={search}
                  onChange={handleSearchChange}
                />
              </form>  
            </Grid>
            <Grid>
              {user ? (
                <Button variant="contained" color="secondary" onClick={createRoom}>
                  Create Room
                </Button>

              ) : (

                <>
                </>

              )}
              
            </Grid>
          </Grid>
          <br />
          <Grid>
            { user && 
              <>
                <Button variant="contained" color="primary" onClick={() => setMyRooms(!myRooms)}>
                  { myRooms ? ('Show all rooms') : ('Show only my rooms')}
                </Button>
              </>
            }
          </Grid>
          <br />
        </div>
        {roomStatus === 'loading' || roomStatus === 'error'  ? <CircularProgress /> : (
            <>
              {reverseArray(showMyRooms(roomlist)).filter((room) => searchFilter(room)).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((room) => (
                <Grid key={room._id} item xs={12} sm={6} md={6}>
                  <StudyRoom room={room} />
                </Grid>
              ))}
              <Pagination 
                count={countPages(showMyRooms(roomlist).filter(room => searchFilter(room)))}
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
        </>
    )
}

export default StudyRooms;
