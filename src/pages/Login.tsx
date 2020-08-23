import React from "react";
import { Grid } from "@material-ui/core";
import styled from "@emotion/styled";
import Login from "../containers/Login";

const LoginPage = () => {
  return (
    <ContainerStyled container>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <Login />
      </Grid>
    </ContainerStyled>
  );
};

const ContainerStyled = styled(Grid)`
  && {
    justify-content: center;
  }
`;

export default LoginPage;
