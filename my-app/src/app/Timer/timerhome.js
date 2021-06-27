import React from 'react';
import { useSelector } from 'react-redux';

import Timer from './timer';

import selectMethodById from '../Library/LibrarySlice';
import { Container } from '@material-ui/core';

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