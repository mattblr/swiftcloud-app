import React from "react";

import { Grid, Modal } from "@material-ui/core";
import styled from "@emotion/styled";
import TextField from "./TextField";
import Button from "./Button";

import Warning from "./Warning";

import { useForm } from "react-hook-form";

const ConfirmModalComponent = (props: any) => {
  const handleClose = () => {
    props.setOpenModal(false);
  };

  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    if (!props.error) {
      props.setLoading(true);
      props.generateNewAPIKey({
        variables: { password: data.password },
      });
    }
  };

  return (
    <ModalStyled open={props.openModal} onClose={handleClose}>
      <StyledContainer container>
        <StyledItem item xs={10} md={6}>
          <Grid container>
            <Grid item xs={1} />
            <Grid item xs={10}>
              <StyledText>Please enter your password to confirm</StyledText>

              <form onSubmit={handleSubmit(onSubmit)}>
                <TextFieldStyled
                  textFieldLabel="Password"
                  textFieldName="password"
                  register={register}
                  type="password"
                />
                {props.error && (
                  <Warning>
                    {props.error
                      ? "Please check your details and try again"
                      : ""}
                  </Warning>
                )}
                <Grid container>
                  <Grid item xs={6}>
                    <ButtonStyledPurple type="submit">
                      Confirm new API Key
                    </ButtonStyledPurple>
                  </Grid>
                  <Grid item xs={6}>
                    <ButtonStyledRed onClick={handleClose}>
                      Cancel
                    </ButtonStyledRed>
                  </Grid>
                </Grid>
              </form>
            </Grid>
            <Grid item xs={1} />
          </Grid>
        </StyledItem>
      </StyledContainer>
    </ModalStyled>
  );
};

const ModalStyled = styled(Modal)`
  && {
    width: "100%";
    max-width: "100vw";
    max-height: "100%";
    position: "fixed";
    top: "50%";
    left: "0";
    transform: "translate(0, -50%)";
    overflow-y: "auto";
    outline: 0;
  }
`;

const TextFieldStyled = styled(TextField)`
  && {
    padding-bottom: 15px;
  }
`;

const StyledItem = styled(Grid)`
  && {
    display: flex;
    background-color: white;
    min-height: 25vh;
    border-radius: 4px;
    justify-content: center;
    align-items: center;

    padding-top: 30px;
    padding-bottom: 30px;
  }
`;

const StyledContainer = styled(Grid)`
  && {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
  }
`;

const ButtonStyledPurple = styled(Button)`
  && {
    background-color: var(--c-purple);
    :hover {
      background-color: var(--c-dark-gray);
    }
  }
`;

const ButtonStyledRed = styled(Button)`
  && {
    background-color: var(--c-red-2);
    :hover {
      background-color: var(--c-red-1);
    }
  }
`;

const StyledText = styled.div`
  && {
    padding: 15px;
    font-size: medium;
    font-weight: 400;
    color: var(--c-dark-gray);
    text-align: center;
  }
`;
export default ConfirmModalComponent;
