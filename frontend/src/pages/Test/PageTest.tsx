import parse from "html-react-parser";
import { gql, useQuery } from "@apollo/client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

interface Page {
  id: string;
  title: string;
  date: string;
  intro: string;
  htmlBody: string;
  galleryImages: { id: string; image: { url: string }; caption: string }[];
};

interface Data {
  pages: Page[];
}

const GET_PAGES = gql`
  query getPages {
    pages {
      ... on BlogPage {
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
    ({ title, date, intro, htmlBody, galleryImages }) =>
      title && (
        <div key={title}>
          <h3>{title}</h3>
          <p>Date: {date}</p>
          <p>Intro: {intro}</p>
          {parse(htmlBody)}
          {galleryImages.length > 0 && (
            <>
              <h4>Gallery Images</h4>
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
            </>
          )}
        </div>
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
