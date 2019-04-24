package com.kty.ebook.entity;

import javax.persistence.*;

@Entity
@Table(name = "book", schema = "ebook", catalog = "")
public class Book {

  private long isbn;
  private double price;
  private String bookname;
  private long stockNum;
  private String summary;
  private String pictureUrl;
  private String author;
  private boolean isDeleted;

  public Book() {

  }

  public Book(double price, String bookname, long stockNum,
              String summary, String pictureUrl, String author) {
    this.price = price;
    this.bookname = bookname;
    this.stockNum = stockNum;
    this.summary = summary;
    this.pictureUrl = pictureUrl;
    this.author = author;
  }

  @Id
  @Column(name = "isbn")
  public long getIsbn() {
    return isbn;
  }

  public void setIsbn(long isbn) {
    this.isbn = isbn;
  }

  @Basic
  @Column(name = "price")
  public double getPrice() {
    return price;
  }

  public void setPrice(double price) {
    this.price = price;
  }

  @Basic
  @Column(name = "bookname")
  public String getBookname() {
    return bookname;
  }

  public void setBookname(String bookname) {
    this.bookname = bookname;
  }

  @Basic
  @Column(name = "stockNum")
  public long getStockNum() {
    return stockNum;
  }

  public void setStockNum(long stockNum) {
    this.stockNum = stockNum;
  }

  @Basic
  @Column(name = "summary")
  public String getSummary() {
    return summary;
  }

  public void setSummary(String summary) {
    this.summary = summary;
  }

  @Basic
  @Column(name = "pictureUrl")
  public String getPictureUrl() {
    return pictureUrl;
  }

  public void setPictureUrl(String pictureUrl) {
    this.pictureUrl = pictureUrl;
  }

  @Basic
  @Column(name = "author")
  public String getAuthor() {
    return author;
  }

  public void setAuthor(String author) {
    this.author = author;
  }

  @Basic
  @Column(name = "isDeleted")
  public boolean getIsDeleted() {
    return isDeleted;
  }

  public void setIsDeleted(boolean isDeleted) {
    this.isDeleted = isDeleted;
  }

}
