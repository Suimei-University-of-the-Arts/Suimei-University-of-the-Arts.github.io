---
title: G - 匹配
date: 2023-07-01
---

# G - 匹配

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2023 山东省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>215/276 (77.9%)</td>
</tr>
</table>

## 题解

移项得 $i - a_i = j - a_j$。因此所有 $(u - a_u)$ 为相同值的节点 $u$ 组成一个团（任意两点之间两两都有连边的连通块）。团与团之间因为没有连边，答案不互相影响，因此可以每个团单独计算答案并加起来。

由于每条边的边权实际上是两个端点的点权之和，因此对于一个团，每次选择点权最大的两个节点，看它们加起来是否为正数即可。

复杂度 $\mathcal{O}(n\log n)$，主要是给点权排序的复杂度。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
using namespace std;

int n;
long long ans;

// mp[t] 保存所有 t == u - a_u 的点 u
unordered_map<int, vector<int>> mp;

void solve() {
    scanf("%d", &n);
    mp.clear();
    for (int i = 1; i <= n; i++) {
        int x; scanf("%d", &x);
        mp[i - x].push_back(x);
    }

    ans = 0;
    // 每个团单独计算答案
    for (auto &p : mp) {
        vector<int> &vec = p.second;
        reverse(vec.begin(), vec.end());
        // 每次选团中最大的两个点权，并检查加起来是否为正数
        for (int i = 0; i + 1 < vec.size(); i += 2) {
            int sm = vec[i] + vec[i + 1];
            if (sm <= 0) break;
            ans += sm;
        }
    }
    printf("%lld\n", ans);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
