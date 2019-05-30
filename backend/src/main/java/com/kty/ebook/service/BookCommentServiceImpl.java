package com.kty.ebook.service;

import com.kty.ebook.entity.BookComment;
import com.kty.ebook.entity.Comment;
import com.kty.ebook.repository.BookCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Service
public class BookCommentServiceImpl implements BookCommentService{
    @Autowired
    private BookCommentRepository bookCommentRepository;

    @Override
    public BookComment findBookCommentsOrNew(long isbn) {
        Optional<BookComment> bookComment = bookCommentRepository.findBookCommentByIsbn(isbn);
        BookComment bc = null;
        if (!bookComment.isPresent()) {
            bc = new BookComment();
            bc.setIsbn(isbn);
        } else {
            bc = bookComment.get();
        }
        return bc;
    }

    @Override
    public List<Comment> findComments(long isbn) {
        BookComment bookComment = findBookCommentsOrNew(isbn);
        return bookComment.getReplies();
    }

    //一级评论
    @Override
    public String saveBookComments(long isbn, List<Comment> comments) {
        BookComment bc = findBookCommentsOrNew(isbn);
        bc.setReplies(comments);
        bookCommentRepository.save(bc);
        return "ok";
    }

    //给一个Comment加一个子Comment
    @Override
    public void saveComment(BookComment oldComment, long userId, String username, String content) {
//        BookComment bc = findBookCommentsOrNew(isbn);
//        List<Comment> newComments = bc.getComments();
//        if (newComments == null) {
//            newComments = new LinkedList<>();
//        }
        //新建评论
        Comment comment = new Comment();
        comment.setUserId(userId);
        comment.setUsername(username);
        comment.setContent(content);
        comment.setCommentTime(new Date());
        List<Comment> newReplies = oldComment.getReplies();
        if (newReplies == null) {
            newReplies = new LinkedList<>();
        }
        newReplies.add(comment);
        oldComment.setReplies(newReplies);
    }

    //任意一级的回复
    //有点难啊，要搜索树，级联保存
    @Override
    public String saveReply(long isbn, List<Integer> commentIndex, long userId, String username, String content) {
        //初始化curComment和curCommentLayer
        BookComment bookComment = findBookCommentsOrNew(isbn);
        Comment curComment = null;
        List<Comment> curLayerComments = bookComment.getReplies();
        if (commentIndex.size() == 0) {
            saveComment(bookComment,userId,username,content);
        } else {
            //通过commentIndex找到最底层的curComment，新增评论
            for (int i = 0; i < commentIndex.size(); i++) {
                if (curLayerComments != null) {
                    curComment = curLayerComments.get(commentIndex.get(i));
                    curLayerComments = curComment.getReplies();
                } else {
                    return "error";
                }
            }
            saveComment(curComment,userId,username,content);
        }
        bookCommentRepository.save(bookComment);
        return "ok";
    }
}
