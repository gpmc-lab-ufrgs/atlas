import styled from 'styled-components';

export const ContributorContainer = styled.div`
  padding: 70px;
`;

export const ContributorImageContainer = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 10px;
  overflow: hidden;
`;

export const ContributorImage = styled.img`
  width: 100%;
`;

export const GridDisplay = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 35px 90px;
`;

export const AvatarIconDiv = styled.div`
  width: 200px;
  height: 200px;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px;
  border: 3px solid black;

  margin-bottom: 5px;
`;

export const AvatarIcon = styled.img`
  width: 120px;
  height: 105px;
`;

export const ModalRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export const PersonDatas = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const PersonData = styled.p`
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  font-size: 16px;
`;

export const SocialProfileLink = styled.a`
  text-decoration: none;
  color: inherit !important;
  border-bottom: 2px solid #54a333;
  cursor: pointer;
  :hover {
    color: #217100 !important;
  }
`;

export const ContributorsFunctionDiv = styled.h3`
  margin-top: 45px;
  margin-bottom: 35px;
  font-size: 20px;
  width: 100%;
`;
