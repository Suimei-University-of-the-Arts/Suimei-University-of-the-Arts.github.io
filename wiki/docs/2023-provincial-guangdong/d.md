---
title: D - 新居规划
date: 2023-05-09
---

# D - 新居规划

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2023 广东省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>189/295 (64.1%)</td>
</tr>
</table>

## 题解

如果已知 $k$（$2 \le k \le n$）个人有邻居，剩下的人没有邻居，怎样选择有邻居的人才能使总满意度最大化？

这是一个经典问题。先假设所有人都是没邻居的，得到总满意度 $\sum\limits_{i = 1}^n b_i$。当第 $i$ 个人从没邻居变成有邻居时，总满意度将增加 $(a_i - b_i)$。因此选择 $(a_i - b_i)$ 最大的 $k$ 个人变成有邻居的即可。排序后可以在 $\mathcal{O}(n)$ 的复杂度内一次性算出 $k = 2, \cdots, n$ 的最大总满意度。

如果 $k$ 个人有邻居，剩下的人没有邻居，这样的布局至少需要 $k + 2(n - k) = 2n - k$ 栋房子（即有邻居的人都住在最左边，然后每隔一栋房子住一个没邻居的人）。因此只有满足 $2n - k \le m$ 才能考虑。

最后，别忘了考虑所有人都没有邻居的情况。这要求 $m \ge 2n - 1$。

复杂度 $\mathcal{O}(n\log n)$。主要是排序的复杂度。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 5e5)
using namespace std;

int n, m, A[MAXN + 10], B[MAXN + 10];

void solve() {
    scanf("%d%d", &n, &m);
    for (int i = 1; i <= n; i++) scanf("%d%d", &A[i], &B[i]);

    // 将 (A[i] - B[i]) 排序，vector 里存的是从小到大的顺序
    vector<int> vec;
    for (int i = 1; i <= n; i++) vec.push_back(A[i] - B[i]);
    sort(vec.begin(), vec.end());

    long long ans = 0, now = 0;
    for (int i = 1; i <= n; i++) now += B[i];
    // 特殊情况：所有人都没有邻居
    if (m >= 2 * n - 1) ans = now;
    
    now += vec[n - 1];
    for (int i = 2; i <= n; i++) {
        // 计算有 i 个人有邻居时的最大总满意度
        now += vec[n - i];
        if (2 * n - i <= m) ans = max(ans, now);
    }
    printf("%lld\n", ans);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
