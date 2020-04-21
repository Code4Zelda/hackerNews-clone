import React from "react";
import { AUTH_TOKEN } from "../constant";
import { timeDifferenceForDate } from "../utils";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { withApollo } from "@apollo/react-hoc";
import { Mutation } from "react-apollo";

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        id
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

const Post = (props) => {
  const authToken = localStorage.getItem(AUTH_TOKEN);

  const _voteForLink = () => {};

  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{props.index + 1}.</span>
        {authToken && (
          <Mutation
            mutation={VOTE_MUTATION}
            variables={{ linkId: this.props.link.id }}
            update={(store, { data: { vote } }) =>
              props.updateStoreAfterVote(store, vote, props.link.id)
            }
          >
            {(voteMutation) => (
              <div className="ml1 gray f11" onClick={voteMutation}>
                ▲
              </div>
            )}
          </Mutation>
        )}
      </div>
      <div className="ml1">
        <div>
          {props.link.description} ({props.link.url})
        </div>
        <div className="f6 lh-copy gray">
          {props.link.votes.length} votes | by{" "}
          {props.link.postedBy ? props.link.postedBy.name : "Unknown"}{" "}
          {timeDifferenceForDate(props.link.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default Post;
