import { useState } from 'react';
import { Stepper, Button, Group, Text, Center } from '@mantine/core';
import Layout from '../components/Layout';
import styles from '../styles/RegisterStepper.module.scss';
import UserMode from '../components/UserMode';
import Sliders from '../components/Sliders';
import { TuneUpProfilePhotos } from '../components/TuneUpProfilePhotos';

export default function RegisterStepper() {
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  return (
    <Layout title='Sillevon | Register'>
      <section className={styles.registerStepper}>
        <Stepper active={active} onStepClick={setActive} breakpoint='sm'>
          <Stepper.Step
            label='Mode'
            description='Select your mode'
            allowStepSelect={active > 0}
          >
            <div className={styles.contentStepper}>
              <Text
                component='span'
                align='center'
                variant='gradient'
                gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                size={60}
                weight={700}
                style={{ fontFamily: 'Greycliff CF, sans-serif' }}
              >
                Select your user mode
              </Text>
              <UserMode />
            </div>
          </Stepper.Step>
          <Stepper.Step
            label='Skills'
            description='Set your skills'
            allowStepSelect={active > 1}
          >
            <Sliders />
          </Stepper.Step>
          <Stepper.Step
            label='Tune up'
            description='Tune up your profile'
            allowStepSelect={active > 2}
          >
            <Center>
              <Text
                component='span'
                align='center'
                variant='gradient'
                gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                size={60}
                weight={700}
                style={{ fontFamily: 'Greycliff CF, sans-serif' }}
              >
                Select your photos and location
              </Text>
            </Center>
            <TuneUpProfilePhotos />
          </Stepper.Step>
          <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed>
        </Stepper>

        <Group position='center' mt='xl'>
          <Button variant='default' onClick={prevStep}>
            Back
          </Button>
          <Button onClick={nextStep}>Next step</Button>
        </Group>
      </section>
    </Layout>
  );
}
