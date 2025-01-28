import { IconButton } from '@chakra-ui/react';
import { LuSearch } from 'react-icons/lu';

export const SmallSearch = () => {
  return (
    <IconButton variant={'outline'} size={'sm'} color={'gray.500'}>
      <LuSearch />
    </IconButton>
  );
};
