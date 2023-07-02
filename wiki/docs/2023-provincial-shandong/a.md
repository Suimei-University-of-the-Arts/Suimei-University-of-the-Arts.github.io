---
title: A - 订单
date: 2023-07-01
---

# A - 订单

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2023 山东省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>266/276 (96.4%)</td>
</tr>
</table>

## 题解

将所有订单按 $a_i$ 排序，检查排序后的订单 $i$ 之前，存货量增加 $k \times (a_i - a_{i - 1})$ 即可。

复杂度 $\mathcal{O}(n\log n)$，主要是排序的复杂度。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN 100
using namespace std;
typedef pair<int, int> pii;

int n;
long long K;
pii A[MAXN + 10];

void solve() {
    scanf("%d%lld", &n, &K);
    for (int i = 1; i <= n; i++) scanf("%d%d", &A[i].first, &A[i].second);
    // 订单按哪天交付排序
    sort(A + 1, A + n + 1);

    int last = 0;
    long long have = 0;
    for (int i = 1; i <= n; i++) {
        // 计算增加的存货量
        have += (A[i].first - last) * K;
        // 判断存货是否足够
        if (have >= A[i].second) have -= A[i].second;
        else { printf("No\n"); return; }
        last = A[i].first;
    }
    printf("Yes\n");
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
