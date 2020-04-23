import React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { withApollo } from "@apollo/react-hoc";
import { useHistory } from "react-router-dom";
import { Mutation } from "react-apollo";
import { FEED_QUERY } from "./PostList";
import { LINKS_PER_PAGE } from "../constant";

//  createdAt
const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;

const CreateLink = (props) => {
  const [description, setDescription] = React.useState("");
  const [url, setUrl] = React.useState("");

  return (
    <div>
      <div className="flex flex-column mt3">
        <input
          className="mb2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          placeholder="A description for the post"
        />
        <input
          className="mb2"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          type="text"
          placeholder="The URL for the post"
        />
      </div>
      <Mutation
        mutation={POST_MUTATION}
        variables={{ description, url }}
        onCompleted={() => props.history.push("/new/1")}
        update={(store, { data: { post } }) => {
          const first = LINKS_PER_PAGE;
          const skip = 0;
          const orderBy = "createdAt_DESC";
          const data = store.readQuery({
            query: FEED_QUERY,
            variables: { first, skip, orderBy },
          });
          data.feed.links.unshift(post);
          store.writeQuery({
            query: FEED_QUERY,
            data,
            variables: { first, skip, orderBy },
          });
        }}
      >
        {(postMutation) => <button onClick={postMutation}>Submit</button>}
      </Mutation>
    </div>
  );
};

export default withApollo(CreateLink);
