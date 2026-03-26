-- Run these commands in your MySQL client / terminal to set up the database.

-- 1. Create the database
CREATE DATABASE IF NOT EXISTS portfolio_db;

-- 2. Use the database
USE portfolio_db;

-- 3. Create the contacts table
CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
