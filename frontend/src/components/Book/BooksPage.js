import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Header from '../Header';
import SearchBar from '../Main/SearchBar';
import ChoosePage from '../Main/ChoosePage';
import Grid from '@material-ui/core/Grid';
import BookCard from './BookCard';
import Catalog from '../Main/Catalog';
import Pagination from './Pagination';
import {connect} from "react-redux";
import {Book, Manage} from "../../agent";
import {errorHandler} from '../../utils/usefulFunction'

const styles = theme => ({
    superRoot:{
      minWidth:'900px'
    },
    root: {
        position: 'relative',
        paddingTop: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 5,
        backgroundColor: theme.palette.common.paper,
    },
    bookCard:{
        marginLeft: theme.spacing.unit * 4,
        position: 'relative',
        display: 'inline-block',
        width:'200px',
        height: '250px',
        marginBottom: theme.spacing.unit * 15,
    },

});

class BooksPage extends React.Component{
    constructor(props) {
        super(props);
        this.bookPageOnChange = this.bookPageOnChange.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
    }

    componentDidMount() {
        Book.showBooks(this.props.curPage,this.props.perPageNum).then(res=>{this.props.setTotal(res.count);
        return this.props.storePageBooks(res)}).catch(errorHandler);
    }
    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.curPage!==nextProps.curPage || this.props.update!==nextProps.update)
        {
            this.bookPageOnChange(nextProps.curPage);
        }
    }

    bookPageOnChange(page){
        if (this.props.keyWord==="" || this.props.keyWord===undefined)
        {
            Book.showBooks(page,this.props.perPageNum).then(res=>{this.props.setTotal(res.count);return this.props.storePageBooks(res)}).catch(errorHandler);
        }
        else
        {
            if (this.props.by === 'isbn') {
                Book.getBookByisbn(this.props.keyWord,page,this.props.perPageNum).then(res=>{this.props.setTotal(res.count);return this.props.storePageBooks(res)}).catch(errorHandler);
            } else {
                Book.getBookByName(this.props.keyWord,page,this.props.perPageNum).then(res=>{this.props.setTotal(res.count);return this.props.storePageBooks(res)}).catch(errorHandler);
            }
        }
    }

    deleteBook(_id, bookname, isbn) {
        Manage.deleteABook(_id, bookname, isbn).then(this, this.props.deleteBook(isbn)).catch(errorHandler);
        this.forceUpdate();
    }
        render() {
        const {classes,books} = this.props;
            return (
                <div className={classes.superRoot}>
                    <Header/>
                    <SearchBar/>
                    <ChoosePage/>
                    <Grid container spacing={0}>
                        <Grid item xs={2}>
                            <Catalog/>
                        </Grid>
                        <Grid item xs={9} wrap="wrap">
                            {
                                books!==undefined?
                                    <div className={classes.root}>
                                        {
                                            books.map((book) => (
                                                <div className={classes.bookCard}>
                                                    <BookCard book={book} deleteBook={this.deleteBook}/>
                                                </div>
                                            ))
                                        }
                                    </div>:
                                    <p className={classes.root}>没有符合条件的书籍</p>
                            }

                        </Grid>
                    </Grid>
                    <Pagination/>
                </div>
            );
    }
}

function mapStateToProps(state) {
    return {
        books: state.BookDetail.books,
        update: state.BookDetail.update,
        curPage: state.Page.curPage,
        perPageNum: state.Page.perPageNum,
        keyWord: state.Search.keyWord,
        by: state.Search.by,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        storePageBooks: res => dispatch({type:"SHOW_BOOK",result:res}),
        deleteBook: isbn=>dispatch({type:"DELETE_BOOK",isbn:isbn}),
        setTotal: total=>dispatch({type:"SET_TOTAL",total:total})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(BooksPage));