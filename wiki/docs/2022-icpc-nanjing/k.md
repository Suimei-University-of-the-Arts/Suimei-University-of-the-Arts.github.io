---
title: K - NaN in a Heap
date: 2022-12-16
---

# K - NaN in a Heap

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2022 ICPC 亚洲区域赛南京站</td>
</tr>
<tr>
<td><b>在线练习</b></td><td>暂无</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>7/465 (1.5%)</td>
</tr>
<tr>
<td><b>提交通过率</b></td><td>7/40 (17.5%)</td>
</tr>
</table>

## 总体思路

完全二叉树中，除了最后一个节点的祖先节点（称为特殊点）以外，其它节点的子树都是满二叉树。因此讨论 NaN 节点是否在特殊点即可。

## 详细题解

以下题解中，用“高度”表示一棵二叉树有多少层，而用“深度”表示某一个节点位于第几层。例如，对于一棵高度为 $3$ 的满二叉树（也就是说，有 $2^3 - 1$ 个节点的满二叉树），节点 $1$ 的深度为 $1$，而节点 $6$ 的深度为 $3$。

### 常用结论

首先，您需要知道一个常用结论。考虑以下问题。

给定一棵 $n$ 个节点的树，在每个节点中填一个从 $1$ 到 $n$（含两端）的数，要求每个节点填的数都不一样，且后代节点的数要比祖先节点的数大。求方案数。

这个问题的答案是 $\frac{n!}{\prod\limits_{u \in \mathbb{T}} s_u}$，其中 $\mathbb{T}$ 表示树的所有节点构成的集合，$s_u$ 表示以 $u$ 为根的子树中有几个节点。也就是说，答案就是 $n$ 的阶乘除以每个子树大小的乘积。

??? "常用结论的证明"

    这一结论可以通过对子树使用归纳法证明。
    
    // TODO 补充完整

### 套用结论

接下来回到原问题。根据堆的性质，我们可以把原问题转化为以下计数问题。

给定一棵 $n$ 个节点的完全二叉树，选择一个节点 $u$，将完全二叉树分为以 $u$ 为根的子树 $U$ 和子树之外的部分 $U'$。将 $0$ 填入节点 $u$ 中，还需要将 $1$ 到 $(n - 1)$ 填入 $U$ 和 $U'$ 中，使得 $U$ 和 $U'$ 分别满足后代节点的数要比祖先节点的数大。求方案数。

尝试套用上面的常用结论计算答案。设 $\binom{n}{m}$ 表示从 $n$ 个物品里选 $m$ 个的组合数，$P$ 表示 $U$ 中每个子树大小的乘积，$P'$ 表示 $U'$ 中每个子树大小的乘积，答案为

