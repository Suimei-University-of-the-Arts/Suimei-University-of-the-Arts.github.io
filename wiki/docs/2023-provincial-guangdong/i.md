---
title: I - 路径规划
date: 2023-05-09
---

# I - 路径规划

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2023 广东省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>?/? (?%)</td>
</tr>
</table>

## 题解

假设答案为 $x$，那么存在一条路径，使得从 $0$ 到 $(x - 1)$ 的每个整数都在路径上。这一条件满足二分性，因此我们可以二分答案 $x$，并检查是否存在这样的路径。

由于每一步只能往右或者往下走，因此将路径上每个格子的坐标按行为第一关键字，列为第二关键字排序后，排在前面的坐标的列编号，一定小于等于排在后面的坐标的列编号。

因此，将从 $0$ 到 $(x - 1)$ 的每个整数所在的格子的坐标排序，并检查列编号是否满足以上条件，即可判断是否存在一条路径，使得这些整数都在路径上。实际实现时，不需要使用排序函数。只要依此枚举每个格子，若格子里的整数小于 $x$ 则把格子加入 `vector`，这样得到的 `vector` 就已经按枚举的顺序排序了。

复杂度 $\mathcal{O}(nm\log(nm))$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXPROD ((int) 1e6)
using namespace std;

int n, m, A[MAXPROD];

// 将从 0 到 LIM - 1 所在的格子坐标“排序”，检查前面的列坐标是否小于等于后面的列坐标
bool check(int LIM) {
    // 实际实现时，不需要使用排序函数，
    // 直接按顺序枚举每个格子，若格子里的整数小于 $x$ 则把格子加入 vector，
    // 这样得到的 vector 就已经按枚举的顺序排序了
    //
    // 而且甚至连 vector 也不用真的维护，
    // 因为我们只关心 vector 最后一个元素的列坐标，和当前列坐标的大小关系，
    // 直接用变量 last 维护最后一个元素的列坐标即可
    int last = 0;
    for (int i = 0; i < n; i++) for (int j = 0; j < m; j++) if (A[i * m + j] < LIM) {
        if (last > j) return false;
        last = j;
    }
    return true;
}

void solve() {
    scanf("%d%d", &n, &m);
    for (int i = 0; i < n; i++) for (int j = 0; j < m; j++) scanf("%d", &A[i * m + j]);
    // 二分答案
    int head = 0, tail = n * m;
    while (head < tail) {
        int mid = (head + tail + 1) >> 1;
        if (check(mid)) head = mid;
        else tail = mid - 1;
    }
    printf("%d\n", head);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
