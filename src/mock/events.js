import { getRandomArrayElements, getRandomNumber, getRandomNumbers } from '../utils.js';
import { Event, Offer, PhotoNumber, Description } from './const.js';

const currentOffers = Event.TYPES.map(
  (type) => {
    const { TITLES: titles } = Offer;
    const randomOfferTitles = getRandomArrayElements(titles, getRandomNumber(0, titles.length - 1));

    const offers = (randomOfferTitles)
      ? randomOfferTitles.map((title) => {
        const index = titles.indexOf(title);
        const name = `offer-${index}`;
        const id = `${name}-1`;//!! в разметке есть и id и for "event-offer-meal-1" и name="event-offer-meal"
        const price = Offer.PRICES[index];

        return { id, name, title, price };
      }) : null;

    return { type, offers };
  });

console.log(currentOffers);

const createEvent = (id, type, price) => {
  const randomOfferNumbers = getRandomNumbers(0, (Offer.TITLES.length - 1) / 2);
  const offers = (randomOfferNumbers)
    ? randomOfferNumbers.map(
      (offerNumber) => ({
        id: `offer-${offerNumber}-1`, //!! в разметке есть и id и for "event-offer-meal-1" и name="event-offer-meal"
        name: `offer-${offerNumber}`,
        title: Offer.TITLES[offerNumber],
        price: Offer.PRICES[offerNumber]
      }))
    : null;

  const description = getRandomArrayElements(Description.DESCRIPTIONS, Description.MAX_COUNT).join(' ');
  const randomNumbers = getRandomNumbers(PhotoNumber.MIN, PhotoNumber.MAX);
  const photos = (randomNumbers) ?
    randomNumbers.map((number) => ({
      url: `img/photos/${number}.jpg`,
      title: `title - ${number}`
    })) :
    null;

  return {
    id,
    type,
    offers,
    destination: {
      photos,
      description
    },
    price//!! временно
  };
};

const getEvents = () => Array.from({ length: Event.COUNT }, (_, index) => createEvent(index + 1, 'type', (index + 1) * 1000));

export { getEvents };

/*
import { getRandomNumber, createIdGenerator, getRandomArrayElement, getRandomArrayElements } from './util/util.js';

const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const COMMENT_NAMES = [
  'Артём',
  'Андрей',
  'Мария',
  'Олег',
  'Виктор',
  'Борис',
  'Олеся',
  'Виктория',
  'Алексей',
  'Евгений',
];

const generatePostId = createIdGenerator(PostParam.ID_START, PostParam.ID_END);

const generatePostUrlPhotosNumber = createIdGenerator(PostParam.URL_PHOTOS_MIN_NUMBER, PostParam.URL_PHOTOS_MAX_NUMBER);

const generateCommentId = createIdGenerator(1, PostParam.COUNT * CommentsParam.MAX_COUNT);

const generatePostComments = () => {
  const commentsCount = getRandomNumber(0, CommentsParam.MAX_COUNT);

  const generateComment = () => (
    {
      id: generateCommentId(),
      avatar: `img/avatar-${getRandomNumber(CommentsParam.AVATAR_MIN_NUMBER, CommentsParam.AVATAR_MAX_NUMBER)}.svg`,
      message: getRandomArrayElements(COMMENT_MESSAGES, CommentsParam.MESSAGE_MAX_COUNT).join(' '),
      name: getRandomArrayElement(COMMENT_NAMES),
    });

  return Array.from({ length: commentsCount }, generateComment);
};

const createPost = () => (
  {
    id: generatePostId(),
    url: `photos/${generatePostUrlPhotosNumber()}.jpg`,
    description: getRandomArrayElement(POST_DESCRIPTIONS),
    likes: getRandomNumber(PostParam.LIKES_MIN, PostParam.LIKES_MAX),
    comments: generatePostComments(),
  });

const generatePosts = () => Array.from({ length: PostParam.COUNT }, createPost);

*/
