import React from 'react';
import { Flex, CloseButton, Square, Avatar, Text } from '@chakra-ui/react';
import { useAppContent } from 'contexts/AppContext';
import { PageHeader, FullScreen, Logout } from 'components';
import { useAuth } from 'contexts/AuthContext';

export const Profile = () => {
  const { setShowProfile } = useAppContent();
  const { user } = useAuth();

  return (
    <FullScreen>
      <Flex justifyContent={'end'}>
        <CloseButton fontSize={20} onClick={() => setShowProfile(false)} />
      </Flex>
      <PageHeader title="Profile" />
      <Flex
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Flex>
          <Square marginTop={10}>
            <Avatar
              name={`${user.firstName} ${user.lastName}`}
              src={user.picture}
              size={20}
            />
          </Square>
        </Flex>
        <Flex>
          <Text>
            {user.firstName} {user.lastName}
          </Text>
        </Flex>
        <Flex>
          <Text>{user.email}</Text>
        </Flex>
        <Flex marginTop={20}>
          <Logout />
        </Flex>
      </Flex>
    </FullScreen>
  );
};
