---
title: F - Chaleur
date: 2023-09-04
---

# F - Chaleur

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2018 ICPC 亚洲区域赛青岛站网络赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>38/1550 (2.5%)</td>
</tr>
</table>

## 题解

题目保证输入的图可以被分成两部分 $A$ 和 $B$，其中 $A$ 是团，$B$ 是独立集。我们先来找到 $A$ 和 $B$。

如果图中存在大小为 $s$ 的团，则图中度数第 $s$ 大的节点的度数至少为 $(s - 1)$。这样我们就能确定 $|A|$ 的最大值（即最大团的大小），而度数最大的 $|A|$ 个节点就是 $A$ 中的节点。因为 $|A|$ 已经最大了，根据题目的保证，此时剩下的节点之间没有连边，因此剩下的节点组成 $B$。

### 最大团的方案数

由于 $B$ 中的节点只能向 $A$ 中的节点连边，因此 $B$ 中节点的最大度数为 $|A|$。如果 $B$ 中存在度数为 $|A|$ 的节点，那么将它加入 $A$ 可以获得一个更大的团，和 $A$ 是最大团矛盾。因此 $B$ 中节点的最大度数为 $(|A| - 1)$。

如果 $B$ 中有度数为 $(|A| - 1)$ 的节点 $u$，设 $A$ 中唯一与 $u$ 没有连边的节点是 $v$，则 $(A - \{v\}) \cup \{u\}$ 也是一个团。因此，最大团的方案数就是 $B$ 中度数为 $(|A| - 1)$ 的节点数加一。

### 最大独立集的方案数

由于 $A$ 中的节点两两相连，因此最多从 $A$ 向 $B$ 中加入一个节点。

若 $A$ 中存在度数等于 $(|A| - 1)$ 的节点 $u$，说明 $u$ 和 $B$ 中的节点不存在连边，因此 $B \cup \{u\}$ 才是最大的独立集。最大独立集的方案数就是 $A 中度数为$(|A| - 1)$ 的节点数量。

否则，若 $A$ 中存在度数等于 $|A|$ 的节点 $u$，说明 $u$ 恰和 $B$ 中的一个节点 $v$ 有连边，则 $(B - \{v\}) \cup \{u\}$ 也是一个独立集。因此最大独立集的方案数就是 $A 中度数为$|A|$ 的节点数量加一。

否则，若 $A$ 中节点的最小度数大于 $|A|$，说明 $A$ 中每个节点都和 $B$ 中至少两个节点有连边，因此无法向 $B$ 中加入更多节点，方案数为 $1$。

复杂度 $\mathcal{O}(n\log n + m)$，主要是排序的复杂度。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 1e5)
using namespace std;
typedef pair<int, int> pii;

int n, m;

int deg[MAXN + 10];
bool flag[MAXN + 10];

void solve() {
    scanf("%d%d", &n, &m);
    if (m == 0) { printf("%d 1\n", n); return; }

    memset(deg, 0, sizeof(int) * (n + 3));
    for (int i = 1; i <= m; i++) {
        int x, y; scanf("%d%d", &x, &y);
        deg[x]++; deg[y]++;
    }

    // 所有节点按度数从大到小排序
    vector<int> vec;
    for (int i = 1; i <= n; i++) vec.push_back(i);
    sort(vec.begin(), vec.end(), [&](int a, int b) {
        return deg[a] > deg[b];
    });

    // 求最大团的大小
    memset(flag, 0, sizeof(bool) * (n + 3));
    int sz = 0;
    for (int x : vec) {
        if (deg[x] >= sz) sz++, flag[x] = true;
        else break;
    }

    // 最大团的方案数
    int ans = 1;
    for (int i = 1; i <= n; i++) if (!flag[i] && deg[i] == sz - 1) ans++;
    printf("%d ", ans);

    // 最大独立集的方案数
    int larger = 0, equal = 1;
    for (int i = 1; i <= n; i++) if (flag[i]) {
        if (deg[i] == sz - 1) larger++;
        else if (deg[i] == sz) equal++;
    }
    printf("%d\n", larger ? larger : equal);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
