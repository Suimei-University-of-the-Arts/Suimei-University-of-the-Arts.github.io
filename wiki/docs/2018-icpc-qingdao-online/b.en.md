---
title: B - Red Black Tree
date: 2023-09-01
---

# B - Red Black Tree

## Basic Information

<table>
<tr>
<td><b>Contest</b></td><td>The 2018 ICPC Asia Qingdao Regional Contest, Online</td>
</tr>
<tr>
<td><b>Team AC Ratio</b></td><td>147/1550 (9.5%)</td>
</tr>
</table>

## Tutorial

Let $\text{cost}(v_i)$ be the cost of vertex $v_i$ before adding new red vertex. For the query $v_1, v_2, \cdots, v_k$, sort all vertices by cost in descending order. If no modifications are made, the maximum cost is $\text{cost}(v_1)$.

In order the make the maximum cost less than $\text{cost}(v_i)$, the newly added red vertex must simultaneously affect the cost of vertices $v_1, v_2, \cdots, v_i$. To minimize the maximum cost, it is obvious that this red vertex should be placed at the lowest common ancestor (LCA) of $v_1, v_2, \cdots, v_i$. Let $d(v_i)$ denote the distance from the root to node $v_i$. Then, the maximum cost becomes

$$
\max\begin{cases}
\max (d(v_1), d(v_2), \cdots, d(v_i)) - d(\text{lca}(v_1, v_2, \cdots, v_i)) \\
\text{cost}(v_{i + 1})
\end{cases}
$$

Enumerate $i$ from $1$ to $k$ and select the smallest maximum cost. If there are already other red vertices on the path from the LCA to a vertex $v_j$, the value calculated by the above equation will certainly be greater than or equal to $\text{cost}(v_j)$, and it won't be better than the cost at $i = j - 1$. Since we only care about the smallest maximum cost, this does not affect the final answer.

The complexity is $\mathcal{O}(n\log n + \sum k_i \log \sum k_i)$.

## Solution

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 1e5)
#define MAXP 20
using namespace std;

int n, m, q;
bool flag[MAXN + 10];

vector<int> e[MAXN + 10], v[MAXN + 10];
// dis[i]: distance from the root to vertex i
// cost[i]: cost of vertex i without adding new red vertex
long long dis[MAXN + 10], cost[MAXN + 10];
// maintain RMQ on the DFS sequence to calculate LCA
int clk, bgn[MAXN + 10];
int lg[MAXN * 2 + 10], f[MAXP][MAXN * 2 + 10];

void dfs(int sn, int fa) {
    f[0][++clk] = sn; bgn[sn] = clk;

    for (int i = 0; i < e[sn].size(); i++) {
        int fn = e[sn][i];
        if (fn == fa) continue;

        dis[fn] = dis[sn] + v[sn][i];
        if (flag[fn]) cost[fn] = 0;
        else cost[fn] = cost[sn] + v[sn][i];

        dfs(fn, sn);
        f[0][++clk] = sn;
    }
}

// RMQ pre-calculation
void preLca() {
    for (int p = 1; p < MAXP; p++) for (int i = 1; i + (1 << p) - 1 <= clk; i++) {
        int j = i + (1 << (p - 1));
        if (dis[f[p - 1][i]] < dis[f[p - 1][j]]) f[p][i] = f[p - 1][i];
        else f[p][i] = f[p - 1][j];
    }
}

// calculate LCA of vertices x and y
int lca(int x, int y) {
    if (bgn[x] > bgn[y]) swap(x, y);
    int p = lg[bgn[y] - bgn[x] + 1];
    int a = f[p][bgn[x]], b = f[p][bgn[y] - (1 << p) + 1];
    if (dis[a] < dis[b]) return a;
    else return b;
}

void solve() {
    scanf("%d%d%d", &n, &m, &q);

    memset(flag, 0, sizeof(bool) * (n + 3));
    for (int i = 1; i <= m; i++) {
        int x; scanf("%d", &x);
        flag[x] = true;
    }

    for (int i = 1; i <= n; i++) e[i].clear(), v[i].clear();
    for (int i = 1; i < n; i++) {
        int x, y, z; scanf("%d%d%d", &x, &y, &z);
        e[x].push_back(y); v[x].push_back(z);
        e[y].push_back(x); v[y].push_back(z);
    }

    clk = 0; dfs(1, 0);
    preLca();

    while (q--) {
        vector<int> vec;
        int t; scanf("%d", &t);
        while (t--) {
            int x; scanf("%d", &x);
            vec.push_back(x);
        }
        vec.push_back(0);
        sort(vec.begin(), vec.end(), [&](int a, int b) {
            return cost[a] > cost[b];
        });

        int anc = vec[0];
        long long mx = dis[vec[0]], ans = cost[vec[1]];
        // enumerate how many vertices will the new red vertex affect
        for (int i = 1; i + 1 < vec.size(); i++) {
            anc = lca(anc, vec[i]);
            mx = max(mx, dis[vec[i]]);
            ans = min(ans, max(mx - dis[anc], cost[vec[i + 1]]));
        }
        printf("%lld\n", ans);
    }
}

int main() {
    lg[1] = 0;
    for (int i = 2; i <= MAXN * 2; i++) lg[i] = lg[i >> 1] + 1;

    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
