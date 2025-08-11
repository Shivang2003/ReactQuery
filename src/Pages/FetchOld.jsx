import { fetchPosts } from "../API/Api";
import { useQuery } from "@tanstack/react-query";

export const FetchOld = () => {
    
    const {data, isLoading, isError, error, status} = useQuery({
        queryKey:['post'],
        queryFn: fetchPosts,
        // gcTime:5000, //will consider data to be garbage and will be collected
        staleTime:3000 //will check if data is fresh
        // refetchInterval:1000 //can use refetchIntervalInBackground for polling while ta is switched
    })

    if(isLoading) return <>Loading ......</>
    if(isError) return <>Error happened......{error}{status}</>

    return(
        <div>
        <ul className="section-accordion">
            {
                data?.map((curr)=>{
                    const {id,title,body} = curr;
                    return(<li key={id}>
                        <p>{title}</p>
                        <p>{body}</p>
                    </li>)
                })
            }
        </ul>
        </div>
    )
}