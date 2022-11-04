import styles from '../styles/Posts.module.scss';
import Image from 'next/image';
import { ActionIcon, Button, TextInput } from '@mantine/core';
import { IconHeart, IconMessageDots } from '@tabler/icons';
import { useState } from 'react';
import { openModal, closeAllModals } from '@mantine/modals';
import Comments from './Comments';

interface PostsProps {
  id?: number | string;
  urlImage: string;
  title: string;
  likes: number;
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
  urlImage,
  title,
  likes,
  comments,
}: PostsProps) {
  const [likeLoading, setLikeloading] = useState(false);

  const commentsAmount = comments.length || 0;

  const handleModalClick = () => {
    closeAllModals();
  };

  return (
    <div className={styles.posts}>
      <p>{title}</p>
      <div className={styles.postsImageContainer}>
        <Image
          src={urlImage}
          alt={title}
          width={700}
          height={500}
          className={styles.postsImage}
        />
      </div>
      <div className={styles.postsInfo}>
        <div className={styles.postsTriggers}>
          <ActionIcon radius='md' variant='transparent' loading={likeLoading}>
            <IconHeart size={28} />
          </ActionIcon>
          <ActionIcon
            radius='md'
            variant='transparent'
            onClick={() => {
              openModal({
                title: 'Comments',
                children: (
                  <>
                    <div className={styles.allComments}>
                      {comments.map((comment) => (
                        <Comments
                          key={comment.id}
                          postedAt={comment.postedAt}
                          body={comment.body}
                          author={comment.author}
                        />
                      ))}
                    </div>
                    <TextInput
                      label='Leave a comment'
                      placeholder='Your comment'
                      data-autofocus
                    />
                    <Button fullWidth onClick={handleModalClick} mt='md'>
                      Send
                    </Button>
                  </>
                ),
              });
            }}
          >
            <IconMessageDots size={28} />
          </ActionIcon>
        </div>
        <div className={styles.postsInfoTriggers}>
          <span>{likes} Likes</span>
          <span>{commentsAmount} Comments</span>
        </div>
      </div>
    </div>
  );
}
