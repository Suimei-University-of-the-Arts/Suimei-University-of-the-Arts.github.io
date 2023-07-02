---
title: F - 多彩的线段
date: 2023-07-01
---

# F - 多彩的线段

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2023 山东省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>5/276 (1.8%)</td>
</tr>
</table>

## 题解

### 错误做法

首先分析一种常见的错误做法。一些读者可能会将所有线段按右端点排序，然后维护 $f(i)$ 表示只考虑前 $i$ 条线段，且第 $i$ 条线段必选有几种方法。枚举上一条选择的线段 $j$，则递推式为

$$
f(i) = 1 + \sum\limits_{1 \le j < i, c_i = c_j} f(j) + \sum\limits_{1 \le j < i, c_i \ne c_j, r_j < l_i} f(j)
$$

关于该做法的反例，考虑一条蓝色线段 $[2, 3]$ 以及两条红色线段 $[4, 5]$ 和 $[1, 6]$，则 $f(2) = 2$（选择 $[4, 5]$ 时，$[2, 3]$ 可选可不选），$f(3) = 1 + f(2) = 3$。然而 $f(3)$ 正确的值应该是 $2$（选择 $[1, 6]$ 时，$[4, 5]$ 可选可不选，$[2, 3]$ 一定不能选），这是因为 $f(2)$ 包含的两种选法对于 $f(3)$ 并非全部有效。

### 正确但复杂度较高的做法

首先仍然将所有线段按右端点排序。根据上一节的分析可知，我们不能将每条线段单独考虑，而是要考虑颜色相同的一整组线段。我们把所选线段分成若干连续段，每一段内的线段颜色都相同。

令 $f(i, c)$ 表示只考虑前 $i$ 条线段，且第 $i$ 条线段必选，且第 $i$ 条线段的颜色为 $c$ 的方案数。转移时，我们枚举上一段的终点 $j$（$j$ 的颜色必须和 $i$ 不同），则转移方程为

$$
f(i, c) = \sum\limits_{j = 0}^{p_i} f(j, 1 - c) \times 2^{g(i - 1, r_j + 1, c)}
$$
 
其中 $p_i$ 表示满足 $r_{p_i} < l_i$ 的最大下标。$g(i - 1, r_j + 1, c)$ 表示前 $(i - 1)$ 条线段中，左端点大于等于 $(r_j + 1)$，且颜色为 $c$ 的线段数量。形象地理解，就是位于上一段终点右边，且颜色和当前线段一样的其它线段随便选。

方便起见，我们令 $r_0 = 0$，$f(0, 0) = f(0, 1) = 1$，这样就解决了初值的问题。答案就是 $1 + \sum\limits_{i = 1}^n f(i, c_i)$。

### 优化复杂度

直接计算这个 dp 的复杂度是 $\mathcal{O}(n^2)$ 的，考虑优化。

令 $h(i, j, c) = f(j, c) \times 2^{g(i, r_j + 1, 1 - c)}$，则 dp 方程可以改写为

$$
f(i, c) = \sum\limits_{j = 0}^{p_i} h(i - 1, j, 1 - c)
$$

注意到 $g$ 有以下递推关系

$$
\begin{cases}
g(i, r_j + 1, c) = g(i - 1, r_j + 1, c) + 1 & \text{if } 1 \le j \le p_i \text{ and } c = c_i \\
g(i, r_j + 1, c) = g(i - 1, r_j + 1, c) & \text{otherwise}
\end{cases}
$$

即

$$
\begin{cases}
h(i, j, c) = 2h(i - 1, j, c) & \text{if } 1 \le j \le p_i \text{ and } c = 1 - c_i \\
h(i, j, c) = h(i - 1, j, c) & \text{otherwise}
\end{cases}
$$

形象地理解，就是处理完第 $i$ 条线段之后，对于所有上一段的终点，可以任意选择的线段数量又增加了一条。

因此我们使用线段树维护 $h(i, j, c)$ 的值。需要支持前缀乘 $2$，单点赋值，以及前缀求和。复杂度 $\mathcal{O}(n\log n)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 1e5)
#define MOD 998244353
using namespace std;

