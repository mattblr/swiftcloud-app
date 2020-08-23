import React, { useRef } from "react";

import { Grid, Modal } from "@material-ui/core";

import Warning from "./Warning";
import styled from "@emotion/styled";
import TextField from "./TextField";
import Button from "./Button";

import { useForm } from "react-hook-form";

const ChangePasswordModalComponent = (props: any) => {
  const handleClose = () => {
    props.setOpenModal(false);
  };

  const { register, errors, handleSubmit, watch } = useForm();

  const password = useRef({});
  password.current = watch("newPassword", "");
  const onSubmit = (data: any) => {
    if (!props.error) {
      props.setLoading(true);
      props.changePassword({
        variables: {
          password: data.currentPassword,
          newPassword: data.newPassword,
        },
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
              <StyledText>
                Please enter your current password to confirm
              </StyledText>

              <form onSubmit={handleSubmit(onSubmit)}>
                <TextFieldStyled
                  textFieldLabel="Current Password"
                  textFieldName="currentPassword"
                  register={register}
                  type="password"
                />
                {props.error && (
                  <Warning>
                    {props.error.networkError
                      ? "Please check your details and try again"
                      : ""}
                  </Warning>
                )}
                <TextFieldStyled
                  textFieldLabel="New Password"
                  textFieldName="newPassword"
                  register={register({
                    required: "You must specify a password",
                    minLength: {
                      value: 8,
                      message: "Password must have at least 8 characters",
                    },
                  })}
                  type="password"
                />

                {errors.newPassword && (
                  <Warning>{errors.newPassword.message}</Warning>
                )}
                <TextFieldStyled
                  textFieldLabel="Confirm Password"
                  textFieldName="confirmNewPassword"
                  register={register({
                    validate: (value) =>
                      value === password.current ||
                      "The passwords do not match",
                  })}
                  type="password"
                />

                {errors.confirmNewPassword && (
                  <Warning>{errors.confirmNewPassword.message}</Warning>
                )}
                <ButtomContainerStyled container>
                  <Grid item xs={6}>
                    <ButtonStyledPurple type="submit">
                      {props.loading ? "Loading..." : "Change Password"}
                    </ButtonStyledPurple>
                  </Grid>
                  <Grid item xs={6}>
                    <ButtonStyledRed onClick={handleClose}>
                      Cancel
                    </ButtonStyledRed>
                  </Grid>
                </ButtomContainerStyled>
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

const ButtomContainerStyled = styled(Grid)`
  && {
    padding-top: 25px;
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

export default ChangePasswordModalComponent;
