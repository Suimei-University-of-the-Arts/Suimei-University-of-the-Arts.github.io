---
title: H - To the Park
date: 2023-07-16
---

# H - To the Park

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2019 陕西省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>5/111 (4.5%)</td>
</tr>
</table>

## 题解

首先求一下答案的上界。不可能和其它数成对的有：$1$，以及满足 $2p > n$ 的质数 $p$。除此之外的数两两成对就是答案的上界。

接下来构造一个能触碰到上界的答案。

1. 从大到小考虑所有大于 $2$ 且满足 $2p \le n$ 的质数 $p$，数一下还未被加入答案的倍数有几个。如果有偶数个那么两两成对加入答案。否则把 $2p$ 留下，其它数两两成对加入答案。这里 $2p$ 肯定没有用过，因为它的质因数只有 $2$ 和 $p$。
2. 最后考虑所有没有加入答案的偶数，让它们两两成对加入答案。

上述构造方式用到了所有可能加入答案的数，因此触碰到了答案的上界。

复杂度 $\mathcal{O}(n \log n)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 1e5)
using namespace std;
typedef pair<int, int> pii;

int n;
vector<pii> ans;

bool flag[MAXN + 10], vis[MAXN + 10];

void solve() {
    scanf("%d", &n);
    if (n <= 3) { printf("0\n"); return; }

    ans.clear();
    memset(vis, 0, sizeof(bool) * (n + 3));
    for (int i = n; i > 2; i--) if (!flag[i] && i * 2 <= n) {
        assert(!vis[i * 2]);
        vector<int> vec = {i};
        for (int j = i * 3; j <= n; j += i) if (!vis[j]) vec.push_back(j);
        if (vec.size() % 2 == 1) vec.push_back(i * 2);
        for (int j = 1; j < vec.size(); j += 2) {
            vis[vec[j - 1]] = vis[vec[j]] = true;
            ans.push_back(pii(vec[j - 1], vec[j]));
        }
    }

    vector<int> vec;
    for (int i = 2; i <= n; i += 2) if (!vis[i]) vec.push_back(i);
    for (int i = 1; i < vec.size(); i += 2) ans.push_back(pii(vec[i - 1], vec[i]));

    printf("%d", ans.size());
    for (pii p : ans) printf(" %d %d", p.first, p.second);
    printf("\n");
}

int main() {
    for (int i = 2; i * i <= MAXN; i++) if (!flag[i])
        for (int j = i << 1; j <= MAXN; j += i) flag[j] = true;

    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
