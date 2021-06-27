import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    container: {
    
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    },
    videoCard: {
        height: '400px',
        width: '600px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgb(0,0,0)',
        
    },
    videoContent: {
        
    },
    videoText: {

        color: "#FFFFFF",

    },
    streamerMuteAudioButton: {

        marginLeft: '20px'
    }
  }));