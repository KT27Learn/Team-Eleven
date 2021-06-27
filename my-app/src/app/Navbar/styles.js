import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    alignItems: 'center',
    padding: '10px 50px',
    background: '#8AD5FF',
    
  },
  
  heading: {
    color: 'rgb(0,0,0)',
    textDecoration: 'none',
  },
  image: {
    marginLeft: '15px',
  },
  navtabs: {
    marginLeft: '5px',
    
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '200px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '100px',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  link: {
    marginLeft: theme.spacing(2),
  }
}));
