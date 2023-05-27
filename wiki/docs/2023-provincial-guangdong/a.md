---
title: A - 算法竞赛
date: 2023-05-08
---

# A - 算法竞赛

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2023 广东省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>295/295 (100.0%)</td>
</tr>
</table>

## 题解

从 $y_1$ 枚举到 $y_2$，若枚举的年份不在停办年份里则答案加一。复杂度 $\mathcal{O}(n + y_2 - y_1)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXS ((int) 1e4)
using namespace std;

int n, Y1, Y2, ans;

// vis[y] == true 表示年份 y 是停办年份
bool vis[MAXS + 10];

void solve() {
    memset(vis, 0, sizeof(vis));
    scanf("%d%d", &Y1, &n);
    for (int i = 1; i <= n; i++) {
        int x; scanf("%d", &x);
        vis[x] = true;
    }
    scanf("%d", &Y2);

    ans = 0;
    // 从 Y1 枚举到 Y2
    for (int i = Y1; i <= Y2; i++) {
        if (vis[i]) continue;
        // 当前年份不是停办年份则答案加一
        ans++;
    }
    printf("%d\n", ans);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
