---
title: J - 完美匹配
date: 2022-12-16
---

# J - 完美匹配

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2022 ICPC 亚洲区域赛南京站</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>13/465 (2.8%)</td>
</tr>
</table>

## 题解

当 $i - a_i = j - a_j$ 或 $i + a_i = j + a_j$ 时，$i$ 和 $j$ 有连边。我们构建这样一个二分图：每个 $i$ 可以看做是一条边，这条边连接二分图左边编号为 $(i - a_i)$ 的点，以及右边编号为 $(i + a_i)$ 的点。此时 $i$ 和 $j$ 能匹配当且仅当它们在二分图里对应的边有公共顶点。

问题转化成将一张图分解成若干条边不相交（点可以相交）的长度为 $2$ 的链。首先，对于每个连通分量，如果它含有奇数条边，那显然是无解的。否则考虑以下构造解的方式。

先随便找一棵 dfs 树，然后从深到浅考虑每一个点。找到所有和它相连的未被匹配的边，除了它连向父亲的边（这条边显然未被匹配）。如果这些边是偶数条，两两匹配即可，连向父亲的边会在处理父亲时被匹配上。如果这些边是奇数条，就把连向父亲的边也加入匹配。

这个构造方式唯一可能出问题的地方，在于根节点不存在连向父亲的边。但考虑到构造过程容易发现，当我们递归回到根节点时，此时 dfs 树上未匹配的边都是从根节点连向子节点的边（这里的子节点是直接子节点，而不是子树中的节点）。由于之前处理每个点时都让每两条边互相匹配了，如果此时未被匹配的边有奇数条，说明整个连通块边的总数也是奇数条，不符合之前的假设。因此这个构造方式一定能构造出可行解。

实际上，这个构造的子问题较为经典。在 [POJ3222](http://poj.org/problem?id=3222) 以及 [CF858F](https://codeforces.com/problemset/problem/858/F) 都曾出现过。

复杂度 $\mathcal{O}(n)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 1e5)
using namespace std;
typedef pair<int, int> pii;

int n, A[MAXN + 10];
vector<pii> ans;

int L, R;
unordered_map<int, int> mpL, mpR;

vector<int> e[MAXN * 2 + 10], v[MAXN * 2 + 10];
int deg[MAXN * 2 + 10], dep[MAXN * 2 + 10];
bool vis[MAXN * 2 + 10];

// BFS 用来统计连通块内边的数量
int bfs(int S) {
    int ret = 0;
    queue<int> q;
    q.push(S); vis[S] = true;
    while (!q.empty()) {
        int sn = q.front(); q.pop();
        ret += deg[sn];
        for (int fn : e[sn]) if (!vis[fn]) {
            q.push(fn);
            vis[fn] = true;
        }
    }
    return ret / 2;
}

// 返回还没有匹配的边
int dfs(int sn, int fa, int from, int d) {
    dep[sn] = d;
    vector<int> vec;
    for (int i = 0; i < e[sn].size(); i++) {
        int fn = e[sn][i], idx = v[sn][i];
        if (fn == fa) continue;
        // 把返祖边和子节点传上来的边都记录下来
        if (dep[fn] > 0) {
            if (dep[fn] < dep[sn]) vec.push_back(idx);
        } else {
            int t = dfs(fn, sn, idx, d + 1);
            if (t > 0) vec.push_back(t);
        }
    }

    // 把记录下来的边两两匹配
    while (vec.size() > 1) {
        int x = vec.back(); vec.pop_back();
        int y = vec.back(); vec.pop_back();
        ans.push_back(pii(x, y));
    }
    if (vec.size() == 1) {
        // 还剩一条边没匹配，把连向父节点的边也用来匹配
        assert(from > 0);
        ans.push_back(pii(vec.back(), from));
        return -1;
    } else {
        // 连向父节点的边交给父节点匹配
        return from;
    }
}

void solve() {
    mpL.clear(); mpR.clear();
    scanf("%d", &n);
    for (int i = 1; i <= n; i++) {
        scanf("%d", &A[i]);
        mpL[A[i] - i] = 0;
        mpR[A[i] + i] = 0;
    }
    // 离散化
    L = R = 0;
    for (auto it = mpL.begin(); it != mpL.end(); it++) it->second = ++L;
    for (auto it = mpR.begin(); it != mpR.end(); it++) it->second = ++R;

    // 建立二分图
    for (int i = 1; i <= n * 2; i++) e[i].clear(), v[i].clear();
    memset(deg, 0, sizeof(int) * (n * 2 + 3));
    for (int i = 1; i <= n; i++) {
        int x = mpL[A[i] - i], y = L + mpR[A[i] + i];
        e[x].push_back(y); v[x].push_back(i);
        e[y].push_back(x); v[y].push_back(i);
        deg[x]++;  deg[y]++;
    }

    ans.clear();
    memset(vis, 0, sizeof(bool) * (n * 2 + 3));
    memset(dep, 0, sizeof(int) * (n * 2 + 3));
    // 枚举每个连通块
    for (int i = 1; i <= L + R; i++) if (!vis[i]) {
        // 奇数条边则无解
        if (bfs(i) & 1) { printf("No\n"); return; }
        // 偶数条边则构造答案
        dfs(i, 0, -1, 1);
    }

    printf("Yes\n");
    for (pii p : ans) printf("%d %d\n", p.first, p.second);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
