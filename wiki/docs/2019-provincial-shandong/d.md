---
title: D - Game on a Graph
date: 2023-07-12
---

# D - Game on a Graph

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2019 山东省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>233/307 (75.9%)</td>
</tr>
</table>

## 题解

连通图最少需要 $(n - 1)$ 条边，因此最多可以操作 $(m - (n - 1))$ 次，输的人就是 $(m - (n - 1)) \bmod k$。考虑到读入，复杂度 $\mathcal{O}(k + m)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXK ((int) 1e5)
using namespace std;

int K, n, m;
char s[MAXK + 10];

void solve() {
    scanf("%d%s%d%d", &K, s, &n, &m);
    for (int i = 1; i <= m; i++) scanf("%*d%*d");
    int delta = m - (n - 1);
    char lose = s[delta % K];
    if (lose == '1') printf("2\n");
    else printf("1\n");
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
