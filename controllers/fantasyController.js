// Mock fantasy profiles (no database needed)
const mockProfiles = [
  {
    id: '1',
    name: 'Aria',
    age: 26,
    gender: 'woman',
    bio: 'Creative soul who loves poetry, stargazing, and deep late-night talks.',
    bodyType: 'athletic',
    photos: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5cd?w=200'
    ],
    isActive: true,
    location: { lat: 40.750042, lng: -73.994454 },
    city: 'New York',
    distance_km: 0.5
  },
  {
    id: '2',
    name: 'Luna',
    age: 28,
    gender: 'woman',
    bio: 'Adventurous spirit seeking meaningful connection.',
    bodyType: 'curvy',
    photos: [
      'https://images.unsplash.com/photo-1529626455594-4ff0f8a29d8a?w=200',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200'
    ],
    isActive: true,
    location: { lat: 34.052235, lng: -118.243683 },
    city: 'Los Angeles',
    distance_km: 1.2
  }
];

exports.getFantasyProfiles = (req, res) => {
  // Simulate distance filtering (for demo)
  const { distanceKm } = req.query;
  let filtered = mockProfiles;
  if (distanceKm && parseFloat(distanceKm) < 1) {
    filtered = mockProfiles.filter(p => p.distance_km <= parseFloat(distanceKm));
  }
  res.json(filtered);
};