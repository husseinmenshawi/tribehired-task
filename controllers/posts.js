const { fetchTopPosts, filterComments } = require("../services/posts");

const fetchTopPostsApi = async (req, res) => {
  try {
    const posts = await fetchTopPosts();
    res.status(200);
    res.json({
      message: `A number of (${posts.length}) posts found`,
      posts,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const filterCommentsApi = async (req, res) => {
  try {
    const queryStrings = req.query;
    const comments = await filterComments(queryStrings);
    res.status(200);
    res.json({
      message: `A number of (${comments.length}) comments found`,
      comments,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  fetchTopPostsApi,
  filterCommentsApi,
};
