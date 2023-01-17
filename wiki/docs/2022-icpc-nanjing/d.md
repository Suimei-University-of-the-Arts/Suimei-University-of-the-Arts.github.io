---
title: D - Chat Program
date: 2022-12-16
---

# D - Chat Program

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2022 ICPC 亚洲区域赛南京站</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>139/465 (29.9%)</td>
</tr>
<tr>
<td><b>提交通过率</b></td><td>139/960 (14.5%)</td>
</tr>
</table>

## 题解

首先二分答案 $x$，将大于等于 $x$ 的数看成 $1$，小于 $x$ 的数看成 $0$。问题变为“判断能否通过至多一次操作，使序列中 $1$ 的数量大于等于 $k$”。

接下来枚举操作位置，并计算进行操作后能否满足要求。考虑一个元素 $a_t$（$a_t < x$）容易发现，在操作范围从左往右移的过程中，当 $a_t$ 第一次进入操作范围时，它会变成最大值，之后慢慢变小，最后又变回原来的值。因此每个数只会从 $0$ 变成 $1$ 一次，再从 $1$ 变成 $0$ 一次。

我们只要对每个元素找出这两次变化的位置，就能利用前缀和算出在每个位置进行操作对 $1$ 的数量的影响。具体如何计算，详见参考代码。

总体复杂度 $\mathcal{O}(n\log A)$，其中 $A$ 是答案可能的最大值。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 2e5)
using namespace std;

int n, K, m;
long long A[MAXN + 10], C, D;

int f[MAXN + 10];

// X 是二分的答案
bool check(long long X) {
    // 计算不进行操作，1 的数量是多少
    int cnt = 0;
    for (int i = 1; i <= n; i++) cnt += A[i] >= X ? 1 : 0;
    // 已经满足要求，直接返回
    if (cnt >= K) return true;

    // f[i] 表示操作范围最右端从 (i - 1) 变成 i 后，1 的数量的变化量
    memset(f, 0, sizeof(int) * (n + 3));
    // 考虑 a_i < X 的所有元素
    for (int i = 1; i <= n; i++) if (A[i] < X) {
        // 计算 a_i 进入操作范围后能变成的最大值
        int R = min(m - 1, i - 1);
        long long mx = A[i] + C + D * R;
        // 最大值也无法超过 X，跳过
        if (mx < X) continue;
        // 最大值超过 X，0 变成 1 就发生在 a_i 刚进入操作范围时
        f[max(m, i)]++;
        // 计算 1 什么时候变回 0
        long long mn = A[i] + C;
        // 连最小值都满足要求，只有在 a_i 离开操作范围时才会变成 0
        if (mn >= X) f[min(n + 1, i + m)]--;
        else {
            // 计算最大的满足 a_i + C + pos * D < X 的 pos
            // 这里不用考虑 D = 0，因为这样会使 mn == mx，不会进入 else 分支
            long long t = X - A[i] - C;
            int pos;
            if (t % D == 0) pos = t / D - 1;
            else pos = t / D;
            f[min(n + 1, i + m - pos - 1)]--;
        }
    }

    // 枚举操作范围最右端的位置
    for (int i = m; i <= n; i++) {
        cnt += f[i];
        if (cnt >= K) return true;
    }
    return false;
}

int main() {
    scanf("%d%d%d%lld%lld", &n, &K, &m, &C, &D);
    for (int i = 1; i <= n; i++) scanf("%lld", &A[i]);

    long long head = 0, tail = 1e15;
    while (head < tail) {
        long long mid = (head + tail + 1) >> 1;
        if (check(mid)) head = mid;
        else tail = mid - 1;
    }
    printf("%lld\n", head);
    return 0;
}
```
