import { Trans } from '@lingui/react/macro';
import { ReactNode } from 'react';
import { BsFillMenuButtonWideFill } from 'react-icons/bs';
import { FaTools } from 'react-icons/fa';
import { FaClock, FaImages, FaLayerGroup, FaLink } from 'react-icons/fa6';
import { IoIosTimer } from 'react-icons/io';
import { LuExternalLink, LuTextCursorInput } from 'react-icons/lu';
import { MdDateRange, MdLink } from 'react-icons/md';
import { TiSortNumerically } from 'react-icons/ti';

import { CollectionTypes } from '@/widgets/collection-builder/model';

export const fieldsInfo: FieldsInfo = {
  group: {
    type: 'group',
    title: <Trans>Field Group</Trans>,
    description: <Trans>A collection of related fields</Trans>,
    icon: <FaLayerGroup />,
    group: 'utility',
  },
  text: {
    type: 'text',
    title: <Trans>Text Input</Trans>,
    description: <Trans>Input for plain text</Trans>,
    icon: <LuTextCursorInput />,
    group: 'base',
  },
  numeric: {
    type: 'numeric',
    title: <Trans>Number Input</Trans>,
    description: <Trans>Input for numeric values</Trans>,
    icon: <TiSortNumerically />,
    group: 'base',
  },
  select: {
    type: 'select',
    title: <Trans>Dropdown Select</Trans>,
    description: <Trans>Select from predefined options</Trans>,
    icon: <BsFillMenuButtonWideFill />,
    group: 'base',
  },
  link: {
    type: 'link',
    title: <Trans>URL Input</Trans>,
    description: <Trans>Input for external links</Trans>,
    icon: <LuExternalLink />,
    group: 'link',
  },
  internalLink: {
    type: 'internalLink',
    title: <Trans>Internal Link</Trans>,
    description: <Trans>Link to another collection item</Trans>,
    icon: <MdLink />,
    group: 'link',
  },
  images: {
    type: 'images',
    title: <Trans>Image Upload</Trans>,
    description: <Trans>Upload and manage images</Trans>,
    icon: <FaImages />,
    group: 'image',
  },
  date: {
    type: 'date',
    title: <Trans>Date Picker</Trans>,
    description: <Trans>Select a date</Trans>,
    icon: <MdDateRange />,
    group: 'time',
  },
  duration: {
    type: 'duration',
    title: <Trans>Duration Input</Trans>,
    description: <Trans>Input for time duration</Trans>,
    icon: <IoIosTimer />,
    group: 'time',
  },
};

export const isCollectionType = (type: unknown): type is CollectionTypes =>
  Object.keys(fieldsInfo).includes(`${type}`);

export const groups = {
  utility: {
    title: <Trans>Utility Fields</Trans>,
    icon: <FaTools />,
  },
  base: {
    title: <Trans>Basic Fields</Trans>,
    icon: <LuTextCursorInput />,
  },
  image: {
    title: <Trans>Image Fields</Trans>,
    icon: <FaImages />,
  },
  time: {
    title: <Trans>Time Fields</Trans>,
    icon: <FaClock />,
  },
  link: {
    title: <Trans>Link Fields</Trans>,
    icon: <FaLink />,
  },
} as const;

export type GroupTypes = keyof typeof groups;

export type GroupInfo = {
  [Key in GroupTypes]: (typeof groups)[Key] & { id: Key };
}[GroupTypes];

type FieldsInfo = {
  [Type in CollectionTypes]: {
    type: Type;
    icon: ReactNode;
    title: ReactNode;
    description: ReactNode;
    group: GroupTypes;
  };
};

export type FieldInfo = FieldsInfo[keyof FieldsInfo] & {
  type: CollectionTypes;
};

export type GroupedFields = {
  group: GroupInfo;
  fields: FieldInfo[];
};

const createGroups = (infos: FieldsInfo): GroupedFields[] => {
  const groupsMap = new Map<GroupTypes, FieldInfo[]>();

  for (const info of Object.values(infos)) {
    const group = groupsMap.get(info.group) || [];

    group.push(info);

    groupsMap.set(info.group, group);
  }

  return Array.from(groupsMap).map(([group, fields]) => ({
    group: {
      ...groups[group],
      id: group,
    },
    fields,
  }));
};

export const groupedFields = createGroups(fieldsInfo);
