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

create table report (
	id varchar(50) primary key,
	description varchar(max) not null,
	userId varchar(50),
	media varchar (1024), 
	publicId varchar(50),
	timeCreate DATETIME2 DEFAULT CURRENT_TIMESTAMP
	CONSTRAINT fk_report_users foreign key (userId) REFERENCES users(userId),
)

create table movie (
	id varchar(50) primary key,
	description nvarchar(2048),
	title varchar(50)
	category varchar(30),
	actor varchar(30),
	duration TIME,
	poster varchar(1024) not null,
	publicId varchar(50) not null
) 

alter table movie add title varchar(50)

update movie set title = 'Marvel Ironheart' where id = '689d2df231af8d4cfc112716'

create table movie_rate (
	id INT PRIMARY KEY IDENTITY(1,1),
	movie_id varchar(50) not null,
	userId varchar(50) not null,
	rate int not null,
	CONSTRAINT fk_rate_movie foreign key (movie_id) REFERENCES movie(id),
	CONSTRAINT fk_rate_users foreign key (userId) REFERENCES users(userId),
)
689d2df231af8d4cfc112716

insert into movie (id, description, category, actor, title,  duration, poster, publicId ) values  ('689d2df231af8d4cfc112716', 'Lấy bối cảnh sau các sự kiện của “Black Panther: Wakanda Forever”, Riri trở lại Chicago và tiếp tục theo đuổi lý tưởng của mình. Song hành trình này không hề dễ dàng, khi Riri sớm bị cuốn vào một cuộc đối đầu gây cấn với Parker Robbins, hay còn gọi là The Hood (Anthony Ramos thủ vai), một phản diện bí ẩn sử dụng phép thuật. Cuộc đối đầu giữa công nghệ và ma thuật hứa hẹn là trục xung đột chính, tạo nên màu sắc riêng cho loạt phim.',
'Hành động', 'Chinaka Hodge', 'Marvel Ironheart' , '02:30:15',  'https://res.cloudinary.com/dcgog8pcw/image/upload/v1755131100/e29c0fe492873043f31a5128dc98255d_q6bsve.webp', 'e29c0fe492873043f31a5128dc98255d_q6bsve')

select * from movie

delete follows where follower_username='mh.minh_han'

insert into users (userId, email, fullname, gender, phone) values('68990d2193bcb5236e36c18e', 'baongoc@gmail.com', N'Bảo Ngọc', null, null);
insert into accounts (username, password, bio, privateMode, onlineMode, userId, avatar) values('bn.ngoc','$2b$05$JI8A6mzev/dkMQ3GuRWqx.nKao3YCIQ2K3pqWAHpjV/9T3SJ1NQfC', '', 0, 'everyone', '68990d2193bcb5236e36c18e', '');
insert into follows (follower_username, following_username) values ('mh.minh_han', 'bn.ngoc');
insert into links (username, title, url) values ('bn.ngoc', 'https://www.threads.com/@_bnbnocc','threads');
insert into blocks (blocker_username, blocked_username) values('mh.minh_han','bn.ngoc');
insert into limits (limiter_username, limited_username) values('mh.minh_han','bn.ngoc');



SELECT DISTINCT m.feed_id from media m join feed f on m.feed_id = f.id where f.username = 'mn.minh_han'

select DISTINCT feed_id from media m join feed f on m.feed_id = f.id where f.username = 'mh.minh_han'

select * from save_feed;

insert into save_feed (feedId, username) values ( '689b94b7574cfc46cc5c3eda', 'mh.minh_han')

update feed set username = 'bn.ngoc' where id =  '689b94b7574cfc46cc5c3eda'