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
  blogpages: Page[];
}

const GET_PAGES = gql`
  query getBlogPage {
    blogpages {
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
`;

function DisplayPages() {
  const { loading, error, data } = useQuery<Data>(GET_PAGES);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error : {error.message}</p>;

  if (!data) return <p>Error : No Data</p>;
  
  return data.blogpages.map(
    ({ id, title, tags }) =>
      title && (
        <article key={id}>
          <Link to={`${id}`}>{title}</Link>

          {/* <h2 className="intro">{intro}</h2> */}

          {/* Tags */}
          {tags.length > 0 && (
            <div className="tags">
              <span>tags: </span>
              {tags.map((tag) => (
                <Link key={`${tag.name}`} to={`./tag/${tag.name}`}>
                  <button type="button">{tag.name}</button>
                  <span>,</span>
                </Link>
              ))}
              <span>...</span>
            </div>
          )}
          <Separator className="my-4" />
        </article>
      )
  );
}

export default function IndexTest() {
  return (
    <div className="flex p-20">
      <article className="prose lg:prose-xl">
        <h3>Test Archives</h3>
        <DisplayPages />
      </article>
    </div>
  );
}
