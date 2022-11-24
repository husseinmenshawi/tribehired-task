const axios = require("axios");
const _ = require("lodash");

const jsonPlaceHolderBaseUrl =
  process.env.JSON_PLACEHOLDER_BASEURL ||
  "https://jsonplaceholder.typicode.com";

const postsUrl = `${jsonPlaceHolderBaseUrl}/posts`;
const commentsUrl = `${jsonPlaceHolderBaseUrl}/comments`;

async function fetchTopPosts() {
  const postsComments = await Promise.all([fetchPosts(), fetchPostComments()]);
  const posts = postsComments[0].data;
  const comments = postsComments[1].data;

  const postsMapping = {};
  const postCommentMapping = {};

  posts.forEach((post) => {
    const key = `${post.id}`;
    postsMapping[key] = post;
  });

  comments.forEach((comment) => {
    const key = `${comment.postId}`;
    if (postCommentMapping.hasOwnProperty(key)) {
      postCommentMapping[key].push(comment);
    } else {
      postCommentMapping[key] = [];
      postCommentMapping[key].push(comment);
    }
  });

  const postIds = Object.keys(postCommentMapping);
  const result = [];
  postIds.forEach((id) => {
    const targetPost = postsMapping[id];
    const targetPostCommentMapping = postCommentMapping[id];
    const obj = {
      post_id: id,
      post_title: id,
      post_body: targetPost,
      total_number_of_comments: targetPostCommentMapping.length,
    };
    result.push(obj);
  });

  const sortedResult = _.sortBy(result, ["total_number_of_comments"]);
  return sortedResult;
}

async function filterComments(filters) {
  const comments = await fetchPostComments();
  const filteredComments = comments.data.filter((comment) => {
    let isValid = true;
    for (key in filters) {
      isValid = isValid && comment[key] == filters[key];
    }
    return isValid;
  });

  return filteredComments;
}

async function fetchPosts() {
  try {
    return axios.get(postsUrl);
  } catch (error) {
    console.error("Error occured while fetching posts: ", error);
    throw error;
  }
}

async function fetchPostComments() {
  try {
    return axios.get(commentsUrl);
  } catch (error) {
    console.error("Error occured while fetching comments: ", error);
    throw error;
  }
}

module.exports = {
  fetchTopPosts,
  filterComments,
};
