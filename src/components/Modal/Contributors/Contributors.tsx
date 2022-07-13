import React from 'react';

import { Box } from '@mui/material';

import { ModalContainer } from '@components/Modal';

import { mainResearchers, developers, researchers } from './contributorsData';

import * as Styles from './styles';

const Contributors = () => {
  const wrapperContributorsData = [
    {
      data: mainResearchers,
    },
    {
      data: developers,
      title: 'Developers:',
    },
    {
      data: researchers,
      title: 'Researchers:',
    },
  ];

  return (
    <ModalContainer title="Contributors">
      {wrapperContributorsData.map((contributors, id) => (
        <Box display="flex" alignItems="center" flexDirection="column" key={id}>
          {contributors.title && <Styles.ContributorsFunctionDiv>{contributors.title}</Styles.ContributorsFunctionDiv>}

          <Styles.GridDisplay>
            {contributors.data.map((data, index) => (
              <div key={index}>
                {data.hasImage ? (
                  <Styles.ContributorImageContainer>
                    <Styles.ContributorImage src={data.image} alt={data.name} />
                  </Styles.ContributorImageContainer>
                ) : (
                  <Styles.AvatarIconDiv>
                    <Styles.AvatarIcon src={data.image} alt={data.name} />
                  </Styles.AvatarIconDiv>
                )}

                <Styles.PersonDatas>
                  <Styles.PersonData>
                    <Styles.SocialProfileLink href={data.socialProfile} rel="noreferrer" target="_blank">
                      {data.name}
                    </Styles.SocialProfileLink>
                  </Styles.PersonData>

                  {data.function && (
                    <Styles.PersonData>
                      <b>{data.function}</b>
                    </Styles.PersonData>
                  )}

                  <Styles.PersonData>{data.institution}</Styles.PersonData>
                </Styles.PersonDatas>
              </div>
            ))}
          </Styles.GridDisplay>
        </Box>
      ))}
    </ModalContainer>
  );
};

export default Contributors;
