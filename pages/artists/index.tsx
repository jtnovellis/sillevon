import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import MusicianCarousel from '../../components/MusicianCarousel';
import styles from '../../styles/Artists.module.scss';
import { SearcherBar } from '../../components/SearcherBar';
import { ArtistsTable } from '../../components/ArtistsTable';
import { useLayoutEffect, useState } from 'react';
import axios from 'axios';
import { IconBug, IconDisc, IconEar, IconTag } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';
import { ActionIcon, Tooltip } from '@mantine/core';
import { openModal, closeAllModals } from '@mantine/modals';
import ModalFilterGenre from '../../components/ModalFilterGenre';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setSliceCity } from '../../slices/searchSlice';
import { ModalFilterPrice } from '../../components/ModalFilterPrice';
import ModalFilterInstrument from '../../components/ModalFilterInstrument';

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
  const [iconLoading, setIconLoading] = useState<boolean>(false);
  const [artistListFiltered, setArtistListFiltered] = useState(artistsList);
  const [artistsRecomendedFiltered, setArtistsRecomendedFiltered] =
    useState(artistsRecomended);
  const [city, setCity] = useState<string>('');
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.search);

  useLayoutEffect(() => {
    dispatch(setSliceCity({ city }));
  }, [city, dispatch]);

  async function filteredArtist() {
    try {
      setIconLoading(true);
      const resRecomended = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/users/filtered-artists?limit=5&page=1&city=${city}&genre=${search.genre}&price=${search.instrument}&instrument=${search.instrument}`
      );
      if (resRecomended.data.data.docs.length > 0) {
        setArtistsRecomendedFiltered(resRecomended.data.data.docs);
      } else {
        throw new Error('There are not artist in this location');
      }
      const resList = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/users/filtered-artists?limit=10&page=1&city=${city}&genre=${search.genre}&price=${search.instrument}&instrument=${search.instrument}`
      );
      if (resList.data.data.docs.length > 0) {
        setArtistListFiltered(resList.data.data.docs);
      } else {
        throw new Error('There are not artist in this location');
      }
    } catch (e) {
      showNotification({
        id: 'load-data-user',
        color: 'red',
        title: 'There are not artist in this location',
        message:
          'Notification will close in 4 seconds, you can close this notification now',
        icon: <IconBug size={16} />,
        autoClose: 4000,
      });
    } finally {
      setIconLoading(false);
    }
  }
  return (
    <Layout title='Sillevon | Artists'>
      <section className={styles.artistsContainer}>
        <div className={styles.headerArtists}>
          <h1>Search for your dream band/artists</h1>
          <div className={styles.searcherBar}>
            <SearcherBar
              city={city}
              setCity={setCity}
              iconLoading={iconLoading}
              filteredArtist={filteredArtist}
            />
          </div>
          <div className={styles.filterSection}>
            <Tooltip label='Genre'>
              <ActionIcon
                variant='outline'
                onClick={() => {
                  openModal({
                    title: 'Fiter by genre',
                    children: (
                      <ModalFilterGenre
                        setArtistsRecomendedFiltered={
                          setArtistsRecomendedFiltered
                        }
                        setArtistListFiltered={setArtistListFiltered}
                        closeAllModals={closeAllModals}
                      />
                    ),
                  });
                }}
              >
                <IconEar />
              </ActionIcon>
            </Tooltip>
            <Tooltip label='Instrument'>
              <ActionIcon
                variant='outline'
                onClick={() => {
                  openModal({
                    title: 'Filter by instrument',
                    children: (
                      <ModalFilterInstrument
                        setArtistsRecomendedFiltered={
                          setArtistsRecomendedFiltered
                        }
                        setArtistListFiltered={setArtistListFiltered}
                        closeAllModals={closeAllModals}
                      />
                    ),
                  });
                }}
              >
                <IconDisc />
              </ActionIcon>
            </Tooltip>
            <Tooltip label='Price'>
              <ActionIcon
                variant='outline'
                onClick={() => {
                  openModal({
                    title: 'Filter by range of price',
                    children: (
                      <ModalFilterPrice
                        setArtistsRecomendedFiltered={
                          setArtistsRecomendedFiltered
                        }
                        setArtistListFiltered={setArtistListFiltered}
                        closeAllModals={closeAllModals}
                      />
                    ),
                  });
                }}
              >
                <IconTag />
              </ActionIcon>
            </Tooltip>
          </div>
        </div>
        <div className={styles.carousel}>
          <div className={styles.carouselNav}>
            <p>Artists recomended</p>
          </div>
          <MusicianCarousel data={artistsRecomendedFiltered} />
        </div>
        <div className={styles.bundleArtists}>
          <ArtistsTable data={artistListFiltered} />
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
  return {
    props: {
      artistsList: artistsList.data.docs,
      artistsRecomended: artistsRecomended.data.docs,
    },
  };
};
