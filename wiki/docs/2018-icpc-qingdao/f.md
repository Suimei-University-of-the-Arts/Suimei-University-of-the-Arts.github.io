---
title: F - Tournament
date: 2023-03-26
---

# F - Tournament

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2018 ICPC 亚洲区域赛青岛站</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>114/373 (30.6%)</td>
</tr>
</table>

## 题解

如果只是以过题为目标，可以通过打表找规律的方式，发现必须有 $k \le \text{lowbit}(n) - 1$ 才有解，且第 $i$ 场比赛（$i$ 从 $1$ 到 $k$），选手 $j$（$j$ 从 $0$ 到 $(n - 1)$）的对手就是 $i \oplus j$，其中 $\oplus$ 是异或运算。时间复杂度 $\mathcal{O}(nk)$。

详细的证明参见 [IMO 2006 C5 题](https://www.imo-official.org/problems/IMO2006SL.pdf)（感谢 hos.lyric）。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
using namespace std;

int n, K;

void solve() {
    scanf("%d%d", &n, &K);
    int lb = n & (-n);
    if (K >= lb) { printf("Impossible\n"); return; }
    for (int i = 1; i <= K; i++) for (int j = 0; j < n; j++) printf("%d%c", (i ^ j) + 1, "\n "[j + 1 < n]);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
