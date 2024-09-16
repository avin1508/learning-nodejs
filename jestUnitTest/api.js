const axios = require('axios');

const fetchApi = async () => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw new Error('failed to fetch posts')
    }
}

module.exports = {
    fetchApi
}