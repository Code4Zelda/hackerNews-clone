import React from "react";
import Post from "../components/Post";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { withApollo } from "@apollo/react-hoc";

export const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        createdAt
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

const _updateCacheAfterVote = (store, createVote, linkId) => {
  const data = store.readQuery({ query: FEED_QUERY });

  const votedLink = data.feed.links.find((link) => link.id === linkId);
  votedLink.votes = createVote.link.votes;

  store.writeQuery({ query: FEED_QUERY, data });
};

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
      {data.feed.links.map((link, index) => (
        <Post
          key={link.id}
          link={link}
          index={index}
          updateStoreAfterVote={_updateCacheAfterVote}
        />
      ))}
    </div>
  );
};

export default withApollo(PostList);
