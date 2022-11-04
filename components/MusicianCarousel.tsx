import { Carousel } from '@mantine/carousel';
import MusicianCard from './MusicianCard';

const mockData = [
  {
    avatar:
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80',
    name: 'Jane Fingerlicker',
    instrument: 'Piano',
    genre: 'Tropical',
  },
  {
    avatar:
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80',
    name: 'Jane Fingerlicker',
    instrument: 'Piano',
    genre: 'Tropical',
  },
  {
    avatar:
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80',
    name: 'Jane Fingerlicker',
    instrument: 'Piano',
    genre: 'Tropical',
  },
  {
    avatar:
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80',
    name: 'Jane Fingerlicker',
    instrument: 'Piano',
    genre: 'Tropical',
  },
  {
    avatar:
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80',
    name: 'Jane Fingerlicker',
    instrument: 'Piano',
    genre: 'Tropical',
  },
  {
    avatar:
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80',
    name: 'Jane Fingerlicker',
    instrument: 'Piano',
    genre: 'Tropical',
  },
  {
    avatar:
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80',
    name: 'Jane Fingerlicker',
    instrument: 'Piano',
    genre: 'Tropical',
  },
  {
    avatar:
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80',
    name: 'Jane Fingerlicker',
    instrument: 'Piano',
    genre: 'Tropical',
  },
  {
    avatar:
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80',
    name: 'Jane Fingerlicker',
    instrument: 'Piano',
    genre: 'Tropical',
  },
];
interface MusicianCarouselProps {
  data: {
    imagesDone: {
      avatar: string;
    };
    name: string;
    email: string;
    mode: string;
    price: number;
  }[];
}

const MusicianCarousel = ({ data }: MusicianCarouselProps) => {
  const musicians = data.map((musician, i) => (
    <Carousel.Slide key={`${i}${musician.email}`}>
      <MusicianCard
        avatar={musician.imagesDone.avatar}
        name={musician.name}
        instrument={musician.mode}
        price={musician.price}
        email={musician.email}
      />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      withIndicators
      height={290}
      slideSize='33.333333%'
      slideGap='md'
      breakpoints={[
        { maxWidth: 'md', slideSize: '50%' },
        { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
      ]}
      loop
      align='start'
    >
      {musicians}
    </Carousel>
  );
};

export default MusicianCarousel;
