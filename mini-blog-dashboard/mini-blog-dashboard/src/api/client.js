import axios from 'axios'

const client = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
})

export const getPosts = () => client.get('/posts').then((res) => res.data)

export const getPost = (id) => client.get(`/posts/${id}`).then((res) => res.data)

export const getComments = (postId) =>
  client.get(`/posts/${postId}/comments`).then((res) => res.data)

export const getUser = (userId) => client.get(`/users/${userId}`).then((res) => res.data)

export const getUsers = () => client.get('/users').then((res) => res.data)

export const createPost = (post) => client.post('/posts', post).then((res) => res.data)

export const deletePost = (id) => client.delete(`/posts/${id}`).then((res) => res.data)

export default client
