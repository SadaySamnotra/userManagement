const fetch = require('node-fetch');

const getPost=async(postID)=>{
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postID}`);
    return response.json();
}

module.exports = {getPost};