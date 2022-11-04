import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import MusicianCarousel from '../../components/MusicianCarousel';
import styles from '../../styles/Artists.module.scss';
import { SearcherBar } from '../../components/SearcherBar';
import { ArtistsTable } from '../../components/ArtistsTable';

interface ArtistsProps {
  artistsList: {
    imagesDone: {
      avatar: string;
    };
    name: string;
    email: string;
    mode: string;
    price: number;
  }[];
  artistsRecomended: {
    imagesDone: {
      avatar: string;
    };
    name: string;
    email: string;
    mode: string;
    price: number;
  }[];
}

const Artists = ({ artistsList, artistsRecomended }: ArtistsProps) => {
  return (
    <Layout title='Sillevon | Artists'>
      <section className={styles.artistsContainer}>
        <div className={styles.headerArtists}>
          <h1>Search for your dream band/artists</h1>
          <div className={styles.searcherBar}>
            <SearcherBar />
          </div>
        </div>
        <div className={styles.carousel}>
          <div className={styles.carouselNav}>
            <p>Artists recomended</p>
          </div>
          <MusicianCarousel data={artistsRecomended} />
        </div>
        <div className={styles.bundleArtists}>
          <ArtistsTable data={artistsList} />
        </div>
      </section>
    </Layout>
  );
};

export default Artists;

export const getServerSideProps: GetServerSideProps = async () => {
  const resCarousel = await fetch(
    `${process.env.BACKEND_URI}/api/users/artist-recomended-data?limit=5&page=1`,
    {
      method: 'GET',
    }
  );
  const artistsRecomended = await resCarousel.json();
  const resList = await fetch(
    `${process.env.BACKEND_URI}/api/users/artist-initial-data?limit=10&page=1`,
    {
      method: 'GET',
    }
  );
  const artistsList = await resList.json();
  console.log(artistsList.data.docs);
  return {
    props: {
      artistsList: artistsList.data.docs,
      artistsRecomended: artistsRecomended.data.docs,
    },
  };
};
