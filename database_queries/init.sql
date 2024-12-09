CREATE DATABASE thegillypad;

USE thegillypad;

CREATE TABLE `users` (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  username VARCHAR(16) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(18) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO `users` (`first_name`, `last_name`, `username`, `email`, `password`)
VALUES ('John', 'Doe', 'johndoe', 'john.doe@example.com', 'password123');

SELECT * FROM `users`;