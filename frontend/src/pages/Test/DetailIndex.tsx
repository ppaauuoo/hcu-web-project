import { gql, useQuery } from "@apollo/client";
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
    detailpages: Page[];
}

const GET_PAGES = gql`
  query getDetailPages {
    detailpages {
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

export default function DetailIndex() {
  const { loading, error, data } = useQuery<Data>(GET_PAGES);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error : {error.message}</p>;

  if (!data) return <p>Error : No Data</p>;

  return data.detailpages.map(
    ({ id, title }) =>
      title && (
        <article key={id}>
          <Link to={`detail/${id}`}>{title}</Link>
          <Separator className="my-4" />
        </article>
      )
  );
}
