import { RateLimiter } from 'limiter';

// 50 requests in 500ms
const Limiter = new RateLimiter(50, 500 , true); //'hour'

Limiter.removeTokens(1, (err, remainingRequests) => {
    if (err) {
        throw new Error(JSON.stringify(err));
    }
    if (remainingRequests < 1) {
        let error = '429 Too Many Requests - your IP is being rate limited';
        throw new Error(JSON.stringify(error));
    }
});
