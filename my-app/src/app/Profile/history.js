import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import useStyles from './styles';
import { selectAllPastLogs, fetchSessions } from './profileslice';

import { IconButton, Grid, Paper, Typography, Table, TableFooter, TablePagination, TableHead ,TableContainer, TableCell, TableRow, TableBody, CircularProgress, Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { useTheme } from '@material-ui/core/styles';

const History = () => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const [user] = useState(JSON.parse(localStorage.getItem('profile')));
    const historyStatus = useSelector((state) => state.profile.status);
    const historyList = useSelector(selectAllPastLogs);
    const [methodFrequency] = useState([]);
    const [frequencyListContents] = useState([]);
    const [completedTasks] = useState([]);
    const [uncompletedTasks] = useState([]);
    const [sortProgress, setSortProgress] = useState(false);
    const [frequencyPage, setFrequencyPage] = useState(0);
    const [frequencyRowsPerPage, setFrequencyRowsPerPage] = useState(5);
    const frequencyEmptyRows = useState(frequencyRowsPerPage - Math.min(frequencyRowsPerPage, frequencyListContents.length - frequencyPage * frequencyRowsPerPage));
    const [uncompletedPage, setUncompletedPage] = useState(0);
    const [uncompletedRowsPerPage, setUncompletedRowsPerPage] = useState(5);
    const uncompletedEmptyRows = useState(uncompletedRowsPerPage - Math.min(uncompletedRowsPerPage, uncompletedTasks.length - uncompletedPage * uncompletedRowsPerPage));
    const [completedPage, setCompletedPage] = useState(0);
    const [completedRowsPerPage, setCompletedRowsPerPage] = useState(5);
    const completedEmptyRows = useState(completedRowsPerPage - Math.min(completedRowsPerPage, completedTasks.length - completedPage * completedRowsPerPage));

    useEffect(() => {

        if (historyStatus === 'idle') {
          dispatch(fetchSessions({ userid : user.result._id}));
        } 
        
        if (historyStatus === 'succeeded') {
            sortTasks(historyList.session);
            calculateStats(historyList.session);
        }
      
        // eslint-disable-next-line    
    }, [historyStatus, dispatch]);

    /*
     * Calculates the cumulated time from past study sessions
     *
     * @param {Array} arr array to sieve through
     * 
     */  
    const calculateStats = (arr) => {
        //check most frequent methods
        if (arr) {

            for (let i = 0; i < arr.length; i++) {
    
                if (!frequencyListContents) {
    
                    frequencyListContents.push(arr[i].studymethod);
                    methodFrequency[0] = 1;
    
                } else {
    
                    let newMethod = true;
                    for (let k = 0; k < frequencyListContents.length; k++) {
                        
                        if (frequencyListContents[k] === arr[i].studymethod) {
    
                            methodFrequency[k] = methodFrequency[k] + 1;
                            newMethod = false;
                            break;
    
                        }
    
                    }
    
                    if (newMethod) {
    
                        frequencyListContents.push(arr[i].studymethod);
                        methodFrequency[frequencyListContents.length - 1] = 1;
                        
    
                    }
    
                }
    
            }
        }
        

    }

    /*
     * Sorts all tasks in past logs into completed tasks array and 
     * uncompleted tasks arrays
     *
     * @param {Array} arr array to be sorted
     * 
     */
    const sortTasks = (arr) => {

        if (arr) {
            for (let i = 0; i < arr.length; i++) {
                const currentLog = arr[i].tasks;

                if (currentLog) {
                    // eslint-disable-next-line
                    currentLog.map((task) => {
                        if (task.isComplete) {
                            completedTasks.push(task);
                        } else {
                            uncompletedTasks.push(task);
                        }
                    })
                }
            }
        }
        setSortProgress(true);
    }

    function calculateFrequency(no) {

        console.log(no);
        console.log(historyList.session.length)
        return Math.floor((no / historyList.session.length) * 100);

    }

    const handleChangeFrequencyPage = (event, newPage) => {
        setFrequencyPage(newPage);
    };
    
    const handleChangeFrequencyRowsPerPage = (event) => {
        setFrequencyRowsPerPage(parseInt(event.target.value, 10));
        setFrequencyPage(0);
    };

    const handleChangeUncompletedPage = (event, newPage) => {
        setUncompletedPage(newPage);
    };
    
    const handleChangeUncompletedRowsPerPage = (event) => {
        setUncompletedRowsPerPage(parseInt(event.target.value, 10));
        setUncompletedPage(0);
    };

    const handleChangeCompletedPage = (event, newPage) => {
        setCompletedPage(newPage);
    };
    
    const handleChangeCompletedRowsPerPage = (event) => {
        setCompletedRowsPerPage(parseInt(event.target.value, 10));
        setCompletedPage(0);
    };

    function TablePaginationActions(props) {
        const classes = useStyles();
        const theme = useTheme();
        const { count, page, rowsPerPage, onChangePage } = props;
      
        const handleFirstPageButtonClick = (event) => {
          onChangePage(event, 0);
        };
      
        const handleBackButtonClick = (event) => {
          onChangePage(event, page - 1);
        };
      
        const handleNextButtonClick = (event) => {
          onChangePage(event, page + 1);
        };
      
        const handleLastPageButtonClick = (event) => {
          onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
        };
      
        return (
          <div className={classes.rootTable}>
            <IconButton
              onClick={handleFirstPageButtonClick}
              disabled={page === 0}
              aria-label="first page"
            >
              {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
              onClick={handleNextButtonClick}
              disabled={page >= Math.ceil(count / rowsPerPage) - 1}
              aria-label="next page"
            >
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
              onClick={handleLastPageButtonClick}
              disabled={page >= Math.ceil(count / rowsPerPage) - 1}
              aria-label="last page"
            >
              {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
          </div>
        );
    }
      
    TablePaginationActions.propTypes = {
        count: PropTypes.number.isRequired,
        onChangePage: PropTypes.func.isRequired,
        page: PropTypes.number.isRequired,
        rowsPerPage: PropTypes.number.isRequired,
    };
    
    return (
        <>
            {sortProgress ? (
                <>
                    <br />
                    <br />
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        id="panel1a-header"
                        >
                        <Typography className={classes.heading}>Compiled Completed Tasks</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid>         
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                        <TableCell align="left">No.</TableCell>
                                        <TableCell align="left">Description</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {(completedRowsPerPage > 0
                                            ? completedTasks.slice(completedPage * completedRowsPerPage, completedPage * completedRowsPerPage + completedRowsPerPage)
                                            : completedTasks
                                        ).map((task, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="left">{(completedPage * completedRowsPerPage) + index + 1}</TableCell>
                                            <TableCell align="left">{task.description}</TableCell>
                                        </TableRow>
                                        ))}
                                        {completedEmptyRows > 0 && (
                                                <TableRow style={{ height: 53 * completedEmptyRows }}>
                                                    <TableCell colSpan={6} />
                                                </TableRow>
                                        )}
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                            colSpan={3}
                                            count={completedTasks.length}
                                            rowsPerPage={completedRowsPerPage}
                                            page={completedPage}
                                            SelectProps={{
                                            inputProps: { 'aria-label': 'rows per page' },
                                            native: true,
                                            }}
                                            onChangePage={handleChangeCompletedPage}
                                            onChangeRowsPerPage={handleChangeCompletedRowsPerPage}
                                            ActionsComponent={TablePaginationActions}
                                        />
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                                </TableContainer>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        >
                        <Typography className={classes.heading}>Compiled Uncompleted Tasks</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid>  
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="left">No.</TableCell>
                                                <TableCell align="left">Description</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {(uncompletedRowsPerPage > 0
                                            ? uncompletedTasks.slice(uncompletedPage * uncompletedRowsPerPage, uncompletedPage * uncompletedRowsPerPage + uncompletedRowsPerPage)
                                            : uncompletedTasks
                                            ).map((task, index) => (
                                                <TableRow key={index}>
                                                        <TableCell align="left">{uncompletedPage * uncompletedRowsPerPage+ index + 1}</TableCell>
                                                        <TableCell align="left">{task.description}</TableCell>
                                                </TableRow>
                                            ))}
                                            {uncompletedEmptyRows > 0 && (
                                                <TableRow style={{ height: 53 * uncompletedEmptyRows }}>
                                                    <TableCell colSpan={6} />
                                                </TableRow>
                                            )}
                                        </TableBody>
                                        <TableFooter>
                                            <TableRow>
                                            <TablePagination
                                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                                colSpan={3}
                                                count={uncompletedTasks.length}
                                                rowsPerPage={uncompletedRowsPerPage}
                                                page={uncompletedPage}
                                                SelectProps={{
                                                inputProps: { 'aria-label': 'rows per page' },
                                                native: true,
                                                }}
                                                onChangePage={handleChangeUncompletedPage}
                                                onChangeRowsPerPage={handleChangeUncompletedRowsPerPage}
                                                ActionsComponent={TablePaginationActions}
                                            />
                                            </TableRow>
                                        </TableFooter>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        >
                        <Typography className={classes.heading}>Study Methods Frequency</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">No.</TableCell>
                                            <TableCell align="left">Method</TableCell>
                                            <TableCell align="center">Total Uses</TableCell>
                                            <TableCell align="center">Frequency</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {(frequencyRowsPerPage > 0
                                        ? frequencyListContents.slice(frequencyPage * frequencyRowsPerPage, frequencyPage * frequencyRowsPerPage + frequencyRowsPerPage)
                                        : frequencyListContents
                                        ).map((methodName, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="left">{(frequencyPage * frequencyRowsPerPage) + index + 1}</TableCell>
                                            <TableCell align="left">{methodName}</TableCell>
                                            <TableCell align="center">{methodFrequency[index]}</TableCell>
                                            <TableCell align="center">{calculateFrequency(methodFrequency[index])}%</TableCell>
                                        </TableRow>
                                        ))}
                                        {uncompletedEmptyRows > 0 && (
                                        <TableRow style={{ height: 53 * frequencyEmptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                        )}
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                            colSpan={3}
                                            count={frequencyListContents.length}
                                            rowsPerPage={frequencyRowsPerPage}
                                            page={frequencyPage}
                                            SelectProps={{
                                            inputProps: { 'aria-label': 'rows per page' },
                                            native: true,
                                            }}
                                            onChangePage={handleChangeFrequencyPage}
                                            onChangeRowsPerPage={handleChangeFrequencyRowsPerPage}
                                            ActionsComponent={TablePaginationActions}
                                        />
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </TableContainer>
                        </AccordionDetails>
                    </Accordion>
                </>
                
            ) : (
                
                <CircularProgress />

            )}
                
        </>
    )
}

export default History;
