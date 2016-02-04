import React from 'react';
import ReactDOM from 'react-dom';
import GraphiQL from 'graphiql';

let graphQLFetcher = (graphQLParams) => {
  return fetch(window.location.origin + '/graphql', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      // Login token for user test@test.com
      'Authorization': 'Bearer: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NjM0ZDQ3NjAwNjZiZTAxNmJmMTBjOWEiLCJ1c2VybmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJwYXNzd29yZCI6IiQyYSQwOCQwdmZIRlUvdWtFS2ZWZmFTOG9RQXd1U2RtcnBNbXo2SDc1WnZNY2s4VEZzaEZOVEtWdWIuSyJ9.aHydRkrRTO5PkbovaRWZGQWpxYWjtL2EBhMVjDy5Z9c',
    },
    body: JSON.stringify(graphQLParams),
  }).then(response => response.json());
};

ReactDOM.render(<GraphiQL fetcher={graphQLFetcher} />, document.body);
