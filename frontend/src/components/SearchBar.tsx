import { gql, useQuery } from "@apollo/client";
import {
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
  CommandSeparator,
  Command,
} from "cmdk";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Page {
  id: string;
  title: string;
  parent: {slug: string};
}

interface Data {
  search: Page[];
}

const SEARCH_PAGES = gql`
  query searchPage($query: String!) {
    search(query: $query) {
      ... on BlogPage {
        id
        title
        parent {
          slug
        }
      }
      ... on DetailBlog {
        id
        title
        parent {
          slug
        }
      }
    }
  }
`;

function DisplayResults({ query }: { query: string }) {
  const { loading, error, data } = useQuery<Data>(SEARCH_PAGES, {
    variables: { query },
  });

  if (loading) return <p>Loading...</p>;

  if (!query) return <p className="mute">Please type to search...</p>;

  if (error) return <p>Error : {error.message}</p>;

  if (!data) return <p>Error : No Data</p>;

  if (!data.search) return <p>Error : No Data</p>;

  return data.search.length ? (
    data.search.map(({ id, title, parent }) => (
      <>
        <p>
          <Link className="underline decoration-1" to={`./${parent.slug}/${id}`}>
            {title}
          </Link>
        </p>
      </>
    ))
  ) : (
    <p>No results found.</p>
  );
}

export default function SearchBar() {
  const [inputValue, setInputValue] = useState("");

  const handleValueChange = (value: string) => {
    setInputValue(value);
  };

  useEffect(() => {}, [inputValue]);

  return (
    <Command className="fixed right-1/4 left-1/4 m-5 p-5 rounded-lg border shadow-md z-10 bg-white ">
      <CommandInput
        className="peer w-full"
        placeholder="Search..."
        onValueChange={handleValueChange}
      />
      <CommandList className="peer-focus:flex pt-5">
        <DisplayResults query={inputValue} />
      </CommandList>
    </Command>
  );
}
