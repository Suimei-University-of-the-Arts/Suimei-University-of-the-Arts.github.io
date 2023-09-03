---
title: A - Live Love
date: 2023-08-31
---

# A - Live Love

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2018 ICPC 亚洲区域赛青岛站网络赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>1492/1550 (96.3%)</td>
</tr>
</table>

## 题解

最多连续 PERFECT 的数量显然是 $m$。

二分最少连续 PERFECT 的数量 $x$，那么每 $x$ 个 PERFECT 之间至少要插入一个 NON-PERFECT。计算总长度是否小于等于 $n$ 即可。

复杂度 $\mathcal{O}(\log m)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
using namespace std;

int n, m;

int calc(int lim) {
    // 如果 m 刚好整除 lim，最后一组 PERFECT 后面就不用放 NON-PERFECT 了
    if (m % lim == 0) return m / lim * (lim + 1) - 1;
    else return m / lim * (lim + 1) + m % lim;
}

void solve() {
    scanf("%d%d", &n, &m);
    // 特殊情况：0 个 PERFECT
    if (m == 0) { printf("0 0\n"); return; }
    // 最大连续 PERFECT 显然是 m
    printf("%d ", m);

    // 二分最小连续 PERFECT
    int head = 1, tail = m;
    while (head < tail) {
        int mid = (head + tail) >> 1;
        if (calc(mid) <= n) tail = mid;
        else head = mid + 1;
    }
    printf("%d\n", head);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
