---
title: J - Triangle City
date: 2023-07-15
---

# J - Triangle City

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2019 山东省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>2/307 (0.7%)</td>
</tr>
</table>

## 题解

假设我们选择了一条从 $(1, 1)$ 到 $(n, n)$ 且不经过重复边的路径 $p$。从图上去掉 $p$ 的所有边后，剩下的边就是我们“丢弃”的边，我们来观察这些边的特征。

首先注意到原图中所有节点的度数都是偶数，而去掉 $p$ 之后，只有 $(1, 1)$ 和 $(n, n)$ 两个节点的度数变为奇数，剩下的节点度数仍然为偶数。由于每个连通块的度数总和都是偶数，因此去掉 $p$ 之后，$(1, 1)$ 和 $(n, n)$ 不能分别处于不同的连通块，一定处于同一个连通块。也就是说，我们“丢弃”的边，至少包含一条从 $(1, 1)$ 到 $(n, n)$ 的路径，可能还要加上一些额外的边。

为了让 $p$ 尽量长，我们“丢弃”的边权之和要尽量小。那么从 $(1, 1)$ 到 $(n, n)$ 边权之和最小的路径是什么呢？当然就是从 $(1, 1)$ 到 $(n, n)$ 的最短路。因此我们求出一条从 $(1, 1)$ 到 $(n, n)$ 的最短路，并把它从图中去掉。剩下的图中，只有 $(1, 1)$ 和 $(n, n)$ 两个节点的度数变为奇数，剩下的节点度数仍然为偶数，因此存在一条从 $(1, 1)$ 到 $(n, n)$ 的欧拉路径，刚好符合题目的要求。求出这条欧拉路径就是答案。复杂度 $\mathcal{O}(n^2\log n)$。

有的读者可能会有疑问：如果去掉最短路之后，图变得不连通了，那么欧拉路径就不存在了。然而，由于题目保证了边权符合三角形不等式，因此去掉最短路之后，图一定仍然是连通的。

??? "证明"

    首先证明以下引理。

    > 引理：对于任意 $(i, j)$，$(i + 1, j)$ 和 $(i + 1, j + 1)$ 构成的三角形，从 $(1, 1)$ 到 $(n, n)$ 的最短路最多经过三角形的一条边。

    这一引理容易证明。假设最短路首先经过了 $(i, j) \to (i + 1, j)$，又经过了 $(i + 1, j) \to (i + 1, j + 1)$。由于边权满足三角形不等式，因此直接走 $(i, j) \to (i + 1, j + 1)$ 距离更短。

    $\blacksquare$

    接下来利用反证法证明去掉最短路之后，图仍然是连通的。

    假设共享顶点 $A$ 的两个三角形 $\Delta ABC$ 和 $\Delta ADE$ 去掉最短路之后不连通了，不妨假设点 $B$ 和点 $D$ 不连通了。讨论 $AB$ 和 $AD$ 是否在最短路上。

    * $AB$ 和 $AD$ 都不在最短路上：直接 $B \to A \to D$，与假设矛盾。
    * $AB$ 和 $AD$ 都在最短路上：此时两个三角形都有一条边在最短路上，而 $B \to C \to A \to E \to D$ 仍然是连通的，必须再从 $BC$、$AC$、$AE$、$DE$ 中去掉至少一条边。但这样最短路就会经过其中一个三角形的两条边，与引理矛盾。
    * $AB$ 在最短路上，$AD$ 不在：此时必须再从 $BC$ 和 $AC$ 中去掉至少一条边，否则 $B \to C \to A \to D$ 是连通的。但这样最短路就会经过 $\Delta ABC$ 的两条边，与引理矛盾。
    * $AD$ 在最短路上，$AB$ 不在：同上。

    $\blacksquare$

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN 300
using namespace std;
typedef pair<int, int> pii;
typedef pair<long long, pii> plii;

int n;
vector<int> ans;

int etot, e[MAXN * MAXN * 3 * 2 + 10][3], p[MAXN * MAXN + 10];
long long dis[MAXN * MAXN + 10];
int from[MAXN * MAXN + 10];
bool ban[MAXN * MAXN * 3 * 2 + 10];

int gao(int i, int j) { return i * n + j; }

void adde(int sn, int fn, int val) {
    etot++; e[etot][0] = fn; e[etot][1] = val; e[etot][2] = p[sn]; p[sn] = etot;
    etot++; e[etot][0] = sn; e[etot][1] = val; e[etot][2] = p[fn]; p[fn] = etot;
}

// dijkstra 求从 (1, 1) 到 (n, n) 的最短路
void dijkstra() {
    memset(dis, -1, sizeof(long long) * (n * n + 3));
    priority_queue<plii> pq;
    pq.push(plii(0, pii(0, 0)));
    while (!pq.empty()) {
        plii tp = pq.top(); pq.pop();
        int sn = tp.second.first;
        if (dis[sn] >= 0) continue;
        dis[sn] = -tp.first;
        from[sn] = tp.second.second;
        for (int i = p[sn]; i > 0; i = e[i][2]) {
            int fn = e[i][0];
            if (dis[fn] >= 0) continue;
            pq.push(plii(-dis[sn] - e[i][1], pii(fn, i)));
        }
    }

    memset(ban, 0, sizeof(bool) * (etot + 3));
    for (int sn = gao(n - 1, n - 1); sn > 0; sn = e[from[sn] ^ 1][0]) ban[from[sn]] = ban[from[sn] ^ 1] = true;
}

// hierholzer 求欧拉路径
void dfs(int sn) {
    for (int i = p[sn]; i > 0; i = p[sn]) {
        if (ban[i]) { p[sn] = e[i][2]; continue; }
        ban[i] = ban[i ^ 1] = true;
        dfs(e[i][0]);
        ans.push_back(e[i][0]);
    }
}

short dir[3][4] = {0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1};

void solve() {
    scanf("%d", &n);
    etot = 1;
    memset(p, 0, sizeof(int) * (n * n + 3));
    long long sm = 0;
    for (int k = 0; k < 3; k++) for (int i = 0; i < n - 1; i++) for (int j = 0; j <= i; j++) {
        int x = gao(i + dir[k][0], j + dir[k][1]), y = gao(i + dir[k][2], j + dir[k][3]);
        int z; scanf("%d", &z);
        adde(x, y, z);
        sm += z;
    }

    // 求最短路
    dijkstra();
    // 最长路径就是边权之和减去最短路的长度
    printf("%lld\n", sm - dis[gao(n - 1, n - 1)]);

    // 求欧拉路径
    ans.clear(); dfs(0); reverse(ans.begin(), ans.end());
    printf("%d\n1 1", ans.size() + 1);
    for (int i = 0; i < ans.size(); i++) printf(" %d %d", ans[i] / n + 1, ans[i] % n + 1);
    printf("\n");
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
