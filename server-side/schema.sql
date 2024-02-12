-- CREATE DATABASE bugTracker;
-- USE bugTacker;

-- CREATE TABLE issues (
--   id          INT AUTO_INCREMENT PRIMARY KEY,
--   title       VARCHAR(255),
--   description TEXT,
--   status      ENUM('OPEN', 'CLOSED', 'IN_PROGRESS') DEFAULT 'OPEN',
--   createdAt   DATETIME DEFAULT CURRENT_TIMESTAMP,
--   updatedAt   DATETIME ON UPDATE CURRENT_TIMESTAMP
-- );

-- INSERT INTO issues (title, description, status)
-- VALUES 
-- ('Issue 1', 'This is the first issue', 'OPEN'),
-- ('Issue 2', 'This is the second issue', 'CLOSED'),
-- ('Issue 3', 'This is the third issue', 'IN_PROGRESS'),
-- ('Issue 4', 'This is the fourth issue', 'OPEN'),
-- ('Issue 5', 'This is the fifth issue', 'CLOSED'),
-- ('Issue 6', 'This is the sixth issue', 'IN_PROGRESS');
