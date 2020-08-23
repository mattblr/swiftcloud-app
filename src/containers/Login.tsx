import React from "react";
import TextField from "../components/TextField";
import Warning from "../components/Warning";
import styled from "@emotion/styled";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import { useLazyQuery } from "@apollo/react-hooks";
import { login } from "../features/auth/authSlice";
import { LOGIN } from "../graph/resolvers";
import { useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";

const LoginContainer = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => loginHandler(data);

  let history = useHistory();

  const [loginReq, { error }] = useLazyQuery(LOGIN, {
    errorPolicy: "all",
    onCompleted: (d) => {
      dispatch(login(d.login));
      history.push("/");
    },
  });

  const loginHandler = async (data: any) => {
    const { email } = data;
    const { password } = data;

    loginReq({
      variables: { email, password },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          textFieldLabel="Email"
          textFieldName="email"
          register={register}
          type="text"
        ></TextField>
        <TextField
          textFieldLabel="Password"
          textFieldName="password"
          register={register}
          type="password"
        ></TextField>
        <FieldContainer>
          <ButtonStyled type="submit">Sign in</ButtonStyled>
        </FieldContainer>
        <input type="submit" style={inputSubmitHiddenStyle} />
      </form>
      {error && (
        <Warning>
          {error.networkError ? "Please check your details and try again" : ""}
        </Warning>
      )}
      <LinkContainerStyled>
        <LinkStyled>Forgot your password?</LinkStyled>
      </LinkContainerStyled>
    </>
  );
};

const LinkStyled = styled.div`
  && {
    font-size: 14px;
    color: var(--c-gray-2);
    :visited {
      color: var(--c-gray-2);
    }
  }
`;

const LinkContainerStyled = styled.div`
  && {
    text-align: end;
    margin-right: 5px;
  }
`;

const FieldContainer = styled.div`
  && {
    padding-top: 15px;
    padding-bottom: 5px;
  }
`;

const ButtonStyled = styled(Button)`
  && {
    background-color: var(--c-light-blue-1);
    :hover {
      background-color: var(--c-light-blue-2);
    }
  }
`;

const inputSubmitHiddenStyle = {
  position: "absolute",
  left: "-9999px",
} as React.CSSProperties;

export default LoginContainer;
