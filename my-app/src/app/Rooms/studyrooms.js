import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory, useLocation  } from 'react-router-dom';

import { Typography, TextField, IconButton, Grid, CircularProgress, Paper, Button } from '@material-ui/core';
import { Pagination, PaginationItem } from '@material-ui/lab';
import SearchIcon from '@material-ui/icons/Search';

import StudyRoom from './Room/room';
import { selectAllRooms, fetchRooms, selectNumberOfRooms } from './roomsslice';
import useStyles from './styles';

function StudyRooms() {

    const dispatch = useDispatch();
    const roomlist = useSelector(selectAllRooms);
    const roomStatus = useSelector((state) => state.rooms.status);
    const totalNumberOfStudyRooms = useSelector(selectNumberOfRooms);
    const error = useSelector((state) => state.rooms.error);
    const classes = useStyles();
  
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const numberOfRooms = totalNumberOfStudyRooms;
    const [totalPage] = useState(Math.ceil(numberOfRooms / itemsPerPage));
    const history = useHistory();

    useEffect(() => {
      if (roomStatus === 'idle') {
        dispatch(fetchRooms())
      }
    }, [roomStatus, dispatch])

    


  const handleSearchChange = (e) => {

    setSearch(e.target.value);

  } 

  const handlePaginationChange = (event, value) => {

    setCurrentPage(value);

  };

  
  const handleKeyPress = (e) => {
    
    if (e.keyCode === 13) {
      searchRooms();
    }

  }

  const searchRooms = () => {

  }

  const countPages = (arr) => {

    return Math.ceil(arr.length / itemsPerPage);

  }

  const searchFilter = (room) => {

    if (search == '') {
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

  const createRoom = () => {

    history.push('/createroom');

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
                  onKeyDown={handleKeyPress}
                  onChange={handleSearchChange}
                />
              </form>  
            </Grid>
            <Grid>
              <Button variant="contained" color="secondary" onClick={createRoom}>
                Create Room
              </Button>
            </Grid>
          </Grid>
        </div>
        {roomStatus === 'loading' || roomStatus === 'error'  ? <CircularProgress /> : (
            <>
              {roomlist.filter((room) => searchFilter(room)).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((room) => (
                <Grid key={room._id} item xs={12} sm={6} md={6}>
                  <StudyRoom room={room} />
                </Grid>
              ))}
              <Pagination 
                count={countPages(roomlist.filter(room => searchFilter(room)))}
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
