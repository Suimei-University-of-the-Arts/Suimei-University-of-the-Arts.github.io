---
title: E - Color the Tree
date: 2022-12-16
---

# E - Color the Tree

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2022 ICPC 亚洲区域赛南京站</td>
</tr>
<tr>
<td><b>在线练习</b></td><td>暂无</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>30/465 (6.5%)</td>
</tr>
<tr>
<td><b>提交通过率</b></td><td>30/133 (22.6%)</td>
</tr>
</table>

## 总体思路

注意到一次染色操作只会影响某一层的节点。因此每层节点分开考虑，答案就是把每层节点染黑的最小代价之和。用虚树将复杂度降低到 $\mathcal{O}(n \log n)$。

## 详细题解

### 从暴力 DP 开始

注意到一次染色操作只会影响某一层的节点。因此我们将每层节点分开考虑，答案就是把每层节点染黑的最小代价之和。

假设我们正在考虑染黑深度为 $D$ 的节点。由于深度大的节点无法染黑深度小的节点，因此可以把深度大于 $D$ 的节点暂时删掉，这样深度为 $D$ 的节点就变成了树的叶子。

记 $f(u)$ 表示把以 $u$ 为根的子树中，叶子全部染黑需要的最小代价。记节点 $u$ 的深度为 $d_u$，记节点 $u$ 的所有子节点形成的集合为 $\text{son}(u)$，我们有如下转移方程：

$$
f(u) = \min(a_{D - d_u}, \sum\limits_{v \in \text{son}(u)} f(v))
$$

这个转移方程很好理解：要么父节点一次性把所有子节点的活都干了，要么父节点完全不干活，全部由子节点干活。由于代价都是正数，因此子节点染一些叶子，再让父节点全部染完肯定是不优的。答案即为 $f(1)$。

由于深度最大为 $n$，而每次 dp 的树最多可能有 $n$ 个节点，因此直接套用此 dp 方程的复杂度为 $\mathcal{O}(n^2)$。

### 优化复杂度

如果有一棵树的大小只和叶子的数量呈线性相关，同时又不丢失关键信息，我们就能在总共 $\mathcal{O}(n)$ 的时间内完成每一层的 dp。对了！[虚树](https://oi-wiki.org/graph/virtual-tree/) 的大小就与叶子的数量呈线性相关。

同样假设我们正在考虑染黑深度为 $D$ 的节点。我们建立以这些节点为叶子，且包含节点 $1$ 的虚树。记虚树中的节点 $u$ 在原树中的深度为 $d_u$，记节点 $u$ 在虚树中的所有子节点形成的集合为 $\text{virt-son}(u)$，记节点 $u$ 在虚树中的父节点为 $p_u$，则转移方程可以改写为：

$$
f(u) = \min(\min\limits_{i = d_{p_u} + 1}^{d_u} a_{D - i}, \sum\limits_{v \in \text{virt-son}(u)} f(v))
$$

可以看到，我们用虚树加速了一条链上的 dp 运算。答案同样为 $f(1)$。

![e-editorial.png](e-editorial.png)

括号中的第一项容易用 ST 表或线段树等数据结构在 $\mathcal{O}(\log n)$ 的复杂度内求出，同时建立虚树的总体复杂度也是 $\mathcal{O}(n\log n)$ 的。因此总体复杂度为 $\mathcal{O}(n\log n)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 1e5)
#define MAXP 20
#define INF ((int) 1e9)
using namespace std;

int n;
long long ans, A[MAXN + 10];

long long mino[MAXN * 4 + 10];

vector<int> e[MAXN + 10];
int pa[MAXN + 10][MAXP], dep[MAXN + 10];
vector<int> vec[MAXN + 10];

int tp, stk[MAXN + 10];
vector<int> E[MAXN + 10];

// 建立线段树
void build(int id, int l, int r) {
    if (l == r) mino[id] = A[l];
    else {
        int nxt = id << 1, mid = (l + r) >> 1;
        build(nxt, l, mid); build(nxt | 1, mid + 1, r);
        mino[id] = min(mino[nxt], mino[nxt | 1]);
    }
}

// 线段树查 ql ~ qr 的最小值
long long query(int id, int l, int r, int ql, int qr) {
    if (ql <= l && r <= qr) return mino[id];
    int nxt = id << 1, mid = (l + r) >> 1;
    return min(
        ql <= mid ? query(nxt, l, mid, ql, qr) : INF,
        qr > mid ? query(nxt | 1, mid + 1, r, ql, qr) : INF
    );
}

void dfs(int sn, int fa, int d) {
    pa[sn][0] = fa;
    for (int i = 1; i < MAXP; i++) pa[sn][i] = pa[pa[sn][i - 1]][i - 1];
    dep[sn] = d;
    vec[d].push_back(sn);
    for (int fn : e[sn]) if (fn != fa) dfs(fn, sn, d + 1);
}

int lca(int x, int y) {
    if (dep[x] < dep[y]) swap(x, y);
    for (int i = MAXP - 1; i >= 0; i--) if (dep[pa[x][i]] >= dep[y]) x = pa[x][i];
    if (x == y) return x;
    for (int i = MAXP - 1; i >= 0; i--) if (pa[x][i] != pa[y][i]) x = pa[x][i], y = pa[y][i];
    return pa[x][0];
}

long long dp(int sn, int faD, int D) {
    long long ret;
    if (E[sn].empty()) ret = INF;
    else {
        ret = 0;
        for (int fn : E[sn]) ret += dp(fn, dep[sn], D);
    }
    ret = min(ret, query(1, 0, n - 1, D - dep[sn], D - faD - 1));
    return ret;
}

// 为所有深度为 D 的节点建立虚树并 dp
long long gao(int D) {
    E[1].clear(); stk[tp = 1] = 1;
    for (int x : vec[D]) {
        E[x].clear();
        int a = lca(x, stk[tp]);
        if (a == stk[tp]) {
            stk[++tp] = x;
            continue;
        }
        while (dep[stk[tp - 1]] > dep[a]) {
            E[stk[tp - 1]].push_back(stk[tp]);
            tp--;
        }
        if (a == stk[tp - 1]) {
            E[a].push_back(stk[tp]);
            tp--;
        } else {
            E[a].clear(); E[a].push_back(stk[tp]);
            stk[tp] = a;
        }
        stk[++tp] = x;
    }
    while (tp > 1) {
        E[stk[tp - 1]].push_back(stk[tp]);
        tp--;
    }

    return dp(1, 0, D);
}

void solve() {
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%lld", &A[i]);
    build(1, 0, n - 1);

    for (int i = 1; i <= n; i++) e[i].clear();
    for (int i = 1; i < n; i++) {
        int x, y; scanf("%d%d", &x, &y);
        e[x].push_back(y); e[y].push_back(x);
    }
    for (int i = 1; i <= n; i++) vec[i].clear();
    dfs(1, 0, 1);

    ans = A[0];
    for (int i = 2; i <= n && vec[i].size() > 0; i++) ans += gao(i);
    printf("%lld\n", ans);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
