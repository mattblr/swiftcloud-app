import React from "react";
import styled from "@emotion/styled";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { Grid, Tooltip, Zoom } from "@material-ui/core";

const APIKeyFieldComponent = (props: any) => {
  const handleDisplayKey = () => {
    props.setShowKey(!props.showKey);
  };

  const copyText = () => {
    const dummy = document.createElement("textarea");

    document.body.appendChild(dummy);

    dummy.value = props.value || "";
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  };
  return (
    <StyledContainer>
      <Grid container>
        <Grid item xs={props.value ? 11 : 12}>
          <Tooltip
            title={props.value ? "Click to copy" : ""}
            TransitionComponent={Zoom}
            placement="top"
          >
            <StyledKeyField id="apiKeyValue" onClick={copyText}>
              {!props.loading && !props.value
                ? "API Key"
                : props.loading
                ? "Loading..."
                : props.showKey
                ? props.value
                : "*********"}
            </StyledKeyField>
          </Tooltip>
        </Grid>

        {props.value ? (
          <IconContainer item xs={1} onClick={handleDisplayKey}>
            {props.showKey ? <Visibility /> : <VisibilityOff />}
          </IconContainer>
        ) : (
          <></>
        )}
      </Grid>
    </StyledContainer>
  );
};

const StyledKeyField = styled.div`
  && {
    min-height: 56px;
    width: 95%;
    background-color: #00000017;
    word-wrap: break-word;
    text-align: center;
    font-size: 16px;
    letter-spacing: 0.016em;
    color: var(--c-gray-2);
    padding-right: 2.5%;
    padding-left: 2.5%;
    border-radius: 4px;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  }
`;

const StyledContainer = styled.div`
  && {
    margin-left: 5px;
    margin-right: 5px;
    margin-bottom: 15px;
  }
`;

const IconContainer = styled(Grid)`
  && {
    min-height: 56px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default APIKeyFieldComponent;
