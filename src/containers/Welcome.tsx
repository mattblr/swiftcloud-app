import React, { useState } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import styled from "@emotion/styled";

import ChangePasswordModal from "../components/ChangePasswordModal";

import { CHANGEPASSWORD } from "../graph/resolvers";
import { useMutation } from "@apollo/react-hooks";

const WelcomeContainer = () => {
  const userName = useSelector((state: RootState) => state.authSlice.name);

  const [openModal, setOpenModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const [changePassword, { error }] = useMutation(CHANGEPASSWORD, {
    errorPolicy: "all",
    onError: (e) => {
      console.log("Somethings gone wrong!");
    },
    onCompleted: (d) => {
      setLoading(false);
      handleOpenModal();
    },
  });

  return (
    <>
      <StyledTitle>Welcome {userName}!</StyledTitle>
      <LinkContainerStyled>
        <LinkStyled onClick={handleOpenModal}>Change password</LinkStyled>
      </LinkContainerStyled>
      <ChangePasswordModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        setLoading={setLoading}
        changePassword={changePassword}
        error={error}
        loading={loading}
      />
    </>
  );
};

const StyledTitle = styled.div`
  && {
    padding-top: 15px;
    padding-right: 15px;
    padding-left: 15px;
    padding-bottom: 5px;
    width: 100%;
    font-size: x-large;
    font-weight: 400;
    color: var(--c-dark-gray);
  }
`;

const LinkStyled = styled.div`
  && {
    font-size: 14px;
    color: var(--c-gray-2);
    :visited {
      color: var(--c-gray-2);
    }
    :hover {
      text-decoration: underline;
    }
  }
`;

const LinkContainerStyled = styled.div`
  && {
    text-align: start;
    margin-right: 5px;
    padding-bottom: 15px;
    padding-left: 15px;
  }
`;

export default WelcomeContainer;
