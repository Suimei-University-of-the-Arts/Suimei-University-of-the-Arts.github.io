---
title: F - K-hour Clock
date: 2023-07-16
---

# F - K-hour Clock

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2019 陕西省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>98/111 (88.3%)</td>
</tr>
</table>

## 题解

分类讨论。

* 如果 $x + y = z$，那任何 $k > z$ 都可以。
* 如果 $x \le z$ 且 $x + y > z$，说明至少过了一天。因为只需要求出一个可行解，而必须有 $k > x$ 以及 $k > z$，那么 $k$ 越大越好。所以我们就当作只过了一天，直接检查 $k = y - (z - x)$。
* 如果 $x > z$ 说明跨过了 $0$ 点，那么必须有 $y > z$。同上所述，$k$ 越大越好，所以我们就当作过了还不到一天，直接检查 $k = x + (y - z)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
using namespace std;

void solve() {
    int x, y, z; scanf("%d%d%d", &x, &y, &z);
    if (x + y == z) {
        printf("%d\n", z + 1);
    } else if (x <= z && x + y > z) {
        int k = y - (z - x);
        if (k > z) printf("%d\n", k);
        else printf("-1\n");
    } else if (x > z && y > z) {
        printf("%d\n", x + (y - z));
    } else {
        printf("-1\n");
    }
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
