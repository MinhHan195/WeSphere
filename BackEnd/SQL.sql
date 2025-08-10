create database WeSphere;

use WeSphere;

create table accounts (
	username varchar(30) primary key,
	password varchar(1024),
	bio varchar(100),
	privateMode BIT NOT NULL DEFAULT 0,
	onlineMode varchar(10),
	userId varchar(50) not null
);

ALTER TABLE accounts
ADD avatar varchar(1024);

ALTER TABLE accounts
ADD CONSTRAINT FK_account_user FOREIGN KEY (userId) REFERENCES users(userId);

create table users (
	userId varchar(50) primary key,
	email varchar(50) not null,
	fullname varchar(50) not null,
	gender varchar(4),
	phone varchar(11)
);

delete from users;

select * from accounts;



--insert into accounts (username, password, bio, privateMode, onlineMode) values('mh.minh_han','');