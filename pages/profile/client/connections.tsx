import Layout from '../../../components/Layout';
import ClientLayout from '../../../components/ClientLayout';
import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  ScrollArea,
  useMantineTheme,
} from '@mantine/core';
import { IconCheck, IconTrash } from '@tabler/icons';
import { GetServerSideProps } from 'next';
import { updateConnections } from '../../../lib/connections';
import Cookies from 'js-cookie';
import { useState } from 'react';

interface ConnectionsProps {
  user: {
    imagesDone: {
      avatar: string;
      background: string;
    };
    location: {
      lat: number;
      lng: number;
    };
    skills: {
      improvisation: number;
      show: number;
      repertoire: number;
      versatility: number;
      instrumentation: number;
    };
    name: string;
    email: string;
    terms: boolean;
    mode: string;
    favoriteGenres: [];
    posts: {
      likes: number;
      _id: string;
      title: string;
      urlImage: string;
      comments: {
        body: string;
        _id: string;
        author: {
          imagesDone: {
            avatar: string;
          };
          name: string;
        };
        post: object;
        createdAt: string;
        updatedAt: string;
      }[];
    }[];
    city: string;
    price: number;
    genre: string;
    instrument: string;
    connections: any[];
    contracts: [];
  };
}

const jobColors: Record<string, string> = {
  active: 'blue',
  pending: 'pink',
};

export default function Connections({ user }: ConnectionsProps) {
  const theme = useMantineTheme();
  const [connections, setConnections] = useState(user.connections);

  async function handleCheckClick(id: string) {
    const token = Cookies.get('sillusr');
    const connection = await updateConnections(true, id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const newConnections = connections.filter((item) => item._id !== id);
    newConnections.unshift(connection);
    setConnections(newConnections);
  }

  const rows = connections.map((item) => (
    <tr key={item._id}>
      <td>
        <Group spacing='sm'>
          <Avatar size={30} src={item.userB.imagesDone.avatar} radius={30} />
          <Text size='sm' weight={500}>
            {item.userB.name}
          </Text>
        </Group>
      </td>

      <td>
        <Badge
          color={jobColors[item.done ? 'active' : 'pending']}
          variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}
        >
          {item.done ? 'Active' : 'Pending'}
        </Badge>
      </td>
      <td>
        <Anchor<'a'>
          size='sm'
          href='#'
          onClick={(event) => event.preventDefault()}
        >
          {item.userB.genre}
        </Anchor>
      </td>
      <td>
        <Text size='sm' color='dimmed'>
          {item.userB.price} /hr
        </Text>
      </td>
      <td>
        <Group spacing={0} position='right'>
          <ActionIcon onClick={() => handleCheckClick(item._id)}>
            <IconCheck size={16} stroke={1.5} />
          </ActionIcon>
          <ActionIcon color='red'>
            <IconTrash size={16} stroke={1.5} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));
  return (
    <Layout title={`Sillevon | Connections`}>
      <ClientLayout>
        <div>
          <Text>Connections</Text>
          <div>
            <ScrollArea>
              <Table sx={{ minWidth: 800 }} verticalSpacing='sm'>
                <thead>
                  <tr>
                    <th>Artist/Band</th>
                    <th>Instrument</th>
                    <th>Genre</th>
                    <th>Price</th>
                    <th />
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </Table>
            </ScrollArea>
          </div>
        </div>
      </ClientLayout>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies['sillusr'];
  let userData;
  try {
    if (token) {
      const res = await fetch(
        `${process.env.HEROKU_BACKEND_URI}/api/users/datauser`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: 'no-store',
        }
      );
      userData = await res.json();
    } else {
      userData = { data: 'Token has expired' };
    }
  } catch (e) {
    console.log(e);
  }
  return {
    props: { user: userData.data },
  };
};