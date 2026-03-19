export const PLANETS = {
  Earth: {
    name: 'Earth',
    gravity: 9.8,
    color: '#3b82f6',
    description: ['Only known planet with life',
      'Covered with water (about 70%)',
      'Has air (oxygen) that we breathe',
      'Animals, plants, and humans all live here'
    ],

    radius: 0.66,
    textureMap: '/59-earth/textures/earth albedo.jpg',
    bumpMap: '/59-earth/textures/earth bump.jpg'
  },
  Moon: {
    name: 'Moon',
    gravity: 1.6,
    color: '#9ca3af',
    description: [
      'The Moon is not a planet, it’s Earth’s satellite',
      'It has craters (big holes)',
      ' You can jump 6x higher here!',
      'The Moon helps control ocean tides'
    ],
    radius: 0.27,
    textureMap: '/Moon/Moon.jpg',
    bumpMap: '/Moon/Moon_displacement.jpg'
  },
  Mars: {
    name: 'Mars',
    gravity: 3.7,
    color: '#ef4444',
    description: ['The Red Planet.',
      ' Its gravity is about 38% of Earth\'s.',
      'Mars is smaller than Earth',
      'Days on Mars are almost like Earth'
    ],
    radius: 0.53,
    textureMap: '/98-mars-photorealistic-2k/Textures/Diffuse_2K.png',
    bumpMap: '/98-mars-photorealistic-2k/Textures/Bump_2K.png'
  }
};
