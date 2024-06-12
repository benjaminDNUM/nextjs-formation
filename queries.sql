-- Create Reviews table
CREATE TABLE reviews_like (
id INT PRIMARY KEY AUTO_INCREMENT,
user_id INT,
review_id INT,
FOREIGN KEY (user_id) REFERENCES Users(id),
FOREIGN KEY (review_id) REFERENCES Reviews(id)
);

insert into Users (name, login, password, bio) values
('ben3', 'ben3', 'test4Recette!', 'toto') ;