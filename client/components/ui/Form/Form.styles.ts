import styled from "styled-components"

export const FormContainer = styled.form`
  max-width: 100%;
  width: max-content;
  height: max-content;
  transition: all 0.2s ease;
  font-family: "Montserrat", sans-serif;
`

export const Field = styled.div`
  max-width: 100%;
  width: 100%;
`

export const FieldLabel = styled.p`
  font-size: 0.9em;
  margin: 0 0 10px 0;
  padding: 0;
  font-weight: bold;
  color: ${({ theme }) => theme.text.light};
`

export const FieldDescription = styled.p`
  font-size: 0.8em;
  margin: 5px 0 0 0;
  padding: 0;
  font-weight: bold;
  color: ${({ theme }) => theme.text.light};
`

export const FieldController = styled.div``
