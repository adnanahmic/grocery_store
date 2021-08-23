var supertest = require("supertest");
var should = require("should");
// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:3000");
let store = null;
// UNIT test begin
describe("Get stores test cases",function(){
  it("Test get stores successfully",function(done){
    server
    .get("/stores/get-all")
    .send({"username" : "admin12345", "password" : "12345"})
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      should(res.body).have.property('stores');
      done();
    });
  });
});

describe("Store creation test cases",function(){
    it("Test store create successfully",function(done){
        server
        .post("/stores/create")
        .send({name: 'test'})
        .expect("Content-type",/json/)
        .expect(200) // THis is HTTP response
        .end(function(err,res){
            store = res.body.store;
          should(res.body).have.property('message', 'Store created!');
          done();
        });
    });
    it("Test error required fields",function(done){
        server
        .post("/stores/create")
        .send({})
        .expect("Content-type",/json/)
        .expect(400) // THis is HTTP response
        .end(function(err,res){
          should(res.body).have.property('error', 'name is required fields!');
          done();
        });
    });
});


describe("Store updation test cases",function(){
    it("Test store should update successfully",function(done){
        server
        .put(`/stores/update/${store._id}`)
        .send({name: 'test2'})
        .expect("Content-type",/json/)
        .expect(200) // THis is HTTP response
        .end(function(err,res){
          should(res.body).have.property('message', 'Store updated!');
          done();
        });
    });
    it("Test required fields",function(done){
        server
        .put(`/stores/update/${store._id}`)
        .send({})
        .expect("Content-type",/json/)
        .expect(400) // THis is HTTP response
        .end(function(err,res){
          should(res.body).have.property('error', 'name is required fields!');
          done();
        });
    });
});

describe("Store delete test cases",function(){
    it("Test store should delete successfully",function(done){
        server
        .delete(`/stores/delete/${store._id}`)
        .expect("Content-type",/json/)
        .expect(200) // THis is HTTP response
        .end(function(err,res){
          should(res.body).have.property('message', 'Store deleted!');
          done();
        });
    });
});