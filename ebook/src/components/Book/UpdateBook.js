import React from 'react';
import Header from '../Header';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {MuiThemeProvider} from '@material-ui/core';
import theme from '../../theme';
import {connect} from "react-redux";
import request from 'superagent';
import {Manage} from "../../agent";
import NumberFormat from 'react-number-format';


const styles = theme => ({
    supermain:{
        minWidth: '650px',
    },
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(800 + theme.spacing.unit * 3 * 2)]: {
            width: 800,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper:{
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    submitButton:{
        float:'right',
    },
    imgButton:{
        fullWidth: 'true',
        backgroundColor: '#fff',
        outline: 'none',
        borderWidth: '0px',
        borderRadius: '3px',
    },
    input:{
        display:'none'
    },
    img: {
        width: '120px',
        height: '170px',
    },
    bookname:{
        display: 'block',
    },
    author:{

    },
    head:{
        float: 'left',
        height: '170px',
    },
    cover:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        float: 'right',
        height: '170px',
        width: '120px',
        border: '1px dashed blue',
    },
    price:{

    },
    formControl: {
        margin: theme.spacing.unit,
    },
    pan:{
        float: 'left',
        height: '170px',
        marginLeft: theme.spacing.unit * 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

//连接cloudinary的东西
const CLOUDINARY_UPLOAD_PRESET = 'cvtoheob';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dbqbt0cli/upload';

//格式化stockNum输入
function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            prefix="* "
        />
    );
}

function NumberFormatCustom2(props) {
    const { inputRef, onChange, ...other } = props;
    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            prefix="￥"
        />
    );
}


class UpdateBook extends React.Component{
    constructor(props) {
        super(props);
        const booksArr = this.props.booksArr;
        let targetISBN = parseInt(this.props.match.params.ISBN);
        const [book] = booksArr.filter(book=>book.ISBN===targetISBN);
        this.state = {bookname: book.bookname, summary: book.summary, uploadImgUrl: book.pictureUrl,
            price: book.price, author: book.author, stockNum: book.stockNum, ISBN: targetISBN};
        this.handleInputChange = field=> e => {
            const state = this.state;
            const newState = Object.assign({}, state, {[field]: e.target.value});
            this.setState(newState);
        };
        this.onImageDrop = this.onImageDrop.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
    }

    onImageDrop(files) {
        this.setState({
            uploadedFile: files[0]
        });

        this.handleImageUpload(files[0]);
    }

    handleImageUpload(file) {
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
            .field('file', file);

        upload.end((err, response) => {
            if (err) {
                console.error(err);
            }
            if (response.body.secure_url !== '') {
                this.setState({
                    uploadImgUrl: response.body.secure_url
                });
                console.log(response.body.secure_url);
                //this.forceUpdate();
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.redirectTo) {
            this.props.history.push(nextProps.redirectTo);
            this.props.onRedirect();
        }
    }
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div className={this.props.classes.supermain}>
                    <Header/>
                    <main className={this.props.classes.main}>
                        <Paper className={this.props.classes.paper}>
                            <form onSubmit={
                                e => {
                                    e.preventDefault();
                                    this.props.updateBook(
                                        {
                                            "bookname": this.state.bookname,
                                            "stockNum": parseInt(this.state.stockNum),
                                            "summary": this.state.summary,
                                            "pictureUrl": this.state.uploadImgUrl,
                                            "author": this.state.author,
                                            "price": parseFloat(this.state.price),
                                            "ISBN": this.state.ISBN
                                        }
                                    )
                                }
                            }>
                                <div className={this.props.classes.head}>
                                    <FormControl margin="normal" required className={this.props.classes.bookname}>
                                        <InputLabel htmlFor="bookname">Book Name</InputLabel>
                                        <Input
                                            id="bookname"
                                            name="bookname"
                                            value={this.state.bookname}
                                            onChange={this.handleInputChange('bookname')}
                                            autoFocus
                                        />
                                    </FormControl>
                                    <FormControl margin="normal" required className={this.props.classes.author}>
                                        <InputLabel htmlFor="author">Author</InputLabel>
                                        <Input
                                            id="author"
                                            name="author"
                                            value={this.state.author}
                                            onChange={this.handleInputChange('author')}
                                            autoFocus
                                        />
                                    </FormControl>
                                </div>
                                <div className={this.props.classes.pan}>
                                    <TextField
                                        className={this.props.classes.price}
                                        label="Price"
                                        value={this.state.price}
                                        onChange={this.handleInputChange('price')}
                                        id="formatted-numberformat-price"
                                        InputProps={{
                                            inputComponent: NumberFormatCustom2,
                                        }}
                                    />
                                    <TextField
                                        //className={this.props.classes.formControl}
                                        label="Stock Number"
                                        value={this.state.stockNum}
                                        onChange={this.handleInputChange('stockNum')}
                                        id="formatted-numberformat-stockNum"
                                        InputProps={{
                                            inputComponent: NumberFormatCustom,
                                        }}
                                    />
                                </div>
                                <div className={this.props.classes.cover}>
                                    <input accept=".jpg,.jpeg,.png " className={this.props.classes.input}
                                           id="icon-button-file" type="file"
                                           ref={ref => this.image = ref} onChange={event => {
                                        if (event.target.files.length !== 0) {
                                            this.onImageDrop(event.target.files);
                                        }
                                    }
                                    }/>
                                    <button className={this.props.classes.imgButton} onClick={() => this.image.click()}>
                                        {this.state.uploadImgUrl === '' ?
                                            <p>pick cover</p> :
                                            <img className={this.props.classes.img} src={this.state.uploadImgUrl}/>}
                                    </button>
                                </div>
                                <TextField margin="normal" required fullWidth multiline
                                           label="summary" rows={6} variant='outlined'
                                           id="summary" placeholder="summary of the book..."
                                           value={this.state.summary}
                                           onChange={this.handleInputChange('summary')}
                                />
                                <Button type="submit" variant="contained" color="primary"
                                        className={this.props.classes.submitButton}>
                                    更新
                                </Button>
                            </form>
                        </Paper>
                    </main>
                </div>
            </MuiThemeProvider>
        );
    }
}
function mapStateToProps(state) {
    return {
        redirectTo: state.Redirect.redirectTo,
        booksArr: state.BookDetail.books
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateBook: (book) => {
            Manage.updateABook(book)
                .then(()=>dispatch({type:'UPDATE_BOOK',book:book}))
                .catch((err)=>alert(err));
        },
        onRedirect: () => dispatch({type: 'REDIRECTED'})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(UpdateBook));