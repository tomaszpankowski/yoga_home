CREATE TABLE yhome_users(
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password CHAR(40) NOT NULL,
    email VARCHAR(100) NOT NULL,
    privileges INT DEFAULT 0,
    PRIMARY KEY(id)
);
