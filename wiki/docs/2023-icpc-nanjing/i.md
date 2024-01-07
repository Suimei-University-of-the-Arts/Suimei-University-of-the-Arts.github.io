---
title: I - 计数器
date: 2023-11-25
---

# I - 计数器

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2023 ICPC 亚洲区域赛南京站</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>342/342 (100.0%)</td>
</tr>
</table>

## 题解

如果第 $a_i$ 次操作后计数器的值为 $b_i$，说明第 $(a_i - b_i)$ 次操作是清零，且 $[a_i - b_i + 1, a_i]$ 这个操作区间内没有清零操作。

把区间排序后进行判断即可。复杂度 $\mathcal{O}(n\log n)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
using namespace std;

int n;

void solve() {
    scanf("%*d%d", &n);
    
    // mp[L] 表示 L 是一个清零操作，且从 L + 1 到 mp[L] 都是加一操作
    map<int, int> mp;
    bool failed = false;
    for (int i = 1; i <= n; i++) {
        int x, y; scanf("%d%d", &x, &y);
        // 计数器的值不能比操作数还大
        if (y > x) failed = true;
        // 记录必须是清零操作的位置，以及加一操作的区间
        int &t = mp[x - y];
        t = max(t, x);
    }
    if (failed) { printf("No\n"); return; }
    
    // R 表示清零操作的“禁区”的最右端
    int R = -1;
    for (auto &p : mp) {
        // 需要在“禁区”里执行清零操作，无解
        if (R >= p.first) { printf("No\n"); return; }
        // 更新“禁区”的最右端
        R = p.second;
    }
    printf("Yes\n");
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
