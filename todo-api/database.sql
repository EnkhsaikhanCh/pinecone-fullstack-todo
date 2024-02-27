CREATE TABLE tasks(
    id BIGINT PRIMARY KEY, title VARCHAR(255), description TEXT, createdAt DATE
);

select * from tasks

select title, id from tasks

select title from tasks

insert into tasks values (5, 'title')

insert into tasks values (6, 'title')

delete from tasks where id = 5;

update tasks set title = 'title' where id = 6