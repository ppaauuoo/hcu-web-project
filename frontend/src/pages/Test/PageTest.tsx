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
    meta: PageMeta
    title: string
  }


  export interface PageMeta {
    type: string
    detail_url: string
    html_url: string
    slug: string
    show_in_menus: boolean
    seo_title: string
    search_description: string
    first_published_at: string
    alias_of: any
    parent: any
  }
  


export default function PageTest(){
    // Make a request for a user with a given ID
    const [data, setData] = useState<Data | null>(null);
  

    // This method fetches the records from the database.
    useEffect(() => {
      axios.get(apiUrl+'/api/v2/pages/')
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
                <p>Type: {item.meta.type}</p>
                <p>Detail URL: {item.meta.detail_url}</p>
                <p>HTML URL: {item.meta.html_url}</p>
                <p>Slug: {item.meta.slug}</p>
                <p>Show in Menus: {item.meta.show_in_menus ? 'Yes' : 'No'}</p>
                <p>SEO Title: {item.meta.seo_title}</p>
                <p>Search Description: {item.meta.search_description}</p>
                <p>First Published At: {item.meta.first_published_at}</p>
                <p>Alias Of: {item.meta.alias_of}</p>
                <p>Parent: {item.meta.parent}</p>
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