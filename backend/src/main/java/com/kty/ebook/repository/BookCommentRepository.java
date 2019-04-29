package com.kty.ebook.repository;

import com.kty.ebook.entity.BookComment;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BookCommentRepository extends MongoRepository<BookComment, Long> {
}
