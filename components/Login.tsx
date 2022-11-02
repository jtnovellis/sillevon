import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from '@mantine/core';
import {
  IconBrandGoogle,
  IconBrandTwitter,
  IconCheck,
  IconBug,
} from '@tabler/icons';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useAppDispatch } from '../hooks/redux';
import { addUserData } from '../slices/userSlice';
import cookie from 'js-cookie';

interface LoginProps {
  closeAllModals: (payload_0?: undefined) => void;
}

interface UserValues {
  email: string;
  name: string;
  password: string;
  terms: boolean;
}

const Login = ({ closeAllModals }: LoginProps) => {
  const dispatch = useAppDispatch();
  const [type, toggle] = useToggle(['login', 'register']);
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: false,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) =>
        val.length <= 6
          ? 'Password should include at least 6 characters'
          : null,
    },
  });

  const handleSubmit = async (values: UserValues) => {
    if (type === 'register') {
      try {
        const res = await axios.post(
          `${process.env.NEXT_BACKEND_URI}/auth/local/signup`,
          values
        );
        dispatch(
          addUserData({ name: res.data.data.name, email: res.data.data.email })
        );
        cookie.set('sillusr', res.data.data.token, { expires: 1 });
        showNotification({
          id: 'load-data-user',
          color: 'teal',
          title: 'User was registered successfully',
          message:
            'Notification will close in 4 seconds, you can close this notification now',
          icon: <IconCheck size={16} />,
          autoClose: 4000,
        });
        router.push('/registerStepper');
      } catch (e) {
        showNotification({
          id: 'load-data-user',
          color: 'red',
          title: 'User could not been registered',
          message:
            'Notification will close in 4 seconds, you can close this notification now',
          icon: <IconBug size={16} />,
          autoClose: 4000,
        });
      }
    } else {
      try {
        const res = await axios.post(
          `${process.env.NEXT_BACKEND_URI}/auth/local/signin`,
          values
        );
        showNotification({
          id: 'load-data-user',
          color: 'teal',
          title: 'Login successfully',
          message:
            'Notification will close in 4 seconds, you can close this notification now',
          icon: <IconCheck size={16} />,
          autoClose: 4000,
        });
        router.push('/');
      } catch (e) {
        showNotification({
          id: 'load-data-user',
          color: 'red',
          title: 'Login fail',
          message:
            'Notification will close in 4 seconds, you can close this notification now',
          icon: <IconBug size={16} />,
          autoClose: 4000,
        });
      }
    }
  };

  return (
    <Paper radius='md' p='xl' withBorder>
      <Text size='lg' weight={500}>
        Welcome to Sillevon, {type} with
      </Text>

      <Group grow mb='md' mt='md'>
        <Button>
          <IconBrandGoogle size={30} />
          <span>Goolge</span>
        </Button>
        <Button>
          <IconBrandTwitter size={30} />
          <span>Twitter</span>
        </Button>
      </Group>

      <Divider label='Or continue with email' labelPosition='center' my='lg' />

      <form
        onSubmit={form.onSubmit((values) => {
          closeAllModals();
          handleSubmit(values);
        })}
      >
        <Stack>
          {type === 'register' && (
            <TextInput
              label='Name'
              placeholder='Your name'
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue('name', event.currentTarget.value)
              }
            />
          )}

          <TextInput
            required
            label='Email'
            placeholder='Your email address'
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue('email', event.currentTarget.value)
            }
            error={form.errors.email && 'Invalid email'}
          />

          <PasswordInput
            required
            label='Password'
            placeholder='Your password'
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue('password', event.currentTarget.value)
            }
            error={
              form.errors.password &&
              'Password should include at least 6 characters'
            }
          />

          {type === 'register' && (
            <Checkbox
              required
              label='I accept terms and conditions'
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue('terms', event.currentTarget.checked)
              }
            />
          )}
        </Stack>

        <Group position='apart' mt='xl'>
          <Anchor
            component='button'
            type='button'
            color='dimmed'
            onClick={() => toggle()}
            size='xs'
          >
            {type === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>
          <Button type='submit'>{upperFirst(type)}</Button>
        </Group>
      </form>
    </Paper>
  );
};

export default Login;
