"use strict";
exports.DATABASE_URL = process.env.DATABASE_URL || "mongodb://KliCk:DBpass1@ds235418.mlab.com:35418/blog-posts-app";
exports.TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL || "mongodb://localhost/test-blog-posts-app";
exports.PORT = process.env.PORT || 8080;