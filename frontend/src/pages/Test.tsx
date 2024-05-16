import { useEffect, useState } from "react";

import axios from "axios";

const apiUrl = 'http://localhost:8000'
export interface Data {
    meta: Meta
    items: Item[]
  }
  
  export interface Meta {
    total_count: number
  }
  
  export interface Item {
    id: number
    meta: ImageMeta
    title: string
  }
  
  export interface ImageMeta {
    type: string
    detail_url: string
    tags: any[]
    download_url: string
  }

  export interface PageMeta {
    type: string
    detail_url: string
    html_url: string
    slug: string
    first_published_at: any
  }
  


export default function Test(){
    // Make a request for a user with a given ID
    const [data, setData] = useState<Data | null>(null);
  

    // This method fetches the records from the database.
    useEffect(() => {
      axios.get(apiUrl+'/api/v2/images/')
      .then(function (response) {
        // handle success
        console.log(response);
        setData(response.data);
      })
    }, []);

    return (
      <>
        {data ? (
          <div>
            <p>Total Count: {data.meta.total_count}</p>
            <ul>
              {data.items.map(item => (
                <li key={item.id}>
                  <h2>{item.title}</h2>
                  <p>Type: {item.meta.type}</p>
                  <p>Detail URL: {item.meta.detail_url}</p>
                  <p>tags: {item.meta.tags}</p>
                  <p>Download URL: {item.meta.download_url}</p>
                  <img src={`${apiUrl}${item.meta.download_url}`} alt={item.title} />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </>
    );
  }