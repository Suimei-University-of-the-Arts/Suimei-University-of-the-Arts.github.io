---
title: H - 流画溢彩
date: 2023-05-13
---

# H - 流画溢彩

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2023 广东省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>6/295 (2.0%)</td>
</tr>
</table>

## 题解

本题 idea 来自同名桌游《流画溢彩》。

因为后面的操作会覆盖前面的操作，思考起来比较麻烦。我们不妨把操作顺序倒过来，这样一旦某一列的值确定了，后续操作就再也不会更改这一列的值。以下题解中操作的“先后”，是按操作顺序逆转之后的“先后”来说的。

首先，如果某个操作把两个数都改成 $2$，那么这个操作肯定最优，最先考虑；相应地，如果某个操作把两个数都改成 $1$，那么这个操作肯定最差，最后考虑。剩下的就是一个数改成 $1$，一个数改成 $2$ 的操作。

本题的关键在于把题目转化为图论问题。把每一列看成一个点，把每个操作从改成 $1$ 的那一列向改成 $2$ 的那一列连一条有向边。

考虑选择一条边 $u \to v$，进行它代表的操作。此时 $a_u$ 的值将被锁定为 $1$，而 $u$ 能直接或间接到达的所有点的值将被锁定为 $2$（只要从 $u$ 出发，按 dfs 序走一遍 $u$ 能到达的边即可）。我们要做的就是让锁定为 $1$ 的列尽量少，也就是选择尽量少的点，让它们能到达的点的并集等于整张图的点集。

容易发现，将强连通分量缩点以后，我们将得到一个有向无环图。有向无环图上每一个入度为 $0$ 的点我们都必须选择，才能让它们本身以及它们的后继覆盖整张图。也就是说，我们每次从一个入度为 $0$ 的强连通分量中选择一个点，按 dfs 顺序输出边的编号即可。

这里有一个细节：如果一个入度为 $0$ 的强连通分量被一个 $(l_i, 2, r_i, 2)$ 操作所影响，那么应该选择被影响的点为 dfs 的起始点，因为被影响的点代表的列已经被锁定为 $2$。

复杂度 $\mathcal{O}(n + m)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 5e5)
#define MAXM ((int) 5e5)
using namespace std;

int n, m, OP[MAXM + 10][4];
vector<int> ans;

vector<int> e[MAXN + 10], v[MAXN + 10];
// bel[i]：点 i 属于哪个强连通分量
int clk, bCnt, dfn[MAXN + 10], low[MAXN + 10], bel[MAXN + 10];
bool inStk[MAXN + 10];
stack<int> stk;

// deg[i]：强连通分量 i 的入度
int deg[MAXN + 10];
// vis[i]：dfs 构造答案的过程中，节点 i 是否被访问过
bool vis[MAXN + 10];

// tarjan 求强连通分量
void tarjan(int sn) {
    low[sn] = dfn[sn] = ++clk;
    stk.push(sn); inStk[sn] = true;
    for (int fn : e[sn]) {
        if (!dfn[fn]) {
            tarjan(fn);
            low[sn] = min(low[sn], low[fn]);
        } else if (inStk[fn]) {
            low[sn] = min(low[sn], dfn[fn]);
        }
    }
    if (dfn[sn] == low[sn]) {
        ++bCnt;
        while (stk.top() != sn) {
            bel[stk.top()] = bCnt;
            inStk[stk.top()] = false;
            stk.pop();
        }
        bel[stk.top()] = bCnt;
        inStk[stk.top()] = false;
        stk.pop();
    }
}

// 从节点 sn 开始 dfs，并按 dfs 序将访问过的每条边加入 vec 里
void dfs(int sn, vector<int> &vec) {
    vis[sn] = true;
    for (int i = 0; i < e[sn].size(); i++) {
        int fn = e[sn][i];
        int val = v[sn][i];
        vec.push_back(val);
        if (!vis[fn]) dfs(fn, vec);
    }
}

void solve() {
    scanf("%d%d", &n, &m);

    vector<int> one, two;
    for (int i = 1; i <= n; i++) e[i].clear(), v[i].clear();
    for (int i = 1; i <= m; i++) {
        for (int j = 0; j < 4; j++) scanf("%d", &OP[i][j]);
        if (OP[i][1] == 1 && OP[i][3] == 1) {
            // 两个数都改成 1，最差的操作
            one.push_back(i);
        } else if (OP[i][1] == 2 && OP[i][3] == 2) {
            // 两个数都改成 2，最好的操作
            two.push_back(i);
        } else if (OP[i][1] == 1) {
            // 图中加一条从 1 指向 2 的边
            e[OP[i][0]].push_back(OP[i][2]);
            v[OP[i][0]].push_back(i);
        } else {
            // 图中加一条从 1 指向 2 的边
            e[OP[i][2]].push_back(OP[i][0]);
            v[OP[i][2]].push_back(i);
        }
    }

    // 顺序输出的答案中，两个数都改成 1 的最差操作最先输出
    ans.clear();
    for (int x : one) ans.push_back(x);

    memset(dfn, 0, sizeof(int) * (n + 3));
    clk = bCnt = 0;
    for (int sn = 1; sn <= n; sn++) if (!dfn[sn]) tarjan(sn);

    memset(deg, 0, sizeof(int) * (n + 3));
    for (int sn = 1; sn <= n; sn++) {
        for (int fn : e[sn]) if (bel[sn] != bel[fn]) deg[bel[fn]]++;
    }
    
    vector<int> vec;
    memset(vis, 0, sizeof(bool) * (n + 3));
    // 如果一个入度为 0 的强连通分量受一个 (l_i, 2, r_i, 2) 操作影响，那么需要从 l_i 或 r_i 开始 dfs
    for (int x : two) for (int j = 0; j < 4; j += 2) {
        int sn = OP[x][j];
        if (deg[bel[sn]] == 0 && !vis[sn]) dfs(sn, vec);
    }
    // 剩下的入度为 0 的强连通分量，随便找一个点开始 dfs
    for (int sn = 1; sn <= n; sn++) {
        if (deg[bel[sn]] == 0 && !vis[sn]) dfs(sn, vec);
    }
    // dfs 序是答案的倒序
    reverse(vec.begin(), vec.end());
    ans.insert(ans.end(), vec.begin(), vec.end());

    // 顺序输出的答案中，两个数都改成 2 的最好的操作最后输出
    for (int x : two) ans.push_back(x);

    // 计算序列最终的和
    unordered_map<int, int> mp;
    for (int x : ans) {
        mp[OP[x][0]] = OP[x][1];
        mp[OP[x][2]] = OP[x][3];
    }
    int tot = 0;
    for (auto it = mp.begin(); it != mp.end(); it++) tot += it->second;
    printf("%d\n", tot);
    for (int i = 0; i < m; i++) printf("%d%c", ans[i], "\n "[i + 1 < m]);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
