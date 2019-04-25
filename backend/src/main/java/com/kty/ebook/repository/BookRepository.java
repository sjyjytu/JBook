package com.kty.ebook.repository;

import com.kty.ebook.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface BookRepository extends CrudRepository<Book, Long>, PagingAndSortingRepository<Book, Long> {
    Page<Book> findAllByIsDeletedFalse(Pageable pageable);
    Page<Book> findBooksByIsbnIsAndIsDeletedFalse(long isbn, Pageable pageable);
    Page<Book> findBooksByBooknameLikeAndIsDeletedFalse(String bookname, Pageable pageable);
    Book findBookByIsbnIs(long isbn);
}

