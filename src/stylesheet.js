import styled from 'styled-components'
import { H1, H2 } from '@blueprintjs/core'
import { Divider } from '@blueprintjs/core'

export const getSpacing = interval => `${5 * interval}px`

export const Title = styled(H1)`
  font-size: 75px !important;
  margin: ${getSpacing(10)} 0;
  text-align: center;
`
export const Subtitle = styled(H2)`
  margin: ${getSpacing(5)} 0;
  text-align: center;
`
export const Line = styled(Divider)`
  margin: ${getSpacing(5)};
`
