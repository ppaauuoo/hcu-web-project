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
}

interface Data {
  search: Page[];
}

const SEARCH_PAGES = gql`
  query searchPage {
    search(query: "อาจารย์") {
      ... on BlogPage {
        id
        title
      }
      ... on DetailBlog {
        id
        title
      }
    }
  }
`;

function DisplayResults({ query }: { query: string }) {
  const { loading, error, data } = useQuery<Data>(SEARCH_PAGES, {
    variables: { query },
  });
  console.log(query)

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error : {error.message}</p>;

  if (!data) return <p>Error : No Data</p>;

  return data.search.map(
    ({ id, title }) =>
      title && (
        <CommandItem>
          <Link className="underline decoration-1" to={`/${id}`}>
            {title}
          </Link>
        </CommandItem>
      )
  );
}

export default function SearchBar() {
  const [inputValue, setInputValue] = useState("");

  const handleValueChange = (value: string) => {
    setInputValue(value);
  };

  useEffect(() =>{

  
  },[inputValue]);

  return (
    <Command className="absolute right-1/4 left-1/4 m-5 rounded-lg border shadow-md z-10 bg-white p-5">
      <CommandInput
        className="peer w-full"
        placeholder="Search..."
        onValueChange={handleValueChange}
      />
      <CommandList className="hidden peer-focus:flex pt-5">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandSeparator />
        <DisplayResults query={inputValue} />
      </CommandList>
    </Command>
  );
}
