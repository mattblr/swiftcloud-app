import React from "react";
import { Button } from "@material-ui/core";
import styled from "@emotion/styled";

const ButtonComponent = (props: any) => {
  return (
    <ButtonContainer>
      <ButtonStyled
        variant="contained"
        onClick={props.onClick}
        className={props.className}
        type={props.type}
        form={props.form}
      >
        {props.children}
      </ButtonStyled>
    </ButtonContainer>
  );
};

const ButtonStyled = styled(Button)`
  && {
    height: 57px;
    background-color: var(--c-orange);
    color: white;
    width: 100%;
    font-size: 14;
    letter-spacing: 0.0891em;
  }
`;

const ButtonContainer = styled.div`
  && {
    padding-left: 5px;
    padding-right: 5px;
  }
`;

export default ButtonComponent;
