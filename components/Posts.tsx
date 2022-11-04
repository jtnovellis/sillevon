import styles from '../styles/Posts.module.scss';
import Image from 'next/image';
import { ActionIcon } from '@mantine/core';
import { IconHeart, IconMessageDots } from '@tabler/icons';
import { useState } from 'react';
import { openModal, closeAllModals } from '@mantine/modals';
import Comments from './Comments';
import axios from 'axios';
import Cookies from 'js-cookie';
import { IconCheck, IconBug } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';

interface PostsProps {
  id?: number | string;
  urlImage: string;
  title: string;
  postId: string;
  likesAmount: number;
  comments: {
    id: number;
    postedAt: string;
    body: string;
    author: {
      name: string;
      image: string;
    };
  }[];
}

export default function Posts({
  postId,
  urlImage,
  title,
  likesAmount,
  comments,
}: PostsProps) {
  const [likeLoading, setLikeloading] = useState(false);

  const commentsAmount = comments.length || 0;

  async function handleClick() {
    const token = Cookies.get('sillusr');
    setLikeloading(true);
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/posts/update/${postId}`,
        {
          likes: likesAmount + 1,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showNotification({
        id: 'load-data-user',
        color: 'teal',
        title: 'Like was created successfully',
        message:
          'Notification will close in 4 seconds, you can close this notification now',
        icon: <IconCheck size={16} />,
        autoClose: 4000,
      });
      window.location.assign('/profile/artists');
    } catch {
      showNotification({
        id: 'load-data-user',
        color: 'red',
        title: 'Like could not been created',
        message:
          'Notification will close in 4 seconds, you can close this notification now',
        icon: <IconBug size={16} />,
        autoClose: 4000,
      });
    } finally {
      setLikeloading(false);
    }
  }

  return (
    <div className={styles.posts}>
      <div className={styles.postsImageContainer}>
        <Image
          src={urlImage}
          alt={title}
          width={700}
          height={500}
          className={styles.postsImage}
        />
      </div>
      <p className={styles.postFooter}>{title}</p>
      <div className={styles.postsInfo}>
        <div className={styles.postsTriggers}>
          <ActionIcon
            radius='md'
            variant='transparent'
            loading={likeLoading}
            onClick={handleClick}
          >
            <IconHeart size={28} />
          </ActionIcon>
          <ActionIcon
            radius='md'
            variant='transparent'
            onClick={() => {
              openModal({
                title: 'Comments',
                children: (
                  <div className={styles.allComments}>
                    <Comments
                      comments={comments}
                      postId={postId}
                      closeAllModals={closeAllModals}
                    />
                  </div>
                ),
              });
            }}
          >
            <IconMessageDots size={28} />
          </ActionIcon>
        </div>
        <div className={styles.postsInfoTriggers}>
          <span>{likesAmount} Likes</span>
          <span>{commentsAmount} Comments</span>
        </div>
      </div>
    </div>
  );
}
