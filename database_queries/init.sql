CREATE DATABASE thegillypad;

USE thegillypad;

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  username VARCHAR(32) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  sms_opt_in BOOLEAN DEFAULT 0,
  phone_number VARCHAR(15),
  agreed_to_sms_terms BOOLEAN DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO `users` (`first_name`, `last_name`, `username`, `email`, `password`, `sms_opt_in`, `phone_number`, `agreed_to_sms_terms`)
VALUES ('John', 'Doe', 'johndoe', 'john.doe@example.com', 'password123', '1', '1-555-555-5000', '1');

SELECT * FROM `users`;