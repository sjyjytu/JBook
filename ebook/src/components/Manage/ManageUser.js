import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import DeleteIcon from "@material-ui/icons/Delete";
import Header from '../Header';
import {Manage} from "../../agent";
import {connect} from "react-redux";


const styles = theme => ({
    superRoot:{
        minWidth: '650px',
    },
    root:{
        marginTop:theme.spacing.unit * 5,
        paddingLeft: '20%',
        paddingRight: '10%',
    },
    paper:{
        paddingLeft:'40%',
        marginTop: theme.spacing.unit * 5,
    },
    date:{
        marginTop: theme.spacing.unit * 2,
    },
    avatar:{
        marginRight: theme.spacing.unit * 2,
        marginLeft: -theme.spacing.unit,
    },
    title:{
        color:theme.palette.primary.dark,
        fontSize: theme.spacing.unit * 3,
    },
    summary:{
        color: 'gray',
        fontSize: theme.spacing.unit,
    },
    link:{
        color: 'purple',
    },
    divider: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 5,
    },
    deleteButton: {
        marginLeft: '70%',
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    }
});



class ManageUser extends React.Component{
    constructor(props) {
        super(props);
        this.state = {users: []};
        this.banButtonClick = this.banButtonClick.bind(this);
    }

    componentDidMount() {
        Manage.showUsers().then(res=> this.setState({users:res.users})).catch(err=>alert(err));
    }

    banButtonClick = (_id) =>
        Manage.banAUser(_id).then(() => {
                const oldUsers = this.state.users;
                const newUsers = oldUsers.map(user=>{
                    if (user._id === _id) {
                        user.isBanned = !user.isBanned;
                    }
                    return user;
                });

                this.setState({users: newUsers});
            }
        ).catch(err=>alert(err));

    render() {
        const {classes/*, removeButtonClick*/} = this.props;
        const {users} = this.state;
        return (
            <div className={classes.superRoot}>
                <Header/>
                <div className={classes.root}>
                    {users.map(user =>
                        <React.Fragment key={user._id}>
                            <Toolbar>
                                <Avatar className={classes.avatar} alt="用户" children="user"/>
                                <Typography variant="h6">{user._id}</Typography>
                            </Toolbar>
                            <Typography className={classes.title}>{user.username}</Typography>
                            {
                                user.isManager?
                                    <React.Fragment>
                                        <Typography className={classes.summary}>
                                            {user._id===1?"超级管理员大Boss":"一般管理员"}
                                        </Typography>
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        <Typography className={classes.summary}>
                                            普通用户
                                        </Typography>
                                        <Typography>
                                            状态：
                                            {user.isBanned?"被禁用":"正常"}
                                        </Typography>
                                        <Button variant="contained" color="secondary" className={classes.deleteButton}
                                                onClick={() => this.banButtonClick(user._id)}>
                                            {user.isBanned?"解禁":"禁用"}
                                            <DeleteIcon className={classes.rightIcon}/>
                                        </Button>
                                    </React.Fragment>
                            }
                            <Divider className={classes.divider}/>
                        </React.Fragment>
                    )}
                </div>
            </div>
        );
    }
}

ManageUser.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    //日后可用来记录是哪个管理员操作的
    return {_id: state.Login._id/*, cart:BookAndNum.books*/};
}


export default connect(mapStateToProps)(withStyles(styles)(ManageUser));