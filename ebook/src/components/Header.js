import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Home from '@material-ui/icons/Home';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Login from './Login';
import {connect} from "react-redux";


const styles = theme => ({
    root: {
        flexGrow: theme.spacing.unit * 2,
        marginLeft: -theme.spacing.unit,
        marginRight: -theme.spacing.unit,
    },
    grow: {
        flexGrow: theme.spacing.unit * 2,
    },
    button: {
        marginRight: theme.spacing.unit * 5,
    },
    menuButton:{

    },
    hidden : {
        display: 'none',
    },
    buttonIcon: {
        marginRight: theme.spacing.unit * 0.5,
    },
});

class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {anchorEl: null, open: false};
        this.handleClose = () => {
            this.setState({anchorEl: null});
        };
        this.handleClick = event => {
            this.setState({anchorEl: event.currentTarget});
        };
        this.handleClickLogin = () => {
            this.setState({ open: true });
        };

        this.handleCloseLogin = () => {
            this.setState({ anchorEl: null, open: false });
        };
    }

    render() {
        const { classes,Login } = this.props;
        const { anchorEl } = this.state;
        return (
            <div className={classes.root}>

                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            欢迎，{Login.username !== '' ? Login.username : '请登录'}
                        </Typography>
                        <Button color="inherit" className={classes.button} href="#">
                            <Home className={classes.buttonIcon}/>
                            主页
                        </Button>
                        <Button color="inherit" className={classes.button} href="#/statistics">
                            <Home className={classes.buttonIcon}/>
                            数据统计
                        </Button>
                        {Login._id !== "" ?
                            (
                                Login.isManager ?
                                    <Button color="inherit" className={classes.button} href="#/manage-users">
                                        <AccountCircle className={classes.buttonIcon}/>
                                        管理用户
                                    </Button>
                                    :
                                    <Button color="inherit" className={classes.button} href="#/cart">
                                        <ShoppingCart className={classes.buttonIcon}/>
                                        购物车
                                    </Button>
                            ) : null
                        }
                        <Button
                            aria-owns={anchorEl ? 'simple-menu' : undefined}
                            aria-haspopup="true"
                            onClick={this.handleClick}
                            color="inherit"
                        >
                            <AccountCircle className={classes.buttonIcon}/>
                            注册/登录
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.handleClose}
                        >
                            <MenuItem onClick={this.handleClose}>
                                <Button color="inherit" fullWidth href="#/login">
                                    登录
                                </Button>
                            </MenuItem>
                            <MenuItem onClick={this.handleClose}>
                                <Button color="inherit" fullWidth href="#/signup">
                                    注册
                                </Button>
                            </MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }


}


function mapStateToProps(state) {
    return {Login: state.Login};
}

export default connect(mapStateToProps)(withStyles(styles)(Header));
//export default withStyles(styles)(Header);