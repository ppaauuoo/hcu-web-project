import parse from "html-react-parser";
import { gql, useQuery } from "@apollo/client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
interface Page {
  id: string;
  title: string;
  date: string;
  intro: string;
  htmlBody: string;
  galleryImages: { id: string; image: { url: string }; caption: string }[];
  authors: { id: string; authorImage: { url: string }; name: string }[];
  tags: { name: string }[];
}

interface Data {
  pages: Page[];
}

const GET_PAGES = gql`
  query getPages {
    pages {
      ... on BlogPage {
        tags {
          name
        }
        title
        date
        intro
        htmlBody
        galleryImages {
          image {
            url
            width
            height
          }
          caption
        }
        authors {
          authorImage {
            url
            width
            height
          }
          name
        }
      }
    }
  }
`;

function DisplayPages() {
  const { loading, error, data } = useQuery<Data>(GET_PAGES);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error : {error.message}</p>;

  if (!data) return <p>Error : No Data</p>;

  return data.pages.map(
    ({ title, date, intro, htmlBody, galleryImages, authors, tags }) =>
      title && (
        <article>
          <h1>{title}</h1>
          <p className="meta">Date: {date}</p>

          {/* Posted by */}
          {authors.length > 0 && (
            <div>
              <h3>Posted by:</h3>
              <ul>
                {authors.map((author) => (
                  <li key={author.id} style={{ display: "inline" }}>
                    <img
                      src={`${author.authorImage.url}`}
                      alt={author.name}
                      width={100}
                      height={200}
                      style={{ verticalAlign: "left" }}
                    />
                    Name: {author.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <h2 className="intro">{intro}</h2>

          {/* Body */}
          {parse(htmlBody)}

          {/* Gallery Images */}
          {galleryImages.length > 0 && (
            <div className="gallery">
              <h3>Gallery</h3>
              <Carousel>
                <CarouselContent>
                  {galleryImages.map((image) => (
                    <CarouselItem>
                      <div key={image.id}>
                        <img src={`${image.image.url}`} alt={image.caption} />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <div className="tags">
              <h3>Tags</h3>
              {tags.map((tag) => (
                <a key={`${tag.name}`} href={`/tags?tag=${tag.name}`}>
                  <button type="button">{tag.name}</button>
                </a>
              ))}
            </div>
          )}
          <Separator className="my-20"/>
        </article>
      )
  );
}

export default function PageTest() {
  return (
    <div className="flex justify-center">
      <article className="prose lg:prose-xl">
        <DisplayPages />
      </article>
    </div>
  );
}
