---
title: I - 三只骰子
date: 2023-07-01
---

# I - 三只骰子

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2023 山东省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>276/276 (100.0%)</td>
</tr>
</table>

## 题解

枚举三只骰子的点数即可。复杂度 $\mathcal{O}(1)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
using namespace std;

// 红色点数
int X[7] = {0, 1, 0, 0, 4, 0, 0};
// 黑色点数
int Y[7] = {0, 0, 2, 3, 0, 5, 6};

int main() {
    int x, y; scanf("%d%d", &x, &y);
    for (int i = 1; i <= 6; i++) for (int j = 1; j <= 6; j++) for (int k = 1; k <= 6; k++)
        if (X[i] + X[j] + X[k] == x && Y[i] + Y[j] + Y[k] == y) {
            printf("Yes\n");
            return 0;
        }
    printf("No\n");
    return 0;
}
```
