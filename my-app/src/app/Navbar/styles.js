import { makeStyles } from '@material-ui/core/styles';

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
    marginRight: '50px',
  },
  purple: {
    color: '#000000',
    backgroundColor: '#b673ff',
  },
  linkContainer: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '50px',
    
  },
  navlink: {
   marginLeft: '50px',
    
  }
}));
