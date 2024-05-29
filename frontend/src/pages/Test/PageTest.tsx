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
import { Link, useParams } from "react-router-dom";
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

const GET_PAGE_BY_ID = gql`
  query getPages($id: ID!) {
    pages(id: $id) {
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

type IdParams = {
  id: number;
};

function DisplayPage({ id }: IdParams) {
  const { loading, error, data } = useQuery<Data>(GET_PAGE_BY_ID, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error : {error.message}</p>;

  if (!data) return <p>Error : No Data</p>;

  return data.pages.map(
    ({ title, date, intro, htmlBody, galleryImages, authors, tags }) =>
      title && (
        <article className="py-20">
          <h1>{title}</h1>
          <p className="meta">Date: {date}</p>

          {/* Posted by */}
          {authors.length > 0 && (
            <div className="flex flex-row gap-5">
              <p>Posted by:</p>
              {authors.map((author) => (
                <li key={author.id} className="inline-block content-center">
                  <img
                    src={`${author.authorImage.url}`}
                    alt={author.name}
                    width={75}
                    height={75}
                  />
                  <p className="flex justify-center">{author.name}</p>
                </li>
              ))}
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
              <span>tags : </span>
              {tags.map((tag) => (
                <a key={`${tag.name}`} href={`/tags?tag=${tag.name}`}>
                  <button type="button">{tag.name}</button>
                  <span>,</span>
                </a>
              ))}
              <span>...</span>
            </div>
          )}
          <Separator className="my-20" />
        </article>
      )
  );
}

export default function PageTest() {
  const params = useParams();
  
  return (
    <div className="flex justify-center">
      <article className="prose lg:prose-xl">
        {params?.id ? <DisplayPage id={parseInt(params.id)} /> : <h1>Error</h1>}
        <Link to='../..' relative="path">Back</Link>
      </article>
    </div>
  );
}
