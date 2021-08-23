## REQUIREMENTS

Create ENV(name: .env.development) file with the following content

DB_HOST=127.0.0.1
DB_PORT=27017
DB_NAME=
DB_USERNAME=
DB_PASSWORD=
JWT_PRIVATE_KEY=

## Installation

Install the package with:

npm install
npm install mocha -g

## START Project

npm start

## Run test cases

mocha

## Some important things

  -- Initial users and stores will be automatically created after server starts. file for initial script is : initialScript.js

  -- Brief intro about folder structure

  routes: it contains all the apis. user.js will contain the user related APIs and store.js contains store related APIs.
  
  schemas: This folder contains the mongoose schema of the database.each file is corresponding to the each collection schema.

  test: This folder contains the test cases files.  