$$
\begin{matrix}
& \frac{s_u!}{P} \times \frac{(n - s_u)!}{P'} \times \binom{n - 1}{s_u - 1} \\
= & \frac{s_u!}{P} \times \frac{(n - s_u)!}{P'} \times \frac{(n - 1)!}{(s_u - 1)! \times (n - s_u)!} \\
= & \frac{(n - 1)! \times s_u}{P \times P'}
\end{matrix}
$$

只要 $0$ 的位置不一样，肯定就是不同的方案，因此最终总的方案数就是 $\sum\limits_{u=1}^n \frac{(n - 1)! \times s_u}{P \times P'}$。因为我们算的是从 $n!$ 个排列中等概率抽取的概率，因此概率就是总方案数除以 $n!$，即 $\sum\limits_{u=1}^n\frac{s_u}{P \times P' \times n}$。

直接计算这个式子的复杂度至少是 $\mathcal{O}(n)$ 的，但完全二叉树中有许多同构的子树，可以帮助我们减少计算。

### 完全二叉树的性质

具体来说，完全二叉树具有如下性质：称完全二叉树中编号最大的点以及它的祖先节点为“特殊点”，除了特殊点以外，以其它任意一个点为根的子树都是满二叉树。如下图所示，红色的点就是特殊点，而以任意一个黑色点为根的子树都是满二叉树。

![k-editorial.png](k-editorial.png)

另外还可以发现，除了节点 $1$ 以外，每一个特殊点都有一个根节点与它同深度的满二叉子树。称该满二叉树为该特殊点的“兄弟树”。例如，节点 $2$ 的兄弟树是以节点 $3$ 为根的满二叉树，节点 $5$ 的兄弟树是以节点 $4$ 为根的满二叉树。节点 $20$ 虽然看似没有兄弟树，但可以认为节点 $20$ 也有一棵高度为 $0$ 的兄弟树。

因为兄弟树是满二叉树，所以我们只关心它的高度。设整棵树高度为 $D$，某个特殊点的深度为 $d$。如果该特殊点是父节点的左子节点，那么兄弟树的高度为 $(D - d)$；如果该特殊点是父节点的右子节点，那么兄弟树的高度为 $(D - d + 1)$。

记 $sh(d)$ 表示深度为 $d$ 的特殊点的兄弟树的高度，记 $sz(d)$ 表示以深度为 $d$ 的特殊点为根的子树中有几个节点。容易得到递推式：

$$
\begin{matrix}
sz(D) = 1 \\
sz(d) = sz(d + 1) + 2^{sh(d)}
\end{matrix}
$$

### 预处理

接下来尝试计算 $P$ 和 $P'$ 的值。首先预处理如下值。

* $g(i)$ 表示一棵高度为 $i$ 的满二叉树，所有子树大小的乘积。容易得到递推式：

$$
\begin{matrix}
g(1) = 1 \\
g(i) = g(i - 1) \times g(i - 1) \times (2^i - 1)
\end{matrix}
$$

* $h(i, j)$ 表示一棵高度为 $i$ 满二叉树，再去掉任意一棵高度为 $j$ 的子树（要求 $j \le i$。也就是说，现在这棵树有 $(2^i - 2^j)$ 个节点），所有子树大小的乘积。容易得到递推式：

$$
\begin{matrix}
h(i, i) = 1 \\
h(i, j) = h(i - 1, j) \times g(i - 1) \times (2^i - 2^j)
\end{matrix}
$$

容易得到整棵二叉树子树大小的乘积为

$$
X = (\prod\limits_{d=1}^D sz(d)) \times (\prod\limits_{d=2}^D g(d))
$$

预处理的复杂度是 $\mathcal{O}(\log^2 n)$。

### 讨论 NaN 节点的位置

接下来我们讨论两种情况：$u$ 是特殊点，以及 $u$ 不是特殊点。

#### 特殊点

如果 $u$ 是特殊点，设该特殊点深度为 $d$，则所有以深度小于 $d$ 的特殊点为根的子树的大小都将减少 $sz(d)$，而其它子树的大小不受影响。也就是说

$$
\begin{matrix}
s_u = sz(d) \\
P \times P' = X \div (\prod\limits_{i=1}^{d-1}sz(i)) \times (\prod\limits_{i=1}^{d-1}(sz(i) - sz(d)))
\end{matrix}
$$

特殊点只有 $\log n$ 个，枚举所有特殊点即可。这一部分的复杂度是 $\mathcal{O}(\log^2 n)$。

#### 非特殊点

如果 $u$ 不是特殊点，那么它一定位于某个特殊点的兄弟树中。设它位于深度为 $d$ 的特殊点的兄弟树中，且 $u$ 的子树高度为 $w$，则所有以深度小于 $d$ 的特殊点为根的子树的大小都将减少 $(2^w - 1)$，当然该兄弟树内部的节点也会受到影响，而其它子树的大小不受影响。

为了处理这一情况，我们另外计算以下值。

$$
f(d, w) = \prod\limits_{i=1}^d (sz(d) - 2^w + 1)
$$

递推式就是

$$
\begin{matrix}
f(1, w) = n - 2^w + 1 \\
f(d, w) = f(d - 1, w) \times (sz(d) - 2^w + 1)
\end{matrix}
$$

那么

$$
\begin{matrix}
s_u = 2^w - 1 \\
P \times P' = X \div (\prod\limits_{i=1}^{d-1}sz(i)) \times f(d - 1, w) \div g(sh(d)) \times h(sh(d), w)
\end{matrix}
$$

其中 $\prod\limits_{i=1}^{d-1}sz(i) = f(d - 1, 0)$，所以式子可以 $\mathcal{O}(1)$ 计算。我们枚举特殊点以及 $w$ 即可。另外，满足 $d$ 和 $w$ 的点 $u$ 共有 $2^{sh(d) - w}$ 种，所以这一情况求出来的式子要乘以该值。这一部分的复杂度也是 $\mathcal{O}(\log^2 n)$。

### 得到答案

答案就是两种情况加起来，另外除法需要通过逆元计算。总体复杂度 $\mathcal{O}(\log^2 n \log M)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXP 30
#define MOD ((int) 1e9 + 7)
using namespace std;

int n;
long long ans;

int sz[MAXP + 10];
long long f[MAXP + 10][MAXP + 10];
long long g[MAXP + 10], h[MAXP + 10][MAXP + 10];

long long power(long long a, long long b) {
    long long y = 1;
    for (; b; b >>= 1) {
        if (b & 1) y = y * a % MOD;
        a = a * a % MOD;
    }
    return y;
}

long long inv(long long x) {
    return power(x, MOD - 2);
}

// 预处理 g 与 h
void prepare() {
    g[0] = g[1] = 1;
    for (int i = 2; i <= MAXP; i++) g[i] = g[i - 1] * g[i - 1] % MOD * ((1 << i) - 1) % MOD;
    h[1][1] = 1;
    for (int i = 2; i <= MAXP; i++) {
        for (int j = 1; j < i; j++) h[i][j] = h[i - 1][j] * g[i - 1] % MOD * ((1 << i) - (1 << j)) % MOD;
        h[i][i] = 1;
    }
}

void solve() {
    scanf("%d", &n);
    int D = 0;
    for (int x = n; x; x >>= 1) D++;

    memset(sz, 0, sizeof(sz));
    memset(f, 0, sizeof(f));

    // 计算 sz 与 f
    sz[D] = 1;
    long long X = 1;
    for (int d = D, now = n; d > 1; d--) {
        int nxt = now >> 1;
        int z = now & 1 ? D - d + 1 : D - d;
        sz[d - 1] = sz[d] + (1 << z);
        X = X * g[z] % MOD;
        now = nxt;
    }

    for (int j = 0; j < D; j++) f[1][j] = n - ((1 << j) - 1);
    for (int i = 2; i <= D; i++) for (int j = 0, k = 0; k < sz[i]; j++, k = k * 2 + 1) f[i][j] = f[i - 1][j] * (sz[i] - k) % MOD;
    X = inv(X * f[D][0] % MOD);

    ans = 0;
    for (int d = D, now = n; ; d--) {
        // NaN 位于深度为 d 的特殊点
        long long t = X;
        for (int i = 1; i < d; i++) t = t * sz[i] % MOD * inv(sz[i] - sz[d]) % MOD;
        t = t * sz[d] % MOD * inv(n) % MOD;
        ans = (ans + t) % MOD;

        if (d == 1) break;

        // NaN 位于深度为 d 的兄弟树
        int nxt = now >> 1;
        int z = now & 1 ? D - d + 1 : D - d;
        for (int j = 1; j <= z; j++) {
            long long t = X * f[d - 1][0] % MOD * inv(f[d - 1][j]) % MOD;
            t = t * g[z] % MOD * inv(h[z][j]) % MOD;
            t = t * inv(g[j]) % MOD * ((1 << j) - 1) % MOD * inv(n) % MOD;
            t = t * (1 << (z - j)) % MOD;
            ans = (ans + t) % MOD;
        }
        now = nxt;
    }

    printf("%lld\n", ans);
}

int main() {
    prepare();
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
