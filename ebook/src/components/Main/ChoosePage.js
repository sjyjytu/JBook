import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import {connect} from "react-redux";

const styles = theme => (
    {
        button:{
            padding: theme.spacing.unit * 2,
            textAlign: 'center',
            color: theme.palette.text.secondary,
            margin: theme.spacing.unit,
            fontSize: '18px',
        },
        root:{
            flexGrow: 1,
        },
    }
);

class ChoosePage extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        const {classes, isManager, _id} = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={24} alignItems="center">
                    {isManager?
                        <React.Fragment>
                            <Grid item xs={4}>
                                <Button className={classes.button} fullWidth={true} href='#/all-books'>图书管理</Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Button className={classes.button} fullWidth={true} href='#/manage-users'>用户管理</Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Button className={classes.button} fullWidth={true} href="#/order">订单管理</Button>
                            </Grid>
                        </React.Fragment>
                    :
                        <React.Fragment>
                            <Grid item xs={4}>
                                <Button className={classes.button} fullWidth={true} onClick={()=>this.props.update()}>所有图书</Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Button className={classes.button} fullWidth={true}>新书推荐</Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Button className={classes.button} fullWidth={true} href="#/order" disabled={_id===''}>我的订单</Button>
                            </Grid>
                        </React.Fragment>}
                </Grid>
                <Divider/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isManager: state.Login.isManager,
        _id: state.Login._id,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        update: ()=>dispatch({type:"UPDATE"})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(ChoosePage));