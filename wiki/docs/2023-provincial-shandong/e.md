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
#define MAXN ((int) 1e5)
using namespace std;
typedef pair<long long, long long> pll;

int n;

pll A[MAXN + 10], B[MAXN + 10];

// 检验答案 x，转换成贪心
bool check(long long x) {
    vector<long long> P, Q;
    // 计算哪些队员可以背别人，即为贪心问题中每个人的能力值
    for (int i = 1; i <= n; i++)
        if (A[i].first >= x) P.push_back(A[i].first + A[i].second - x);
    // 计算哪些队员需要别人背，即为贪心问题中工作的难度
    for (int i = 1; i <= n; i++)
        if (B[i].first < x) Q.push_back(B[i].second);
    // 因为 A 和 B 已经从大到小排过序了，所以 P 和 Q 也已经是有序的，不需要 sort
    // 把第 i 难的工作分给能力值第 i 大的人
    if (P.size() < Q.size()) return false;
    for (int i = 0; i < Q.size(); i++) if (P[i] < Q[i]) return false;
    return true;
}

void solve() {
    scanf("%d", &n);
    for (int i = 1; i <= n; i++) {
        long long v, w; scanf("%lld%lld", &v, &w);
        A[i] = B[i] = pll(v, w);
    }
    // 将队员按 v_i + w_i 从大到小排序，记在 A 里
    sort(A + 1, A + n + 1, [](pll &a, pll &b) {
        return a.first + a.second > b.first + b.second;
    });
    // 将队员按 w_i 从大到小排序，记在 B 里
    sort(B + 1, B + n + 1, [](pll &a, pll &b) {
        return a.second > b.second;
    });

    // 二分答案
    long long head = A[1].first, tail = A[1].first;
    for (int i = 2; i <= n; i++) {
        head = min(head, A[i].first);
        tail = max(tail, A[i].first);
    }
    while (head < tail) {
        long long mid = (head + tail + 1) >> 1;
        if (check(mid)) head = mid;
        else tail = mid - 1;
    }
    printf("%lld\n", head);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
