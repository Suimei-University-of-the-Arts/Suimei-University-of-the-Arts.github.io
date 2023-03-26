---
title: M - Function and Function
date: 2023-01-29
---

# M - Function and Function

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2018 ICPC 亚洲区域赛青岛站</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>372/373 (99.7%)</td>
</tr>
</table>

## 题解

注意到

* 当 $x \ge 2$ 时，$f(x)$ 是 $\log x$ 级别的。
* 当 $x \le 1$ 时，$g^k(x)$ 在 $0$ 和 $1$ 之间交替变化。

因此可以直接计算前面若干次的函数值，直到函数值变为 $0$ 或 $1$。看剩下的操作次数是奇数还是偶数决定答案。

时间复杂度 $\mathcal{O}(\log x)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
using namespace std;

int f[] = {1, 0, 0, 0, 1, 0, 1, 0, 2, 1};

void solve() {
    int x, K;
    scanf("%d%d", &x, &K);
    // 直接计算若干次函数值，直到函数值小等于 1，或变化次数用完
    while (x > 1 && K > 0) {
        int t = 0;
        for (; x; x /= 10) t += f[x % 10];
        x = t;
        K--;
    }
    if (K > 0) {
        // 变化次数还没用完，根据剩下的操作是奇数次还是偶数次决定输出
        if (K & 1) printf("%d\n", x ^ 1);
        else printf("%d\n", x);
    } else {
        // 变化次数用完了，直接输出答案
        printf("%d\n", x);
    }
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
