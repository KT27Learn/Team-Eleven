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
    profileContent: {
        backgroundColor: "#FFB673",
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
    input: {
        display: 'none',
        color: "#FFB673",
        backgroundColor: "#FFB673",
        alignItems: 'center',
      },
    pictureForm: {
        color: "#FFB673",
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',

    },

    detailedSessionContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    bioCard: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    detailedSessionPagination: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',

    },
    cancelButton: {
        marginLeft: '30px'
    },
    changePassword: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    radioButton: {
        marginLeft: '30px',
    },
    root: {
        width: '100%',
      },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    usernameContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
    }
  }));
