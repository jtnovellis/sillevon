import { Text, Avatar, Group } from '@mantine/core';
import styles from '../styles/Comments.module.scss';
import { useCommentsStyles } from './ui/useCommentsStyles';

interface CommentsProps {
  postedAt: string;
  body: string;
  author: {
    name: string;
    image: string;
  };
}

export default function Comments({ postedAt, body, author }: CommentsProps) {
  const { classes } = useCommentsStyles();
  return (
    <div>
      <Group>
        <Avatar src={author.image} alt={author.name} radius='xl' />
        <div>
          <Text size='sm'>{author.name}</Text>
          <Text size='xs' color='dimmed'>
            {postedAt}
          </Text>
        </div>
      </Group>
      <Text className={classes.body} size='sm'>
        {body}
      </Text>
    </div>
  );
}
