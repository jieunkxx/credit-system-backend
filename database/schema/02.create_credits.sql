CREATE TABLE credits (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    value INT,
    created_at DATE DEFAULT (DATE(CURRENT_TIMESTAMP)),
    PRIMARY KEY(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
);