---
title: B - Red Black Tree
date: 2023-09-01
---

# B - Red Black Tree

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2018 ICPC 亚洲区域赛青岛站网络赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>147/1550 (9.5%)</td>
</tr>
</table>

## 题解

设 $\text{cost}(v_i)$ 表示加入新红点之前，节点 $v_i$ 的代价。对于询问 $v_1, v_2, \cdots, v_k$，将所有节点按代价从大到小排序，如果不做任何修改，那么代价就是 $\text{cost}(v_1)$。

为了让代价小于 $\text{cost}(v_i)$，新加入的红点要同时改变节点 $v_1, v_2, \cdots, v_i$ 的代价。为了让最大代价尽可能小，显然要把这个红点放在 $v_1, v_2, \cdots, v_i$ 的最近公共祖先（lca）处。设 $d(v_i)$ 表示从根到节点 $v_i$ 的距离，则最大代价变为

$$
\max\begin{cases}
\max (d(v_1), d(v_2), \cdots, d(v_i)) - d(\text{lca}(v_1, v_2, \cdots, v_i)) \\
\text{cost}(v_{i + 1})
\end{cases}
$$

从 $1$ 到 $k$ 枚举 $i$，并选择最小的最大代价即可。如果从 lca 到某个节点 $v_j$ 上已经有其它红点了，那么上式算出来的值一定大于等于 $\text{cost}(v_j)$，不比 $i = j - 1$ 时的代价优。因为我们只关心最小的最大代价，所以这并不影响最终答案的计算。

复杂度 $\mathcal{O}(n\log n + \sum k_i \log \sum k_i)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 1e5)
#define MAXP 20
using namespace std;

int n, m, q;
bool flag[MAXN + 10];

vector<int> e[MAXN + 10], v[MAXN + 10];
// dis[i]：从根到节点 i 的距离
// cost[i]：不加入新红点时，节点 i 的代价
long long dis[MAXN + 10], cost[MAXN + 10];
// 在 dfs 序列上维护 rmq 求 lca
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

// rmq 预处理
void preLca() {
    for (int p = 1; p < MAXP; p++) for (int i = 1; i + (1 << p) - 1 <= clk; i++) {
        int j = i + (1 << (p - 1));
        if (dis[f[p - 1][i]] < dis[f[p - 1][j]]) f[p][i] = f[p - 1][i];
        else f[p][i] = f[p - 1][j];
    }
}

// 求节点 x 和 y 的 lca
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
        // 枚举新的红点要覆盖几个节点
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
