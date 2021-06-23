import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
    container: {
    
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    },
    profileCard: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        
    },
    studyHoursCard: {

        display:'flex',
        width: 150,
        margin: 100  
        
    },
    profileContent: {
        backgroundColor: "#FFB673",
        
    },
    studyHoursContent: {
        
        display:'flex',
        
    },
    lines : {

        flex: '1 0 auto',

    },

    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
      width: 150,
      height: 150,
      margin: 100
      

    },
  }));