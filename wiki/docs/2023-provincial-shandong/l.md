---
title: L - 谜题：曲尺
date: 2023-07-01
---

# L - 谜题：曲尺

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2023 山东省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>125/276 (45.3%)</td>
</tr>
</table>

## 题解

我们从黑色格子开始，每次操作向外“包”一层 L，使得第 $i$ 次操作结束后能形成一个 $(i + 1) \times (i + 1)$ 的正方形。如下图所示。

![l.png](l.png)

复杂度 $\mathcal{O}(n)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, i, j; scanf("%d%d%d", &n, &i, &j);
    // UDLR 表示现在包出来的正方形的上下左右边界
    int U = i, D = i;
    int L = j, R = j;
    printf("Yes\n%d\n", n - 1);
    for (int k = 1; k < n; k++) {
        if (U > 1 && L > 1) {
            U--; L--;
            printf("%d %d %d %d\n", U, L, D - U, R - L);
        } else if (U > 1 && R < n) {
            U--; R++;
            printf("%d %d %d %d\n", U, R, D - U, L - R);
        } else if (D < n && L > 1) {
            D++; L--;
            printf("%d %d %d %d\n", D, L, U - D, R - L);
        } else {
            D++; R++;
            printf("%d %d %d %d\n", D, R, U - D, L - R);
        }
    }
    return 0;
}
```
