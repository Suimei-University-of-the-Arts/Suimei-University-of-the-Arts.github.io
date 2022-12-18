---
title: B - Ropeway
date: 2022-12-16
---

# B - Ropeway

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2022 ICPC 亚洲区域赛南京站</td>
</tr>
<tr>
<td><b>在线练习</b></td><td>暂无</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>93/465 (20.0%)</td>
</tr>
<tr>
<td><b>提交通过率</b></td><td>93/398 (23.4%)</td>
</tr>
</table>

## 题解

### 假设没有修改

首先考虑没有修改的时候应该怎么做。维护 $f(i)$ 表示只考虑前 $i$ 个位置，从位于 $0$ 的索道站出发，把支撑塔架到了第 $i$ 个位置的最小总成本。容易得出以下转移方程：

$$
f(i) = \min\limits_j f(j) + a_i
$$

其中 $j$ 需要满足以下条件：

* $0 \le j < i$。
* $i - j \le k$。
* $[j + 1, i - 1]$ 的范围内没有必须架设的支撑塔。

可以把位于 $(n + 1)$ 的索道站看成一个成本为 $0$ 且必须架设的支撑塔，答案即为 $f(n + 1)$，初值 $f(0) = 0$。

直接实现该转移方程的复杂度是 $\mathcal{O}(nk)$ 的，但我们很容易利用单调队列直接选出最优的 $\min\limits_j f(j)$，将复杂度降至 $\mathcal{O}(n)$。

### 如何处理修改

接下来考虑如何处理修改。我们发现，对位置 $p$ 的修改，将会影响所有 $p \le i \le n + 1$ 的 $f(i)$ 值。如果直接重算所有受影响的 $f(i)$ 值，总体复杂度将变为 $\mathcal{O}(nq)$。能否减少重算的范围呢？

我们可以注意到一个重要性质：

> 任意一段长度为 $k$ 的连续位置中，至少有一个位置被包含在最终方案里。

这个重要性质很容易证明，如果存在一段长度为 $k$ 的连续位置都没有架设支撑塔，那么分别位于这一区间两侧的支撑塔之间的距离将大于 $k$。

假设我们还知道 $g(i)$ 表示只考虑后 $(n - i + 1)$ 个位置，位置 $i$ 已经架设了支撑塔（这个位置的成本看作 $0$），并一路架设到位于 $(n + 1)$ 的索道站的最小总成本。如果位置 $i$ 被包含在最终方案里，那么最终方案的总成本就是 $f(i) + g(i)$。

更妙的是，对于所有 $p \le i \le n + 1$，$g(i)$ 的值不受位置 $p$ 修改的影响，因此我们可以在所有修改开始前预处理 $g$ 的值。因此对于位置 $p$ 的修改，我们考虑 $[p, \min(p + k - 1, n + 1)]$ 这一连续区间，只重算 $p \le i \le \min(p + k - 1, n + 1)$ 的 $f(i)$ 值，并枚举哪个位置被包含在最终方案里。答案就是 $\min\limits_{i=p}^{\min(p + k - 1, n + 1)} f(i) + g(i)$。

我们要重算的第一个值是 $f(p)$。由于 $f(p)$ 是由 $f(p - k)$ 到 $f(p - 1)$ 转移来的，因此在重算之前，要先把这 $k$ 个值放进单调队列。

每次修改的复杂度为 $\mathcal{O}(k)$，总体复杂度 $\mathcal{O}(n + kq)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 5e5)
#define INF ((long long) 1e18)
using namespace std;
typedef pair<long long, int> pli;

int n, m, K, A[MAXN + 10];
char must[MAXN + 10];

long long f[MAXN + 10], g[MAXN + 10], h[MAXN + 10];

// 计算无修改时的 dp 值，结果存在 f 里
void dp(long long *f) {
    deque<pli> dq;
    f[0] = 0;
    dq.push_back(pli(0, 0));
    for (int i = 1; i <= n + 1; i++) {
        while (dq.front().second < i - K) dq.pop_front();
        f[i] = dq.front().first + A[i];
        if (must[i] == '1') dq.clear();
        while (!dq.empty() && dq.back().first >= f[i]) dq.pop_back();
        dq.push_back(pli(f[i], i));
    }
}

// 计算把 a[x] 改成 y 的答案
long long dp2(int x, int y) {
    int old = A[x]; A[x] = y;

    long long ret = INF;
    deque<pli> dq;
    // 第一个要重算的值是 f[x]
    // 它由 f[x - K] ~ f[x - 1] 转移过来
    // 因此先把这些数放进单调队列里
    for (int i = K; i > 0; i--) if (x - i >= 0) {
        if (must[x - i] == '1') dq.clear();
        while (!dq.empty() && dq.back().first >= f[x - i]) dq.pop_back();
        dq.push_back(pli(f[x - i], x - i));
    }
    // 重算 f[x] ~ f[x + K - 1]
    for (int i = x; i < x + K && i <= n + 1; i++) {
        while (dq.front().second < i - K) dq.pop_front();
        h[i] = dq.front().first + A[i];
        // 计算每个中间点的答案
        ret = min(ret, h[i] + g[i]);
        if (must[i] == '1') dq.clear();
        while (!dq.empty() && dq.back().first >= h[i]) dq.pop_back();
        dq.push_back(pli(h[i], i));
    }

    A[x] = old;
    return ret;
}

void solve() {
    scanf("%d%d", &n, &K);
    for (int i = 1; i <= n; i++) scanf("%d", &A[i]);
    A[n + 1] = 0;
    scanf("%s", must + 1);

    // 预处理 f
    dp(f);

    // 预处理 g
    // 后缀的 dp 值，其实就是把整个序列倒过来，然后算前缀的 dp 值
    reverse(A + 1, A + n + 1);
    reverse(must + 1, must + n + 1);
    dp(g);
    reverse(A + 1, A + n + 1);
    reverse(must + 1, must + n + 1);
    reverse(g, g + n + 2);
    for (int i = 1; i <= n; i++) g[i] -= A[i];

    // 处理询问
    int q; scanf("%d", &q);
    while (q--) {
        int x, y; scanf("%d%d", &x, &y);
        printf("%lld\n", dp2(x, y));
    }
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
