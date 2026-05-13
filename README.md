\# 🐕 Dog API — Complete Test Suite



A professional end-to-end API testing portfolio project built around 

\[The Dog API](https://thedogapi.com). This project demonstrates a 

complete API testing workflow covering manual testing, test automation, 

CI/CD integration, performance testing, and mock server implementation.



\---



\## 📋 Project Overview



| Item | Detail |

|---|---|

| \*\*API tested\*\* | The Dog API (https://api.thedogapi.com/v1) |

| \*\*Tester\*\* | Respah Nafula |

| \*\*Tools used\*\* | Postman, Newman, k6, GitHub Actions |

| \*\*Total requests\*\* | 12 |

| \*\*Total assertions\*\* | 40+ |

| \*\*Test types\*\* | Functional, Performance, Contract, Security |



\---



\## 🛠️ Tools \& Technologies



\- \*\*Postman\*\* — API request building and manual testing

\- \*\*Newman\*\* — Command line collection runner

\- \*\*k6\*\* — Performance and load testing

\- \*\*GitHub Actions\*\* — CI/CD pipeline automation

\- \*\*Postman Mock Server\*\* — Error scenario simulation



\---



\## 📁 Project Structure



dog-api-test-suite/

├── .github/

│   └── workflows/

│       └── api-tests.yml        # GitHub Actions pipeline

├── postman/

│   ├── Dog API Test Suite.postman\_collection.json

│   └── Dog API Dev.postman\_environment.json

├── performance/

│   ├── load-test.js             # k6 load test script

│   └── findings-report.md       # Performance findings

├── mock/

│   └── Dog API Mock Server.postman\_collection.json

└── README.md



\---



\## 🧪 Test Coverage



\### Functional Tests (Postman)



| # | Request | Method | Status |

|---|---|---|---|

| 1 | Get All Breeds | GET | ✅ |

| 2 | Get Breed by ID | GET | ✅ |

| 3 | Search Breed by Name | GET | ✅ |

| 4 | Get All Images | GET | ✅ |

| 5 | Get Image by ID | GET | ✅ |

| 6 | Get Random Dog Image | GET | ✅ |

| 7 | Get Images by Breed | GET | ✅ |

| 8 | Add a Favourite | POST | ✅ |

| 9 | Get All Favourites | GET | ✅ |

| 10 | Delete a Favourite | DELETE | ✅ |

| 11 | Get Breeds Paginated | GET | ✅ |

| 12 | No Auth Security Test | GET | ✅ |



\### What was tested on each request

\- ✅ Correct status codes

\- ✅ Response schema validation

\- ✅ Data type assertions

\- ✅ Response time thresholds

\- ✅ Authentication and security

\- ✅ Request chaining (Add → Get → Delete)



\---



\## 🔄 CI/CD Pipeline



Every push to the `main` branch automatically:



1\. Spins up a fresh Ubuntu environment

2\. Installs Node.js and Newman

3\. Runs the full 12-request test suite

4\. Generates an HTML test report

5\. Uploads the report as a downloadable artifact



[![Dog API Tests](https://github.com/Respah-Nafula/dog-api-test-suite/actions/workflows/api-tests.yml/badge.svg)](https://github.com/Respah-Nafula/dog-api-test-suite/actions/workflows/api-tests.yml)


\---



\## ⚡ Performance Test Results



Load test conducted using k6 with 20 concurrent virtual users 

over 3 minutes.



| Metric | Result | Threshold | Status |

|---|---|---|---|

| p(95) response time | 595.94ms | < 3000ms | ✅ PASS |

| Error rate | 0.00% | < 5% | ✅ PASS |

| Total requests | 1755 | — | — |

| Throughput | 9.6 req/sec | — | — |

| Total checks | 4212/4212 | 100% | ✅ PASS |



\### Endpoint breakdown



| Endpoint | Avg | p(95) | Max |

|---|---|---|---|

| Breeds | 512ms | 646ms | 1247ms |

| Images | 471ms | 581ms | 889ms |

| Favourites | 453ms | 551ms | 733ms |



\---



\## 🎭 Mock Server



A Postman mock server was built to simulate error scenarios 

that are difficult to trigger on the real API:



| Scenario | Status Code | Purpose |

|---|---|---|

| Breed not found | 404 | Test missing resource handling |

| Invalid API key | 401 | Test authentication failure |

| Rate limit exceeded | 429 | Test rate limiting behaviour |

| Server error | 500 | Test server failure handling |



\---



\## 🔍 Key Findings



\### Finding 1 — API performs well under load ✅

All endpoints maintained response times well below the 3000ms 

threshold at 20 concurrent users with zero errors.



\### Finding 2 — Breeds endpoint inconsistency ⚠️

The `/breeds/{id}` endpoint returns `id` as a string type 

instead of a number — inconsistent with standard API design 

where IDs are typically integers.



\### Finding 3 — Rate limiting on free tier ⚠️

The API enforces rate limits on the free tier. Testing with 

high concurrency triggers rate limiting which should be 

considered when scaling to production.



\### Finding 4 — Favourites require unique image IDs ⚠️

The favourites endpoint returns a `DUPLICATE\_FAVOURITE` error 

when attempting to add the same image ID twice. Applications 

should handle this gracefully.



\---



\## 🚀 How to Run the Tests



\### Prerequisites

\- \[Postman](https://postman.com/downloads) installed

\- \[Node.js](https://nodejs.org) installed

\- \[Newman](https://npmjs.com/package/newman) installed

\- \[k6](https://k6.io) installed

\- Dog API key from \[thedogapi.com](https://thedogapi.com)



\### Run with Newman

```bash

newman run "postman/Dog API Test Suite.postman\_collection.json" \\

\--environment "postman/Dog API Dev.postman\_environment.json" \\

\--env-var "dog\_api\_key=YOUR\_API\_KEY"

```



\### Run performance tests

```bash

cd performance

k6 run --env DOG\_API\_KEY=YOUR\_API\_KEY load-test.js

```



\### Run mock server tests

Import `mock/Dog API Mock Server.postman\_collection.json` 

into Postman and run the collection.



\---



\## 📊 Test Summary



| Test type | Total | Passed | Failed |

|---|---|---|---|

| Functional (Postman) | 40+ | 40+ | 0 |

| Performance (k6) | 4212 | 4212 | 0 |

| Mock server | 12 | 12 | 0 |



\---



\## 👩‍💻 About the Tester



\*\*Respah Nafula\*\* — QA Engineer  

Skilled in manual and automated API testing, performance testing, 

and CI/CD pipeline integration.



\- GitHub: \[Respah-Nafula](https://github.com/Respah-Nafula)

\- LinkedIn: https://www.linkedin.com/in/respah-wakhungu/



\---



\## 📄 License



This project is open source and available under the 

\[MIT License](LICENSE).

