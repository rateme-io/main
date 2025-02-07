import {
  FileUploadHiddenInput,
  FileUploadRoot,
  FileUploadRootProps,
  Flex,
  FlexProps,
  Image,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { FunctionComponent, ReactNode, useMemo } from 'react';

import { FileUploadDropzone } from '@/shared/ui/file-upload.tsx';

type ImageLoaderProps = {
  label: ReactNode;
  borderRadius?: FlexProps['borderRadius'];
  containerProps?: FlexProps;
  files: File[];
  onChangeFiles: (file: File[]) => void;
  accept?: FileUploadRootProps['accept'];
  maxFileSize?: number;
  maxFiles?: number;
};

export const ImageLoader: FunctionComponent<ImageLoaderProps> = ({
  label,
  containerProps,
  borderRadius,
  onChangeFiles,
  files,
  accept,
  maxFileSize,
  maxFiles,
}) => {
  const fileUrl = useMemo(() => {
    if (files.length > 0) {
      return URL.createObjectURL(files[0]);
    }
  }, [files]);

  return (
    <FileUploadRoot
      accept={accept}
      maxFileSize={maxFileSize}
      maxFiles={maxFiles}
      capture={'environment'}
      onFileChange={({ acceptedFiles }) => {
        onChangeFiles(acceptedFiles);
      }}
    >
      <StyledContainer
        {...containerProps}
        borderRadius={borderRadius}
        position={'relative'}
      >
        <FileUploadHiddenInput />
        <FileUploadDropzone
          label={label}
          cursor={'pointer'}
          width={'100%'}
          height={'100%'}
          minHeight={'auto'}
          color={'fg.muted'}
          borderRadius={borderRadius}
        />
        <Flex
          pointerEvents={'none'}
          width={'100%'}
          height={'100%'}
          position={'absolute'}
          top={0}
          left={0}
          padding={1}
          borderRadius={borderRadius}
        >
          {fileUrl && (
            <Image
              src={fileUrl}
              width={'100%'}
              height={'100%'}
              fit={'cover'}
              borderRadius={borderRadius ?? 'l1'}
            />
          )}
        </Flex>
      </StyledContainer>
    </FileUploadRoot>
  );
};

const StyledContainer = styled(Flex)``;
