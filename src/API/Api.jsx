import axios from "axios";

const api = axios.create({
    baseURL:"https://jsonplaceholder.typicode.com",
});

export const fetchPosts = async() => {
    try{
    const res = await api.get("/posts?_start=0&_limit=5");
    return res.status === 200 ? res.data : [];
    }
    catch(error){
        console.log(error);
    }
}

export const fetchInvPost = async(id) => {
    try{
        const res = await api.get(`/posts/${id}`);
        return res.status === 200 ? res.data : null;
    }
    catch(error){
        console.log(error);
    }
}

export const fetchPostByPage = async(start) => {
    try{
        const res = await api.get(`/posts/?_start=${(start*5)}&_limit=${5}`);
        return res.status === 200 ? res.data : [];
    }
    catch(erroor){
        console.log(erroor);
    }
}

export const deletePost = async(id) => {
    try{
        const res = await api.delete(`/posts/${id}`);
        return res.status === 200 ? res.data : null;
    }
    catch(error){
        console.log(error);
    }
}

export const updatePost = async(id) => {
    try{
        const res = await api.patch(`/posts/${id}`,{title:"Updated Title is this one"});
        return res.status === 200 ? res.data : null;
    }
    catch(error){
        console.log(error);
    }
}
