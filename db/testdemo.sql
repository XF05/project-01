SET
  NAMES UTF8;
DROP DATABASE IF EXISTS bookstore;
CREATE DATABASE bookstore CHARSET = UTF8;
USE bookstore;
CREATE TABLE user(
    uid INT PRIMARY KEY AUTO_INCREMENT, #编号
    uname VARCHAR(32),      #用户名
    phone VARCHAR(16),      #手机号
    upwd VARCHAR(32),       #密码
    gender INT              #性别
  );
  INSERT INTO user VALUES(1,'timo','12312341234','123456',1);
  INSERT INTO user VALUES(NULL,'tom','12212345678','123',1);
  INSERT INTO user VALUES(NULL,'jerry','18112348765','123456',0);
  INSERT INTO user VALUES(NULL,'king','13278914561','3351',1);