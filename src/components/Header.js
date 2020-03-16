import React from 'react'
import styled from 'styled-components'

const MainHeader = styled.header`
  display: flex;
  position: sticky;
  justify-content: center;
  align-items: center;
  height: 100px;
  font-size: 30px;
  background-color: #302f2f;
  color: white;
`

const Header = () => (
  <MainHeader>
    spectrum
  </MainHeader>
)

export default Header