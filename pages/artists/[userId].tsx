import { NextPage } from 'next';
import Layout from '../../components/Layout';
import { UserCard } from '../../components/UserCard';
import UserStats from '../../components/UserStats';
import styles from '../../styles/UserIdArtists.module.scss';
import Posts from '../../components/Posts';
import { posts } from '../../utils/mockPosts';
import Map from '../../components/Map';

const ArtistProfileClient: NextPage = () => {
  const mockData = {
    image:
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    avatar:
      'https://images.unsplash.com/photo-1623582854588-d60de57fa33f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
    name: 'Bill Headbanger',
    job: 'Trumpetist',
    stats: [
      {
        value: 34,
        label: 'Contracts',
      },
      {
        value: 187,
        label: 'Connections',
      },
      {
        value: posts.length,
        label: 'Posts',
      },
    ],
  };

  const data = {
    labels: [
      'Improvisation',
      'Versatility',
      'Repertoire',
      'Instrumentation',

      'Show',
    ],
    datasets: [
      {
        label: 'Skills',
        data: [62, 96, 34, 58, 38],
        fill: true,
        backgroundColor: 'rgba(59, 130, 245, 0.2)',
        borderColor: 'rgb(59, 130, 245)',
        pointBackgroundColor: 'rgb(59, 130, 245)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(59, 130, 245)',
      },
    ],
  };
  return (
    <Layout title='Sillevon | ArtistProfileClient'>
      <div className={styles.userArtistsContainer}>
        <div className={styles.userCardInfo}>
          <div className={styles.cardInfo}>
            <UserCard
              image={mockData.image}
              avatar={mockData.avatar}
              name={mockData.name}
              job={mockData.job}
              stats={mockData.stats}
            />
          </div>
        </div>
        <div className={styles.allPosts}>
          {posts.map((post) => (
            <Posts
              key={post.id}
              urlImage={post.urlImage}
              title={post.title}
              likes={post.likes}
              comments={post.comments}
            />
          ))}
        </div>
        <div>
          <div className={styles.userStats}>
            <UserStats data={data} />
            <Map
              zoom={11}
              center={{ lat: 10.96104, lng: -74.800957 }}
              className={styles.userMap}
              position={{ lat: 10.96104, lng: -74.800957 }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ArtistProfileClient;
