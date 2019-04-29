package com.kty.ebook;

import com.alibaba.fastjson.JSONObject;
import com.kty.ebook.entity.Comment;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.LinkedList;
import java.util.List;

//@RunWith(SpringRunner.class)
//@SpringBootTest
public class EbookApplicationTests {

    @Test
    public void contextLoads() {
    }

    @Test
    public void testJSONObjec() {

    }

    @Test
    public void testObject() {
        List<Comment> comments = new LinkedList<>();
        Comment comment = new Comment();
        Comment comment2 = new Comment();
        comment.setUsername("haha");
        comments.add(comment);
        comment2.setUsername("biubiu");
        comments.add(comment2);
        comment = comment2;
        comment.setUsername("efsf");
        System.out.println(comments.get(0).getUsername());
        System.out.println(comments.get(1).getUsername());
    }
}
