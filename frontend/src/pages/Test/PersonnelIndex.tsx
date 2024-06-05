import { gql, useQuery } from "@apollo/client";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

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
  pages: Page[];
}

const GET_PERSONNELS = gql`
  {
    pages(parent: 11) {
      ... on DetailBlog{
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
    
  }
`;

export default function PersonnelIndex() {
    const { loading, error, data } = useQuery<Data>(GET_PERSONNELS);

    if (loading) return <p>Loading...</p>;
  
    if (error) return <p>Error : {error.message}</p>;
  
    if (!data) return <p>Error : No Data</p>;
  
    return data.pages.map(
      ({ id, title }) =>
        title && (
          <article key={id}>
            <Link to={`personnel/${id}`}>{title}</Link>
            <Separator className="my-4" />
          </article>
        )
    );
}
