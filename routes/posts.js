const express = require("express");
const router = express.Router();

const { fetchTopPostsApi, filterCommentsApi } = require("../controllers/posts");

router.get("/top", fetchTopPostsApi);
router.get("/comments", filterCommentsApi);

module.exports = router;
