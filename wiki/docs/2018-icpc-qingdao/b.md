---
title: B - Kawa Exam
date: 2023-02-16
---

# B - Kawa Exam

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2018 ICPC 亚洲区域赛青岛站</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>2/373 (0.5%)</td>
</tr>
</table>

## 题解

比较套路的 dsu on tree（树上启发式合并），主要考察选手的代码能力。

我们把考试题看成点，bug 看成边，那么同一连通块的点只能选择同种答案。因此如果我们不修复任何 bug，答案就是所有连通块众数出现的次数之和。

接下来考虑去掉一条边会发生什么变化。如果我们去掉的不是割边，那么图的连通性没有改变，答案也没有改变。如果我们去掉的是割边，那么一个连通块将会变为两个，答案要减去原连通块众数出现的次数，再分别加上新连通块众数出现的次数。

因此我们先用 tarjan 算法把边双连通分量缩成一个点，每个点上记录边双连通分量里的所有元素。这样整个连通块就变成了一棵树，去掉一条边就是把树分成一个子树和剩下的部分。因此问题变为：

> 给一棵树，每个点上都记录了一些数字。求每个子树内众数出现的次数，以及每个子树外众数出现的次数。

子树内众数出现的次数就是经典的 dsu on tree。不熟悉 dsu on tree 的同学可以做一下 [CF600E](https://codeforces.com/problemset/problem/600/E)，也可以参考 [oiwiki](https://oi-wiki.org/graph/dsu-on-tree/) 和这个 [CF blog](https://codeforces.com/blog/entry/44351)，这里不展开介绍。

这里讲一下每次加入或删除一个数，如何 $\mathcal{O}(1)$ 求众数的出现次数：我们维护 `f[i]` 表示数 $i$ 出现了几次，`g[i]` 表示出现次数为 $i$ 的数有几个。假设当前众数的出现次数为 $a$，加入数 $x$ 的时候，依次运行：
```c++
g[f[x]]--;
f[x]++;
g[f[x]]++;
a = max(a, f[x]);
```

删除数 $x$ 的时候，依次运行：
```c++
g[f[x]]--;
f[x]--;
g[f[x]]++;
// x 的出现次数减少了 1
//   * 如果 x 原来就不是众数，那么对答案无影响；
//   * 如果 x 原来是众数，但是有多于一种众数，那么对答案仍然无影响；
//   * 如果 x 原来是众数，而且只有一种众数，那么 x 出现次数减 1 以后众数还是它，答案比原来减少 1。
a = g[a] > 0 ? a : a - 1;
```

子树外的众数也很好维护。我们在开始 dsu on tree 之前，先把树中的所有数字加入集合，每次更新子树贡献时，我们从集合里扣掉子树里的元素；回撤子树贡献时，我们再把子树里的元素加回来。

因此整体的时间复杂度是 $\mathcal{O}(n\log n)$。


## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 1e5)
#define MAXM ((int) 1e5)
#define MAXA ((int) 1e5)
using namespace std;

int n, m, A[MAXN + 10], ans[MAXM + 10];

vector<int> e[MAXN + 10], v[MAXN + 10];
int clk, dfn[MAXN + 10], low[MAXN + 10];
stack<int> stk;
bool inS[MAXN + 10];

int bCnt, bel[MAXN + 10];
vector<int> nums[MAXN + 10];

vector<int> E[MAXN + 10], V[MAXN + 10];
int CLK, ORD[MAXN + 10], DL[MAXN + 10], DR[MAXN + 10], SZ[MAXN + 10], HEAVY[MAXN + 10];

// 每次添加或删除一个数，求众数的出现次数
struct Mode {
    int f[MAXA + 10], g[MAXN + 10], a;

    void clear() {
        for (int i = 1; i <= n; i++) f[A[i]] = 0;
        for (int i = 1; i <= n; i++) g[i] = 0;
        a = 0;
    }

    void add(int x) {
        if (f[x]) g[f[x]]--;
        f[x]++;
        g[f[x]]++;
        a = max(a, f[x]);
    }

    void del(int x) {
        g[f[x]]--;
        f[x]--;
        if (f[x]) g[f[x]]++;
        a = g[a] > 0 ? a : a - 1;
    }
} M1, M2;

void tarjan(int sn, int from) {
    low[sn] = dfn[sn] = ++clk;
    stk.push(sn); inS[sn] = true;
    for (int i = 0; i < e[sn].size(); i++) {
        int fn = e[sn][i], val = v[sn][i];
        if (val == from) continue;
        if (!dfn[fn]) {
            tarjan(fn, val);
            low[sn] = min(low[sn], low[fn]);
        } else if (inS[fn]) {
            low[sn] = min(low[sn], dfn[fn]);
        }
    }

    if (dfn[sn] == low[sn]) {
        bCnt++;
        while (stk.top() != sn) {
             bel[stk.top()] = bCnt;
             inS[stk.top()] = false; stk.pop();
        }
        bel[sn] = bCnt;
        inS[sn] = false; stk.pop();
    }
}

void DFS(int sn, int fa) {
    DL[sn] = ++CLK; ORD[CLK] = sn;
    SZ[sn] = nums[sn].size(); HEAVY[sn] = 0;
    for (int fn : E[sn]) if (fn != fa) {
        DFS(fn, sn);
        SZ[sn] += SZ[fn];
        if (SZ[HEAVY[sn]] < SZ[fn]) HEAVY[sn] = fn;
    }
    DR[sn] = CLK;
}

void DSU(int sn, bool keep, int from, int ALL) {
    // 先遍历轻子树，不保留影响
    for (int i = 0; i < E[sn].size(); i++) {
        int fn = E[sn][i], val = V[sn][i];
        if (val == from || fn == HEAVY[sn]) continue;
        DSU(fn, false, val, ALL);
    }
    // 再遍历重子树，保留影响
    for (int i = 0; i < E[sn].size(); i++) {
        int fn = E[sn][i], val = V[sn][i];
        if (fn == HEAVY[sn]) DSU(fn, true, val, ALL);
    }
    // 添加轻子树的影响
    for (int i = 0; i < E[sn].size(); i++) {
        int fn = E[sn][i], val = V[sn][i];
        if (val == from || fn == HEAVY[sn]) continue;
        for (int j = DL[fn]; j <= DR[fn]; j++) for (int x : nums[ORD[j]]) M1.add(x), M2.del(x);
    }
    // 添加节点本身的影响
    for (int x : nums[sn]) M1.add(x), M2.del(x);
    // 此时节点 sn 的答案就可以求了
    if (from) ans[from] = M1.a + M2.a - ALL;
    if (keep) return;
    // 回撤子树 sn 的影响
    for (int j = DL[sn]; j <= DR[sn]; j++) for (int x : nums[ORD[j]]) M1.del(x), M2.add(x);
}

void solve() {
    scanf("%d%d", &n, &m);
    for (int i = 1; i <= n; i++) scanf("%d", &A[i]);

    for (int i = 1; i <= n; i++) e[i].clear(), v[i].clear();
    for (int i = 1; i <= m; i++) {
        int x, y; scanf("%d%d", &x, &y);
        e[x].push_back(y); v[x].push_back(i);
        e[y].push_back(x); v[y].push_back(i);
    }

    clk = 0; bCnt = 0;
    memset(dfn, 0, sizeof(int) * (n + 3));
    for (int i = 1; i <= n; i++) if (!dfn[i]) tarjan(i, 0);
    
    for (int i = 1; i <= n; i++) nums[i].clear();
    for (int i = 1; i <= n; i++) nums[bel[i]].push_back(A[i]);

    for (int i = 1; i <= n; i++) E[i].clear(), V[i].clear();
    for (int sn = 1; sn <= n; sn++) for (int i = 0; i < e[sn].size(); i++) {
        int fn = e[sn][i], val = v[sn][i];
        if (bel[sn] == bel[fn]) continue;
        E[bel[sn]].push_back(bel[fn]); V[bel[sn]].push_back(val);
    }
    
    CLK = 0;
    memset(DL, 0, sizeof(int) * (n + 3));
    memset(ans, 0, sizeof(int) * (m + 3));
    for (int i = 1; i <= n; i++) if (!DL[i]) {
        DFS(i, 0);
        for (int j = DL[i]; j <= DR[i]; j++) for (int x : nums[ORD[j]]) M2.add(x);
        ans[0] += M2.a;
        DSU(i, false, 0, M2.a);
        for (int j = DL[i]; j <= DR[i]; j++) for (int x : nums[ORD[j]]) M2.del(x);
    }
    for (int i = 1; i <= m; i++) printf("%d%c", ans[i] + ans[0], "\n "[i < m]);
    M1.clear(); M2.clear();
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
