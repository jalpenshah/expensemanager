import React from 'react';
import { Text, Center, Flex, CloseButton } from '@chakra-ui/react';
import { useAppContent } from 'contexts/AppContext';
import { FullScreen } from 'components';
import { Link } from 'react-router-dom';

const menuArray = [
  { title: 'Dashboard', to: '/dashboard' },
  { title: 'Add Transaction', to: '/' },
  { title: 'Manage Friends', to: '/manage-friend' },
  { title: 'Manage Categories', to: '/manage-category' },
  { title: 'Setup', to: '/setup' },
];

export const Menu = () => {
  const { setShowMenu } = useAppContent();
  return (
    <FullScreen>
      <Flex justifyContent={'end'}>
        <CloseButton fontSize={20} onClick={() => setShowMenu(false)} />
      </Flex>
      <Center marginTop={40}>
        <Flex
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          {menuArray.map((item, index) => {
            return (
              <Link
                key={index}
                to={item.to}
                style={{ cursor: 'pointer' }}
                onClick={(event) => setShowMenu(false)}
              >
                <Text fontSize={25} marginTop={5}>
                  {item.title}
                </Text>
              </Link>
            );
          })}
        </Flex>
      </Center>
    </FullScreen>
  );
};
