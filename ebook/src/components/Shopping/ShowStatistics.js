import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Header from '../Header';
import {connect} from "react-redux";
//import {Order} from "../../agent";
import SearchBar from '../Main/SearchBar';
import Chart from './Chart';


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

    }
});



class ShowStatistics extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data:{

            }
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.superRoot}>
                <Header/>
                <SearchBar/>
                <Chart data={{
                    xdata: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                    ydata: {
                        ydata1:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                        ydata2:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                    }
                }}
                />
            </div>
        );
    }
}

ShowStatistics.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        //_id: state.Login._id/*, cart:BookAndNum.books*/,
        //keyWord: state.Search.keyWord,
    };
}

export default connect(mapStateToProps)(withStyles(styles)(ShowStatistics));