import { useEffect, useState } from "react";

import axios from "axios";
import parse from 'html-react-parser';
const apiUrl = "http://localhost:8000";

export interface Data {
  meta: Meta;
  items: Item[];
}

export interface Meta {
  total_count: number;
}

export interface Item {
  id: number;
  meta: Meta2;
  title: string;
  date: string;
  intro: string;
  html_body: string;
  gallery_images: GalleryImage[];
}

export interface Meta2 {
  type: string;
  detail_url: string;
  html_url: string;
  slug: string;
  first_published_at: string;
}

export interface GalleryImage {
  id: number;
  meta: Meta3;
  image: Image;
  caption: string;
}

export interface Meta3 {
  type: string;
}

export interface Image {
  id: number;
  meta: Meta4;
  title: string;
}

export interface Meta4 {
  type: string;
  detail_url: string;
  download_url: string;
}

export default function PageTest() {
  // Make a request for a user with a given ID
  const [data, setData] = useState<Data | null>(null);

  // This method fetches the records from the database.
  useEffect(() => {
    axios
      .get(
        apiUrl +
          "/api/v2/pages/?type=blog.BlogPage&fields=title,date,intro,html_body,gallery_images"
      )
      
      .then(function (response) {
        // handle success
        console.log(response);
        setData(response.data);
      });
  }, []);

  return (
    <>
      <article className="prose lg:prose-xl">
        <h1>Hello!</h1>
        {data ? (
          <div>
            <h1>Total Count: {data.meta.total_count}</h1>
            {data.items.map((item) => (
              <div key={item.id}>
                <h3>{item.title}</h3>
                <p>Date: {item.date}</p>
                <p>Intro: {item.intro}</p>
                {parse(item.html_body)}
                {item.gallery_images.length > 0 && (
                  <>
                  <h4>Gallery Images</h4>
                  <div>
                    {item.gallery_images.map((image) => (
                      <div key={image.id}>
                        <img
                          src={`${apiUrl}${image.image.meta.download_url}`}
                          alt={image.caption}
                        />
                      </div>
                    ))}
                  </div>
                  </>


                )}

              </div>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </article>
    </>
  );
}
