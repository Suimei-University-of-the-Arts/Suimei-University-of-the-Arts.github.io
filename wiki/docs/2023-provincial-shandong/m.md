---
title: M - 计算几何
date: 2023-07-01
---

# M - 计算几何

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2023 山东省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>20/276 (7.2%)</td>
</tr>
</table>

## 题解

多边形 $Q$ 可以分成两个部分：由 $b$，$c$ 和它们之间 $k$ 条边组成的 $(k + 1)$ 边形 $R$，以及三角形 $\Delta abc$。

如果我们枚举 $b$ 的位置，那么 $c$ 的位置也会同时确定，则 $R$ 的面积也确定了。我们要做的就是最大化 $\Delta abc$ 的面积。我们可以三分 $a$ 的位置，这样做的复杂度是 $\mathcal{O}(n\log n)$。也可以用类似于旋转卡壳的方法在 $\mathcal{O}(n)$ 的复杂度内一次性求出所有 $bc$ 对应的点 $a$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 1e5)
using namespace std;

int n, K;
long long X[MAXN + 10], Y[MAXN + 10];

long long cross(int a, int b) {
    return X[a] * Y[b] - X[b] * Y[a];
}

void solve() {
    scanf("%d%d", &n, &K);
    for (int i = 0; i < n; i++) scanf("%lld%lld", &X[i], &Y[i]);

    long long ans = 0, sm = 0;
    for (int i = 1; i <= K; i++) sm += cross(i - 1, i);
    // 枚举点 b
    for (int b = 0, a = K; b < n; b++) {
        int c = (b + K) % n;
        // 类似旋转卡壳，随着 bc 的逆时针旋转，最优的 a 的位置也会逆时针旋转
        while (a != b) {
            long long now = cross(c, a) + cross(a, b);
            long long nxt = cross(c, (a + 1) % n) + cross((a + 1) % n, b);
            if (nxt > now) a = (a + 1) % n;
            else break;
        }
        ans = max(ans, sm + cross(c, a) + cross(a, b));
        sm += cross(c, (c + 1) % n) - cross(b, (b + 1) % n);
        // a 要始终处于 c 到 b 之间
        if (a == c) a = (a + 1) % n;
    }
    printf("%.12f\n", ans / 2.0);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
