import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import {connect} from "react-redux";
import {Comment} from "../../agent";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {withRouter} from "react-router-dom";
import {errorHandler} from "../../utils/usefulFunction";

const styles = theme => ({
    superRoot:{
        minWidth: '650px',
    },
    root:{
        marginTop:theme.spacing.unit * 5,
        paddingLeft: '20%',
        paddingRight: '10%',
    },
    avatar:{
        marginRight: theme.spacing.unit * 2,
        marginLeft: -theme.spacing.unit,
    },
    content:{
        color:theme.palette.primary.dark,
        fontSize: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit * 10,
    },
    summary:{
        fontSize: theme.spacing.unit,
    },
    subreply:{
        marginLeft: theme.spacing.unit*10,
    },
    fabiao:{
        marginTop: theme.spacing.unit * 5
    }
});

class Comments extends React.Component{
    constructor(props) {
        super(props);
        this.state = {comments: [],open:false,input_content:"",indexArr:[]};
    }

    componentDidMount() {
        Comment.showComment(this.props.isbn).then(res=> this.setState({comments:res.comments})).catch(errorHandler);
    }

    handleClickOpen = index => () => {
        this.setState({ open: true , indexArr:index.slice()});
    };

    handleClose = () => {
        this.setState({ open: false , input_content:"", indexArr:[]});
    };

    handleSubmit = () => {
        Comment.addComment(this.props.isbn,this.props._id,this.state.indexArr,this.props.username,this.state.input_content);
        this.handleClose();
        this.props.history.push('/');
    };

    handleContentChange = e => {
        this.setState({input_content:e.target.value})
    };

    getTime(commentTime) {
        return commentTime.replace('T',' ').substring(0,commentTime.indexOf('.'))
        // return commentTime
    }

    showTree(replies, parentName, indexArr) {
        const {classes} = this.props;
        return (
            <React.Fragment>
                {
                    replies.map((reply,index)=>
                    <div className={indexArr.length>1?null:classes.subreply}>
                        <Toolbar>
                            <Avatar className={classes.avatar} alt="User" children={reply.userId}/>
                            <Typography variant="h6">{reply.username + " 回复 "+parentName+"  " + this.getTime(reply.commentTime)}</Typography>
                        </Toolbar>
                        <Typography variant="h6" className={classes.content}>{reply.content}</Typography>
                        {this.props._id===""?null:
                            <Button variant="outlined" color="primary" onClick={this.handleClickOpen(indexArr.concat(index))}>
                                回复
                            </Button>}
                        {
                            reply.replies==null||reply.replies.length<=0?null:this.showTree(reply.replies,reply.username,indexArr.concat(index))
                        }
                    </div>)
                }
            </React.Fragment>
        )
    }

    render() {
        const {classes} = this.props;
        const {comments} = this.state;
        return (
            <div className={classes.superRoot}>
                <div className={classes.root}>
                    {comments.map((comment,index) =>
                        <React.Fragment key={comment.commentTime}>
                            <Toolbar>
                                <Avatar className={classes.avatar} alt="User" children={comment.userId}/>
                                <Typography variant="h6">{comment.username + "  " + this.getTime(comment.commentTime)}</Typography>
                            </Toolbar>
                            <Typography variant="h6" className={classes.content}>{comment.content}</Typography>
                            {this.props._id===""?null:
                                <Button variant="outlined" color="primary" onClick={this.handleClickOpen([index])}>
                                    回复
                                </Button>}
                            <div className={classes.summary}>
                                {
                                    comment.replies==null||comment.replies.length<=0?null:this.showTree(comment.replies,comment.username,[index])
                                }
                            </div>
                        </React.Fragment>
                    )}
                </div>
                {this.props._id===""?null:
                    <Button fullWidth className={classes.fabiao} variant="outlined" color="primary" onClick={this.handleClickOpen([])}>
                        发表评论
                    </Button>}
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">输入回复内容</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="normal"
                            id="name"
                            label="说点啥..."
                            type="text"
                            rows={3}
                            fullWidth
                            multiline
                            value={this.state.input_content}
                            onChange={this.handleContentChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            取消
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            确定
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

Comments.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        _id:state.Login._id,
        username:state.Login.username,
    };
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Comments)));