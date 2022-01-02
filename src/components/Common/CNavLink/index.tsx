import React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

export const CNavLink = (props: NavLinkProps): JSX.Element => {
    return (
        <NavLink  {...props} />
    );
};

