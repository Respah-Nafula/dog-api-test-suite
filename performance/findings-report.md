\# Dog API — Performance Test Findings Report



\*\*Tester:\*\* Respah Nafula  

\*\*Date:\*\* May 12, 2026  

\*\*Tool:\*\* k6 v2.0.0  

\*\*API:\*\* The Dog API (https://api.thedogapi.com/v1)  



\---



\## Test Overview



A load test was conducted against three endpoint groups of The Dog 

API to assess performance under simulated concurrent user traffic.



\### Test Configuration



| Setting | Value |

|---|---|

| Tool | k6 |

| Test type | Load test |

| Max virtual users | 20 |

| Total duration | 3 minutes |

| Stages | Ramp up 10 users (30s) → Ramp up 20 users (1m) → Hold 20 users (1m) → Ramp down (30s) |

| Endpoints tested | Breeds, Images, Favourites |



\---



\## Results Summary



| Metric | Result | Threshold | Status |

|---|---|---|---|

| p(95) response time | 595.94ms | < 3000ms | ✅ PASS |

| Error rate | 0.00% | < 5% | ✅ PASS |

| Total requests | 1755 | — | — |

| Throughput | 9.6 req/sec | — | — |

| Total checks | 4212/4212 | 100% | ✅ PASS |



\---



\## Endpoint Performance Breakdown



| Endpoint Group | Avg | Min | Max | p(95) | Status |

|---|---|---|---|---|---|

| Breeds | 512ms | 385ms | 1247ms | 646ms | ✅ PASS |

| Images | 471ms | 361ms | 889ms | 581ms | ✅ PASS |

| Favourites | 453ms | 350ms | 733ms | 551ms | ✅ PASS |



\---



\## Key Findings



\### Finding 1 — API performs well under load ✅

All three endpoint groups maintained response times well below 

the 3000ms threshold even at peak load of 20 concurrent users. 

The p(95) of 595ms means 95% of all users received a response 

in under 600ms — an excellent user experience.



\### Finding 2 — Zero errors under load ✅

Out of 1755 total requests, zero failed. The error rate of 0.00%

demonstrates the API handles concurrent traffic reliably without 

dropping requests or returning unexpected errors.



\### Finding 3 — Breeds endpoint has highest latency ⚠️

The Breeds endpoint showed the highest maximum response time 

at 1247ms — significantly higher than its average of 512ms. 

This suggests occasional slowdowns under peak load, possibly 

due to the larger payload size of breed data compared to other 

endpoints. Worth monitoring in production.



\### Finding 4 — Favourites endpoint is fastest ✅

The Favourites endpoint was the fastest overall with an average 

of 453ms and p(95) of 551ms. It also had the lowest maximum 

response time at 733ms, showing very consistent performance.



\### Finding 5 — Response times are consistent ✅

The gap between average (475ms) and p(95) (595ms) response times 

is only 120ms — indicating very consistent performance with no 

major outliers or random spikes affecting most users.



\---



\## Recommendations



1\. \*\*Monitor the Breeds endpoint\*\* under higher load — the 1247ms 

&#x20;  maximum suggests it may degrade faster than other endpoints 

&#x20;  as traffic increases beyond 20 concurrent users.



2\. \*\*Consider caching breed data\*\* — since breed information rarely 

&#x20;  changes, implementing a cache layer could reduce the Breeds 

&#x20;  endpoint maximum response time significantly.



3\. \*\*Run a stress test\*\* to find the breaking point — this load test 

&#x20;  used a maximum of 20 virtual users. A stress test ramping to 

&#x20;  100-200 users would identify the API's upper limits before 

&#x20;  production deployment.



4\. \*\*Rate limiting\*\* — the OpenWeather API showed rate limiting at 

&#x20;  \~40 req/sec. The Dog API handled 9.6 req/sec without issues 

&#x20;  but rate limits should be verified at higher throughput.



\---



\## Test Environment



| Item | Detail |

|---|---|

| Test machine | Windows 11 |

| Network | Local internet connection |

| k6 version | v2.0.0 |

| API environment | Production |

| Authentication | API key (x-api-key header) |



\---



\## Conclusion



The Dog API demonstrates solid performance under a 20 concurrent 

user load. All thresholds were met with comfortable margins. 

The API is production-ready for moderate traffic levels. 

Further stress testing is recommended before high-traffic launches.

