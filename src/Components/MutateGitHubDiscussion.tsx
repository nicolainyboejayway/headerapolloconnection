import React from "react";
import { useMutation, gql } from "@apollo/client";

// Query for getting id of discussion

// repositoryDiscussions(first:1){
//     edges{
//       node{
//         id
//       }
//     }
//   }

const ADD_COMMENT = gql`
  mutation AddComment($type: String!) {
    addDiscussionComment(
      input: { body: $type, discussionId: "D_kwDOGn1V7c4AObIa" }
    ) {
      comment {
        body
      }
    }
  }
`;

export default function MutateGitHubDiscussion() {
  const [addComment] = useMutation(ADD_COMMENT);

  return (
    <div>
      <button onClick={() => addComment({ variables: { type: "🤪" } })}>
        Add Emoji
      </button>
    </div>
  );
}
