---
title: E - Plants vs. Zombies
date: 2023-02-04
---

# E - Plants vs. Zombies

## Basic Information

<table>
<tr>
<td><b>Contest</b></td><td>The 2018 ICPC Asia Qingdao Regional Contest</td>
</tr>
<tr>
<td><b>Team AC Ratio</b></td><td>121/373 (32.4%)</td>
</tr>
</table>

## Tutorial

It is easy to think of binary search, next we need to consider how to verify the answer $x$.

Since we must move before watering each plant, to water the first plant to height $x$ without wasting water, we need to repeatedly move between the first and second plants. After watering the first plant, in order to water the second plant to height $x$ without wasting water, we need to repeatedly move between the second and third plants...

Implement the above greedy process. The time complexity is $\mathcal{O}(n\log (m \times \max a_i))$.

## Solution

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 1e5)
using namespace std;

int n, A[MAXN + 10];
long long m;

// indicates the current height of each plant
long long B[MAXN + 10];

bool check(long long LIM) {
    long long step = 0;
    memset(B, 0, sizeof(long long) * (n + 3));
    for (int i = 1; i <= n; i++) {
        if (LIM > B[i]) {
            // the i-th plant needs watering
            // repeatedly move between it and the (i + 1)-th plant
            long long t = LIM - B[i];
            t = (t + A[i] - 1) / A[i];
            step += t * 2 - 1;
            // return immediately if the number of steps exceeds the limit
            // otherwise the number of steps may exceed long long
            if (step > m) return false;
            B[i + 1] += A[i + 1] * (t - 1);
        } else {
            // the i-th plant does not need watering
            // just pass by, but we still need to count the steps
            // the number of steps may exceed the limit here
            // but we won't return false as long as
            // there are no plants which need watering on the right
            step++;
        }
    }
    return true;
}

void solve() {
    scanf("%d%lld", &n, &m);
    for (int i = 1; i <= n; i++) scanf("%d", &A[i]);
    
    // binary search
    long long head = 0, tail = 1e18;
    while (head < tail) {
        long long mid = (head + tail + 1) >> 1;
        if (check(mid)) head = mid;
        else tail = mid - 1;
    }
    printf("%lld\n", head);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
