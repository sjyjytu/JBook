package com.kty.ebook.service;

import com.kty.ebook.entity.Book;
import org.springframework.data.domain.Page;

public interface BookService {
    public Book findBookByIsbn(long isbn);
    public Page<Book> findBookByIsbnLimit(long isbn, int start, int num);
    public Page<Book> findBookByBooknameLimit(String name, int start, int num);
    public Page<Book> showBookLimit(int start, int num);
    public String addBook(Book book);
    public String updateBook(Book book);
    public String deleteBook(long isbn);
}
