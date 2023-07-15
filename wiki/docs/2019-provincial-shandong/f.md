---
title: F - Stones in the Bucket
date: 2023-07-12
---

# F - Stones in the Bucket

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2019 山东省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>283/307 (92.2%)</td>
</tr>
</table>

## 题解

先假设我们只进行第二种操作。

第二种操作石头的总数不变，因此石头的总数 $s$ 必须是 $n$ 的倍数。设石头的总数为 $kn$，那么最终每个桶里必须恰有 $k$ 个石头。

设石头比 $k$ 多的桶里，一共多出了 $p_+$ 个石头，而石头比 $k$ 少的桶里，一共少了 $p_-$ 个石头。因为石头总数就是 $kn$，我们有 $p_+ = p_-$。而每次操作都能将 $p_+$ 和 $p_-$ 分别减少 $1$，因此只需要进行 $p_-$ 次操作即可。

接下来加入第一种操作。因为石头的总数 $s$ 不一定是 $n$ 的倍数，而第一种操作可以让石头的总数减少 $1$，因此我们首先通过第一种操作，让石头总数减少至 $n$ 的倍数。

接下来考虑哪个 $n$ 的倍数是最优的。如果我们将石头总数从 $kn$ 减少到 $(k - 1)n$，需要花费 $n$ 次第一种操作，而 $p_- \in [0, n]$，因此 $p_-$ 最多减少 $n$。也就是说，随着 $k$ 变小，操作总数不会变小，甚至可能变大。因此将 $s$ 减小到距离最近的 $n$ 的倍数即可，也就是 $\lfloor\frac{s}{n}\rfloor \times n$。

复杂度 $\mathcal{O}(n)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 1e5)
using namespace std;

int n, A[MAXN + 10];
long long ans;

void solve() {
    scanf("%d", &n);
    long long sm = 0;
    for (int i = 1; i <= n; i++) scanf("%d", &A[i]), sm += A[i];
    long long goal = sm / n;
    // 进行 s % n 次第一种操作，把石头总数减小成最近的 n 的倍数
    ans = sm % n;
    // 第二种操作需要 p- 次
    for (int i = 1; i <= n; i++) if (A[i] < goal) ans += goal - A[i];
    printf("%lld\n", ans);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
