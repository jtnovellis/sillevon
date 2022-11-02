import { Button, Center, Text } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import axios from 'axios';
import { setImages } from '../slices/userSlice';

export default function StepperDone() {
  const {
    name,
    email,
    avatar,
    background,
    terms,
    mode,
    city,
    location,
    skills,
  } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleClick = async () => {
    const data = new FormData();
    data.append('email', email as string);
    data.append('avatar', avatar as string | Blob, avatar?.name);
    data.append('background', background as string | Blob, background?.name);
    try {
      const resFormData = await axios.post(
        `${process.env.NEXT_BACKEND_URI}/api/users/update/form-data`,
        data,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      const { email, imagesDone } = resFormData.data;
      dispatch(setImages({ email, imagesDone }));
      const res = await axios.put(
        `${process.env.NEXT_BACKEND_URI}/api/users/update`,
        {
          name,
          terms,
          mode,
          city,
          location,
          skills,
        }
      );
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <Center>
        <Text
          component='span'
          align='center'
          variant='gradient'
          gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
          size={60}
          weight={700}
          style={{ fontFamily: 'Greycliff CF, sans-serif' }}
        >
          Your done! Click next to continue
        </Text>
      </Center>
      <Center>
        <Button onClick={handleClick}>Next</Button>
      </Center>
    </div>
  );
}
