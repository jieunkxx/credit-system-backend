CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(500) NOT NULL,
    created_at DATETIME DEFAULT NOW(),
    updated_at DATETIME,
    PRIMARY KEY (id)
);