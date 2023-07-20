---
title: L - Digit Product
date: 2023-07-16
---

# L - Digit Product

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2019 陕西省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>100/111 (90.1%)</td>
</tr>
</table>

## 题解

如果 $x$ 是 $10$ 的倍数，由于个位数是 $0$，所以 $f(x) = 0$。

因此，只要 $[l, r]$ 里包含 $10$ 的倍数，那么答案就是 $0$。否则暴力计算即可。复杂度 $\mathcal{O}(\min(r - l + 1, 10) \times \log r)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MOD ((int) 1e9 + 7)
using namespace std;

void solve() {
    int L, R; scanf("%d%d", &L, &R);
    long long ans = 1;
    for (int i = L; i <= R; i++) {
        for (int x = i; x; x /= 10) ans = ans * (x % 10) % MOD;
        // 答案已经是 0，后面不管再怎么乘都是 0
        if (ans == 0) break;
    }
    printf("%lld\n", ans);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
