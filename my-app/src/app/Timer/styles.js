import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    container: {
      
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      
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
      profileCard: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',

      },
      profileContent: {
            backgroundColor: "#FFFFFF",
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
      rootTable: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
      },

  }));
