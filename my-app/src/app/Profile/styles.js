import { makeStyles } from '@material-ui/core/styles';

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
        backgroundColor: "#000000",
        alignItems: 'center',
    },
    purple: {
      color: '#000000',
      backgroundColor: '#b673ff',
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
    radioButtonTest: {
        marginRight: '30px',
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
