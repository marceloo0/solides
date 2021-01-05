import styled from 'styled-components'

export const Container = styled.div`
  align-items: center;
  justify-content: center;
`
export const Content = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`
export const HeaderContent = styled.div`
  display: none;

  @media (max-width: 640px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    max-height: 100vh;
    overflow-y: auto;
  }
`
export const Line = styled.div`
  margin-top: 8px;
  height: 1px;
  background: #5f4ab7;
`
export const Title = styled.h1`
  font-size: 24px;
  color: #5f4ab7;
`
export const TitleName = styled.h2`
  font-size: 20px;
  margin-top: 8px;
  color: #8872b2;
  display: flex;
  align-items: center;
  font-weight: 500;
`
export const Schedule = styled.div`
  flex: 1;
  margin: 0 24px;
`
export const TitleProfile = styled.div`
  display: flex;
  align-items: center;
  margin: 0 16px;

  > h2 {
    margin-right: 8px;
  }
`
export const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  margin-bottom: 24px;
`
export const Agendar = styled.div`
  padding: 10px;

  > p {
    color: #8872b2;
  }
`
export const Button = styled.button`
  width: 100px;
  height: 35px;
  background: #8872b2;
  border: none;
  border-radius: 5px;
  margin-top: 8px;
  color: #fff;
`
export const TitleSection = styled.h2`
  font-size: 22px;
  margin-right: 8px;
  color: #38308a;
`
export const SectionTitle = styled.div`
  display: flex;
  margin-bottom: 4px;
`
