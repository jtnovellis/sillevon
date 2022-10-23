import { NextPage } from 'next';
import Layout from '../../components/Layout';
import { UserCard } from '../../components/UserCard';
import styles from '../../styles/UserIdArtists.module.scss';

const mockData = {
  image:
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
  avatar:
    'https://images.unsplash.com/photo-1623582854588-d60de57fa33f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
  name: 'Bill Headbanger',
  job: 'Fullstack engineer',
  stats: [
    {
      value: '34K',
      label: 'Followers',
    },
    {
      value: '187',
      label: 'Follows',
    },
    {
      value: '1.6K',
      label: 'Posts',
    },
  ],
};

const ArtistProfileClient: NextPage = () => {
  return (
    <Layout title='Sillevon | ArtistProfileClient'>
      <div className={styles.userArtistsContainer}>
        <div className={styles.userCard}>
          <UserCard
            image={mockData.image}
            avatar={mockData.avatar}
            name={mockData.name}
            job={mockData.job}
            stats={mockData.stats}
          />
        </div>
        <div className={styles.userCard}></div>
        <div></div>
      </div>
    </Layout>
  );
};

export default ArtistProfileClient;
