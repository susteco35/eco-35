// Central data file for ECO 35 — SUST.
// Member and event data can later be connected from a Google Form / Google Sheet
// by replacing the arrays below with a fetch + mapping of the same shape.
//
// Google Sheets-ready JSON shape:
//   members:  [{ id, name, avatar, facebook }]
//   gallery:  [{ id, category, imageUrl, caption }]
//   events:   [{ id, name, category, date, cover, photos: [url,...] }]

export const MEMBERS: Member[] = [
  {
    id: 'm1',
    name: 'MIZANUR RAHMAN',
    photo: 'https://drive.google.com/file/d/1jo3ucp7ujuQyZpfBh10r4wGFz1nbf4dT/view?usp=drive_link',
    facebook: 'https://www.facebook.com/profile.php?id=100070251546730'
  },
  {
    id: 'm2',
    name: 'MASUMA AKTER LISA',
    photo: 'https://drive.google.com/file/d/1ZYwhSTSyoE9V_8pF8jsjTFG7rDcnI-v_/view?usp=forms_web',
    facebook: 'https://www.facebook.com/profile.php?id=100070251546730'
  },
  {
    id: 'm3',
    name: 'Hasanul Banna Sami',
    photo: 'https://drive.google.com/file/d/1TRLl3Q5mcM3WC-4AGj7266d2PDBv8iVu/view',
    facebook: 'www.facebook.com/hb.sami1411'
  },
  {
    id: 'm4',
    name: 'MD ROTON ISLAM',
    photo: 'https://drive.google.com/file/d/1vVsYkKWMyN_SmYNI-C1g61JoFlyRmwkc/view',
    facebook: 'https://www.facebook.com/muhammad.sayeed.islam.2025'
  },
  {
    id: 'm5',
    name: 'Md. Mostafijur Rahman',
    photo: 'https://drive.google.com/file/d/10zRPZwIBa7WZHAxbBQrNqUph7TvXf1r8/view',
    facebook: 'https://www.facebook.com/mostafiz.z.467797?mibextid=rS40aB7S9Ucbxw6v'
  },
];

export type EventCategory = 'Tour' | 'Sports' | 'Cultural Program' | 'Achievement' | 'Others';

export type BatchEvent = {
  id: string;
  name: string;
  category: EventCategory;
  date: string;
  cover: string;
  photos: string[];
};

export type GalleryPhoto = {
  id: string;
  src: string; // imageUrl
  category: EventCategory;
  caption: string;
  span?: boolean; // larger tile in masonry
};

export type JourneyPoint = {
  year: string;
  title: string;
  description: string;
};

export const EVENTS: BatchEvent[] = [
  {
    id: 'e1',
    name: 'Batch Tour',
    category: 'Tour',
    date: 'A journey beyond the classroom, together.',
    cover: 'https://images.pexels.com/photos/5622140/pexels-photo-5622140.jpeg?auto=compress&cs=tinysrgb&w=900',
    photos: [
      'https://images.pexels.com/photos/9455226/pexels-photo-9455226.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/13999669/pexels-photo-13999669.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/16004719/pexels-photo-16004719.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/5622140/pexels-photo-5622140.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/4641122/pexels-photo-4641122.jpeg?auto=compress&cs=tinysrgb&w=900',
    ],
  },
  {
    id: 'e2',
    name: 'Sports Day',
    category: 'Sports',
    date: 'Where our batch brought the spirit of the game.',
    cover: 'https://images.pexels.com/photos/13509805/pexels-photo-13509805.jpeg?auto=compress&cs=tinysrgb&w=900',
    photos: [
      'https://images.pexels.com/photos/36293965/pexels-photo-36293965.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/35903110/pexels-photo-35903110.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/37169804/pexels-photo-37169804.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/13509805/pexels-photo-13509805.jpeg?auto=compress&cs=tinysrgb&w=900',
    ],
  },
  {
    id: 'e3',
    name: 'Cultural Night',
    category: 'Cultural Program',
    date: 'Music, dance and the colours of our culture.',
    cover: 'https://images.pexels.com/photos/12327992/pexels-photo-12327992.jpeg?auto=compress&cs=tinysrgb&w=900',
    photos: [
      'https://images.pexels.com/photos/35244385/pexels-photo-35244385.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/11787164/pexels-photo-11787164.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/8566097/pexels-photo-8566097.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/11927030/pexels-photo-11927030.jpeg?auto=compress&cs=tinysrgb&w=900',
    ],
  },
  {
    id: 'e4',
    name: 'Achievement Night',
    category: 'Achievement',
    date: 'Celebrating the milestones our batch reached together.',
    cover: 'https://images.pexels.com/photos/10435675/pexels-photo-10435675.jpeg?auto=compress&cs=tinysrgb&w=900',
    photos: [
      'https://images.pexels.com/photos/29707905/pexels-photo-29707905.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/15093007/pexels-photo-15093007.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/10435675/pexels-photo-10435675.jpeg?auto=compress&cs=tinysrgb&w=900',
    ],
  },
  {
    id: 'e5',
    name: 'Batch Reunion',
    category: 'Others',
    date: 'Coming together once more, where the memories never fade.',
    cover: 'https://images.pexels.com/photos/5638817/pexels-photo-5638817.jpeg?auto=compress&cs=tinysrgb&w=900',
    photos: [
      'https://images.pexels.com/photos/5638820/pexels-photo-5638820.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/3937193/pexels-photo-3937193.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/8775169/pexels-photo-8775169.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/36799186/pexels-photo-36799186.jpeg?auto=compress&cs=tinysrgb&w=900',
    ],
  },
];

