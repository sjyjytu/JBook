import React from 'react';
import Header from '../Header';
import SearchBar from './SearchBar';
import ChoosePage from './ChoosePage';
import { withStyles } from '@material-ui/core/styles';
//import {connect } from "react-redux";

const styles = theme => ({
    main:{
        backgroundColor:theme.palette.secondary.main,

    }

});



class HomePage extends React.Component{
    render() {
        return (
            <React.Fragment>
                <Header/>
                <SearchBar/>
                <ChoosePage/>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(HomePage);