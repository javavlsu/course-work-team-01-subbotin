import styled from "styled-components"

import { Container } from "@ui"

export const Base = styled(Container).attrs(() => ({
  type: "4"
}))`
  min-width: 0;
  min-height: 0;
  width: max-content;
  padding: 20px 25px;
  border-radius: 25px;
`
