import { IconButton } from '@chakra-ui/react';
import { LuSearch } from 'react-icons/lu';

export const SmallSearch = () => {
  return (
    <IconButton variant={'ghost'} borderRadius={'full'}>
      <LuSearch />
    </IconButton>
  );
};
