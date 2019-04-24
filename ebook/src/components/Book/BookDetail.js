import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Header from '../Header';
import SearchBar from '../Main/SearchBar';
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import {Button} from "@material-ui/core";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import {connect} from "react-redux";
import {Book,Order} from '../../agent';

const styles = theme => ({
    superRoot: {
        minWidth: '800px',
    },
    root: {
        position: 'relative',
        paddingTop: theme.spacing.unit * 3,
        paddingLeft: '8%',
        paddingRight: '3%',
        height: '350px',
        backgroundColor: theme.palette.common.paper,
    },
    left: {
        height: '250px',
        padding: theme.spacing.unit,
        textAlign: 'center',
        position: 'absolute',
        width: '18%',
        backgroundColor: '#ccc'
    },
    middle: {
        height: '200px',
        textAlign: 'left',
        marginLeft: '21%',
        width: '49%',
        position: 'absolute',
        whiteSpace: 'pre',
    },
    right: {
        height: '200px',
        border: '1px dashed #fab',
        lineHeight: '40px',
        //backgroundColor: 'purple',
        width: '15%',
        position: 'absolute',
        marginLeft: '75%',
        textAlign: 'center',
        fontSize: '25px',
        color: '#2aa',
        padding: '10px',
    },
    price: {
        backgroundColor: '#689',
        color: '#922',
        width: '90%',
        fontSize: '28px',
        margin: '10px 0',
        padding: '30px'
    },
    summary: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 2,
        height: 'auto',
        lineHeight: '20px',

    },
    summarySpan: {
        width: '200px',
        whiteSpace: 'normal',
        wordWrap: 'break-word',
        wordBreak: 'break-all',
        overflow: 'hidden',
    },
    inputNum: {
        width: '40px',
        height: '30px',
    },
    addBtn: {
        backgroundColor: '#f88',
        marginLeft: theme.spacing.unit,
        fontSize: '18px',
        color: 'white',
    },
    buyBtn: {
        marginLeft: theme.spacing.unit * 2,
        backgroundColor: '#fee',
        fontSize: '18px',
        color: '#f48',
        fontWeight: 'normal'
    },
    body: {
        position: "relative",
        marginTop: '10px',
        backgroundColor: '#d39',
        marginLeft: '50px',
    },
});

class BookDetail extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        };
    }
    handleChange = (event, value) => {
        this.setState({ value });
    };
    render() {
        const {classes, books, _id} = this.props;
        let targetISBN = parseInt(this.props.match.params.ISBN);
        const [book] = books.filter(book=>book.ISBN===targetISBN);
        let numValue;
        return (
            <div className={classes.superRoot}>
                <Header/>
                <SearchBar/>
                <div className={classes.root}>
                    <div className={classes.left}>
                        <img src={book.pictureUrl} alt="别买了，这书连封面都没有"
                             width="100%" height="100%"/>
                    </div>
                    <div className={classes.middle}>
                        <Typography variant="h4">{book.bookname}</Typography>
                        <Divider/>
                        <Typography variant="body1" color="inherit">
                            作者：{book.author}
                            {"       "}
                            库存：{book.stockNum}
                        </Typography>
                        <div className={classes.price}>
                            ￥ {book.price}
                        </div>
                        <div className={classes.summary}>
                            <span className={classes.summarySpan}>
                                {book.summary}
                            </span>
                        </div>
                        <input type="number" min="1" max={book.stockNum} className={classes.inputNum}
                               ref={ref => numValue = ref}
                        />
                        <Button className={classes.addBtn} onClick={
                            () => (_id === '' ? alert("请先登录") :
                                    (numValue.value > book.stockNum ? alert("库存不足") :
                                        (numValue.value <= 0 || numValue.value === 'undefined' ? alert("请正确填写数量") :
                                            this.props.addToCart(_id, book.bookname, numValue.value, book.ISBN)))
                            )
                        }>
                            加入购物车
                        </Button>
                        <Button className={classes.buyBtn} onClick={
                            () => (_id === '' ? alert("请先登录") :
                                    (numValue.value > book.stockNum ? alert("库存不足") :
                                        (numValue.value <= 0 || numValue.value === 'undefined' ? alert("请正确填写数量") :
                                            this.props.buyNow(_id, [{
                                                "bookname": book.bookname,
                                                "num": numValue.value,
                                                "ISBN": book.ISBN
                                            }], "buy directly")))
                            )
                        }>
                            立即购买
                        </Button>
                    </div>
                    <div className={classes.right}>
                        广告位招租
                        客天涯是一个大帅b
                    </div>

                </div>
                <div className={classes.body}>
                    <BottomNavigation
                        value={this.state.value}
                        onChange={this.handleChange}
                        showLabels
                    >
                        <BottomNavigationAction label="商品评论" icon={<RestoreIcon/>}/>
                        <BottomNavigationAction label="猜你喜欢" icon={<FavoriteIcon/>}/>
                        <BottomNavigationAction label="附近的人" icon={<LocationOnIcon/>}/>
                    </BottomNavigation>
                    <Divider/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        books: state.BookDetail.books,
        _id: state.Login._id,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        addToCart: (_id, bookname, num, ISBN) => Book.addToCart(_id, bookname, num, ISBN).then(dispatch({
            type: "ADD_TO_CART",
            bookname: bookname,
            num: num,
            ISBN: ISBN
        })).then(alert("加入购物车成功！")).catch(err => alert(err)),
        buyNow: (_id, booksArr, mode) => Order.generateAnOrder(_id,booksArr,mode)
            .then(alert("购买成功！")).catch(err => alert(err)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(BookDetail));