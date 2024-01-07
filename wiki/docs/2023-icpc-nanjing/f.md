---
title: F - 等价重写
date: 2023-11-25
---

# F - 等价重写

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2023 ICPC 亚洲区域赛南京站</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>253/342 (74.0%)</td>
</tr>
</table>

## 题解

由于操作结果会互相覆盖，因此对于每个位置，只有最后修改这个位置的操作才决定了这个位置的值。也就是说，最后修改这个位置的操作必须在其它修改这个位置的操作之后进行。

考虑将原操作序列建模成一个有向无环图 $G$，第 $i$ 个操作向第 $j$ 个操作有一条连边 $i \rightarrow j$ 当且仅当存在某个位置 $t$ 使得操作 $j$ 是在原顺序中修改位置 $t$ 的最后一次操作，且操作 $i$ 也修改了 $t$。

现在问题转化为，给定一张有向无环图 $G$， 问 $G$ 是否存在一个不同于 $1, 2, \cdots, n$ 的拓扑序。

一种简单的做法是尝试交换 $i$ 和 $(i + 1)$，如果交换任意两个相邻元素都无法得到新的合法拓扑序，说明 $G$ 依赖关系至少是一条从 $1$ 到 $n$ 的链，即拓扑序唯一。

实现上，我们并不需要将 $G$ 显式的建立出来，只要枚举并判断操作 $i$ 和 操作 $(i + 1)$ 之间是否有连边。如果没有，则找到了一组解：

$$
q_j =
\begin{cases}
i, & j = i + 1\\
i + 1, & j = i \\
j, & \text{otherwise}
\end{cases}
$$

复杂度 $\mathcal O(n + \sum\limits_{i=1}^n p_i)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 1e5)
#define MAXM ((int) 1e5)
using namespace std;

int n, m;

// last[i]：最后修改位置 i 的操作
int last[MAXM + 10];
// OP[i]：操作 i 改了哪些位置
unordered_set<int> OP[MAXN + 10];
// flag[i]：操作 i - 1 到 i 是否有一条连边
bool flag[MAXN + 10];

void solve() {
    scanf("%d%d", &n, &m);
    memset(last, 0, sizeof(int) * (m + 3));
    for (int i = 1; i <= n; i++) OP[i].clear();
    memset(flag, 0, sizeof(bool) * (n + 3));
    
    for (int i = 1; i <= n; i++) {
        int p; scanf("%d", &p);
        for (int j = 1; j <= p; j++) {
            int x; scanf("%d", &x);
            last[x] = i;
            OP[i].insert(x);
        }
    }

    // 只有修改每个位置的最后一次操作可能与前面的操作有连边
    // 枚举每个位置，并检查最后一次操作
    for (int i = 1; i <= m; i++) if (last[i] > 1)
        // 如果 last[i] - 1 也改了位置 i，则两个操作之间有连边
        if (OP[last[i] - 1].count(i)) flag[last[i]] = true;
    
    int ans = 0;
    // 寻找没有与上一个操作连边的操作
    for (int i = 2; i <= n; i++) if (!flag[i]) { ans = i; break; }
    if (ans > 0) {
        printf("Yes\n");
        for (int i = 1; i <= n; i++) {
            if (i == ans - 1) printf("%d", ans);
            else if (i == ans) printf("%d", ans - 1);
            else printf("%d", i);
            printf("%c", "\n "[i < n]);
        }
    } else {
        printf("No\n");
    }
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
