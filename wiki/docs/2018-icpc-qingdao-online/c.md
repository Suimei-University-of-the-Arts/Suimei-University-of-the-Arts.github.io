---
title: C - Halting Problem
date: 2023-08-31
---

# C - Halting Problem

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2018 ICPC 亚洲区域赛青岛站网络赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>971/1550 (62.6%)</td>
</tr>
</table>

## 题解

计算机的状态只包含两个变量：目前程序执行到哪一行，以及 $r$ 的值是多少。对状态进行 bfs，看能否走到包含第 $(n + 1)$ 行的状态即可。复杂度 $\mathcal{O}(n \times 2^p)$，其中 $p = 8$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 1e4)
#define MAXR (1 << 8)
using namespace std;
typedef pair<int, int> pii;

int n;
char OP[MAXN + 10][5];
int V[MAXN + 10], K[MAXN + 10];

bool vis[MAXN + 10][MAXR];

bool bfs() {
    queue<pii> q;
    for (int i = 1; i <= n + 1; i++) for (int j = 0; j < MAXR; j++) vis[i][j] = false;
    q.push(pii(1, 0)); vis[1][0] = true;

    while (!q.empty()) {
        pii p = q.front(); q.pop();
        int line = p.first, r = p.second;
        if (line == n + 1) return true;

        // 模拟第 line 条命令
        int nxtLine = line + 1, nxtR = r;
        if (OP[line][1] == 'd') {
            nxtR = (r + V[line]) % MAXR;
        } else if (OP[line][1] == 'e') {
            if (r == V[line]) nxtLine = K[line];
        } else if (OP[line][1] == 'n') {
            if (r != V[line]) nxtLine = K[line];
        } else if (OP[line][1] == 'l') {
            if (r < V[line]) nxtLine = K[line];
        } else {
            if (r > V[line]) nxtLine = K[line];
        }
        if (vis[nxtLine][nxtR]) continue;
        q.push(pii(nxtLine, nxtR)); vis[nxtLine][nxtR] = true;
    }

    return false;
}

void solve() {
    scanf("%d", &n);
    for (int i = 1; i <= n; i++) {
        scanf("%s", OP[i]);
        if (OP[i][1] == 'd') scanf("%d", &V[i]);
        else scanf("%d%d", &V[i], &K[i]);
    }

    if (bfs()) printf("Yes\n");
    else printf("No\n");
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
