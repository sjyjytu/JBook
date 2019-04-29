package com.kty.ebook.repository;

import com.kty.ebook.entity.BookComment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface BookCommentRepository extends MongoRepository<BookComment, Long> {
    Optional<BookComment> findBookCommentByIsbn(long isbn);
}
