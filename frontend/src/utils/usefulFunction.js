const errorHandler = err=> alert(err.response.data.msg);
export {errorHandler}

const getTime = (commentTime) => {
    // return commentTime.replace('T',' ').substring(0,commentTime.indexOf('.'))
    return commentTime
};
export {getTime}