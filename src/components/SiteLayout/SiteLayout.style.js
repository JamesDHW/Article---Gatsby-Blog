import styled from 'styled-components'
import { getSpacing } from '../../stylesheet'
import { Navbar, NavbarGroup, Colors } from '@blueprintjs/core'

export const ContentContainer = styled.div`
  padding: 75px 25%;
  @media only screen and (max-width: 420px) {
    padding: 75px 2%;
  }
`

export const StyledNavbar = styled(Navbar)`
  padding-top: ${getSpacing(1)};
  height: 60px;
`

export const StyledRightNavbarGroup = styled(NavbarGroup)`
  @media only screen and (max-width: 420px) {
    display: none;
  }
`

export const Link = styled.a`
  padding: ${getSpacing(2)};
  :hover {
    background-color: ${Colors.DARK_GRAY4};
  }
`

export const BlogTitle = styled.a`
  :hover {
    text-decoration: none;
  }
`
