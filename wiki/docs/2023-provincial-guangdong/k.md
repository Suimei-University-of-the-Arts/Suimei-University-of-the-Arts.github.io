---
title: K - 独立钻石
date: 2023-05-09
---

# K - 独立钻石

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2023 广东省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>179/295 (60.7%)</td>
</tr>
</table>

## 题解

因为每个棋子只能被横向或者纵向跳过，因此当棋盘上存在 $k$ 枚棋子时，共有 $2k$ 种操作可以选择。又因为每一步都将减少 $1$ 枚棋子，因此至多执行 $(k - 1)$ 步。

直接通过 dfs 进行搜索的复杂度为 $\mathcal{O}(T \times nm \times \prod\limits_{i=2}^k 2i) \approx 1.7 \times 10^7$，无需任何优化即可在时限内通过。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN 6
#define MAXM 6
using namespace std;

int n, m, K, ans;
int MAP[MAXN + 5][MAXM + 5];

void dfs(int now) {
    ans = min(ans, now);
    for (int i = 1; i <= n; i++) for (int j = 1; j <= m; j++) if (MAP[i][j]) {
        if (i > 1 && i < n) {
            // 向下跳
            if (MAP[i - 1][j] && !MAP[i + 1][j]) {
                MAP[i - 1][j] = MAP[i][j] = 0;
                MAP[i + 1][j] = 1;
                dfs(now - 1);
                MAP[i - 1][j] = MAP[i][j] = 1;
                MAP[i + 1][j] = 0;
            }

            // 向上跳
            if (!MAP[i - 1][j] && MAP[i + 1][j]) {
                MAP[i + 1][j] = MAP[i][j] = 0;
                MAP[i - 1][j] = 1;
                dfs(now - 1);
                MAP[i + 1][j] = MAP[i][j] = 1;
                MAP[i - 1][j] = 0;
            }
        }

        if (j > 1 && j < m) {
            // 向右跳
            if (MAP[i][j - 1] && !MAP[i][j + 1]) {
                MAP[i][j - 1] = MAP[i][j] = 0;
                MAP[i][j + 1] = 1;
                dfs(now - 1);
                MAP[i][j - 1] = MAP[i][j] = 1;
                MAP[i][j + 1] = 0;
            }

            // 向左跳
            if (!MAP[i][j - 1] && MAP[i][j + 1]) {
                MAP[i][j + 1] = MAP[i][j] = 0;
                MAP[i][j - 1] = 1;
                dfs(now - 1);
                MAP[i][j + 1] = MAP[i][j] = 1;
                MAP[i][j - 1] = 0;
            }
        }
    }
}

void solve() {
    scanf("%d%d%d", &n, &m, &K);
    memset(MAP, 0, sizeof(MAP));
    for (int i = 1; i <= K; i++) {
        int x, y; scanf("%d%d", &x, &y);
        MAP[x][y] = 1;
    }
    ans = K; dfs(K);
    printf("%d\n", ans);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}

```
