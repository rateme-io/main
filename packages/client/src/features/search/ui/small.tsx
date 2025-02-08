import { IconButton } from '@chakra-ui/react';
import { LuSearch } from 'react-icons/lu';

export const SmallSearch = () => {
  return (
    <IconButton variant={'ghost'} size={'sm'} color={'fg.muted'}>
      <LuSearch />
    </IconButton>
  );
};
