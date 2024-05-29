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

interface Photo {
  url: string;
}

interface PersonBlock {
  firstname: string;
  surname: string;
  photo: Photo;
  biography: string;
}

interface DetailBlock {
  heading: string;
  paragraph: string;
}

interface ImageChooserBlock {
  image: Photo;
}

type BodyBlock = PersonBlock | DetailBlock | ImageChooserBlock;

interface Page {
  id: string;
  title: string;
  date: string;
  intro: string;
  body: BodyBlock[];
}

interface Data {
  detailpage: Page;
}

const GET_PAGE_BY_ID = gql`
  query getDetailPage($id: ID!) {
    detailpage(id: $id) {
      id
      title
      date
      intro
      body {
        ... on PersonBlock {
          firstname
          surname
          photo {
            url
          }
          biography
        }
        ... on DetailBlock {
          heading
          paragraph
        }
        ... on ImageChooserBlock {
          image {
            url
          }
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

  return parse(`
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold">${data.detailpage.title}</h1>
    <p class="text-sm text-gray-500">${new Date(
      data.detailpage.date
    ).toLocaleDateString()}</p>
    <p class="mt-4">${data.detailpage.intro}</p>
    <div class="mt-6">
      ${data.detailpage.body
        .map((block) => {
          if ("firstname" in block) {
            return `
            <div class="person-block mb-6">
              <h2 class="text-2xl font-semibold">${block.firstname} ${block.surname}</h2>
              <img class="mt-2" src="${block.photo.url}" alt="${block.firstname} ${block.surname}">
              <p class="mt-2">${block.biography}</p>
            </div>
          `;
          } else if ("heading" in block) {
            return `
            <div class="detail-block mb-6">
              <h2 class="text-xl font-semibold">${block.heading}</h2>
              <p class="mt-2">${block.paragraph}</p>
            </div>
          `;
          } else if ("image" in block) {
            return `
            <div class="image-block mb-6">
              <img class="mt-2" src="${block.image.url}" alt="Image">
            </div>
          `;
          }
          return "";
        })
        .join("")}
    </div>
  </div>
`);
}

export default function PageTest() {
  const params = useParams();

  return (
    <div className="flex justify-center">
      <article className="prose lg:prose-xl">
        {params?.id ? <DisplayPage id={parseInt(params.id)} /> : <h1>Error</h1>}
        <Link to="../.." relative="path">
          Back
        </Link>
      </article>
    </div>
  );
}
