import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
    container: {
      
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    },
    button: {
        margin: theme.spacing(1),
      },
      timerButton: {
        alignItems: 'center',
        justifyContent: 'center'
      },
      rootCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
   
      },
      purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
        width: 150,
        height: 150,
        margin: 100
        
  
      },
      table: {
        minWidth: 650,
      },

  }));