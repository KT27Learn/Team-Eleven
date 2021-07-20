import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    roomContainer: {
    
        display: 'flex',
        alignItems: 'center',
        width:'40vw',

    },
    roomContent: {

        marginLeft: '20px'

    },
    roomButton: {

        marginRight: '20px'

    },
    profileDetails: {
        direction: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        display: 'flex',
    },
    username: {
        marginLeft: '10px'
    }
  }));