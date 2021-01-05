import styled from 'styled-components'

export const Container = styled.div`
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  z-index: 2;
  position: sticky;

  background: #fff;
`
export const Content = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 20px;
`
export const Profile = styled.div`
  display: flex;

  > div {
    display: none;

    @media (min-width: 640px) {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 20px;
      max-height: 100vh;
      overflow-y: auto;
    }
  }
`

export const ProfileContent = styled.div`
  > h1 {
    color: #5f4ab7;
    font-size: 24px;
  }

  > p {
    font-size: 16px;
    color: #8872b2;
  }
`
