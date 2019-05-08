import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import {Link} from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import DeleteIcon from "@material-ui/icons/Delete";
import Header from '../Header';
import {Book, Order} from "../../agent";
import {connect} from "react-redux";
import {errorHandler} from '../../utils/usefulFunction'


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



class ShoppingCart extends React.Component{
    constructor(props) {
        super(props);
        this.state = {cart: []};
        this.removeButtonClick = this.removeButtonClick.bind(this);
    }

    componentDidMount() {
        Book.showCart(this.props._id).then(res=> this.setState({cart:res.books})).catch(errorHandler);
    }

    removeButtonClick = (_id, bookname, isbn) =>
        Book.removeFromCart(_id, bookname, isbn).then(() => {
                const oldCart = this.state.cart;
                const newCart = oldCart.filter(book=>isbn!==book.isbn);
                this.setState({cart: newCart});
            }
        ).catch(err=>alert("移除书失败！"));

    render() {
        const {classes/*, removeButtonClick*/} = this.props;
        const {cart} = this.state;
        return (
            <div className={classes.superRoot}>
                <Header/>
                <div className={classes.root}>
                    {cart.map(book =>
                        <React.Fragment key={book.isbn}>
                            <Toolbar>
                                <Avatar className={classes.avatar} alt="Book" children="书"/>
                                <Typography variant="h6">{book.isbn}</Typography>
                            </Toolbar>
                            <Typography className={classes.title}>{book.bookname}</Typography>
                            <Typography className={classes.summary}>{"数量：" + book.num}</Typography>
                            <Link to={'book/' + book.isbn} className={classes.link}>详情</Link>
                            <Button variant="contained" color="secondary" className={classes.deleteButton}
                                    onClick={() => this.removeButtonClick(this.props._id, book.bookname, book.isbn)}>
                                不要你了
                                <DeleteIcon className={classes.rightIcon}/>
                            </Button>
                            <Divider className={classes.divider}/>
                        </React.Fragment>
                    )}
                </div>
                <Button variant="contained" color="secondary" className={classes.deleteButton}
                        onClick={() => Order.generateAnOrder(this.props._id, this.state.cart, "buy by cart").then(this.setState({cart:[]}))
                            .catch(errorHandler)}>
                    结算
                    <DeleteIcon className={classes.rightIcon}/>
                </Button>
            </div>
        );
    }
}

ShoppingCart.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    const {Login/*, BookAndNum*/} = state;
    return {_id: Login._id/*, cart:BookAndNum.books*/};
}

function mapDispatchToProps(dispatch) {
    return {
        /*removeButtonClick: (_id, bookname, isbn) => Book.removeFromCart(_id, bookname, isbn).then(dispatch({
            type: 'REMOVE_FROM_CART',
            isbn: isbn
        })).catch(() => alert('delete article failed, please try again')),*/
        //storeCart: res=> dispatch({type:"SHOW_CART",result:res})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(ShoppingCart));
