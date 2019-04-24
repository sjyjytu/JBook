import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import {User} from "../agent";
import { withStyles } from '@material-ui/core/styles';
import {connect} from "react-redux";
import bgImg from '../img/login.jpg';

const styles = theme => ({
    submit:{
        marginTop: theme.spacing.unit * 2,
    },
    /*img:{
        width: '100%',
        height:'400px',
        backgroundImg: `url(${bgImg})`
    }*/
});

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username:'',password:''};
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
        const {classes} = this.props;
        return (
            <div>
                <img src={bgImg}/>
                <Dialog
                    open={true}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Sign in</DialogTitle>
                    <DialogContent>
                        <form onSubmit={event => {
                            event.preventDefault();
                            this.props.checkAccount(this.state.username, this.state.password);
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
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign in
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

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
        checkAccount: (username, password) => {
            User.login(username, password).then(res=>dispatch({type: "LOGIN",result:res})).catch((err)=>alert(err));
        },
        onRedirect: () => dispatch({type: 'REDIRECTED'})

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Login));