-- Create the schema

CREATE SCHEMA IF NOT EXISTS myapp;

-- Create the users table

CREATE TABLE IF NOT EXISTS myapp.users (id SERIAL PRIMARY KEY,
                                                          email VARCHAR(255) NOT NULL UNIQUE,
                                                                                      password VARCHAR(255) NOT NULL,
                                                                                                            name VARCHAR(255) NOT NULL,
                                                                                                                              permission_level VARCHAR(50) CHECK (permission_level IN ('admin',
                                                                                                                                                                                       'normal')) NOT NULL);

-- Create the universities table

CREATE TABLE IF NOT EXISTS myapp.universities (id SERIAL PRIMARY KEY,
                                                                 name VARCHAR(255) NOT NULL);

-- Create the locations table

CREATE TABLE IF NOT EXISTS myapp.locations (id SERIAL PRIMARY KEY,
                                                              university_id INTEGER REFERENCES myapp.universities(id),
                                                                                               name VARCHAR(255),
                                                                                                    lat NUMERIC, long NUMERIC, address TEXT);

-- Create the contact_information table

CREATE TABLE IF NOT EXISTS myapp.contact_information (id SERIAL PRIMARY KEY,
                                                                        university_id INTEGER REFERENCES myapp.universities(id),
                                                                                                         name VARCHAR(255),
                                                                                                              phone_number VARCHAR(20),
                                                                                                                           address TEXT, email VARCHAR(255));

-- Create the audit table

CREATE TABLE IF NOT EXISTS myapp.audit (id SERIAL PRIMARY KEY,
                                                          user_id INTEGER REFERENCES myapp.users(id),
                                                                                     action VARCHAR(255) NOT NULL,
                                                                                                         timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);

