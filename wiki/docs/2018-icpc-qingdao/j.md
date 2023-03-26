---
title: J - Books
date: 2023-01-29
---

# J - Books

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2018 ICPC 亚洲区域赛青岛站</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>350/373 (93.8%)</td>
</tr>
</table>

## 题解

您可能一开始会尝试二分答案，然而本题没有二分性。考虑有三本书，价格分别为 $4$，$1$，$2$。如果有 $3$ 块钱可以买最后两本书，如果有 $4$ 块钱只能买第一本书，如果有 $5$ 块钱又能买前两本书。

首先来判断特殊情况。

* 如果所有书全买了就是 `Richman`。
* 由于价格为 $0$ 的书一定会购买，设价格为 $0$ 的书有 $z$ 本。如果 $z > m$ 就是 `Impossible`。

接下来讨论一般情况。首先把价格为 $0$ 的书都去掉，从剩下的 $(n - z)$ 本书中购买 $(m - z)$ 本。其实经过思考不难发现，答案就是前 $(m - z)$ 本书的价格之和，加上剩下 $(n - m)$ 本书的最小价格减一。容易发现无论再增加多少钱，都会至少额外购买剩下的一本书。

时间复杂度 $\mathcal{O}(n)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 1e5)
using namespace std;

int n, m, A[MAXN + 10];

void solve() {
    scanf("%d%d", &n, &m);

    int zero = 0;
    for (int i = 1; i <= n; i++) {
        scanf("%d", &A[i]);
        if (A[i] == 0) zero++;
    }

    // 特殊情况
    if (n == m) printf("Richman\n");
    else if (zero > m) printf("Impossible\n");
    else {
        m -= zero;
        // 计算前 m - zero 本书的价格之和
        long long sm = 0;
        int i;
        for (i = 1; m > 0; i++) {
            if (A[i] == 0) continue;
            sm += A[i];
            m--;
        }
        // 求剩下 n - m 本书的最小价值
        int mn = 1e9;
        for (; i <= n; i++) if (A[i] > 0) mn = min(mn, A[i]);
        // 输出答案
        printf("%lld\n", sm + mn - 1);
    }
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
