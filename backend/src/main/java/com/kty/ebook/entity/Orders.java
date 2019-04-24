package com.kty.ebook.entity;

import javax.persistence.*;

@Entity
@Table(name = "orders", schema = "ebook", catalog = "")
public class Orders {

  private long userId;
  private String books;
  private long orderId;
  private java.sql.Timestamp createTime;
  private String totalPrice;

  public Orders() {

  }
  @Basic
  public long getUserId() {
    return userId;
  }

  public void setUserId(long userId) {
    this.userId = userId;
  }

  @Basic
  public String getBooks() {
    return books;
  }

  public void setBooks(String books) {
    this.books = books;
  }

  @Id
  public long getOrderId() {
    return orderId;
  }

  public void setOrderId(long orderId) {
    this.orderId = orderId;
  }

  @Basic
  public java.sql.Timestamp getCreateTime() {
    return createTime;
  }

  public void setCreateTime(java.sql.Timestamp createTime) {
    this.createTime = createTime;
  }


  public String getTotalPrice() {
    return totalPrice;
  }

  public void setTotalPrice(String totalPrice) {
    this.totalPrice = totalPrice;
  }

}
