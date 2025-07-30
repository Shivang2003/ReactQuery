import { fetchPosts } from "../API/Api";
import { useQuery } from "@tanstack/react-query";

export const FetchOld = () => {
    
    const {data} = useQuery({
        queryKey:['post'],
        queryFn: fetchPosts
    })

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