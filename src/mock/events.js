import { getRandomNumbers } from '../utils.js';

const EVENT_COUNT = 4;
const PhotoId = { MIN: 1, MAX: 5 };

const createEvent = (id, type, price) => {
  const randomNumbers = getRandomNumbers(PhotoId.MIN, PhotoId.MAX);
  const photos = (randomNumbers) ?
    randomNumbers.map((number) => ({
      url: `img/photos/${number}.jpg`,
      title: `title - ${number}`
    })) :
    null;

  return {
    id,
    type,
    photos,
    price//!! временно
  };
};

const getEvents = () => Array.from({ length: EVENT_COUNT }, (_, index) => createEvent(index + 1, 'type', (index + 1) * 1000));

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
