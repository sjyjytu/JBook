package com.kty.ebook.controller;

import com.alibaba.fastjson.JSONObject;
import com.kty.ebook.entity.BookComment;
import com.kty.ebook.entity.Comment;
import com.kty.ebook.service.BookCommentService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.models.auth.In;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(description = "评论接口")
@Controller
@RequestMapping(value = "api/comment")
@CrossOrigin
public class BookCommentController {
    @Autowired
    private BookCommentService bookCommentService;

    @ApiOperation(value = "显示评论", notes = "显示评论")
    @RequestMapping(value = "/show",method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<JSONObject> show(@RequestParam(name = "isbn") long isbn){
        JSONObject ret = new JSONObject();
        BookComment bookComment = bookCommentService.findBookCommentsOrNew(isbn);
        List<Comment> comments = bookComment.getReplies();
        if(null != comments&&comments.size()>0) {
            ret.put("comments",comments);
            return new ResponseEntity<>(ret, HttpStatus.OK);
        } else {
            ret.put("msg","no comment.");
            return new ResponseEntity<>(ret, HttpStatus.EXPECTATION_FAILED);
        }
    }

    @ApiOperation(value = "添加评论", notes = "添加评论")
    @RequestMapping(value = "/add",method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<JSONObject> add(@RequestBody String request){
        JSONObject ret = new JSONObject();
        JSONObject param = JSONObject.parseObject(request);
        long isbn = param.getLongValue("isbn");
        long userId = param.getLongValue("userId");
        List<Integer> commentIndex = param.getJSONArray("index").toJavaList(Integer.class);
        String username = param.getString("username");
        String content = param.getString("content");
        String result = bookCommentService.saveReply(isbn, commentIndex, userId, username, content);
        ret.put("msg",result);
        if (result.equals("ok")) {
            return new ResponseEntity<>(ret, HttpStatus.OK);
        }
        return new ResponseEntity<>(ret, HttpStatus.EXPECTATION_FAILED);
    }
}
