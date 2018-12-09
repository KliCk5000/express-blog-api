const chai = require("chai");
const chaiHttp = require("chai-http");

const { app, runServer, closeServer } = require("../server");
const { PORT, DATABASE_URL } = require("../config");

const expect = chai.expect;

chai.use(chaiHttp);

describe("Blog Posts", function() {
  before(function() {
    return runServer(DATABASE_URL, (PORT + 10));
  });

  after(function() {
    return closeServer();
  });

  it("should list items on GET", function() {
    return chai
      .request(app)
      .get("/blog-posts")
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a("array");
        expect(res.body.length).to.be.at.least(1);
        const expectedKeys = ["_id", "title", "content", "created", "authorName"];
        res.body.forEach(function(item) {
          expect(item).to.be.a("object");
          expect(item).to.include.keys(expectedKeys);
          // or we could do this according to solution
          expect(item).to.have.all.keys(
            '_id',
            'title',
            'content',
            'authorName',
            'created'
          );
        });
      });
  });

  // it("should add an item on POST", function() {
  //   const newItem = {
  //     title: "Test Title",
  //     content: "This is the test content. Hello World!",
  //     author: "Mocha Chai"
  //   };
  //   // Solution had next line
  //   const expectedKeys = ["id", "publishDate"].concat(Object.keys(newItem));
  //   return chai
  //     .request(app)
  //     .post("/blog-posts")
  //     .send(newItem)
  //     .then(function(res) {
  //       expect(res).to.have.status(201);
  //       expect(res).to.be.json;
  //       expect(res.body).to.be.a("object");
  //       expect(res.body).to.include.keys(
  //         "id",
  //         "title",
  //         "content",
  //         "author",
  //         "publishDate"
  //       );
  //       expect(res.body.id).to.not.equal(null);
  //       expect(res.body).to.deep.equal(
  //         Object.assign(newItem, {
  //           id: res.body.id,
  //           publishDate: res.body.publishDate
  //         })
  //       );
  //       // Other tests according to solution
  //       expect(res.body).to.have.all.keys(expectedKeys);
  //       expect(res.body.title).to.equal(newItem.title);
  //       expect(res.body.content).to.equal(newItem.content);
  //       expect(res.body.author).to.equal(newItem.author);
  //     });
  // });

  // // Solution had a test to check for missing expected values
  // it("should error if POST missing expected values", function() {
  //   const badRequestData = {};
  //   return chai
  //     .request(app)
  //     .post("/blog-posts")
  //     .send(badRequestData)
  //     .then(function(res) {
  //       expect(res).to.have.status(400);
  //     });
  // });

  // it("should updated items on PUT", function() {
  //   // in Solution, they did updateData a little different, but
  //   // we can just use this one so we know it updated
  //   const updateData = {
  //     title: "Updated Title",
  //     content: "This is the updated test content. Hello World!",
  //     author: "Mocha Chai"
  //   };

  //   return chai
  //     .request(app)
  //     .get("/blog-posts")
  //     .then(function(res) {
  //       updateData.id = res.body[0].id;
  //       return chai
  //         .request(app)
  //         .put(`/blog-posts/${updateData.id}`)
  //         .send(updateData);
  //     })
  //     .then(function(res) {
  //       expect(res).to.have.status(200);
  //       expect(res).to.be.json;
  //       expect(res.body).to.be.a("object");
  //       expect(res.body).to.deep.equal(updateData);
  //     });
  // });

  // it("should delete items on DELETE", function() {
  //   return chai
  //     .request(app)
  //     .get("/blog-posts")
  //     .then(function(res) {
  //       return chai.request(app).delete(`/blog-posts/${res.body[0].id}`);
  //     })
  //     .then(function(res) {
  //       expect(res).to.have.status(204);
  //     });
  // });
});
