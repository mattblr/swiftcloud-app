import React from "react";
import styled from "@emotion/styled";

const WarningComponent = (props: any) => {
  return <WarningStyled>{props.children}</WarningStyled>;
};

const WarningStyled = styled.p`
  && {
    color: var(--c-red-1);
    :before {
      display: inline;
      content: "⚠ ";
    }
  }
`;

export default WarningComponent;
