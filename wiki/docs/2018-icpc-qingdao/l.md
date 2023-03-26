---
title: L - Sub-cycle Graph
date: 2023-02-04
---

# L - Sub-cycle Graph

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2018 ICPC 亚洲区域赛青岛站</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>23/373 (6.2%)</td>
</tr>
</table>

## 题解

只有每个连通块都是一个点或者一条链的图才是 sub-cycle graph。当然，所有点恰形成一个环的图也是。首先来处理一些特殊情况：

* $m = 0$，唯一方案。
* $m > n$，无解。
* $m = n$，则所有点必须形成一个大环。不妨令点 $1$ 为环的“起点”，就容易算出环的方案数为 $\frac{(n - 1)!}{2}$。除以 $2$ 是因为环是顺时针还是逆时针没有关系。

接下来是 $1 \le m < n$ 的一般情况。由于每个连通块中都没有环，因此我们有 $(n - m)$ 个连通块。

我们从 $1$ 到 $(n - m)$ 枚举 $i$ 表示这些连通块中有 $i$ 条链（换句话说，也就是有 $(n - m - i)$ 个孤立点），首先从中选出 $2i$ 个节点作为链的两个端点。把 $2i$ 个节点两两分组的方案数（也就是把 $2i$ 个不同的球放入 $i$ 个相同的盒子中的方案数）为

$$
\prod\limits_{k=1}^i (2k - 1)
$$

您可以这样想象分组过程：将 $2i$ 个节点排序后，每次选择最小的节点和另一个任意节点为一组，这样方案数就是 $(2i - 1) \times (2i - 3) \times \cdots$。

接下来我们要把除了孤立点和链端点以外的点都分配到链里。由于一条链中节点的顺序是有关系的，因此首先将剩下的节点进行全排列，然后将节点任意分成可以为空的 $i$ 份（也就是往 $(m - i)$ 个球中间插入 $(i - 1)$ 个隔板），则方案数为

$$
(m - i)! \times \binom{m - 1}{i - 1}
$$

因此最终的方案数就是

$$
\sum\limits_{i=1}^{n-m} \binom{n}{n - m - i} \times (m - i)! \times \binom{m - 1}{i - 1} \times \binom{m + i}{2i} \times \prod\limits_{k=1}^i (2k - 1)
$$

中间那个 $\prod$ 可以一边枚举一边算，总体时间复杂度 $\mathcal{O}(n)$。

## 参考代码

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
        // f 就是题解中的 \prod
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
