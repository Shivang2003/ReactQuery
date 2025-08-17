import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { fetchPostByPage, deletePost, updatePost } from "../API/Api";
import { use, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export const FetchRQ = () => {
    const currentPage = useRef(0);
    const [start, setStart] = useState(currentPage.current);

   const queryClient = useQueryClient();

    const {data, isLoading, isError,error, status} = useQuery({
        queryKey: ['post',start],
        queryFn: () => fetchPostByPage(start),
        placeholderData:keepPreviousData, //this will keep the previous data while fetching new data
        // this is useful for pagination, it will show the previous data while fetching new data
        staleTime: 3000,
    })

    const deleteMutation = useMutation({
        mutationFn:(id) => {deletePost(id)},
        onSuccess: (data,id) => {
            queryClient.setQueryData (['post',start],(curr)=>{
                return curr.filter((post) => post.id !== id);
                // this will filter out the deleted post from the current data
            })
        }
    })

    const updateMutation = useMutation({
        mutationFn: (id) => updatePost(id),
        onSuccess: (ApiData, PostData) => { //here PostData is the id of the post
            // this will update the post in the current data
            //and apiData is the updated data from the API
            // we will use queryClient to update the data in the cache
            queryClient.setQueriesData(['post',start], (postsData) => {
                return postsData.map((post) => {
                    if (post.id === PostData) {
                        return {...post, title: ApiData.data.title};
                    }
                    return post;
                });
            })
        }
    })

    if(isLoading) return <>Loading ......</>
    if(isError) return <>Error happened......{error}{status}</>

    return(
        <div>
        <ul className="section-accordion">
            {
                data?.map((curr)=>{
                    const {id,title,body} = curr;
                    return(
                    <li key={id}>
                        <NavLink to={`/req/${id}`}>
                        <p>{id}</p>
                        <p>{title}</p>
                        <p>{body}</p>
                        </NavLink>
                        <button onClick={() => deleteMutation.mutate(id)}>Delete</button>
                        <button onClick={() => updateMutation.mutate(id)}>Update</button>
                    </li>)
                })
            }
        </ul>
        <div className="pagination">
        <button onClick={() => setStart((currentPage.current = currentPage.current-1))} disabled={currentPage.current === 0}>
            Prev</button>
            <h3>{currentPage.current+1}</h3>
        <button onClick={() => setStart((currentPage.current = currentPage.current+1))}>
            Next</button>
        </div>
        </div>
    )
}