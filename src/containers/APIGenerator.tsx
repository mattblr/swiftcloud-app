import React, { useState } from "react";
import Button from "../components/Button";
import APIKeyField from "../components/APIKeyField";
import ConfirmModal from "../components/ConfirmModal";
import { GETAPIKEY, GENERATENEWKEY } from "../graph/resolvers";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import styled from "@emotion/styled";
import { Grid } from "@material-ui/core";

const APIGeneratorContainer = () => {
  const [loading, setLoading] = useState(false);

  const [apiKey, setAPIKey] = useState();

  const [showKey, setShowKey] = useState(true);

  const [openModal, setOpenModal] = useState(false);

  const [getAPIKey] = useLazyQuery(GETAPIKEY, {
    onCompleted: (d) => {
      setAPIKey(d.retrieveAPIKey);
      setLoading(false);
    },
  });

  const [generateNewAPIKey, { error }] = useMutation(GENERATENEWKEY, {
    onError: (e) => {
      console.log("Somethings gone wrong!");
    },
    errorPolicy: "all",
    onCompleted: (d) => {
      setAPIKey(d.generateNewAPIKey);
      setLoading(false);
      setOpenModal(false);
    },
  });

  const handleGetAPIKey = () => {
    setShowKey(false);
    setLoading(true);
    getAPIKey();
  };

  const handleGenerateNewAPIKey = () => {
    setOpenModal(true);
  };

  return (
    <>
      <APIKeyField
        value={apiKey}
        loading={loading}
        showKey={showKey}
        setShowKey={setShowKey}
      />
      <Grid container>
        <Grid item xs={12}>
          {apiKey ? (
            <ButtonStyledPurple onClick={handleGenerateNewAPIKey}>
              Generate a new API Key
            </ButtonStyledPurple>
          ) : (
            <ButtonStyled onClick={handleGetAPIKey}>View API Key</ButtonStyled>
          )}
        </Grid>
      </Grid>
      <ConfirmModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        setLoading={setLoading}
        generateNewAPIKey={generateNewAPIKey}
        error={error}
      />
    </>
  );
};

const ButtonStyled = styled(Button)`
  && {
    background-color: var(--c-light-blue-1);
    :hover {
      background-color: var(--c-light-blue-2);
    }
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

export default APIGeneratorContainer;
