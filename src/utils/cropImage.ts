// utils/cropImage.ts

import { createCanvas, Image } from 'canvas';

const getCroppedImg = async (imageSrc: string, pixelCrop: any) => {
  const image = new Image();
  image.src = imageSrc;

  const canvas = createCanvas(pixelCrop.width, pixelCrop.height);
  const ctx = canvas.getContext('2d');

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return canvas.toDataURL('image/jpeg');
};

export default getCroppedImg;
