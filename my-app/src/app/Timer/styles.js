import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
      },
      timerButton: {
        justifyContent: 'center',
        marginLeft: 60,
      },
      rootCard: {
        display: 'flex', 
        alignItems: 'center', 
        justifyContent:'center'
   
      },
      purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
        width: 150,
        height: 150,
        margin: 100
        
  
      },
  }));