package com.kty.ebook.service;

import com.kty.ebook.entity.BookComment;
import com.kty.ebook.entity.Comment;

import java.util.List;

public interface BookCommentService {
    public BookComment findBookCommentsOrNew(long isbn);

    public List<Comment> findComments(long isbn);

    public String saveBookComments(long isbn, List<Comment> comments);

    public void saveComment(BookComment oldComment, long userId, String username, String content);

    public String saveReply(long isbn, List<Integer> commentIndex, long userId, String username, String content);
}
