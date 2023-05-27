---
title: B - 基站建设
date: 2023-05-10
---

# B - 基站建设

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2023 广东省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>57/295 (19.3%)</td>
</tr>
</table>

## 题解

维护 $f(i)$ 表示只考虑前 $i$ 个位置，且第 $i$ 个位置必须建设基站的最小总成本。考虑上一个建设基站的位置 $j$，得到 dp 方程

$$
f(i) = \min\limits_{j} f(j) + a_i
$$

由于题目要求每个区间里都至少要有一个基站，因此 $[j + 1, i - 1]$ 之间不能存在一个完整的区间。因此，对于每个 $1 \le i \le n$，我们计算 $p_i$ 满足 $[p_i, i]$ 之间不存在一个完整的区间，且 $p_i$ 尽可能小，则 $j \ge p_{i - 1} - 1$。所有 $p_i$ 的值可以用双指针法求出（因为如果 $[l, r]$ 里存在一个完整的区间，那么 $[l' \le l, r' \ge r]$ 里肯定也存在一个完整的区间，满足双指针法的特性）。

上述 dp 可以用 [单调队列](https://oi-wiki.org/ds/monotonous-queue/) 优化到 $\mathcal{O}(n)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 5e5)
using namespace std;

int n, A[MAXN + 10];

vector<int> B[MAXN + 10];
int LIM[MAXN + 10];
long long f[MAXN + 10];

int head, tail, q[MAXN + 10];

void solve() {
    scanf("%d", &n);
    for (int i = 1; i <= n; i++) scanf("%d", &A[i]);
    // 为了方便得到最终答案，可以令 A[n + 1] = 0，然后要求 [n + 1, n + 1] 里建设一座基站，
    // 这样答案就是 f[n + 1] 了
    A[++n] = 0;

    int m; scanf("%d", &m);
    // B[i] 是一个 vector，
    // 里面的负数 -j 表示有一个需求区间是 [i, j]，
    // 里面是正数 j 表示有一个需求区间是 [j, i]，
    // 方便我们等下用双指针算 p_i
    for (int i = 1; i <= n; i++) B[i].clear();
    for (int i = 1; i <= m; i++) {
        int l, r; scanf("%d%d", &l, &r);
        B[l].push_back(-r);
        B[r].push_back(l);
    }
    B[n].push_back(-n);
    B[n].push_back(n);

    // now 记录了双指针区间 [j, i] 中有几个完整的需求区间
    int now = 0;
    for (int i = 1, j = 1; i <= n; i++) {
        // 双指针右端点移动一步，增加右端点为 i 且位于 [j, i] 里的需求区间
        for (int x : B[i]) if (x > 0 && x >= j) now++;
        // 求出 j = p_i + 1
        while (now > 0 && j <= i) {
            // 双指针左端点移动一步，减少左端点为 j 且位于 [j, i] 里的需求区间
            for (int x : B[j]) if (x < 0 && -x <= i) now--;
            j++;
        }
        assert(now == 0);
        // LIM[i] = p_i
        LIM[i] = j;
    }

    // dp 初值
    f[0] = 0;
    f[1] = A[1];
    // 用 dp 初值初始化单调队列
    head = tail = 1;
    q[tail++] = 0;
    q[tail++] = 1;

    for (int i = 2; i <= n; i++) {
        // 要求上一个基站的位置 >= p_{i - 1} - 1
        int lim = LIM[i - 1] - 1;
        while (q[head] < lim) head++;
        f[i] = f[q[head]] + A[i];
        while (head < tail && f[q[tail - 1]] >= f[i]) tail--;
        q[tail++] = i;
    }
    printf("%lld\n", f[n]);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
