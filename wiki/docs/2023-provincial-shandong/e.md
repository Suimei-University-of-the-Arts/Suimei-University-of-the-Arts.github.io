---
title: E - 数学问题
date: 2023-07-01
---

# E - 数学问题

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2023 山东省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>57/276 (20.7%)</td>
</tr>
</table>

## 题解

显然一定先进行除法，然后再进行乘法，不会把新乘上去的东西再除掉。

进行 $p$ 次乘法操作后，$n$ 的范围是 $[k^p \times n_0, k^p \times (n_0 + 1) - 1]$（其中 $n_0$ 是 $n$ 完成除法操作时的值），只要这个范围里面包括 $m$ 的倍数即可停止乘法操作。因此乘法操作至多进行 $\log_k m$ 次。

所以我们枚举除法操作进行几次，然后枚举乘法操作进行几次即可。复杂度 $\mathcal{O}(\log_k n \times \log_k m)$。

如果直接按上面的思路实现，可能中间结果会超出 `long long` 的范围。可以选择用 `__int128` 实现，也可以直接在 $\bmod m$ 的意义下计算，详见参考代码。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
using namespace std;

long long n, K, m, a, b;

void solve() {
    scanf("%lld%lld%lld%lld%lld", &n, &K, &m, &a, &b);
    if (n % m == 0) { printf("0\n"); return; }
    if (K == 1) { printf("-1\n"); return; }

    long long ans = 1e18, cost = 0;
    while (true) {
        // base：乘法操作之后的范围区间左端点
        // p：乘法操作之后范围区间的长度
        long long base = n % m, p = 1;
        for (int i = 0; ; i++) {
            // 还需要几次操作才能到达下一个 m 的倍数
            long long delta = (m - base) % m;
            if (delta < p) {
                // 范围区间覆盖了 m 的倍数，更新答案
                ans = min(ans, cost + i * a);
                break;
            }
            // 再做一次乘法操作
            base = base * K % m;
            p *= K;
        }
        if (n == 0) break;
        // 枚举除法操作的次数
        n /= K;
        cost += b;
    }
    printf("%lld\n", ans);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
