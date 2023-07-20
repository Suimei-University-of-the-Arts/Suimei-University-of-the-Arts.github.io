---
title: D - Pick Up
date: 2023-07-17
---

# D - Pick Up

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2019 陕西省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>4/111 (3.6%)</td>
</tr>
</table>

## 题解

首先计算 BaoBao 直接去商场的时间。接下来计算 DreamGrid 接 BaoBao 去商场的最短时间。

记 $R$ 表示点 $A$ 和点 $B$ 为两角构成的矩形，记 $D$ 表示矩形 $R$ 内部和边界上到 $C$ 的曼哈顿距离最近的点。可以发现，BaoBao 和 DreamGrid 如果先往 $D$ 点走，到达 $D$ 之后再往 $C$ 点走，走的距离和直接去 $C$ 点是一样的。

因此讨论 BaoBao 和 DreamGrid 谁先到达 $D$ 点。

* 如果 BaoBao 先到达 $D$ 点，那么接下来他直接往 $C$ 点走，等 DreamGrid 追上他。因为 DreamGrid 完全没有绕路，所以到达商场的时间就是 DreamGrid 直接去商场的时间。
* 如果 DreamGrid 先到达 $D$ 点，由于 DreamGrid 速度比 BaoBao 快，所以越早接到 BaoBao 越好。可以发现，DreamGrid 先到 $D$ 再到 $A$，和他直接去 $A$ 走的距离是一样的。因此 DreamGrid 到达 $D$ 点之后应该继续往 $A$ 点走，直到接上 BaoBao，这样就能最快接到 BaoBao。最后两个人再一起去商场。

复杂度 $\mathcal{O}(1)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
using namespace std;

// 从 (xa, ya) 走到 (xb, yb)，速度为 v，需要多少时间
double calc(int xa, int ya, int xb, int yb, int v) {
    return (abs(xb - xa) + abs(yb - ya)) * 1.0 / v;
}

void solve() {
    int a, b, xa, ya, xb, yb, xc, yc;
    scanf("%d%d%d%d%d%d%d%d", &a, &b, &xa, &ya, &xb, &yb, &xc, &yc);
    // BaoBao 直接去商场的时间
    double ans = calc(xa, ya, xc, yc, a);

    int l = min(xa, xb), r = max(xa, xb), d = min(ya, yb), u = max(ya, yb);
    // D 点是矩形里距离 C 点最近的点
    int xd = max(l, min(r, xc)), yd = max(d, min(u, yc));
    // 计算两人到达 D 点的时间
    double ta = calc(xa, ya, xd, yd, a), tb = calc(xb, yb, xd, yd, b);
    // BaoBao 先到
    if (ta < tb) ans = min(ans, calc(xb, yb, xc, yc, b));
    else {
        // DreamGrid 先到，计算 t 表示 DreamGrid 和 BaoBao 相遇的时间
        double t = calc(xa, ya, xb, yb, a + b);
        // dis 表示相遇后去商场的剩余距离
        double dis = abs(xc - xa) + abs(yc - ya) - a * t;
        ans = min(ans, t + dis / b);
    }
    printf("%.12f\n", ans);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
