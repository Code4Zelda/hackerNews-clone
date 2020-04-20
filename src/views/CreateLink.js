import React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { withApollo } from "@apollo/react-hoc";
import { useHistory } from "react-router-dom";

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

const CreateLink = () => {
  const [description, setDescription] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [error, setError] = React.useState("");
  const [submitPost] = useMutation(POST_MUTATION);
  const history = useHistory();

  const handleSumbit = () => {
    submitPost({
      variables: { description, url },
      //   refetchQueries: [{ query: POSTS_LIST }],
    }).catch(function(error) {
      console.log(error);
      setError(error.toString());
    });
    setDescription("");
    setUrl("");
    history.push("/");
  };

  return (
    <div>
      <div className="flex flex-column mt3">
        <input
          className="mb2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          placeholder="A description for the link"
        />
        <input
          className="mb2"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          type="text"
          placeholder="The URL for the link"
        />
      </div>
      <button onClick={() => handleSumbit()}>Submit</button>
      {error}
    </div>
  );
};

export default withApollo(CreateLink);

// import React, { Component } from "react";
// import { Mutation } from "react-apollo";
// import gql from "graphql-tag";

// const POST_MUTATION = gql`
//   mutation PostMutation($description: String!, $url: String!) {
//     post(url: $url, description: $description) {
//       id
//       createdAt
//       url
//       description
//     }
//   }
// `;

// class CreateLink extends Component {
//   state = {
//     description: "",
//     url: "",
//   };

//   render() {
//     const { description, url } = this.state;
//     return (
//       <div>
//         <div className="flex flex-column mt3">
//           <input
//             className="mb2"
//             value={description}
//             onChange={(e) => this.setState({ description: e.target.value })}
//             type="text"
//             placeholder="A description for the link"
//           />
//           <input
//             className="mb2"
//             value={url}
//             onChange={(e) => this.setState({ url: e.target.value })}
//             type="text"
//             placeholder="The URL for the link"
//           />
//         </div>
//         <Mutation mutation={POST_MUTATION} variables={{ description, url }}>
//           {(postMutation) => <button onClick={postMutation}>Submit</button>}
//         </Mutation>
//       </div>
//     );
//   }
// }

// export default CreateLink;
