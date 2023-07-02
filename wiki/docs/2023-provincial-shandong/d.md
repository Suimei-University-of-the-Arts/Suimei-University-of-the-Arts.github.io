---
title: D - 负重越野
date: 2023-07-01
---

# D - 负重越野

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2023 山东省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>133/276 (48.2%)</td>
</tr>
</table>

## 题解

二分整个队伍的速度至少为 $x$，接下来考虑如何检验答案。

如果队员 $i$ 的速度大于等于 $x$，则至多可以背起体重为 $(v_i - x + w_i)$ 的队员。如果队员 
 的速度小于 
，则必须被别人背负。因此问题可以转化为：

> 有 $p$ 个人和 $q$ 件工作，第 $i$ 个人的能力值为 $a_i$，第 $i$ 项工作的难度为 $b_i$，只有 $a_i \ge b_j$ 才能让第 $i$ 个人做第 $j$ 项工作。每个人最多做一项工作，问所有工作是否都能被完成。

这是一个经典的贪心问题。首先选出能力值最高的 $q$ 个人，然后将第 $i$ 难的工作派给能力值第 $i$ 高的人即可。

如果预先将队员分别按 $(v_i + w_i)$ 以及 $w_i$ 排序，本题的复杂度可以做到 $\mathcal{O}(n\log n + n\log(\max v_i))$。

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
