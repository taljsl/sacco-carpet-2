// src/data/installation_data.ts - Fixed version
export type pictureData = {
  id: number
  homeImg: string
  images: Array<{ src: string; picid: string }>
  title: string
  category: 'residential' | 'hospitality'
}

export const pictures: Array<pictureData> = [
  {
    id: 1,
    homeImg: '/images/individualpages/Num1Home.jpg',
    images: [
      { src: '/images/individualpages/Num1Sub1.jpg', picid: 'ID: 76620' },
    ],
    title: 'BREAKERS PALM BEACH',
    category: 'hospitality',
  },
  {
    id: 2,
    homeImg: '/images/individualpages/Num2Home.jpg',
    images: [
      { src: '/images/individualpages/Num2Sub1.jpg', picid: 'ID: 92337' },
    ],
    title: 'EDITIONS WEST HOLLYWOOD',
    category: 'hospitality',
  },
  {
    id: 3,
    homeImg: '/images/individualpages/Num3Home.jpg',
    images: [
      { src: '/images/individualpages/Num3Sub1.jpg', picid: 'ID: 92343' },
    ],
    title: 'EDITIONS WEST HOLYWOOD',
    category: 'hospitality',
  },
  {
    id: 4,
    homeImg: '/images/individualpages/Num4Home.jpg',
    images: [
      { src: '/images/individualpages/Num4Sub1.jpg', picid: 'ID: 24601' },
      { src: '/images/individualpages/Num4Sub2.jpg', picid: 'ID: 30249' },
    ],
    title: 'FOUR SEASONS SAN FRANCISCO',
    category: 'hospitality',
  },
  {
    id: 5,
    homeImg: '/images/individualpages/Num5Home.jpg',
    images: [
      { src: '/images/individualpages/Num5Sub1.jpg', picid: 'ID: 96137' },
    ],
    title: 'KABUKI HOTEL',
    category: 'hospitality',
  },
  {
    id: 6,
    homeImg: '/images/individualpages/Num6Home.jpg',
    images: [
      { src: '/images/individualpages/Num6Sub1.jpg', picid: 'ID: 106832' },
    ],
    title: 'GRAND HYATT NASHVILLE',
    category: 'hospitality',
  },
  {
    id: 7,
    homeImg: '/images/individualpages/Num7Home.jpg',
    images: [
      { src: '/images/individualpages/Num7Sub1.jpg', picid: 'ID: 104477' },
    ],
    title: 'ONE HOTEL TORONTO',
    category: 'hospitality',
  },
  {
    id: 8,
    homeImg: '/images/individualpages/Num8Home.jpg',
    images: [
      { src: '/images/individualpages/Num8Sub1.jpg', picid: 'ID: 88669' },
    ],
    title: 'BREAKERS PALM BEACH',
    category: 'hospitality',
  },
  {
    id: 9,
    homeImg: '/images/individualpages/Num9Home.jpg',
    images: [
      { src: '/images/individualpages/Num9Sub1.jpg', picid: 'ID: 108272' },
      { src: '/images/individualpages/Num9Sub2.jpg', picid: 'ID: 108267' },
      { src: '/images/individualpages/Num9Sub3.jpg', picid: 'ID: 108268' },
      { src: '/images/individualpages/Num9Sub4.jpg', picid: 'ID: 108269' },
      { src: '/images/individualpages/Num9Sub5.jpg', picid: 'ID: 108270' },
    ],
    title: 'ENLIGHTENED TIGER COLLECTION',
    category: 'residential',
  },
  {
    id: 10,
    homeImg: '/images/individualpages/Num10Home.jpg',
    images: [
      { src: '/images/individualpages/Num10Sub1.jpg', picid: 'ID: 107719' },
      { src: '/images/individualpages/Num10Sub2.jpg', picid: 'ID: 95047' },
      { src: '/images/individualpages/Num10Sub3.jpg', picid: 'ID: 22603' },
    ],
    title: 'FOX NAHEM DESIGN',
    category: 'residential',
  },
  {
    id: 11,
    homeImg: '/images/individualpages/Num11Home.jpg',
    images: [
      { src: '/images/individualpages/Num11Sub1.jpg', picid: 'ID: 89722' },
    ],
    title: 'PARIS FORINO YELLOWWOOD',
    category: 'residential',
  },
  {
    id: 12,
    homeImg: '/images/individualpages/Num12Home.jpg',
    images: [
      { src: '/images/individualpages/Num12Sub1.jpg', picid: 'ID: 108602' },
    ],
    title: 'LANIA LANE MASTER',
    category: 'residential',
  },
  {
    id: 13,
    homeImg: '/images/individualpages/Num13Home.jpg',
    images: [
      { src: '/images/individualpages/Num13Sub1.jpg', picid: 'ID: 21705' },
    ],
    title: 'LANIA LANE LIVING',
    category: 'residential',
  },
  {
    id: 14,
    homeImg: '/images/individualpages/Num14Home.jpg',
    images: [
      { src: '/images/individualpages/Num14Sub1.jpg', picid: 'ID: 196939' },
    ],
    title: 'GREIG ENTRY RUG LIVING ROOM RUG',
    category: 'residential',
  },
]

export type ImageItem = {
  src: string
  id: string
}