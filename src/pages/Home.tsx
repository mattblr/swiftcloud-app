import React from "react";

import { Grid } from "@material-ui/core";

import APIGenerator from "../containers/APIGenerator";
import styled from "@emotion/styled";
import WelcomeContainer from "../containers/Welcome";

const HomePage = () => {
  return (
    <ContainerStyled container>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <WelcomeContainer />
        <APIGenerator />
      </Grid>
    </ContainerStyled>
  );
};

const ContainerStyled = styled(Grid)`
  && {
    justify-content: center;
  }
`;

export default HomePage;
