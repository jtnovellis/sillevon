import { Avatar } from '@mantine/core';
import styles from '../styles/Comments.module.scss';

interface CommentsProps {
  image: string;
  comment: string;
  user: string;
}

export default function Comments({ image, comment, user }: CommentsProps) {
  return (
    <div className={styles.comments}>
      <div className={styles.usersComment}>
        <Avatar src={image} radius='xl' />
        <p>{user}</p>
      </div>
      <p>{comment}</p>
    </div>
  );
}
