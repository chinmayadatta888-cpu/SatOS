/** Photo order and short titles for the supplied original images. */
export type PhotoEntry = {
  id: string
  src: string
  title: string
}

export const photoEntries: PhotoEntry[] = [
  { id: 'car-sat', src: '/assets/photos/car_sat.png', title: 'Lavender Portrait' },
  { id: 'deep-sat', src: '/assets/photos/deep_sat.png', title: 'Golden Gathering' },
  { id: 'idk-sat-1', src: '/assets/photos/idk_sat_1.png', title: 'White Flowers' },
  { id: 'idk-sat-2', src: '/assets/photos/idk_sat_2.png', title: 'Blue Checks' },
  { id: 'jat-sat-1', src: '/assets/photos/jat_sat_1.png', title: 'Garden Greens' },
  { id: 'jat-sat-2', src: '/assets/photos/jat_sat_2.png', title: 'Bratt Cafe' },
  { id: 'junny-pixell', src: '/assets/photos/junny_pixell.png', title: 'Junny in Bloom' },
  { id: 'pixel-satt-1', src: '/assets/photos/pixel_satt_1.png', title: 'Blue Flower' },
]
