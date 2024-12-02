-- Create database (if needed)
CREATE DATABASE IF NOT EXISTS myapp;
USE myapp;

-- Create enumeration table for Vartotojo_tipas (User Type)
CREATE TABLE Vartotojo_tipas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tipas ENUM('Svečias', 'Pardavėjas', 'Klientas')
);

-- Create Vartotojas (User) table
CREATE TABLE Vartotojas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tipas VARCHAR(50),
    vardas VARCHAR(100),
    slapazodis VARCHAR(255)
);

-- Create Uzsakymas (Order) table
CREATE TABLE Uzsakymas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    klausimas VARCHAR(255),
    atsakymas VARCHAR(255)
);

-- Create Krepshelio_preke (Shopping Cart Item) table
CREATE TABLE Krepshelio_preke (
    id INT PRIMARY KEY AUTO_INCREMENT,
    kiekis INT
);

-- Create Preke (Product) table
CREATE TABLE Preke (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pavadinimas VARCHAR(255),
    kaina INT,
    nuotrauka TINYINT
);

-- Create Uzsakymas (Order Summary) table
CREATE TABLE Uzsakymas_suma (
    id INT PRIMARY KEY AUTO_INCREMENT,
    suma INT
);

-- Add foreign key constraints
ALTER TABLE Krepshelio_preke
ADD COLUMN preke_id INT,
ADD FOREIGN KEY (preke_id) REFERENCES Preke(id);

ALTER TABLE Uzsakymas
ADD COLUMN vartotojas_id INT,
ADD FOREIGN KEY (vartotojas_id) REFERENCES Vartotojas(id);

ALTER TABLE Vartotojas
ADD COLUMN vartotojo_tipas_id INT,
ADD FOREIGN KEY (vartotojo_tipas_id) REFERENCES Vartotojo_tipas(id);

-- Add indexes for better performance
CREATE INDEX idx_vartotojas_tipas ON Vartotojas(tipas);
CREATE INDEX idx_preke_pavadinimas ON Preke(pavadinimas);