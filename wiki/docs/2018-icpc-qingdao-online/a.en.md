---
title: A - Live Love
date: 2023-08-31
---

# A - Live Love

## Basic Information

<table>
<tr>
<td><b>Contest</b></td><td>The 2018 ICPC Asia Qingdao Regional Contest, Online</td>
</tr>
<tr>
<td><b>Team AC Ratio</b></td><td>1492/1550 (96.3%)</td>
</tr>
</table>

## Tutorial

The maximum number of consecutive PERFECTs is obviously $m$.

Binary search for the minimum number of consecutive PERFECTs, denoted as $x$. Then, at least one NON-PERFECT must be inserted between every $x$ PERFECTs. Calculate whether the total length is less than or equal to $n$.

The complexity is $\mathcal{O}(\log m)$.

## Solution

```c++ linenums="1"
#include <bits/stdc++.h>
using namespace std;

int n, m;

int calc(int lim) {
    // if m is divided by lim
    // there is no need to insert a NON-PERFECT after the last group of PERFECTS
    if (m % lim == 0) return m / lim * (lim + 1) - 1;
    else return m / lim * (lim + 1) + m % lim;
}

void solve() {
    scanf("%d%d", &n, &m);
    // corner case: 0 PERFECT
    if (m == 0) { printf("0 0\n"); return; }
    // the maximum number of consecutive PERFECTs is obviously m
    printf("%d ", m);

    // binary search for the minimum number of consecutive PERFECTs
    int head = 1, tail = m;
    while (head < tail) {
        int mid = (head + tail) >> 1;
        if (calc(mid) <= n) tail = mid;
        else head = mid + 1;
    }
    printf("%d\n", head);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
