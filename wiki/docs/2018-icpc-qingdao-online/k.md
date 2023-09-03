---
title: K - XOR Clique
date: 2023-08-31
---

# K - XOR Clique

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2018 ICPC 亚洲区域赛青岛站网络赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>1359/1550 (87.7%)</td>
</tr>
</table>

## 题解

注意到重要性质：把所有数用二进制表示后，$S$ 中所有数的最高位都是一样的。

**证明**：设 $S$ 中存在两个数 $x$ 和 $y$，其中 $x$ 的最高位是 $2^p$，$y$ 的最高位是 $2^q < 2^p$，则 $x \oplus y \ge 2^p > y$，与要求不符。

而且，如果两个数的最高位都是 $2^p$，那么它们异或和的第 $p$ 位是 $0$，异或和肯定小于两个数的最小值。

因此，哪个最高位有最多的数，就把那些数形成的集合作为答案。复杂度 $\mathcal{O}(n\log \max a_i)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXP 30
using namespace std;

int n, ans;
int cnt[MAXP + 5];

void solve() {
    memset(cnt, 0, sizeof(cnt));
    scanf("%d", &n);
    for (int i = 1; i <= n; i++) {
        int x; scanf("%d", &x);
        // 计算 x 的最高位
        int j = 0;
        while (x) x >>= 1, j++;
        // 计算每个最高位有几个数
        cnt[j - 1]++;
    }

    ans = 0;
    // 取拥有最多数的最高位作为答案
    for (int i = 0; i <= MAXP; i++) ans = max(ans, cnt[i]);
    printf("%d\n", ans);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
