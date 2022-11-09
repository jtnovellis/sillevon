import Layout from '../../../components/Layout';
import ClientLayout from '../../../components/ClientLayout';
import styles from '../../../styles/ContractsPage.module.scss';
import { Button, Divider, Text, Accordion } from '@mantine/core';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { ConnectionsProps } from './connections';

interface ContractsProps extends ConnectionsProps {}

export default function Contracts({ user }: ContractsProps) {
  const router = useRouter();

  const namesOfContracts = [];
  let prevName = 'name';
  if (user) {
    for (let i = 0; i < user.contracts.length; i++) {
      let nextName = user.contracts[i].contractName;
      if (nextName !== prevName) {
        namesOfContracts.push(nextName);
        prevName = nextName;
      }
    }
  }

  return (
    <Layout title={`Sillevon | Contracts`}>
      <ClientLayout>
        <div className={styles.contractsContainer}>
          <div className={styles.headerContainers}>
            <Text>Contracs:</Text>
            <Button onClick={() => router.push('/stepper-contract')}>
              New contract
            </Button>
          </div>
          <Divider mt={20} mb={20} />
          <div>
            <Accordion variant='contained' radius='md'>
              {namesOfContracts.length > 0 ? (
                namesOfContracts.map((item) => {
                  const currentContracts = user.contracts.filter(
                    (contract) => contract.contractName === item
                  );
                  const isInProccess = currentContracts.every(
                    (contract) => contract.isAccepted === true
                  );
                  const process = isInProccess ? 'ReadyToPay' : 'In process...';
                  const isPaid = currentContracts.every(
                    (contract) => contract.isPaid === true
                  );
                  return (
                    <Accordion.Item value={item} key={item}>
                      <Accordion.Control>
                        Name: {item} - Status: {isPaid ? 'Done' : process}
                      </Accordion.Control>
                      <Accordion.Panel>
                        <div className={styles.acordionContent}>
                          <div className={styles.artistList}>
                            <ul>
                              {currentContracts.map((contract) => {
                                return (
                                  <li key={contract._id}>
                                    {contract.artist.name} -{' '}
                                    {contract.artist.instrument}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                          <div className={styles.infoContainerAcor}>
                            <Text>
                              Total price: ${currentContracts[0].price}
                            </Text>
                            {!isPaid && process === 'ReadyToPay' ? (
                              <Button
                                onClick={() =>
                                  router.push({
                                    pathname: '/payment',
                                    query: { name: item },
                                  })
                                }
                              >
                                Go to pay
                              </Button>
                            ) : null}
                          </div>
                        </div>
                      </Accordion.Panel>
                    </Accordion.Item>
                  );
                })
              ) : (
                <Text>There are not contracts</Text>
              )}
            </Accordion>
          </div>
        </div>
      </ClientLayout>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies['sillusr'];
  let userData;
  try {
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
  } catch (e) {
    userData = { data: 'Token has expired' };
  }
  return {
    props: {
      user: userData.data,
    },
  };
};
