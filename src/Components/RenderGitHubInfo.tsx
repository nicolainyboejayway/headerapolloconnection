import React from "react";
import { useQuery, gql } from "@apollo/client";

interface GitHubValues {
  login: string;
  repositories: any;
  viewer: any;
  edges: [];
  node: [];
  name: string;
  id: string;
}

const GET_DATA = gql`
  {
    viewer {
      login
      id
      repositories(last: 4) {
        edges {
          node {
            name
            id
          }
        }
      }
    }
  }
`;

export default function RenderGitHubInfo() {
  const { data, loading, error } = useQuery<GitHubValues>(GET_DATA);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error... Check Console</p>;
  console.log(data?.viewer.id);

  return (
    <div>
      <h1>{data?.viewer.login}</h1>
      <h2>ID: {data?.viewer.id}</h2>
      <h3>Projects</h3>
      <table>
        <tbody>
          {data?.viewer.repositories.edges.map((rep: any) => (
            <tr key={rep.node.id}>
              <td>{rep.node.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
