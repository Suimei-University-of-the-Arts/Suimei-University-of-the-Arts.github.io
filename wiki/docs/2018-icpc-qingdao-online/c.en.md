---
title: C - Halting Problem
date: 2023-08-31
---

# C - Halting Problem

## Basic Information

<table>
<tr>
<td><b>Contest</b></td><td>The 2018 ICPC Asia Qingdao Regional Contest, Online</td>
</tr>
<tr>
<td><b>Team AC Ratio</b></td><td>971/1550 (62.6%)</td>
</tr>
</table>

## Tutorial

The computer's state consists of only two parts: the current line of code being executed and the value of $r$. BFS through the states to determine if we can reach a state which tries to execute the $(n + 1)$-th line of code. The complexity is $\mathcal{O}(n \times 2^p)$, where $p = 8$.

## Solution

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

        // simulate the command on the `line`-th line
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
