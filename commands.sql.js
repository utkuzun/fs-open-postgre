const CREATE_BLOGS = `
    CREATE TABLE blogs (
        id SERIAL PRIMARY KEY,
        author text,
        url text NOT NULL,
        title text NOT NULL,
        likes integer DEFAULT 0
    );
`

const INSERT_BLOGS = `
    INSERT INTO blogs (author, url, title)
    VALUES 
        ('seher','seher.com','utkucuğum'),
        ('utku','utku.com','seherciğim');
`

const SELECT_ALL = `
    SELECT * FROM blogs
`

module.exports = { INSERT_BLOGS, CREATE_BLOGS, SELECT_ALL }
