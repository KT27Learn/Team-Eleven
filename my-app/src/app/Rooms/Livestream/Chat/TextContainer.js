import React from 'react';

import useStyles from './textcontainerstyles'

import { Typography } from '@material-ui/core';

function TextContainer({ users }) {

  const classes = useStyles();

  return (
    <>
      {users ? (
          <Typography className={classes.blackText} variant="h5">{users.length - 1} viewers in the room</Typography>
        ) :(
          <Typography className={classes.blackText} variant="h5">No viewers yet</Typography>
        ) }

    </>

  )

}

export default TextContainer;
