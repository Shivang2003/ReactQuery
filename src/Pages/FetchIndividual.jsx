import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchInvPost } from "../API/Api";

export const FetchIndividual = () => {

    const { id } = useParams();
    const {data, isLoading, isError} = useQuery({
        queryKey: ['post', id],//when using params, add it to queryKey
        // this will ensure that the query is unique for each id
        // if we don't add id, it will always return the same data
        // and not refetch when id changes
        queryFn: () => fetchInvPost(id),
    });
    
    if(isLoading) return <>Loading ......</>;
    if(isError) return <>Error happened......{data.error.message}</>;

  return (
    <div>   
      <p>{data.id}</p>
        <p>{data.title}</p>
        <p>{data.body}</p>
        <div>
             <NavLink to="/trad">
            <button>
                {"<"} - Go Back
            </button>
            </NavLink>
        </div>
    </div>
  );
}