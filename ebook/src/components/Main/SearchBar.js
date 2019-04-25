import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Grid from '@material-ui/core/Grid';
import { fade } from '@material-ui/core/styles/colorManipulator';
import {connect} from "react-redux";
import {Book} from "../../agent";
import {Radio} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { withRouter } from 'react-router-dom';

const styles = theme => ({
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',

        [theme.breakpoints.up('md')]: {
        width: 200,
    },
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
        display:'inline-block'

    },
    searchIcon: {
        marginLeft:theme.spacing.unit,
        //width: theme.spacing.unit * 2,
        height: '100%',
        position: 'absolute',
        //pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'right',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,

        backgroundColor: fade(theme.palette.common.white, 0.35),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.55),
        },
        marginRight: theme.spacing.unit * 2,
        float: 'right',
        width: '400px',
        [theme.breakpoints.down('md')]: {
            width: 'auto',
        },
    },
    toolbar: {
        marginLeft: -theme.spacing.unit,
        marginRight: -theme.spacing.unit,
        height: '100px',
        paddingTop: theme.spacing.unit * 3,
        backgroundColor: theme.palette.primary.elight,
    },
    title: {
        overflow: 'visible',
        marginLeft: theme.spacing.unit*3,
    },
    radio:{
        display: 'inline-block',
        width: '10px',
    },
    clearBtn:{
        marginLeft:-8*theme.spacing.unit,
        //width: theme.spacing.unit * 2,
        height: '100%',
        position: 'absolute',
    },
    hidden:{
        display:"none"
    }
});

class SearchBar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {key:''};
        this.handleRadioChange = this.handleRadioChange.bind(this);
    }

    async searchOnClick() {
        const key = this.state.key;
        const by = this.props.by;
        this.props.setKey(key);
        //alert(this.props.location.pathname);
        if (key === ''||key===undefined) {
            alert('关键字不能为空哦~');
        } else {
            //根据当前页面是订单页还是图书页进行不同处理
            if (this.props.location.pathname === "/order") {

            } else {
                await this.props.searchBtnClick();
                if (by === 'isbn') {
                    var regPos = /^\d+(\.\d+)?$/;
                    if (!regPos.test(key)) {
                        alert("输入的isbn格式不正确");
                    } else {
                        Book.getBookByisbn(key,this.props.curPage,this.props.perPageNum)
                            .then(res => this.props.searchBooks(res))
                            .catch(error=>alert(error.response.body.msg));
                    }
                } else {
                    Book.getBookByName(key,this.props.curPage,this.props.perPageNum)
                        .then(res => this.props.searchBooks(res))
                        .catch(err => {alert(err.response.body.msg);window.open('https://www.baidu.com/s?wd=' + key, '_blank')});
                }
            }
        }
    }

    handleRadioChange(e) {
        this.props.switchBy();
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.toolbar}>
                <Grid container spacing={24} alignItems="center">
                    <Grid item xs={6}>
                        <Typography className={classes.title} variant="h2" color="secondary" noWrap>
                            e-book
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <React.Fragment>
                            <Typography variant="h6" color="inherit"
                                        className={this.props.location.pathname === "/order"?classes.hidden:null}>
                                通过以下方式查找书:
                            </Typography>
                            <Radio
                                checked={this.props.by === 'isbn'}
                                onChange={this.handleRadioChange}
                                value="isbn"
                                name="radio-button"
                                aria-label="isbn"
                                checkedIcon={"isbn"}
                                className={this.props.location.pathname === "/order"?classes.hidden:null}
                            />
                            <Radio
                                checked={this.props.by === 'bookname'}
                                onChange={this.handleRadioChange}
                                value="bookname"
                                name="radio-button"
                                aria-label="bookname"
                                checkedIcon={"书名"}
                                className={this.props.location.pathname === "/order"?classes.hidden:null}
                            />
                        </React.Fragment>
                        <div className={classes.search}>
                            <Button className={classes.searchIcon}
                                        onClick={() => this.searchOnClick()}>
                                <SearchIcon/>
                                Go
                            </Button>
                            <InputBase
                                placeholder={"输入关键字查找..."}
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                value={this.state.key}
                                onChange={e => this.setState({key:e.target.value})}/>
                            <Button className={classes.clearBtn}
                                    onClick={()=>{this.props.clearAndReset();this.setState({key:''})}}
                            >
                                x
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        curPage: state.Page.curPage,
        perPageNum: state.Page.perPageNum,
        keyWord: state.Search.keyWord,
        by: state.Search.by,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        searchBooks: res => {
            dispatch({type:"SHOW_BOOK",result:res});
            dispatch({type:"SET_TOTAL",total:res.count});
        },
        clearAndReset: async () => {
            await dispatch({type:"RESET_KEY"});
            dispatch({type:"RESET_PAGE"});
            dispatch({type:"UPDATE"});
        },
        switchBy: () => dispatch({type:"SWITCH_BY"}),
        setKey: (key) => dispatch({type:"SET_KEY", keyWord:key}),
        searchBtnClick: () => {dispatch({type:"RESET_PAGE"});}
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SearchBar)));