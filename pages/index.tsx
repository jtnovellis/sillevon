import type { NextPage } from 'next';
import Hero from '../components/Hero';
import HomeContent from '../components/HomeContent';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
  return (
    <Layout title='Sillevon | Home'>
      <Hero />
      <div className={styles.homePage_content}>
        <HomeContent />
      </div>
    </Layout>
  );
};

export default Home;
