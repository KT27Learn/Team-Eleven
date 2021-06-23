import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Grid, CircularProgress, TextField, IconButton } from '@material-ui/core';
import { Pagination, PaginationItem } from '@material-ui/lab';
import SearchIcon from '@material-ui/icons/Search';

import { selectAllStudyMethods, fetchMethods, selectNumberOfStudyMethods, fetchFavourites, selectAllFavouriteStudyMethods} from './LibrarySlice';
import StudyMethod from './StudyMethod/studymethod';
import useStyles from './styles';


function Library() {

  const dispatch = useDispatch();
  const classes = useStyles();  

  const user = JSON.parse(localStorage.getItem('profile'));

  const librarylist = useSelector(selectAllStudyMethods);
  const libraryStatus = useSelector((state) => state.library.status);
  const favouritesList = useSelector(selectAllFavouriteStudyMethods);
  const favouritesStatus = useSelector((state) => state.library.favouritesStatus);
  const totalNumberOfStudyMethods = useSelector(selectNumberOfStudyMethods);
  const error = useSelector((state) => state.library.error);

  useEffect(() => {
    if (libraryStatus === 'idle') {
      dispatch(fetchMethods())
    }
    
  }, [libraryStatus, dispatch]);

  useEffect(() => {
    if (favouritesStatus === 'idle') {
      dispatch(fetchFavourites({ userid: user.result._id}))
    }
    
  }, [favouritesStatus, dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = useState(Math.ceil(totalNumberOfStudyMethods / itemsPerPage));
  const [search, setSearch] = useState('');

  const handlePaginationChange = (event, value) => {

    setCurrentPage(value);

  };

  const countPages = (arr) => {

    return Math.ceil(arr.length / itemsPerPage);

  }

  const searchFilter = (studymethod) => {

    if (search == '') {
      return studymethod
    } else if (studymethod.name.toLowerCase().includes(search.toLowerCase())) {
      return studymethod
    } else if (studymethod.description.toLowerCase().includes(search.toLowerCase())) {
      return studymethod
    } else {

    }

  }

  const handleSearchChange = (e) => {

    setSearch(e.target.value);

  } 

  /*const checkFavourites = (id) => {

    favouritesList.favouriteslog.filter(studymethods => {
      if (studymethods.studymethodid === id) {

        return true;

      } else {

        return false;

      }
    })
    
  }*/



    return (  
      <> 
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
                  label="Filter Study Methods" 
                  variant="outlined" 
                  value={search}
                  onChange={handleSearchChange}
              />
            </form>  
          </Grid>
        </Grid>
      </div>
      {(libraryStatus === 'loading') || (libraryStatus === 'error') || ( (favouritesStatus === 'loading') || (favouritesStatus === 'error') )  ? (
            <>
              <CircularProgress /> 
              
            </>
        ) : (
          <>
            {librarylist.filter(studymethod => searchFilter(studymethod)).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((studymethod) => (
                  <Grid key={studymethod._id} item xs={12} sm={6} md={6}>
                    <StudyMethod method={studymethod} favLog={favouritesList}/>
                  </Grid>
                ))}
                <Pagination 
                  count={countPages(librarylist.filter(room => searchFilter(room)))}
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
          
        )
      }
        
      </>
        
    )
}

export default Library;
