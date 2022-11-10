import { Button, Card, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import styles from '../../styles/Success.module.scss';
import Layout from '../../components/Layout';

export default function Success() {
  const router = useRouter();
  console.log(router.query);
  return (
    <Layout>
      <div className={styles.success}>
        <Card shadow='sm' p='lg' radius='md' withBorder>
          <Text>The purchase has been successful</Text>
          <Button>Click to continue</Button>
        </Card>
      </div>
    </Layout>
  );
}
