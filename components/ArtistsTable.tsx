import {
  Avatar,
  Table,
  Group,
  Text,
  ActionIcon,
  Menu,
  ScrollArea,
} from '@mantine/core';
import { IconMessages, IconNote, IconDots } from '@tabler/icons';
import { useRouter } from 'next/router';

interface UsersStackProps {
  data: {
    imagesDone: {
      avatar: string;
    };
    name: string;
    email: string;
    mode: string;
    price: number;
  }[];
}

export function ArtistsTable({ data }: UsersStackProps) {
  const router = useRouter();
  const rows = data.map((user) => (
    <tr key={user.email}>
      <td>
        <Group spacing='sm'>
          <Avatar size={40} src={user.imagesDone.avatar} radius={40} />
          <div>
            <Text size='sm' weight={500}>
              {user.name}
            </Text>
            <Text color='dimmed' size='xs'>
              {user.mode}
            </Text>
          </div>
        </Group>
      </td>
      <td>
        <Text size='sm'>{user.email}</Text>
        <Text size='xs' color='dimmed'>
          Email
        </Text>
      </td>
      <td>
        <Text size='sm'>${user.price} / hr</Text>
        <Text size='xs' color='dimmed'>
          Price
        </Text>
      </td>
      <td>
        <Group spacing={0} position='right'>
          <Menu transition='pop' withArrow position='bottom-end'>
            <Menu.Target>
              <ActionIcon>
                <IconDots size={16} stroke={1.5} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                icon={<IconMessages size={16} stroke={1.5} />}
                onClick={() => router.push(`/artists/${user.email}`)}
              >
                Go to profile
              </Menu.Item>
              <Menu.Item icon={<IconNote size={16} stroke={1.5} />}>
                Contract
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing='md'>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
