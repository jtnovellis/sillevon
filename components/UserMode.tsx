import { SegmentedControl, Box, Center } from '@mantine/core';
import { IconEar, IconMusic } from '@tabler/icons';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../hooks/redux';
import { setUserMode } from '../slices/userSlice';

export default function UserMode() {
  const [mode, setMode] = useState('custumer');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setUserMode({ mode }));
  }, [mode, dispatch]);

  return (
    <SegmentedControl
      value={mode}
      onChange={setMode}
      fullWidth
      size='xl'
      radius='xl'
      transitionDuration={500}
      transitionTimingFunction='linear'
      color='blue'
      data={[
        {
          label: (
            <Center>
              <IconEar size={16} />
              <Box ml={10}>Custumer</Box>
            </Center>
          ),
          value: 'custumer',
        },
        {
          label: (
            <Center>
              <IconMusic size={16} />
              <Box ml={10}>Artist/Band</Box>
            </Center>
          ),
          value: 'artist/band',
        },
      ]}
    />
  );
}
