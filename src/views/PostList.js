import React from "react";
import Post from "../components/Post";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { withApollo } from "@apollo/react-hoc";

const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`;

const PostList = () => {
  const { loading, data, error } = useQuery(FEED_QUERY);
  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(data);
  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      {data.feed.links.map((link) => (
        <Post key={link.id} link={link} />
      ))}
    </div>
  );
};

export default withApollo(PostList);
