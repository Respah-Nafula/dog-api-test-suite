import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Rate, Trend } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('error_rate');
const breedsDuration = new Trend('breeds_duration');
const imagesDuration = new Trend('images_duration');
const favouritesDuration = new Trend('favourites_duration');

// Test configuration
export const options = {
  stages: [
    { duration: '30s', target: 10  }, // ramp up to 10 users
    { duration: '1m',  target: 20  }, // ramp up to 20 users
    { duration: '1m',  target: 20  }, // hold at 20 users
    { duration: '30s', target: 0   }, // ramp down
  ],
  thresholds: {
    http_req_duration:    ['p(95)<3000'], // 95% under 3 seconds
    http_req_failed:      ['rate<0.05'], // error rate under 5%
    error_rate:           ['rate<0.05'],
    breeds_duration:      ['p(95)<3000'],
    images_duration:      ['p(95)<3000'],
    favourites_duration:  ['p(95)<3000'],
  },
};

const BASE_URL = 'https://api.thedogapi.com/v1';
const API_KEY = __ENV.DOG_API_KEY;

const params = {
  headers: {
    'x-api-key': API_KEY,
    'Content-Type': 'application/json',
  },
};

export default function () {

  // Group 1 — Breeds endpoints
  group('Breeds', function () {
    const breedsRes = http.get(`${BASE_URL}/breeds?limit=10`, params);
    breedsDuration.add(breedsRes.timings.duration);

    check(breedsRes, {
      'breeds status is 200':        (r) => r.status === 200,
      'breeds returns array':        (r) => JSON.parse(r.body).length > 0,
      'breeds response under 3s':    (r) => r.timings.duration < 3000,
    });

    errorRate.add(breedsRes.status !== 200);
    sleep(1);

    // Search breed
    const searchRes = http.get(
      `${BASE_URL}/breeds/search?q=labrador`, params
    );

    check(searchRes, {
      'search status is 200':     (r) => r.status === 200,
      'search returns results':   (r) => JSON.parse(r.body).length > 0,
    });

    errorRate.add(searchRes.status !== 200);
    sleep(1);
  });

  // Group 2 — Images endpoints
  group('Images', function () {
    const imagesRes = http.get(
      `${BASE_URL}/images/search?limit=5`, params
    );
    imagesDuration.add(imagesRes.timings.duration);

    check(imagesRes, {
      'images status is 200':      (r) => r.status === 200,
      'images returns array':      (r) => JSON.parse(r.body).length > 0,
      'images response under 3s':  (r) => r.timings.duration < 3000,
    });

    errorRate.add(imagesRes.status !== 200);
    sleep(1);

    // Get image by breed
    const breedImagesRes = http.get(
      `${BASE_URL}/images/search?breed_ids=1&limit=3`, params
    );

    check(breedImagesRes, {
      'breed images status is 200': (r) => r.status === 200,
    });

    errorRate.add(breedImagesRes.status !== 200);
    sleep(1);
  });

  // Group 3 — Favourites endpoint
  group('Favourites', function () {
    const favouritesRes = http.get(
      `${BASE_URL}/favourites`, params
    );
    favouritesDuration.add(favouritesRes.timings.duration);

    check(favouritesRes, {
      'favourites status is 200':     (r) => r.status === 200,
      'favourites returns array':     (r) => Array.isArray(JSON.parse(r.body)),
      'favourites response under 3s': (r) => r.timings.duration < 3000,
    });

    errorRate.add(favouritesRes.status !== 200);
    sleep(1);
  });
}