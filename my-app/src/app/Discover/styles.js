import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
    pagination: {
    
        justifyContent: "center",
        padding: "10px"

    },
    searchBar: {
        margin: theme.spacing(1),
    },
    formControl: {
        minWidth: 165,
    },
    profileCard: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        
    },
    profileContent: {
        backgroundColor: "#FFB673",
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
      margin: 100
      
    },
    imageUploaded: {
        height: '50%',
        width: '50%',
        
    },
    imageContainer: {
        flexDirection: 'column',
        alignItems: 'center',

    },
    input: {
        display: 'none',
        color: "#FFB673",
        backgroundColor: "#FFB673",
        alignItems: 'center',
    },
    descriptionBox: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: "center",

    },
    postButton: {
        marginLeft: '20px',
    },
    
  }));