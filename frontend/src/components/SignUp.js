import React from 'react';
import Header from './Header';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import {MuiThemeProvider} from '@material-ui/core';
import theme from '../theme';
import {User} from "../agent";
import {connect} from "react-redux";
import {errorHandler} from '../utils/usefulFunction'

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper:{
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },

});

class SignUp extends React.Component{
    constructor(props) {
        super(props);
        this.state = {username:'',password:'',confirmPass:'',email:'',time: 30, btnDisable: false, btnContent:'发送邮件认证'};
        this.handleInputChange = field=> e => {
            const state = this.state;
            const newState = Object.assign({}, state, {[field]: e.target.value});
            this.setState(newState);
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.redirectTo) {
            this.props.history.push(nextProps.redirectTo);
            this.props.onRedirect();
        }
    }

    render() {
        let timeChange;
        let ti = this.state.time;
        const clock = ()=>{
            if (ti > 0) {
                ti = ti - 1;
                this.setState({
                    time: ti,
                    btnContent: ti + "s之内不能再次发送邮件",
                });
            } else {
                clearInterval(timeChange);
                this.setState({btnDisable:false,time:30,btnContent:"发送邮件认证",})
            }
        };
        const sendCode = () => {
            this.setState({
                btnDisable:true,
                btnContent:"30s之内不能再次发送邮件",
            });
            timeChange = setInterval(clock, 1000);
        };
        return (
            <MuiThemeProvider theme={theme}>
                <Header/>
                <main className={this.props.classes.main}>
                    <Paper className={this.props.classes.paper}>
                        <AccountCircle/>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <form onSubmit={event => {
                            event.preventDefault();
                            if (this.state.password === this.state.confirmPass) {
                                this.props.checkAccount(this.state.username, this.state.password, this.state.email).then(()=>{sendCode();alert("注册成功！请前往邮箱认证！")}).catch(errorHandler);
                            } else {
                                alert('前后密码不一致');
                            }
                        }}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="username">UserName</InputLabel>
                                <Input
                                    id="username"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.handleInputChange('username')}
                                    autoFocus
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input
                                    id="password"
                                    name="password"
                                    value={this.state.password}
                                    autoComplete="current-password"
                                    onChange={this.handleInputChange('password')}
                                    type="password"
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="confirmPass">confirm your password</InputLabel>
                                <Input
                                    id="confirmPass"
                                    name="confirmPass"
                                    value={this.state.confirmPass}
                                    //autoComplete="current-password"
                                    onChange={this.handleInputChange('confirmPass')}
                                    type="password"
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email">email</InputLabel>
                                <Input
                                    id="email"
                                    name="email"
                                    value={this.state.email}
                                    autoComplete="current-password"
                                    onChange={this.handleInputChange('email')}
                                    type="email"
                                />
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled={this.state.btnDisable}
                            >
                                {this.state.btnContent}
                            </Button>
                        </form>
                    </Paper>
                </main>
            </MuiThemeProvider>

        );
    }
}

function mapStateToProps(state) {
    return {
        redirectTo: state.Redirect.redirectTo,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        checkAccount: (username, password, email) => {
            return User.signup(username, password, email).then(res=>dispatch({type: "SIGN_UP"}));
        },
        onRedirect: () => dispatch({type: 'REDIRECTED'})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(SignUp));