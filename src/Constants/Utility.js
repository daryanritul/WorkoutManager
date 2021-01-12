import {ToastAndroid} from 'react-native';

export const toastMessage = (message) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};

export const imageArray = [
  require('../Assets/Images/Image1.jpg'),
  require('../Assets/Images/Image2.jpg'),
  require('../Assets/Images/Image3.jpg'),
  require('../Assets/Images/Image4.jpg'),
  require('../Assets/Images/Image5.jpg'),
  require('../Assets/Images/Image6.jpg'),
  require('../Assets/Images/Image7.jpg'),
  require('../Assets/Images/Image8.jpg'),
  require('../Assets/Images/Image9.jpg'),
  require('../Assets/Images/Image10.jpg'),
  require('../Assets/Images/Image11.jpg'),
  require('../Assets/Images/Image12.jpg'),
  require('../Assets/Images/Image13.jpg'),
  require('../Assets/Images/Image14.jpg'),
  require('../Assets/Images/Image15.jpg'),
];

export const textSize = {
  btn: 14,
  tiny: 9,
  label: 12,
};
