---
title: H - 工厂重现
date: 2022-12-17
---

# H - 工厂重现

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2022 ICPC 亚洲区域赛南京站</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>0/465 (0.0%)</td>
</tr>
</table>

## 总体思路

先把 $\mathcal{O}(n^2)$ 的 dp 方程写出来，发现是 Minkowski Sum 的形式。因此可以启发式合并平衡树优化复杂度。

## 详细题解

### 从暴力 DP 开始

任选一个点定根，记节点 $u$ 的父节点是 $fa_u$。对于一条连接 $u$ 和 $fa_u$ 的权值为 $w_u$ 的边，如果 $u$ 的子树内选了 $i$（$0 \le i \le k$）个关键点，那么这条边对关键点两两距离之和的贡献是 $w_u i(k-i)$。

记 $dp_{u,i}$ 表示以 $u$ 为根的子树里选了 $i$（$0 \le i \le k$）个关键点时子树里每条边贡献之和的最大值。考虑 $u$ 的每个子节点 $v$，当把以 $v$ 为根且包含 $j$（$0 \le j, i + j \le k$）个关键点的子树合并上来时，可以得到转移方程

$$
tdp_{u,ti} = \max_{i+j=ti}\{dp_{u,i} + dp_{v,j} + w_v j(k-j)\}
$$

这里 $tdp_u$ 即为以 $v$ 为根的子树合并到 $u$ 上之后的 $dp_u$。在没有子树合并到 $u$ 上时，只需要考虑是否选 $u$，因此初始有 $dp_{u,0}=dp_{u,1}=0$。

直接计算这一 dp 方程的复杂度为 $\mathcal{O}(n^2)$。

### 优化复杂度

由于两个上凸数组对应位置相加的结果仍然是上凸数组，两个上凸数组的 $(\max,+)$ 卷积的结果仍然是上凸数组（实际就是 Minkowski Sum），可以归纳证明所有 $dp_u$ 都是上凸的，也就是差分数组总是单调不增的。可以使用启发式合并求出每个 $dp_u$ 的差分数组。

??? "如何使用启发式合并求两个上凸数组的 Minkowski Sum"

    考虑这样的问题：
    
    > 给定两个上凸数组 $a_0, a_1, \cdots, a_n$ 与 $b_0, b_1, \cdots, b_m$（上凸数组指的是 $(a_i - a_{i - 1})$ 的值单调不增），对所有 $0 \le k \le n + m$ 求 $c_k = \max\limits_{i + j = k} (a_i + b_j)$ 的值。

    从差分数组的角度考虑问题。令 $a'_i = a_i - a_{i - 1}$，$b'_i = b_i - b_{i - 1}$，上述问题可以转化为：
    
    > 对于所有 $0 \le k \le n + m$，从 $A'$ 里拿出前 $i$ 个数，从 $B'$ 里拿出前 $j$ 个数，要求 $i + j = k$，且拿出来的数加起来最大。

    由于 $A'$ 和 $B'$ 都是单调不增的，所以答案其实就是拿出所有数里最大的 $k$ 个数。我们要做的就是把两个有序数组合并成一个有序数组。可以用平衡树维护有序数组，再把小的平衡树合并到大的平衡树里。

注意上述 dp 方程中，数组 $dp_v$ 的每个元素需要加上 $w_vj(k - j)$ 才能合并到父节点中（相当于 $dp_v$ 的差分数组的每个元素加上 $(w_v(k + 1) - 2w_vj)$），因此需要支持对一个数组加常数以及加等差数列的操作。

我们使用平衡树 + lazy tag 下推的方式实现这些操作。如果使用 Treap 等平衡树，加上启发式合并，总体复杂度为 $\mathcal{O}(n \log^2 n)$；如果使用 Splay Tree 则复杂度为 $O(n\log{n})$（具体原因详见 [Dynamic Finger Theorem](https://en.wikipedia.org/wiki/Splay_tree)）。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 1e5)
using namespace std;
typedef pair<int, int> pii;

int n, K;
long long ans;

vector<int> e[MAXN + 10], v[MAXN + 10];
int rt[MAXN + 10], sz[MAXN + 10], chL[MAXN + 10], chR[MAXN + 10], prio[MAXN + 10];
long long keyo[MAXN + 10], lc[MAXN + 10], ld[MAXN + 10];

// 下推 lazy tag
void down(int id) {
    if (lc[id] == 0 && ld[id] == 0) return;
    long long t = lc[id] + (sz[chL[id]] + 1) * ld[id];
    keyo[id] += t;
    if (chL[id]) lc[chL[id]] += lc[id], ld[chL[id]] += ld[id];
    if (chR[id]) lc[chR[id]] += t, ld[chR[id]] += ld[id];
    lc[id] = ld[id] = 0;
}

// 求平衡树第 pos 大的值
long long query(int id, int pos) {
    assert(id);
    down(id);
    int t = sz[chL[id]] + 1;
    if (t == pos) return keyo[id];
    else if (t > pos) return query(chL[id], pos);
    else return query(chR[id], pos - t);
}

void update(int id) {
    sz[id] = sz[chL[id]] + sz[chR[id]] + 1;
}

// 无旋 treap split
pii split(int id, long long key) {
    down(id);
    if (!id) return pii(0, 0);
    if (keyo[id] <= key) {
        pii p = split(chR[id], key);
        chR[id] = p.first;
        update(id);
        return pii(id, p.second);
    } else {
        pii p = split(chL[id], key);
        chL[id] = p.second;
        update(id);
        return pii(p.first, id);
    }
}

// 无旋 treap merge
int merge(int x, int y) {
    down(x); down(y);
    if (!x && !y) return 0;
    else if (x && !y) return x;
    else if (!x && y) return y;

    if (prio[x] <= prio[y]) {
        chR[x] = merge(chR[x], y);
        update(x);
        return x;
    } else {
        chL[y] = merge(x, chL[y]);
        update(y);
        return y;
    }
}

// 启发式合并平衡树
int mix(int x, int y) {
    if (sz[x] > sz[y]) swap(x, y);
    while (x) {
        long long key = query(x, 1);
        pii p = split(x, key);
        x = p.second;
        pii q = split(y, key);
        y = merge(merge(q.first, p.first), q.second);
    }
    return y;
}

// 树 dp
void dfs(int sn, int fa) {
    rt[sn] = sn; sz[sn] = 1; prio[sn] = rand();
    for (int i = 0; i < e[sn].size(); i++) {
        int fn = e[sn][i];
        if (fn == fa) continue;
        dfs(fn, sn);
        lc[rt[fn]] -= 1LL * v[sn][i] * (K + 1);
        ld[rt[fn]] += 2LL * v[sn][i];
        rt[sn] = mix(rt[sn], rt[fn]);
    }
}

int main() {
    srand(time(0));
    scanf("%d%d", &n, &K);
    for (int i = 1; i < n; i++) {
        int x, y, z; scanf("%d%d%d", &x, &y, &z);
        e[x].push_back(y); v[x].push_back(z);
        e[y].push_back(x); v[y].push_back(z);
    }

    dfs(1, 0);
    for (int i = 1; i <= K; i++) ans -= query(rt[1], i);
    printf("%lld\n", ans);
    return 0;
}
```
