import { Text, Avatar, Group, TextInput, Button } from '@mantine/core';
import styles from '../styles/Comments.module.scss';
import { useCommentsStyles } from './ui/useCommentsStyles';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { IconCheck, IconBug } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';

interface CommentsProps {
  closeAllModals: (payload_0?: undefined) => void;
  postId: string;
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
}

export default function Comments({
  comments,
  postId,
  closeAllModals,
}: CommentsProps) {
  const { classes } = useCommentsStyles();
  const [commentBody, setCommentBody] = useState('');

  const handleModalClick = async () => {
    const token = Cookies.get('sillusr');
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/comments/new/${postId}`,
        {
          body: commentBody,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      window.location.assign('/profile/artists');
      closeAllModals();
      showNotification({
        id: 'load-data-user',
        color: 'teal',
        title: 'Comment was created successfully',
        message:
          'Notification will close in 4 seconds, you can close this notification now',
        icon: <IconCheck size={16} />,
        autoClose: 4000,
      });
    } catch (e) {
      showNotification({
        id: 'load-data-user',
        color: 'red',
        title: 'User could not been created',
        message:
          'Notification will close in 4 seconds, you can close this notification now',
        icon: <IconBug size={16} />,
        autoClose: 4000,
      });
    }
  };

  function handleChange(e: any) {
    setCommentBody(e.target.value);
  }
  return (
    <>
      {comments.reverse().map((comment) => (
        <>
          <Group key={comment._id}>
            <Avatar
              src={comment.author.imagesDone.avatar}
              alt={comment.author.name}
              radius='xl'
            />
            <div>
              <Text size='sm'>{comment.author.name}</Text>
              <Text size='xs' color='dimmed'>
                {new Date(comment.createdAt).getDate()} time ago
              </Text>
            </div>
          </Group>
          <Text className={classes.body} size='sm'>
            {comment.body}
          </Text>
        </>
      ))}

      <TextInput
        value={commentBody}
        onChange={handleChange}
        label='Leave a comment'
        placeholder='Your comment'
      />
      <Button fullWidth onClick={handleModalClick} mt='md'>
        Send
      </Button>
    </>
  );
}
