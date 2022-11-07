import Layout from '../../../components/Layout';
import { GetServerSideProps } from 'next';
import React from 'react';
import styles from '../../../styles/Client.module.scss';
import ClientLayout from '../../../components/ClientLayout';
import Posts from '../../../components/Posts';

interface ClientProfileProps {
  user: any;
  posts: any;
}

export default function Client({ user, posts }: ClientProfileProps) {
  const posters = posts.docs.map((post: any) => {
    return (
      <Posts
        user={post.user}
        key={post._id}
        postId={post._id}
        urlImage={post.urlImage}
        title={post.title}
        likesAmount={post.likes}
        comments={post.comments}
      />
    );
  });
  return (
    <Layout title={`Sillevon | ${user.name}`}>
      <ClientLayout>
        <div className={styles.clientProfile}>{posters}</div>
      </ClientLayout>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies['sillusr'];
  let userData;
  let posts;
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
    const res = await fetch(
      `${process.env.HEROKU_BACKEND_URI}/api/posts/all?limit=12&page=1`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      }
    );
    posts = await res.json();
  } catch (e) {
    console.log(e);
  }

  return {
    props: { user: userData.data, posts: posts.data },
  };
};
