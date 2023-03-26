---
title: B - Kawa Exam
date: 2023-02-16
---

# B - Kawa Exam

## Basic Information

<table>
<tr>
<td><b>Contest</b></td><td>The 2018 ICPC Asia Qingdao Regional Contest</td>
</tr>
<tr>
<td><b>Team AC Ratio</b></td><td>2/373 (0.5%)</td>
</tr>
</table>

## Tutorial

This problem is the classic "dsu on tree". This problem mainly tests the participant's coding ability.

If we think of the exam questions as vertices and bugs as edges, then the same connected component of vertices can only have the same answer. Therefore, if we don't fix any bugs, the answer of a connected component is the number of occurances of its mode, and the answer of the whole graph can be calculated by adding up the answers of all connected components.

Next, let's consider what happens when we remove an edge. If the edge is not a bridge, then the connectivity of the graph does not change, and the answer does not change either. If the edge is a bridge, then one connected component will become two, and we need to subtract the number of times the mode appears in the original connected component, and then add the number of times the mode appears in the new connected components.

Therefore, we first use Tarjan's algorithm to transform the biconnected components into single vertices, and each vertex records all the elements in the biconnected component. This way, the entire connected component becomes a tree, and removing an edge divides the tree into a subtree and the remaining part. Therefore, the problem becomes:

> Given a tree where each vertex contains some numbers, find the number of times the mode appears in each subtree and the number of times the mode appears outside each subtree.

Finding the number of times the mode appears in each subtree is a classic "dsu on tree" problem. If you are not familiar with "dsu on tree", you can try [CF600E](https://codeforces.com/problemset/problem/600/E) or refer to [oiwiki](https://oi-wiki.org/graph/dsu-on-tree/) and this [CF blog](https://codeforces.com/blog/entry/44351). We'll skip the introduction here.

We will instead explain how to find the number of times the mode appears in $\mathcal{O}(1)$ time when a number is added or removed. 

We maintain `f[i]` to represent how many times the number $i$ appears, and `g[i]` to represent how many numbers appear $i$ times. Suppose the current number of times the mode appears is $a$, when adding a number $x$, we run the following code:

```c++
g[f[x]]--;
f[x]++;
g[f[x]]++;
a = max(a, f[x]);
```

When removing a number $x$, we run the following code:

```c++
g[f[x]]--;
f[x]--;
g[f[x]]++;
// the number of times x appears has been reduced by 1
//   * if x was not the mode originally, it has no effect on the answer;
//   * if x was the mode originally but there are more than one modes, it still has no effect on the answer;
//   * if x was the mode originally and there is only one mode, the mode remains the same after x's occurrence is reduced by 1, and the answer decreases by 1 compared to the original answer.
a = g[a] > 0 ? a : a - 1;
```

The mode outside the subtree is also easy to maintain. Before starting "dsu on tree", we first add all the numbers in the tree to the set. When updating the contribution of the subtree, we subtract the elements in the subtree from the set; when undoing the contribution of the subtree, we add the elements in the subtree back to the set.

Therefore, the time complexity is $\mathcal{O}(n\log n)$.


## Solution

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

// add or delete one number each time, and calculate the number of times the mode appears
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
    // firstly, traverse the light subtrees but don't keep their contributions
    for (int i = 0; i < E[sn].size(); i++) {
        int fn = E[sn][i], val = V[sn][i];
        if (val == from || fn == HEAVY[sn]) continue;
        DSU(fn, false, val, ALL);
    }
    // then, traverse the heavy subtree and keep its contributions
    for (int i = 0; i < E[sn].size(); i++) {
        int fn = E[sn][i], val = V[sn][i];
        if (fn == HEAVY[sn]) DSU(fn, true, val, ALL);
    }
    // add contributions from light subtrees
    for (int i = 0; i < E[sn].size(); i++) {
        int fn = E[sn][i], val = V[sn][i];
        if (val == from || fn == HEAVY[sn]) continue;
        for (int j = DL[fn]; j <= DR[fn]; j++) for (int x : nums[ORD[j]]) M1.add(x), M2.del(x);
    }
    // add contributions from `sn` itself
    for (int x : nums[sn]) M1.add(x), M2.del(x);
    // we can now calculate the answer of `sn`
    if (from) ans[from] = M1.a + M2.a - ALL;
    if (keep) return;
    // undo contributions from subtree of `sn`
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
