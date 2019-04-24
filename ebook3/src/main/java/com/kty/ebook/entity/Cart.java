package com.kty.ebook.entity;

import javax.persistence.*;

@Entity
@Table(name = "cart", schema = "ebook", catalog = "")
public class Cart {
    private long userId;
    private String books;

    public Cart(){

    }

    @Id
    @Column(name = "userId")
    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    @Basic
    @Column(name = "books")
    public String getBooks() {
        return books;
    }

    public void setBooks(String books) {
        this.books = books;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Cart that = (Cart) o;

        if (userId != that.userId) return false;
        if (books != null ? !books.equals(that.books) : that.books != null) return false;

        return true;
    }

}