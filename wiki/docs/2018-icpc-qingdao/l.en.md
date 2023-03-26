---
title: L - Sub-cycle Graph
date: 2023-02-04
---

# L - Sub-cycle Graph

## Basic Information

<table>
<tr>
<td><b>Contest</b></td><td>The 2018 ICPC Asia Qingdao Regional Contest</td>
</tr>
<tr>
<td><b>Team AC Ratio</b></td><td>23/373 (6.2%)</td>
</tr>
</table>

## Tutorial

A graph is a sub-cycle graph, if every connected component is either a single vertex or a chain. Of course, if this graph is actually a big cycle, it is also a sub-cycle graph. Let's first deal with some special cases:

* $m = 0$, these is only one such graph.
* $m > n$, no solution.
* $m = n$, all vertices must form a big cycle. Without loss of generality, let vertex $1$ be the "beginning" of the cycle, it is not hard to calculate that there are $\frac{(n - 1)!}{2}$ ways to form a cycle. We divide $2$ here because the cycle is not directional.

What remains is the case where $1 \le m < n$. Because there is no cycle in each connected component, we have $(n - m)$ connected components.

We enumerate $i$ from $1$ to $(n - m)$, indicating that there are $i$ chains in these connected components (that is to say, there are $(n - m - i)$ single vertex), and we choose $2i$ vertices as the endpoints of the chains. The number of ways to divide $2i$ vertices into $i$ groups where each group has exactly $2$ vertices (that is, the number of ways to put $2i$ different balls into $i$ indistinguishable boxes) can be calculated as

$$
\prod\limits_{k=1}^i (2k - 1)
$$

You can imagine the grouping process like this: after sorting the $2i$ vertices, each time group the smallest vertex and another vertex together. Thus the number of ways is $(2i - 1) \times (2i - 3) \times \cdots$.

Next, we need to distribute all vertices, except the vertices which form a connected component by themselves and the endpoints of the chains, into the chains. Because the order of vertices in a chain is crucial, we first choose a permutation of the vertices, and then divide them into $i$ groups where empty groups are allowed (that is, insert $(i - 1)$ partitions among $(m - i)$ balls). The number of ways can be calculated as

$$
(m - i)! \times \binom{m - 1}{i - 1}
$$

So the final answer is

$$
\sum\limits_{i=1}^{n-m} \binom{n}{n - m - i} \times (m - i)! \times \binom{m - 1}{i - 1} \times \binom{m + i}{2i} \times \prod\limits_{k=1}^i (2k - 1)
$$

The time complexity is $\mathcal{O}(n)$.

## Solution

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 1e5)
#define MOD ((int) 1e9 + 7)
using namespace std;

int n;
long long ans, m;

long long fac[MAXN + 10], ifac[MAXN + 10];

long long C(int a, int b) {
    return fac[a] * ifac[b] % MOD * ifac[a - b] % MOD;
}

void solve() {
    scanf("%d%lld", &n, &m);
    if (m == 0) printf("1\n");
    else if (m > n) printf("0\n");
    else if (m == n) printf("%lld\n", fac[n - 1] * ifac[2] % MOD);
    else {
        ans = 0;
        // f is the \prod in the tutorial
        long long f = 1;
        for (int i = 1; i <= n - m; i++) {
            if (m + i < i * 2) continue;
            long long t = C(m + i, i * 2) * f % MOD;
            f = f * (i * 2 + 1) % MOD;
            t = t * fac[m - i] % MOD;
            t = t * C(m - 1, i - 1) % MOD;
            ans = (ans + C(n, n - m - i) * t) % MOD;
        }
        printf("%lld\n", ans);
    }
}

int main() {
    fac[0] = 1;
    for (int i = 1; i <= MAXN; i++) fac[i] = fac[i - 1] * i % MOD;
    ifac[0] = ifac[1] = 1;
    for (int i = 2; i <= MAXN; i++) ifac[i] = (MOD - MOD / i) * ifac[MOD % i] % MOD;
    for (int i = 2; i <= MAXN; i++) ifac[i] = ifac[i - 1] * ifac[i] % MOD;

    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
