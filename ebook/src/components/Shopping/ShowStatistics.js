import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Header from '../Header';
import {connect} from "react-redux";
import {Order} from "../../agent";
import TextField from '@material-ui/core/TextField';
import SearchBar from '../Main/SearchBar';
import Chart from './Chart';
import {Button} from "@material-ui/core";


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
    },
    price:{

    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});



class ShowStatistics extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            bookData:{
                xdata: [],
                ydata: [],
                totalConsume: 0
            },
            userData:{
                xdata:[],
                ydata:[],
            },
            startTime:"2017-08-01T05:20",
            endTime:"2019-05-24T13:14"
        };
        this.handleTextFieldChange = name => event =>{
            this.setState({[name]:event.target.value})
        };
        this.checkBtnClick = this.checkBtnClick.bind(this);
    }


    componentDidMount() {
        this.checkBtnClick()
    }

    checkBtnClick(){
        const startTime = this.state.startTime.replace('T',' ') + ':00';
        const endTime = this.state.endTime.replace('T',' ') + ':00';
        Order.showStatistics(this.props._id, startTime, endTime).then(res=>{
                const book = res.book;
                const bookX = [];
                const bookY = [];
                for (var i in book){
                    bookX.push(i);
                    bookY.push(book[i]);
                }
                this.setState({bookData:{xdata: bookX,ydata: bookY,totalConsume: res.totalConsume}})
                if (this.props.isManager){
                    const user = res.user;
                    const userX = [];
                    const userY = [];
                    for (var i in user){
                        userX.push(i);
                        userY.push(user[i]);
                    }
                    this.setState({userData:{xdata: userX,ydata: userY}})
                }
            }
        )
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.superRoot}>
                <Header/>
                <form className={classes.container} noValidate>
                    <TextField
                        id="startTime"
                        label="startTime"
                        type="datetime-local"
                        value={this.state.startTime}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={this.handleTextFieldChange('startTime')}
                    />
                </form>
                <form className={classes.container} noValidate>
                    <TextField
                        id="endTime"
                        label="endTime"
                        type="datetime-local"
                        defaultValue={this.state.endTime}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={this.handleTextFieldChange('endTime')}
                    />
                </form>
                <Button onClick={()=>this.checkBtnClick()}>
                    查询
                </Button>
                <Chart data={this.state.bookData} text={'书籍情况'} yname={'购买数量'} xname={'书籍isbn'} chartId={'main1'}/>
                {
                    this.props.isManager?
                        <Chart data={this.state.userData} text={'用户情况'} yname={'花费金额'} xname={'用户id'} chartId={'main2'}/>
                        :null
                }
            </div>
        );
    }
}

ShowStatistics.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        isManager:state.Login.isManager,
        _id:state.Login._id,
    };
}

export default connect(mapStateToProps)(withStyles(styles)(ShowStatistics));