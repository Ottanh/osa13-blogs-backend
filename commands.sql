CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text ,
    url text NOT NULL,
    title text NOT NULL,
    likes int DEFAULT 0
);

insert into blogs(author, url, title) values ('olli', 'something.fi', 'jotai');
insert into blogs (url, title, likes) values ('something.fi', 'joku toine', 5);