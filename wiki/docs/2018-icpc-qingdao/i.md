---
title: I - Soldier Game
date: 2023-02-15
---

# I - Soldier Game

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2018 ICPC 亚洲区域赛青岛站</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>6/373 (1.6%)</td>
</tr>
</table>

## 题解

我们换一种方式描述题目：

> 用长度为 $1$ 或 $2$ 的线段覆盖整个序列，线段的价值就是线段覆盖的元素之和。最小化最大价值和最小价值之差。

考虑用线段树解决该问题。维护 $f(l, r, x \in \{0, 1\}, y \in \{0, 1\})$ 表示覆盖子数组 $a_l, a_{l + 1}, \cdots, a_r$ 的最大价值最小是多少。其中：

* $x = 0$ 表示覆盖 $a_l$ 的线段被完全包含在区间 $[l, r]$ 中，即覆盖 $a_l$ 的线段可能是 $[l, l]$ 或 $[l, l + 1]$。
* $x = 1$ 表示覆盖 $a_l$ 的线段有一部分不在 $[l, r]$ 中，即覆盖 $a_l$ 的线段是 $[l - 1, l]$。
* $y = 0$ 表示覆盖 $a_r$ 的线段被完全包含在区间 $[l, r]$ 中，即覆盖 $a_r$ 的线段可能是 $[r, r]$ 或 $[r - 1, r]$。
* $y = 1$ 表示覆盖 $a_r$ 的线段有一部分不在 $[l, r]$ 中，即覆盖 $a_r$ 的线段是 $[r, r + 1]$。

可以得到线段树上的递归方程：

$$
f(l, r, x, y) = \min_{k \in {0, 1}} \{ \max(f(l, m, x, k), f(m + 1, r, k, y)) \}
$$

其中 $m = \lfloor\frac{l + r}{2}\rfloor$。答案就是 $f(1, n, 0, 0)$，初值为：

* $f(i, i, 0, 0) = a_i$，这是长度为 $1$ 的线段。
* $f(i, i, 0, 1) = a_i + a_{i + 1}$，这是长度为 $2$ 的线段。
* $f(i, i, 1, 0) = -\infty$，此时覆盖 $a_i$ 的代价算在前一个区间里。
* $f(i, i, 1, 1) = +\infty$，$a_i$ 不能同时被两个线段覆盖。

接下来考虑枚举线段的最小价值 $v$，并将所有价值小于 $v$ 的线段移除（不需要真的移除，可以把它们的价值改为 $+\infty$），此时答案就是 $f(1, n, 0, 0) - v$。

一共只有 $(2n - 1)$ 种 $v$ 值，每次用线段树修改线段的价值并维护 $f$ 的值即可。时间复杂度 $\mathcal{O}(n\log n)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 1e5)
#define INF ((long long) 1e18)
using namespace std;
typedef pair<int, int> pii;
typedef pair<long long, pii> plii;

int n, A[MAXN + 10];
long long ans;

long long f[MAXN * 4 + 10][2][2];

// 套递归方程，更新线段树上的 f 值
void update(int id) {
    int nxt = id << 1;
    for (int i = 0; i <= 1; i++) for (int j = 0; j <= 1; j++) {
        f[id][i][j] = INF;
        for (int k = 0; k <= 1; k++) f[id][i][j] = min(f[id][i][j], max(f[nxt][i][k], f[nxt | 1][k][j]));
    }
}

// 构建线段树
void build(int id, int l, int r) {
    if (l == r) {
        // 递归方程初值
        f[id][0][0] = A[l];
        f[id][0][1] = l < n ? A[l] + A[l + 1] : INF;
        f[id][1][0] = l > 1 ? -INF : INF;
        f[id][1][1] = INF;
    } else {
        int nxt = id << 1, mid = (l + r) >> 1;
        build(nxt, l, mid);
        build(nxt | 1, mid + 1, r);
        update(id);
    }
}

// 把以 pos 为起点，len 为长度的线段的价值改成 +INF
void modify(int id, int l, int r, int pos, int len) {
    if (l == r) {
        if (len == 1) f[id][0][0] = INF;
        else f[id][0][1] = INF;
    } else {
        int nxt = id << 1, mid = (l + r) >> 1;
        if (pos <= mid) modify(nxt, l, mid, pos, len);
        else modify(nxt | 1, mid + 1, r, pos, len);
        update(id);
    }
}

void solve() {
    scanf("%d", &n);
    for (int i = 1; i <= n; i++) scanf("%d", &A[i]);
    
    build(1, 1, n);
    // 将所有线段的价值排序，以便枚举最小价值
    vector<plii> vec;
    for (int i = 1; i <= n; i++) vec.push_back(plii(A[i], pii(i, 1)));
    for (int i = 1; i < n; i++) vec.push_back(plii(A[i] + A[i + 1], pii(i, 2)));
    sort(vec.begin(), vec.end());

    ans = INF;
    // 枚举最小价值
    for (plii p : vec) {
        ans = min(ans, f[1][0][0] - p.first);
        modify(1, 1, n, p.second.first, p.second.second);
    }
    printf("%lld\n", ans);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
