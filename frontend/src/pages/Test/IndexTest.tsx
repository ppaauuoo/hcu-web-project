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
import { Link } from "react-router-dom";
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
        id
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
    ({id, title, intro, tags }) =>
        
      title && (
        <article key={id}>
          <Link to={`${id}`}>{title}</Link>

          <h2 className="intro">{intro}</h2>


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

export default function IndexTest() {
  return (
    <div className="flex justify-center">
      <article className="prose lg:prose-xl">
        <DisplayPages />
      </article>
    </div>
  );
}
