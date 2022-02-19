import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { Subtitle } from '../../stylesheet'
import {
  NavbarGroup,
  NavbarDivider,
  Alignment,
  Icon,
  H3
} from '@blueprintjs/core'
import {
  ContentContainer,
  StyledNavbar,
  StyledRightNavbarGroup,
  BlogTitle,
  Link,
  Footer,
  Header
} from './SiteLayout.style'

import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader'

const ICON_HEIGHT = 24

export const SiteLayout = ({ children }) => {
  deckDeckGoHighlightElement()
  return (
    <div className="bp3-dark">
      <Header />
      <StyledNavbar fixedToTop>
        <NavbarGroup align={Alignment.LEFT}>
          <Link href="https://jamesdhw.github.io">
            <Icon size={ICON_HEIGHT} color="white" icon="home" />
          </Link>
          <NavbarDivider />
          <BlogTitle href="/blog">
            <H3>Blog ✍️</H3>
          </BlogTitle>
        </NavbarGroup>

        <StyledRightNavbarGroup align={Alignment.RIGHT}>
          <NavbarDivider />
          <Link
            target="_blank"
            href="mailto:JamesHaworthWheatman@gmail.com?subject=[GitHub Pages]: ">
            <Icon size={ICON_HEIGHT} color="white" icon="envelope" />
          </Link>
          <Link target="_blank" href="https://github.com/JamesDHW">
            <StaticImage
              height={ICON_HEIGHT}
              src="../../images/icons/GitHub.png"
            />
          </Link>
          <Link target="_blank" href="https://www.linkedin.com/in/jamesdhw/">
            <StaticImage
              height={ICON_HEIGHT}
              src="../../images/icons/LinkedIn.png"
            />
          </Link>
        </StyledRightNavbarGroup>
      </StyledNavbar>

      <ContentContainer>{children}</ContentContainer>
      <Footer />
    </div>
  )
}
