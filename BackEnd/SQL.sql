create database WeSphere;

use WeSphere;

create table accounts (
	username varchar(30) primary key,
	password varchar(1024),
	bio nvarchar(100),
	privateMode BIT NOT NULL DEFAULT 0,
	onlineMode nvarchar(10),
	userId varchar(50) not null,
	publicId varchar(40)
);





ALTER TABLE accounts
ADD isOnline BIT NOT NULL DEFAULT 0;

ALTER TABLE accounts
ADD CONSTRAINT FK_account_user FOREIGN KEY (userId) REFERENCES users(userId);

create table users (
	userId varchar(50) primary key,
	email varchar(50) not null,
	fullname nvarchar(50) not null,
	gender varchar(4),
	phone varchar(11)
);




create table follows (
    follower_username varchar(30) NOT NULL,
    following_username varchar(30) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (follower_username, following_username),
    FOREIGN KEY (follower_username) REFERENCES accounts(username),
    FOREIGN KEY (following_username) REFERENCES accounts(username)
);

CREATE TABLE links (
    link_id INT PRIMARY KEY IDENTITY(1,1),
    username varchar(30) NOT NULL,
    title NVARCHAR(100) NOT NULL,
    url NVARCHAR(500) NOT NULL,
    FOREIGN KEY (username) REFERENCES accounts(username)
);



CREATE TABLE blocks (
    block_id INT PRIMARY KEY IDENTITY(1,1),
    blocker_username varchar(30) NOT NULL, -- người chặn
    blocked_username varchar(30) NOT NULL, -- người bị chặn
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_blocker FOREIGN KEY (blocker_username) REFERENCES accounts(username),
    CONSTRAINT fk_blocked FOREIGN KEY (blocked_username) REFERENCES accounts(username),
    CONSTRAINT uc_block UNIQUE (blocker_username, blocked_username) -- tránh trùng
);

CREATE TABLE limits (
    limit_id INT PRIMARY KEY IDENTITY(1,1),
    limiter_username varchar(30) NOT NULL, -- người chặn
    limited_username varchar(30) NOT NULL, -- người bị chặn
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_limiter FOREIGN KEY (limiter_username) REFERENCES accounts(username),
    CONSTRAINT fk_limited FOREIGN KEY (limited_username) REFERENCES accounts(username),
    CONSTRAINT uc_limit UNIQUE (limiter_username, limited_username) -- tránh trùng
);

create table feed (
	id varchar(50) primary key,
	content nvarchar(2048),
	tag nvarchar(30),
	privateMode nvarchar(15),
	active BIT NOT NULL DEFAULT 1,
	username varchar(30) not null,
	commentOfPost varchar(50), 
	timeCreate DATETIME2 DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT fk_feed_account foreign key (username) REFERENCES accounts(username),
)

create table media (
	image_id INT PRIMARY KEY IDENTITY(1,1),
	feed_id varchar(50) not null,
	publicId varchar(50) not null,
	url varchar(1024) not null,
	type varchar(5) not null,
	CONSTRAINT fk_feed_media foreign key (feed_id) REFERENCES feed(id),
)

create table likes (
	like_id INT PRIMARY KEY IDENTITY(1,1),
	username varchar(30) not null,
	feedId varchar(50) not null,
	timeCreate DATETIME2 DEFAULT CURRENT_TIMESTAMP
	CONSTRAINT fk_like_account foreign key (username) REFERENCES accounts(username),
	CONSTRAINT fk_like_feed foreign key (feedId) REFERENCES feed(id),
)

create table save_feed (
	save_id INT PRIMARY KEY IDENTITY(1,1),
	username varchar(30) not null,
	feedId varchar(50) not null,
	timeCreate DATETIME2 DEFAULT CURRENT_TIMESTAMP
	CONSTRAINT fk_save_account foreign key (username) REFERENCES accounts(username),
	CONSTRAINT fk_save_feed foreign key (feedId) REFERENCES feed(id),
)

create table reposts (
	repost_id INT PRIMARY KEY IDENTITY(1,1),
	username varchar(30) not null,
	feedId varchar(50) not null,
	timeCreate DATETIME2 DEFAULT CURRENT_TIMESTAMP
	CONSTRAINT fk_reposts_account foreign key (username) REFERENCES accounts(username),
	CONSTRAINT fk_reposts_feed foreign key (feedId) REFERENCES feed(id),
)



ALTER TABLE accounts
ADD COLUMN isOnline BIT;





delete follows where follower_username='mh.minh_han'

insert into users (userId, email, fullname, gender, phone) values('68990d2193bcb5236e36c18e', 'baongoc@gmail.com', N'Bảo Ngọc', null, null);
insert into accounts (username, password, bio, privateMode, onlineMode, userId, avatar) values('bn.ngoc','$2b$05$JI8A6mzev/dkMQ3GuRWqx.nKao3YCIQ2K3pqWAHpjV/9T3SJ1NQfC', '', 0, 'everyone', '68990d2193bcb5236e36c18e', '');
insert into follows (follower_username, following_username) values ('mh.minh_han', 'bn.ngoc');
insert into links (username, title, url) values ('bn.ngoc', 'https://www.threads.com/@_bnbnocc','threads');
insert into blocks (blocker_username, blocked_username) values('mh.minh_han','bn.ngoc');
insert into limits (limiter_username, limited_username) values('mh.minh_han','bn.ngoc');



  

select * from media where feed_id='689bc9d88b607d3238468375'

select * from feed where id = '689bc9d88b607d3238468375'

update feed set active = 0 where id = '689bc9d88b607d3238468375'

update feed set commentOfPost = '689b94b7574cfc46cc5c3eda' where id = '689bc2996b07fa53582d38b7' OR id = '689bc2024acb894b34c791a9'

SELECT id FROM feed WHERE commentOfPost = '689b94b7574cfc46cc5c3eda'