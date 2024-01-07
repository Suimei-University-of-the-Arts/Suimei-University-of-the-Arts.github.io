---
title: G - 背包
date: 2023-12-09
---

# G - 背包

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2023 ICPC 亚洲区域赛南京站</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>195/342 (57.0%)</td>
</tr>
</table>

## 题解

注意到一定存在一个最优选法同时满足以下两个条件：

1. 如果存在物品 $a$, $b$ 满足 $a$ 被免费选走，$b$ 被付费选走，那么 $w_a \ge w_b$。否则我们可以改成免费选 $b$，付费选 $a$，方案不会变劣。
2. 如果存在物品 $a$, $b$ 满足 $a$ 被免费选走，$b$ 没有被选走，那么 $v_a \ge v_b$。否则我们可以改成免费选 $b$，不选择 $a$，方案不会变劣。

因此，如果我们将所有物品按照 $w_i$ 从小到大排序，那么对于最优策略而言，一定存在一个分界点 $M$，满足 $i > M$ 的物品中，价值前 $k$ 大的物品被免费选走。

对于每个 $i$，可以通过维护一个堆来预处理出从第 $i$ 个物品开始的后缀免费选出 $k$ 个物品的最大价值之和。

因此我们只需要对每个前缀维护出 0/1 背包的结果即可。复杂度 $\mathcal{O}(nW + nk + n \log n)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 1e4)
#define MAXM ((int) 2e4)
#define INF ((long long) 1e18)
using namespace std;
typedef pair<int, int> pii;

int n, m, K;
pii A[MAXN + 10];
long long ans;

// f[i]：计算背包问题的滚动数组
// g[i]：从第 i 个物品开始的后缀免费选出 K 个物品的最大价值之和
long long f[MAXM + 10], g[MAXN + 10];

int main() {
    scanf("%d%d%d", &n, &m, &K);
    for (int i = 1; i <= n; i++) scanf("%d%d", &A[i].first, &A[i].second);
    sort(A + 1, A + n + 1);

    long long sm = 0;
    g[n + 1] = 0;
    // 利用堆算出每个后缀选出免费物品的最大价值之和
    priority_queue<int, vector<int>, greater<int>> pq;
    for (int i = n; i > 0; i--) {
        pq.push(A[i].second);
        sm += A[i].second;
        if (pq.size() > K) {
            sm -= pq.top();
            pq.pop();
        }
        g[i] = sm;
    }

    for (int i = 0; i <= m; i++) f[i] = -INF;
    f[0] = 0;
    // 答案的初始值：只买免费物品
    ans = g[1];
    // 用滚动数组计算背包问题
    for (int i = 1; i <= n; i++) for (int j = m; j >= A[i].first; j--) {
        f[j] = max(f[j], f[j - A[i].first] + A[i].second);
        // 计算分界点在 i 的情况下的答案
        ans = max(ans, f[j] + g[i + 1]);
    }
    printf("%lld\n", ans);
    return 0;
}
```
