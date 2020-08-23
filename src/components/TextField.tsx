import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  FilledInput,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { StylesProvider } from "@material-ui/core/styles";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import styled from "@emotion/styled";

export interface Props {
  password?: boolean;
  textFieldName: string;
  textFieldLabel: string;
  register: any;
  type: string;
}

const TextFieldComponent = (props: Props) => {
  const [showPassword, setShowPassword] = useState(
    props.type === "password" ? false : true
  );

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <StylesProvider injectFirst>
      <TextFieldContainer>
        <FormControlStyled fullWidth variant="filled">
          <InputLabelStyled htmlFor={props.textFieldName}>
            {props.textFieldLabel}
          </InputLabelStyled>
          <FilledInputStyled
            id={props.textFieldName} //"standard-adornment"
            name={props.textFieldName}
            type={
              props.type === "password"
                ? showPassword
                  ? "text"
                  : "password"
                : props.type
            }
            inputRef={props.register}
            endAdornment={
              props.type === "password" ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ) : null
            }
          />
        </FormControlStyled>
      </TextFieldContainer>
    </StylesProvider>
  );
};

const TextFieldContainer = styled.div`
  && {
    padding: 5px;
    .MuiInputLabel-shrik {
      color: var(--c-blue);
    }
    .MuiInputBase-input {
      border-bottom-color: var(--c-blue);
      color: var(--c-gray-4);
    }
  }
`;

const FormControlStyled = styled(FormControl)`
  && {
    font-size: 16px;
    letter-spacing: 0.016em;
    color: var(--c-gray-2);
  }
`;

const InputLabelStyled = styled(InputLabel)`
  && {
    font-size: 16px;

    letter-spacing: 0.016em;
    color: var(--c-gray-2);
  }
`;

const FilledInputStyled = styled(FilledInput)`
  && {
    font-size: 16px;
    input[type="date"]:in-range::-webkit-datetime-edit-year-field,
    input[type="date"]:in-range::-webkit-datetime-edit-month-field,
    input[type="date"]:in-range::-webkit-datetime-edit-day-field,
    input[type="date"]:in-range::-webkit-datetime-edit-text,
    input[type="time"]:in-range::-webkit-datetime-edit-hour-field,
    input[type="time"]:in-range::-webkit-datetime-edit-minute-field,
    input[type="time"]:in-range::-webkit-datetime-edit-text {
      color: transparent;
    }
  }
`;

TextFieldComponent.defaultProps = {
  password: false,
};

export default TextFieldComponent;
