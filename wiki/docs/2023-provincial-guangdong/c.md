---
title: C - 市场交易
date: 2023-05-08
---

# C - 市场交易

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2023 广东省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>254/295 (86.1%)</td>
</tr>
</table>

## 题解

每次应该从价格最便宜的商店购买货物，并卖给价格最贵的商店。用双指针模拟这一贪心策略即可，具体实现详见参考代码。

复杂度 $\mathcal{O}(n \log n)$，主要是排序的复杂度。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 1e5)
using namespace std;
typedef pair<int, int> pii;

int n;
pii A[MAXN + 10];
long long ans;

void solve() {
    scanf("%d", &n);
    for (int i = 1; i <= n; i++) scanf("%d%d", &A[i].first, &A[i].second);
    // 将商店按价格从低到高排序
    sort(A + 1, A + n + 1);

    ans = 0;
    // 维护两个指针，i 指向最便宜的商店，j 指向最贵的商店
    for (int i = 1, j = n; i < j; ) {
        // 交易的次数为两个商店交易次数的最小值
        int mn = min(A[i].second, A[j].second);
        // 计算利润
        ans += 1LL * (A[j].first - A[i].first) * mn;
        // 减少两个商店的交易次数
        A[i].second -= mn;
        A[j].second -= mn;
        // 如果商店的交易次数用完了，则指针指向下一个商店
        if (A[i].second == 0) i++;
        if (A[j].second == 0) j--;
    }
    printf("%lld\n", ans);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
