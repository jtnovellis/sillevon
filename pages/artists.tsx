import { NextPage } from 'next';
import Layout from '../components/Layout';
import MusicianCarousel from '../components/MusicianCarousel';
import { Button } from '@mantine/core';
import styles from '../styles/Artists.module.scss';
import { IconChevronRight } from '@tabler/icons';

const Artists: NextPage = () => {
  return (
    <Layout title='Sillevon | Artists'>
      <section className={styles.artistsContainer}>
        <div className={styles.carousel}>
          <div className={styles.carouselNav}>
            <p>Popular music</p>
            <Button variant='subtle'>
              <span>See all</span>
              <IconChevronRight />
            </Button>
          </div>
          <MusicianCarousel />
        </div>
        <div className={styles.carousel}>
          <div className={styles.carouselNav}>
            <p>Tropical music</p>
            <Button variant='subtle'>
              <span>See all</span>
              <IconChevronRight />
            </Button>
          </div>
          <MusicianCarousel />
        </div>
      </section>
    </Layout>
  );
};

export default Artists;
