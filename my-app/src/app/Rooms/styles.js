import { makeStyles } from '@material-ui/core/styles';

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
      width: 150,
      height: 150,
      margin: 100,
      color: '#000000',
      backgroundColor: '#b673ff',
      
    },
    refreshButton: {

        marginLeft: '25px',
    }
    
  }));
