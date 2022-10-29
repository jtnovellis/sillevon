import { NextPage } from 'next';
import Layout from '../../components/Layout';
import MusicianCarousel from '../../components/MusicianCarousel';
import styles from '../../styles/Artists.module.scss';
import { musiciansOrBands } from '../../utils/musiciansMockData';
import { MusicianSmallCard } from '../../components/MusicianSmallCard';
import { SearcherBar } from '../../components/SearcherBar';

const Artists: NextPage = () => {
  const musicians = musiciansOrBands.map((musician, i) => (
    <MusicianSmallCard
      image={musician.avatar}
      name={musician.name}
      email={musician.email}
      key={`${musician.name}${i}`}
    />
  ));
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
          <MusicianCarousel />
        </div>
        <div className={styles.bundleArtists}>{musicians}</div>
      </section>
    </Layout>
  );
};

export default Artists;
