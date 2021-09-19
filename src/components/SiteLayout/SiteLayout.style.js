import styled from 'styled-components'
import { getSpacing } from '../../stylesheet'
import { Navbar, NavbarGroup } from '@blueprintjs/core'

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 75px 20%;
  @media only screen and (max-width: 420px) {
    padding: 25px 2%;
  }
  @media only screen and (max-width: 800px) and (min-width: 420px) {
    padding: 25px 10%;
  }
`

export const StyledNavbar = styled(Navbar)`
  background-color: transparent !important;
  height: 100px;
  overflow: visible;
  box-shadow: none !important;

  ::after {
    content: '';
    position: absolute;
    left: 0;
    z-index: -1;
    width: 100vw;
    background: url('/images/navbar.svg');
    aspect-ratio: 900/50;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

    @media only screen and (max-width: 1000px) {
      aspect-ratio: 600/50;
    }
    @media only screen and (max-width: 600px) {
      aspect-ratio: 300/50;
    }
  }
`

export const StyledRightNavbarGroup = styled(NavbarGroup)`
  @media only screen and (max-width: 420px) {
    display: none;
  }
`

export const Link = styled.a`
  padding: ${getSpacing(2)};
`

export const BlogTitle = styled.a`
  margin-top: ${getSpacing(2)} !important;
  :hover {
    text-decoration: none;
  }
`

const Span = styled.div`
  aspect-ratio: 900/100;
  width: 100vw;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  @media only screen and (max-width: 600px) {
    aspect-ratio: 150/50;
  }
`

export const Footer = styled(Span)`
  background-image: url('/images/footer.svg');
`

export const Header = styled(Span)`
  background-image: url('/images/header.svg');
`
