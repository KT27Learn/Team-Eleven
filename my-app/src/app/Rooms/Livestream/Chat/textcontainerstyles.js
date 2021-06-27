import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    container: {
    
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    },
    videoCard: {
        height: '500px',
        width: '70%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgb(0,0,0)',
        
    },
    videoContent: {
        
    },
    blackText: {

        color: "#000000"

    }
  }));