int n;
long long ans;

struct Seg {
    int l, r, c;
} A[MAXN + 10];

long long sumo[2][MAXN * 4 + 10], lazy[2][MAXN * 4 + 10];

// 线段树初始化
void build(int tid, int id, int l, int r) {
    if (l != r) {
        int nxt = id << 1, mid = (l + r) >> 1;
        build(tid, nxt, l, mid); build(tid, nxt | 1, mid + 1, r);
    }
    sumo[tid][id] = 0; lazy[tid][id] = 1;
}

// 线段树 lazy 标志下推
void down(int tid, int id) {
    long long &p = lazy[tid][id];
    if (p == 1) return;
    int nxt = id << 1;
    sumo[tid][nxt] = sumo[tid][nxt] * p % MOD;
    lazy[tid][nxt] = lazy[tid][nxt] * p % MOD;
    sumo[tid][nxt | 1] = sumo[tid][nxt | 1] * p % MOD;
    lazy[tid][nxt | 1] = lazy[tid][nxt | 1] * p % MOD;
    p = 1;
}

// 线段树单点加法
void add(int tid, int id, int l, int r, int pos, long long val) {
    if (l == r) sumo[tid][id] = (sumo[tid][id] + val) % MOD;
    else {
        down(tid, id);
        int nxt = id << 1, mid = (l + r) >> 1;
        if (pos <= mid) add(tid, nxt, l, mid, pos, val);
        else add(tid, nxt | 1, mid + 1, r, pos, val);
        sumo[tid][id] = (sumo[tid][nxt] + sumo[tid][nxt | 1]) % MOD;
    }
}

// 线段树前缀 * 2
void mul2(int tid, int id, int l, int r, int pos) {
    if (r <= pos) {
        sumo[tid][id] = sumo[tid][id] * 2 % MOD;
        lazy[tid][id] = lazy[tid][id] * 2 % MOD;
    } else {
        down(tid, id);
        int nxt = id << 1, mid = (l + r) >> 1;
        mul2(tid, nxt, l, mid, pos);
        if (pos > mid) mul2(tid, nxt | 1, mid + 1, r, pos);
        sumo[tid][id] = (sumo[tid][nxt] + sumo[tid][nxt | 1]) % MOD;
    }
}

// 线段树询问前缀和
long long query(int tid, int id, int l, int r, int pos) {
    if (r <= pos) return sumo[tid][id];
    else {
        down(tid, id);
        int nxt = id << 1, mid = (l + r) >> 1;
        return (
            query(tid, nxt, l, mid, pos) +
            (pos > mid ? query(tid, nxt | 1, mid + 1, r, pos) : 0)
        ) % MOD;
    }
}

void solve() {
    scanf("%d", &n);
    for (int i = 1; i <= n; i++) scanf("%d%d%d", &A[i].l, &A[i].r, &A[i].c);
    // 所有区间按右端点排序
    sort(A + 1, A + n + 1, [](Seg &a, Seg &b) {
        return a.r < b.r;
    });
    A[0].l = A[0].r = 0;

    // dp 初值：f(0, 0) = f(0, 1) = 1
    for (int k = 0; k < 2; k++) build(k, 1, 0, n), add(k, 1, 0, n, 0, 1);
    ans = 1;
    for (int i = 1; i <= n; i++) {
        // 二分找到右端点小于当前线段左端点的、最右边的线段
        int head = 0, tail = i - 1;
        while (head < tail) {
            int mid = (head + tail + 1) >> 1;
            if (A[mid].r < A[i].l) head = mid;
            else tail = mid - 1;
        }
        // 算出以当前线段为结尾的方案数
        long long val = query(A[i].c ^ 1, 1, 0, n, head);
        // h(i, i, c_i) = f(i, c_i)
        add(A[i].c, 1, 0, n, i, val);
        // h(i, j, 1 - c_i) = 2h(i - 1, j, 1 - c_i) if 1 <= j <= p_i
        mul2(A[i].c ^ 1, 1, 0, n, head);
        ans = (ans + val) % MOD;
    }
    printf("%lld\n", ans);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
