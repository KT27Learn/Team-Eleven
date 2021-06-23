import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import selectMethodById from '../Library/LibrarySlice';
import { Container } from '@material-ui/core';

import Timer from './timer';


const TimerHome = ( { match } ) => {

  const { Id } = match.params;
  const timerDetails = useSelector((state) => selectMethodById(state, Id));

  return (

      <Container>
        <Timer method={timerDetails}/>
      </Container>
      
  );
};

export default TimerHome;