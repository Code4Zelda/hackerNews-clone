import React from "react";
import gql from "graphql-tag";
import Post from "../components/Post";
import { useQuery } from "@apollo/react-hooks";
import { withApollo } from "@apollo/react-hoc";

// createdAt
const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    feed(filter: $filter) {
      links {
        id
        url
        description

        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

const Search = () => {
  const [links, setLink] = React.useState([]);
  const [filter, setFilter] = React.useState("");

  const { data, loading, error } = useQuery(FEED_SEARCH_QUERY, {
    variables: { filter },
  });

  const _executeSearch = async () => {
    if (loading) return <div>"Loading..."</div>;

    if (error) return <div>{error.message}</div>;

    const links = data.feed.links;
    if (!links) return <div>No Post</div>;
    setLink(links);
  };

  return (
    <div>
      <div>
        Search
        <input type="text" onChange={(e) => setFilter(e.target.value)} />
        <button onClick={() => _executeSearch()}>OK</button>
      </div>
      {links.map((link, index) => (
        <Post key={link.id} link={link} index={index} />
      ))}
    </div>
  );
};

export default withApollo(Search);
