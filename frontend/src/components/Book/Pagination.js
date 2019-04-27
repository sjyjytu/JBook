import React from "react";
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import {Button,Toolbar} from "@material-ui/core";
import {connect} from "react-redux";

class Pagination extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {total,perPageNum,isManager,curPage} = this.props;
        const allPage = Math.ceil(total / perPageNum) || 1;
        return (
            //allPage > 1 &&
            <Toolbar>
                <div>
                    {
                        `${(curPage - 1) * perPageNum + 1}-${curPage * perPageNum<total?curPage * perPageNum:total} of ${allPage} Pages`
                    }
                </div>
                <div style={{marginLeft: '200px'}}>
                    {
                        <Button primary key="prev" label="上一页" disabled={curPage <= 1}
                                onClick={() => this.props.lastPage()}>
                            <ChevronLeft/>
                            上一页
                        </Button>
                    }
                    {
                        `当前页：${curPage}`
                    }
                    {
                        <Button primary key="next" label="下一页" disabled={curPage === allPage}
                                onClick={() => this.props.nextPage()} labelPosition="before">
                            下一页
                            <ChevronRight/>
                        </Button>
                    }
                </div>
                {isManager?
                    <div style={{marginLeft:'400px'}}>
                        <Button size="large" variant="outlined" href="#/add-new-book">
                            新增图书
                        </Button>
                    </div>
                :null}
            </Toolbar>
        )
    }
}

function mapStateToProps(state) {
    return {
        isManager: state.Login.isManager,
        total: state.Page.total,
        curPage: state.Page.curPage,
        perPageNum: state.Page.perPageNum,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        nextPage: ()=>dispatch({type: "NEXT_PAGE"}),
        lastPage: ()=>dispatch({type: "LAST_PAGE"}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);