import { Trans } from '@lingui/react/macro';
import { BsFillMenuButtonWideFill } from 'react-icons/bs';
import { FaTools } from 'react-icons/fa';
import { FaClock, FaImages, FaLayerGroup, FaLink } from 'react-icons/fa6';
import { IoIosTimer } from 'react-icons/io';
import { LuExternalLink, LuTextCursorInput } from 'react-icons/lu';
import { MdDateRange, MdLink } from 'react-icons/md';
import { TiSortNumerically } from 'react-icons/ti';

export const fieldsInfo = {
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
