import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    homeContainer: {
    
        display: 'flex',
        alignItems: 'flex-end',
        flexDirection: 'row'
    },
    homeGrid: {
        justify: "space-between", 
        alignItems:"stretch-end" ,
        flexDirection: 'row'
    },
    profileContainer: {
        border: "none", 
        boxShadow: "none",
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: '50px'
    },
    profileContent: {
        direction: "row",
    },
    userName: {

        marginLeft: '10px'

    },
    followButton: {
        backgroundColor: "#FFB673",
        align: "right",
        
    },
    descriptionContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: '50px'
    },
  }));