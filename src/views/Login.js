import React from "react";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";
import { useMutation } from "@apollo/react-hooks";
import { withApollo } from "@apollo/react-hoc";
import { AUTH_TOKEN } from "../constant";
import { useHistory } from "react-router";

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const Login = () => {
  const [login, setLogin] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const history = useHistory();

  const _confirm = async (data) => {
    const { token } = login ? data.login : data.signup;
    _saveUserData(token);
    history.push(`/`);
  };

  const _saveUserData = (token) => {
    localStorage.setItem(AUTH_TOKEN, token);
  };

  const [SIGNUP] = useMutation(SIGNUP_MUTATION);
  const [LOGIN] = useMutation(LOGIN_MUTATION);

  return (
    <div>
      <h4 className="mv3">{login ? "Login" : "Sign Up"}</h4>
      <div className="flex flex-column">
        {!login && (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Your name"
          />
        )}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Your email address"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Choose a safe password"
        />
      </div>
      <div className="flex mt3">
        <Mutation
          mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
          variables={{ email, password, name }}
          onCompleted={(data) => _confirm(data)}
        >
          {(mutation) => (
            <div className="pointer mr2 button" onClick={mutation}>
              {login ? "login" : "create account"}
            </div>
          )}
        </Mutation>

        <div className="pointer button" onClick={() => setLogin(!login)}>
          {login ? "need to create an account?" : "already have an account?"}
        </div>
      </div>
    </div>
  );
};

export default withApollo(Login);
