import React from "react";
import { Routes, Route, Navigate, NavLink } from "react-router-dom";
import styled from "styled-components";

import TanstackPage from "./pages/tanstack/Page";
import VanillaPage from "./pages/vanilla/Page";
import ThunksPage from "./pages/thunks/Page";
import SagasPage from "./pages/sagas/Page";

const App = () => {
  return (
    <div>
      <Navbar>
        <NavbarContainer>
          <StyledNavLink to="/tanstack">TanStack</StyledNavLink>
          <StyledNavLink to="/vanilla">Vanilla</StyledNavLink>
          <StyledNavLink to="/thunks">Thunks</StyledNavLink>
          <StyledNavLink to="/sagas">Sagas</StyledNavLink>
        </NavbarContainer>
      </Navbar>
      <Routes>
        <Route path="/tanstack" element={<TanstackPage />} />
        <Route path="/vanilla" element={<VanillaPage />} />
        <Route path="/thunks" element={<ThunksPage />} />
        <Route path="/sagas" element={<SagasPage />} />
        <Route path="*" element={<Navigate to="/tanstack" replace={true} />} />
      </Routes>
    </div>
  );
};

const Navbar = styled.div`
  height: 4rem;
  border-bottom-width: 1px;
  border-color: rgb(229 231 235);
`;

const NavbarContainer = styled.div`
  max-width: 768px;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 1.5rem;
`;

const StyledNavLink = styled(NavLink)`
  color: color: rgb(31 41 55);

  &.active {
    color: rgb(37 99 235);
  }
`;

export default App;
