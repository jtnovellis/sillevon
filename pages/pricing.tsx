import { NextPage } from 'next';
import Layout from '../components/Layout';
import styles from '../styles/Pricing.module.scss';

const Pricing: NextPage = () => {
  return (
    <Layout title='Sillevon | Pricing'>
      <div className={styles.pricing}>
        <h1>Pricing page in development</h1>
        <h2>Coming soon...</h2>
      </div>
    </Layout>
  );
};

export default Pricing;
