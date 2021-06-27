import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectAllStudyMethods, fetchMethods, fetchFavourites, selectAllFavouriteStudyMethods} from './LibrarySlice';
import StudyMethod from './StudyMethod/studymethod';
import useStyles from './styles';

import { Grid, CircularProgress, TextField } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import SearchIcon from '@material-ui/icons/Search';

function Library() {

  const dispatch = useDispatch();
  const classes = useStyles();  

  const user = JSON.parse(localStorage.getItem('profile'));
  const librarylist = useSelector(selectAllStudyMethods);
  const libraryStatus = useSelector((state) => state.library.status);
  const favouritesList = useSelector(selectAllFavouriteStudyMethods);
  const favouritesStatus = useSelector((state) => state.library.favouritesStatus);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (libraryStatus === 'idle') {
      dispatch(fetchMethods())
    }
    
  }, [libraryStatus, dispatch]);

  useEffect(() => {
    if (favouritesStatus === 'idle' && user) {
      dispatch(fetchFavourites({ userid: user.result._id}))
    }
    
    // eslint-disable-next-line
  }, [favouritesStatus, dispatch]);

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
  const searchFilter = (studymethod) => {

    if (search === '') {
      return studymethod
    } else if (studymethod.name.toLowerCase().includes(search.toLowerCase())) {
      return studymethod
    } else if (studymethod.description.toLowerCase().includes(search.toLowerCase())) {
      return studymethod
    } else {

    }

  }

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
   * Sorts the given array by putting favourites at the start of 
   * the array 
   *
   * @param {Array} array array to be sorted
   *
   */
  const sortedFavourites = (array) => {

    if (!array) {

    } else {
      let favourites = [];
      let nonFavourites = []
      for (let i = 0; i < array.length; i++) {
        if (favouritesList.filter(sm => sm.studymethodid === array[i]._id).length > 0) {
          favourites.push(array[i]);
        } else {
          nonFavourites.push(array[i]);
        }
      }
      const sortedArray = [ ...favourites, ...nonFavourites];
      return sortedArray;
    } 
  }

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
            {sortedFavourites(librarylist).filter(studymethod => searchFilter(studymethod)).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((studymethod) => (
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
