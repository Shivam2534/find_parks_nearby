import type { Park } from "../types";

export const SAMPLE_PARKS: Park[] = [
  {
    id: "1",
    name: "Deen Dayal Park",
    description:
      "A serene local park with plenty of greenery and benches for relaxation.",
    location: { lat: 29.86471, lng: 77.88871 },
    openingHours: "5:00 AM – 9:00 PM",
    amenities: ["Benches", "Walking Trail", "Trees"],
    entryFee: "Free",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqPpmeoMHp4Uoa6cGviEY1q1_1EXYcozRJ6w&s",
    rating: 4.1,
    reviewsCount: 52,
  },
  {
    id: "2",
    name: "IIT Park",
    description:
      "Located within IIT Roorkee, this park offers a calm environment ideal for students and visitors.",
    location: { lat: 29.863640512095124, lng: 77.88689916871078 },
    openingHours: "6:00 AM – 8:00 PM",
    amenities: ["Jogging Path", "Shaded Areas", "Lawns"],
    entryFee: "Free",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbAn2WqGLKny8kITfv6CjfZtP2qum2b_6lmfUg-nS6-FyAAqqGaoFU2b5T2N03UbWLa9o&usqp=CAU",
    rating: 4.5,
    reviewsCount: 134,
  },
  {
    id: "3",
    name: "BEG&C AEROPLANE PARK",
    description:
      "Known for its iconic aircraft model, a great place for kids and families.",
    location: { lat: 29.857942430931477, lng: 77.89583659681745 },
    openingHours: "5:30 AM – 7:30 PM",
    amenities: ["Kids Play Area", "Model Aircraft", "Fountains"],
    entryFee: "₹10",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe1cMPx5Y7r24ngchWk-egKnZzpiJWxgHIRWaDA7REPLQ_z37Ok0lt-fzFptFrHP1xu8A&usqp=CAU",
    rating: 4.6,
    reviewsCount: 89,
  },
  {
    id: "4",
    name: "Army Cantt Area Park",
    description:
      "Well-maintained by Army personnel, peaceful with tight security.",
    location: { lat: 29.86104210873787, lng: 77.88732171039248 },
    openingHours: "6:00 AM – 6:00 PM",
    amenities: ["Peaceful Trails", "Lush Greens", "Secure"],
    entryFee: "Restricted (Army access)",
    imageUrl:
      "https://img.freepik.com/premium-photo/green-green-forest-park_1417-5050.jpg",
    rating: 4.2,
    reviewsCount: 41,
  },
  {
    id: "5",
    name: "Army Cantt Area Park Extension",
    description: "Extension of the main Army Park, ideal for morning walks.",
    location: { lat: 29.860859777414166, lng: 77.88768963758368 },
    openingHours: "6:00 AM – 6:00 PM",
    amenities: ["Track", "Benches", "Shaded Trees"],
    entryFee: "Restricted (Army access)",
    imageUrl:
      "https://img.freepik.com/premium-photo/spring-green-park-city-park-with-pathway-fresh-lawn-trees-morning-beauty-nature_501761-272.jpg",
    rating: 4.0,
    reviewsCount: 28,
  },
  {
    id: "6",
    name: "Main Building Lawns",
    description:
      "Historical and scenic spot within IIT campus, great for photos and peace.",
    location: { lat: 29.866739794735153, lng: 77.89609940195402 },
    openingHours: "8:00 AM – 7:00 PM",
    amenities: ["Garden", "Historic Architecture", "Photography Spot"],
    entryFee: "Free",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE9et8tpOQiqQPG7kUBrMGpnEKOIPdSRQeognLEeSY4kgj2K29S3pBkbB5JK6p_h_1o40&usqp=CAU",
    rating: 4.8,
    reviewsCount: 178,
  },
  {
    id: "7",
    name: "Chandrapuri Park",
    description: "A vibrant neighborhood park with open space for sports.",
    location: { lat: 29.868973198881825, lng: 77.88185536355176 },
    openingHours: "5:00 AM – 9:00 PM",
    amenities: ["Sports Area", "Kids Zone", "Benches"],
    entryFee: "Free",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7-U1uzMOZh9fnBnJXYT0kXMMaX6pxZUjszw5I690W8W1jjhi92EidcKQJ3KuDMdhtgFU&usqp=CAU",
    rating: 3.9,
    reviewsCount: 67,
  },
  {
    id: "8",
    name: "Solani Park",
    description:
      "Beautiful riverside park great for family picnics and evening walks.",
    location: { lat: 29.881142093979705, lng: 77.8949956203804 },
    openingHours: "6:00 AM – 8:00 PM",
    amenities: [
      "Walking Trails",
      "Children Playground",
      "Benches",
      "Green Lawns",
    ],
    entryFee: "Free",
    imageUrl:
      "https://img.freepik.com/premium-photo/landscape-green-trees-grass-summer-park-forest_224539-846.jpg",
    rating: 4.3,
    reviewsCount: 126,
  },
  {
    id: "9",
    name: "Keshav Park",
    description: "Small neighborhood park with lots of greenery and birds.",
    location: { lat: 29.875764263498414, lng: 77.87454938075504 },
    openingHours: "6:00 AM – 7:30 PM",
    amenities: ["Bird Watching", "Benches", "Yoga Spot"],
    entryFee: "Free",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnvxHLksnhQnaoxtRe0l0_VEfzHQxcndGzXA&s",
    rating: 4.0,
    reviewsCount: 38,
  },
  {
    id: "10",
    name: "Crystal World",
    description: "Large amusement and water park, fun for the whole family.",
    location: { lat: 29.9013181215354, lng: 77.98650528793725 },
    openingHours: "10:00 AM – 7:00 PM",
    amenities: ["Water Slides", "Rides", "Food Court"],
    entryFee: "₹600",
    imageUrl:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/fe/8a/ce/thanneerchal-park.jpg?w=1200&h=-1&s=1",
    rating: 4.1,
    reviewsCount: 211,
  },
];
