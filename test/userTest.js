var supertest = require("supertest");
var should = require("should");
// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:3000");
var token = null;
// UNIT test begin
describe("User Login test cases",function(){
  it("Test user successfully logged in login",function(done){
    server
    .post("/users/login")
    .send({"username" : "admin12345", "password" : "12345"})
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      should(res.body).have.property('token');
      token = res.body.token;
      done();
    });
  });
  it("Test error if required fields are not there",function(done){
    server
    .post("/users/login")
    .send({"username" : "admin12345"})
    .expect("Content-type",/json/)
    .expect(400) // THis is HTTP response
    .end(function(err,res){
      should(res.body).have.property('error', 'usernname, password are required fields!');
      done();
    });
  });
  it("Test error if username or password is wrong",function(done){
    server
    .post("/users/login")
    .send({"username" : "admin12345", "password" : "123456"})
    .expect("Content-type",/json/)
    .expect(400) // THis is HTTP response
    .end(function(err,res){
      should(res.body).have.property('error', 'Either username or password is incorrect!');
      done();
    });
  });
});

describe("User update test cases",function(){
  it("Test user successfully updated",function(done){
    server
    .put("/users/update")
    .set('Authorization', token) //set header for this test
    .send({firstName: 'Adnan 2'})
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      should(res.body).have.property('message', 'User Updated!');
      done();
    });
  });
  it("Test user token invalid",function(done){
    server
    .put("/users/update")
    .set('Authorization', 'Invalid token') //set header for this test
    .send({firstName: 'Adnan 2'})
    .expect("Content-type",/json/)
    .expect(403) // THis is HTTP response
    .end(function(err,res){
      should(res.body).have.property('error', 'Invalid token!');
      done();
    });
  });
});


describe("User creation test cases",function(){
  const random = Math.floor(Math.random() * 10000);
  const userObj = {
    gender: 'Male',
    password: '12345',
    firstName : 'Test',
    lastName: 'Test',
    userName : `test${random}`,
    email: `test${random}@gmail.com`
  };
  it("Test user successfully created",function(done){
    server
    .post("/users/create")
    .send(userObj)
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      should(res.body).have.property('message', 'User created!');
      done();
    });
  });
  it("Test error user already exists",function(done){
    server
    .post("/users/create")
    .send(userObj)
    .expect("Content-type",/json/)
    .expect(400) // THis is HTTP response
    .end(function(err,res){
      should(res.body).have.property('error', 'User already exists!');
      done();
    });
  });
  it("Test required fields",function(done){
    server
    .post("/users/create")
    .send({})
    .expect("Content-type",/json/)
    .expect(400) // THis is HTTP response
    .end(function(err,res){
      should(res.body).have.property('error', 'userName, email, password, firstName are required fields!');
      done();
    });
  });
});

describe("User Profile test cases",function(){
  it("Test user profile got successfully",function(done){
    server
    .get("/users/profile")
    .set('Authorization', token) //set header for this test
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      should(res.body).have.property('connectedUsers');
      done();
    });
  });
});