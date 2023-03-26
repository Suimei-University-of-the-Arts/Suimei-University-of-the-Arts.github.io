---
title: F - Tournament
date: 2023-03-26
---

# F - Tournament

## Basic Information

<table>
<tr>
<td><b>Contest</b></td><td>The 2018 ICPC Asia Qingdao Regional Contest</td>
</tr>
<tr>
<td><b>Team AC Ratio</b></td><td>114/373 (30.6%)</td>
</tr>
</table>

## Tutorial

If you only aim at solving the problem, you can calculate the first few answers and look for the pattern. You can see that there must be $k \leq \text{lowbit}(n) - 1$ in order for there to be a solution, and in the $i$-th round of the competition ($i\in [1, k]$), player $j$ ($j \in [0, n-1]$) will compete against player $i \oplus j$, where $\oplus$ denotes the XOR operation. The time complexity is $\mathcal{O}(nk)$.

For a detailed proof, please refer to [IMO 2006  problem C5](https://www.imo-official.org/problems/IMO2006SL.pdf).

## Solution

```c++ linenums="1"
#include <bits/stdc++.h>
using namespace std;

int n, K;

void solve() {
    scanf("%d%d", &n, &K);
    int lb = n & (-n);
    if (K >= lb) { printf("Impossible\n"); return; }
    for (int i = 1; i <= K; i++) for (int j = 0; j < n; j++) printf("%d%c", (i ^ j) + 1, "\n "[j + 1 < n]);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
