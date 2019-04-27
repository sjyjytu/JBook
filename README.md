# JBook

---

### author : JY

### version : v3.0

---



## Technology introduction

---

### Frontend

* React
* Redux
* Material-ui

### Backend

* Spring boot
* Servlet
* Hiberate

### Database

* Mysql



## Function description

---

- [x] visit, sign in, sign up
- [x] add to cart, buy directly
- [x] empty the shopping cart, search order
- [x] add,delete, update,search book
- [x] look the history buying statistics
- [ ] comment on books



## Something interesting during devlopment

---

#### Sql injection my web

1. I input the username with 1' or '1'='1 maliciously. And password I try 123

![login](G:\WebCode\JBook\Share\sql_injection\login.png)

2. Then I got the sql statement at my backend as below:

![sql_statement](G:\WebCode\JBook\Share\sql_injection\sql_statement.png)

3. And then I sign in my website successfully as someone whose password is 123

![result](G:\WebCode\JBook\Share\sql_injection\result.png)

4. But then I found that it's accidental because the one whose id is 1 and his password is exactly 123, if not, I couldn't sign in. What I mean is that this injection only suits the case that I know the password of the one whose id must be  1, but don't know his username, then I can login as him. It's rediculous. How can I know one's password but don't know his username?

5. So I try again, and find the right usage of sql injection :
   username: 1' or password = '123

   password: 123
   then the sql statement at the backend will be:
   select ... from user where username = '1' or password = '123'

hints: I had fix this bug by using hibernate, so you can no longer enjoy it.

---

### Something fucking during development

* Naming conflict
  * the table name can not be 'order'
  * the variable name of react can not be 'key'
  * the column name of the database should obey the normal rule: 'is_manager' but not 'isManager'
* Deploy matters