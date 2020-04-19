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
  box-shadow: -2px 20px 16px -26px rgba(0,0,0,0.75);
  font-family: Roboto, sans-serif;
`

const Header = () => (
  <MainHeader>
    spectrum
  </MainHeader>
)

export default Header