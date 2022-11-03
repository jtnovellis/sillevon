import { Center, Slider, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../hooks/redux';
import styles from '../styles/Sliders.module.scss';
import { setSkills } from '../slices/userSlice';

export default function Sliders() {
  const [improvisation, setImprovisation] = useState(30);
  const [show, setShow] = useState(30);
  const [repertoire, setRepertoire] = useState(30);
  const [versatility, setVersatility] = useState(30);
  const [instrumentation, setInstrumentation] = useState(30);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      setSkills({
        skills: {
          improvisation,
          show,
          repertoire,
          versatility,
          instrumentation,
        },
      })
    );
  }, [improvisation, show, repertoire, versatility, instrumentation, dispatch]);

  return (
    <div className={styles.sliders}>
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
          Select your skills
        </Text>
      </Center>
      <div className={styles.eachOneSlider}>
        <p>Improvisation</p>
        <Slider
          value={improvisation}
          onChange={setImprovisation}
          labelTransition='skew-down'
          labelTransitionDuration={150}
          labelTransitionTimingFunction='ease'
          marks={[
            { value: 0, label: '0%' },
            { value: 50, label: '50%' },
            { value: 100, label: '100%' },
          ]}
        />
      </div>
      <div className={styles.eachOneSlider}>
        <p>Show</p>
        <Slider
          value={show}
          onChange={setShow}
          labelTransition='skew-down'
          labelTransitionDuration={150}
          labelTransitionTimingFunction='ease'
          marks={[
            { value: 0, label: '0%' },
            { value: 50, label: '50%' },
            { value: 100, label: '100%' },
          ]}
        />
      </div>
      <div className={styles.eachOneSlider}>
        <p>Repertorie</p>
        <Slider
          value={repertoire}
          onChange={setRepertoire}
          labelTransition='skew-down'
          labelTransitionDuration={150}
          labelTransitionTimingFunction='ease'
          marks={[
            { value: 0, label: '0%' },
            { value: 50, label: '50%' },
            { value: 100, label: '100%' },
          ]}
        />
      </div>
      <div className={styles.eachOneSlider}>
        <p>Versatility</p>
        <Slider
          value={versatility}
          onChange={setVersatility}
          labelTransition='skew-down'
          labelTransitionDuration={150}
          labelTransitionTimingFunction='ease'
          marks={[
            { value: 0, label: '0%' },
            { value: 50, label: '50%' },
            { value: 100, label: '100%' },
          ]}
        />
      </div>
      <div className={styles.eachOneSlider}>
        <p>Instrumentation</p>
        <Slider
          value={instrumentation}
          onChange={setInstrumentation}
          labelTransition='skew-down'
          labelTransitionDuration={150}
          labelTransitionTimingFunction='ease'
          marks={[
            { value: 0, label: '0%' },
            { value: 50, label: '50%' },
            { value: 100, label: '100%' },
          ]}
        />
      </div>
    </div>
  );
}
