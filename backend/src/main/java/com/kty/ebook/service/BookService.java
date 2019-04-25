package com.kty.ebook.service;

import com.kty.ebook.entity.Book;
import com.kty.ebook.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;

    public Book findBookByIsbn(long isbn) {
        Book book = null;
        try {
            book = bookRepository.findBookByIsbnIs(isbn);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return book;
    }
    public Page<Book> findBookByIsbnLimit(long isbn, int start, int num) {
        Page<Book> page = null;
        try {
            Sort sort = new Sort(Sort.Direction.ASC, "isbn");
            Pageable pageable = new PageRequest(start-1, num, sort);
            page = bookRepository.findBooksByIsbnIsAndIsDeletedFalse(isbn, pageable);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return page;
    }

    public Page<Book> findBookByBooknameLimit(String name, int start, int num) {
        Page<Book> page = null;
        try {
            Sort sort = new Sort(Sort.Direction.ASC, "isbn");
            Pageable pageable = new PageRequest(start-1, num, sort);
            page = bookRepository.findBooksByBooknameLikeAndIsDeletedFalse("%"+name+"%", pageable);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return page;
    }

    public Page<Book> showBookLimit(int start, int num) {
        Page<Book> page = null;
        try {
            Sort sort = new Sort(Sort.Direction.DESC, "isbn");
            Pageable pageable = new PageRequest(start-1, num, sort);
            page = bookRepository.findAllByIsDeletedFalse(pageable);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return page;
    }

    public String addBook(Book book) {
        try {
            bookRepository.save(book);
            return "ok";
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return "add book fail.";
        }
    }

    public String updateBook(Book book) {
        try {
            bookRepository.save(book);
            return "ok";
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return "update book fail.";
        }
    }

    public String deleteBook(long isbn) {
        try {
            Book book = bookRepository.findBookByIsbnIs(isbn);
            book.setIsDeleted(true);
            bookRepository.save(book);
            return "ok";
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return "delete book fail.";
        }
    }
}
