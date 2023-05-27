---
title: M - 计算几何
date: 2023-05-09
---

# M - 计算几何

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2023 广东省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>19/295 (6.4%)</td>
</tr>
</table>

## 题解

枚举用于切开大多边形的顶点 $i$ 和 $j$，问题变为如何快速计算两个小多边形的直径。显然两个小多边形也都是凸多边形。

因为凸多边形的直径一定是某两个顶点的连线（初中几何证明题，请读者自行完成），维护 $f(i, j)$ 表示第 $i$ 个顶点到第 $j$ 个顶点之间，两个顶点之间的最大距离的平方（如果 $i > j$ 那就是顶点 $i, i + 1, \cdots, n, 1, 2, \cdots, j$ 之间的最大距离），令 $\text{dis}(i, j)$ 表示顶点 $i$ 和 $j$ 之间的距离，容易得到区间 dp 方程

$$
f(i, j) = \max \{ f(i + 1, j), f(i, j - 1), \text{dis}^2(i, j) \}
$$

初值 $f(i, i + 1) = \text{dis}^2(i, i + 1)$。

两个小多边形的直径平方和即为 $f(i, j) + f(j, i)$，取最小值为答案即可。

当然，要求顶点 $i$ 和 $j$ 的连线切到凸多边形内部。根据凸多边形的性质，这等价于顶点 $j$ 不能在顶点 $i$ 和 $(i + 1)$ 的连线上，也不能在顶点 $i$ 和 $(i - 1)$ 的连线上。算出叉积进行判断即可。

复杂度 $\mathcal{O}(n^2)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 5e3)
using namespace std;

int n;
long long ans, X[MAXN], Y[MAXN];

long long f[MAXN][MAXN];

long long cross(long long x1, long long y1, long long x2, long long y2) {
    return x1 * y2 - x2 * y1;
}

long long dis2(int i, int j) {
    return (X[i] - X[j]) * (X[i] - X[j]) + (Y[i] - Y[j]) * (Y[i] - Y[j]);
}

void solve() {
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%lld%lld", &X[i], &Y[i]);
    
    // 区间 dp
    for (int i = 0; i < n; i++) {
        int j = (i + 1) % n;
        f[i][j] = dis2(i, j);
    }
    for (int len = 3; len <= n; len++) for (int i = 0; i < n; i++) {
        int j = (i + len - 1) % n;
        f[i][j] = max({f[(i + 1) % n][j], f[i][(j - 1 + n) % n], dis2(i, j)});
    }

    ans = 9e18;
    for (int i = 0; i < n; i++) {
        int nxt = (i + 1) % n, pre = (i - 1 + n) % n;
        for (int j = 0; j < n; j++) if (i != j) {
            // 点 j 不能在连接 i 和 (i + 1) 的直线上，否则这条线无法切到多边形内部
            long long c1 = cross(X[j] - X[i], Y[j] - Y[i], X[nxt] - X[i], Y[nxt] - Y[i]);
            // 点 j 不能在连接 i 和 (i - 1) 的直线上，否则这条线无法切到多边形内部
            long long c2 = cross(X[j] - X[i], Y[j] - Y[i], X[pre] - X[i], Y[pre] - Y[i]);
            if (c1 == 0 || c2 == 0) continue;
            ans = min(ans, f[i][j] + f[j][i]);
        }
    }
    printf("%lld\n", ans);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
