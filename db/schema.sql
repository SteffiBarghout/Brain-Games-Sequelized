--Create puzzler Database in MySQL--
CREATE DATABASE puzzler_db;
--Move into puzzler_db--
USE puzzler_db;

--Make a new table called puzzles --
CREATE TABLE puzzles 
(
    --Id column which has an auto increment and is not null--
    --Auto increment assign's a squence of numbers automatically--
    id int NOT NULL AUTO_INCREMENT,
    --Puzzle_name column in MySQL with max string length of 500 characters and which is not null--
    puzzle_name varchar(500) NOT NULL,
    --Boolean named puzzled with a default of false--
    puzzled BOOLEAN DEFAULT false,
    --Id is the primary key--
    PRIMARY KEY (id)
);

--Created new DB in my local host and new table in Jaws db connection--