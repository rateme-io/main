import { Input } from '@chakra-ui/react/input';
import { reatomComponent } from '@reatom/npm-react';
import { LuSearch } from 'react-icons/lu';

import { InputGroup } from '@/shared/ui/input-group';

export const Search = reatomComponent(() => {
  return (
    <InputGroup flex="1" width={'md'} startElement={<LuSearch />}>
      <Input />
    </InputGroup>
  );
}, 'Search');