export const GALLERY: GalleryPhoto[] = [
  { id: 'g1', src: 'https://images.pexels.com/photos/5622140/pexels-photo-5622140.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Tour', caption: 'On the road together', span: true },
  { id: 'g2', src: 'https://images.pexels.com/photos/13509805/pexels-photo-13509805.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Sports', caption: 'Game day spirit' },
  { id: 'g3', src: 'https://images.pexels.com/photos/10435675/pexels-photo-10435675.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Achievement', caption: 'Trophies earned' },
  { id: 'g4', src: 'https://images.pexels.com/photos/9455226/pexels-photo-9455226.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Tour', caption: 'Campfire stories' },
  { id: 'g5', src: 'https://images.pexels.com/photos/36293965/pexels-photo-36293965.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Sports', caption: 'Cricket in the sun' },
  { id: 'g6', src: 'https://images.pexels.com/photos/15093007/pexels-photo-15093007.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Achievement', caption: 'Holding the diploma', span: true },
  { id: 'g7', src: 'https://images.pexels.com/photos/13999669/pexels-photo-13999669.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Tour', caption: 'Stream side rest' },
  { id: 'g8', src: 'https://images.pexels.com/photos/29707905/pexels-photo-29707905.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Achievement', caption: 'A row of trophies' },
  { id: 'g9', src: 'https://images.pexels.com/photos/35244385/pexels-photo-35244385.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Cultural Program', caption: 'Traditional dance' },
  { id: 'g10', src: 'https://images.pexels.com/photos/35903110/pexels-photo-35903110.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Sports', caption: 'A clean strike' },
  { id: 'g11', src: 'https://images.pexels.com/photos/11787164/pexels-photo-11787164.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Cultural Program', caption: 'On the stage' },
  { id: 'g12', src: 'https://images.pexels.com/photos/16004719/pexels-photo-16004719.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Tour', caption: 'Evening by the fire' },
  { id: 'g13', src: 'https://images.pexels.com/photos/8566097/pexels-photo-8566097.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Cultural Program', caption: 'Kathakali performance' },
  { id: 'g14', src: 'https://images.pexels.com/photos/5638817/pexels-photo-5638817.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Others', caption: 'Evening together' },
  { id: 'g15', src: 'https://images.pexels.com/photos/37169804/pexels-photo-37169804.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Sports', caption: 'Bat in hand' },
  { id: 'g16', src: 'https://images.pexels.com/photos/3937193/pexels-photo-3937193.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Others', caption: 'A warm dinner' },
];

export const JOURNEY: JourneyPoint[] = [
  { year: '2025', title: 'Our Beginning', description: 'The first time we gathered as a batch — new faces, new hopes, and the start of a shared journey.' },
  { year: '2026', title: 'Growing Together', description: 'Late-night study sessions, first friendships, and the quiet confidence of finding our place.' },
  { year: '2027', title: 'Creating Memories', description: 'Tours, cultural nights and endless conversations that turned classmates into family.' },
  { year: '2028', title: 'Looking Ahead', description: 'A chapter still being written — one we will carry with us long after we leave these halls.' },
];

export const STATS = [
  { label: 'Batch Members', value: 120, suffix: '+' },
  { label: 'Events', value: 15, suffix: '+' },
  { label: 'Memories', value: 500, suffix: '+' },
  { label: 'Family', value: 1, suffix: '' },
];
