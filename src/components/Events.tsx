import { useState } from 'react';
import { Images, X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { EVENTS, type BatchEvent } from '@/data';

export const EVENTS: BatchEvent[] = [
  {
    id: 'e1',
    name: 'Batch Memories',
    category: 'Tour',
    date: 'Memories we created together.',
    cover: `${import.meta.env.BASE_URL}IMG-20250905-WA0195.jpg`,
    photos: [
      `${import.meta.env.BASE_URL}IMG-20250905-WA0195.jpg`,
      `${import.meta.env.BASE_URL}IMG-20250906-WA0368.jpg`,
      `${import.meta.env.BASE_URL}IMG-20260707-WA0034.jpg`,
    ],
  },
  {
    id: 'e2',
    name: 'Our Journey',
    category: 'Tour',
    date: 'Exploring, laughing and making memories together.',
    cover: `${import.meta.env.BASE_URL}IMG-20250906-WA0368.jpg`,
    photos: [
      `${import.meta.env.BASE_URL}IMG-20250906-WA0368.jpg`,
      `${import.meta.env.BASE_URL}IMG-20250905-WA0195.jpg`,
      `${import.meta.env.BASE_URL}IMG-20260707-WA0034.jpg`,
    ],
  },
  {
    id: 'e3',
    name: 'ECO 35 Together',
    category: 'Others',
    date: 'One batch, countless memories.',
    cover: `${import.meta.env.BASE_URL}IMG-20260707-WA0034.jpg`,
    photos: [
      `${import.meta.env.BASE_URL}IMG-20260707-WA0034.jpg`,
      `${import.meta.env.BASE_URL}IMG-20250905-WA0195.jpg`,
      `${import.meta.env.BASE_URL}IMG-20250906-WA0368.jpg`,
    ],
  },
];