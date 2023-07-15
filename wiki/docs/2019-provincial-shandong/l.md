---
title: L - Median
date: 2023-07-12
---

# L - Median

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2019 山东省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>61/307 (19.9%)</td>
</tr>
</table>

## 题解

如果 $a_u$ 严格比 $a_v$ 大，则从 $u$ 向 $v$ 连一条有向边，得到一张有向图。有向图中，如果点 $u$ 能走到点 $v$，说明 $u$ 严格比 $v$ 大；如果 $u$ 走不到 $v$，$v$ 也走不到 $u$，说明两者之间没有大小限制。

如果有向图中有环说明无解（因为不可能自己严格比自己大），否则这张图是一张有向无环图。对于点 $u$，如果它的前继（能走到它的点）数量大于 $\lfloor\frac{n}{2}\rfloor$，说明已知严格比它大的数已经超过了 $\lfloor\frac{n}{2}\rfloor$ 个，$u$ 不可能是中位数；同理，如果 $u$ 的后继（它能走到的点）数量大于 $\lfloor\frac{n}{2}\rfloor$，说明已知严格比它小的数已经超过了 $\lfloor\frac{n}{2}\rfloor$ 个，$u$ 也不可能是中位数。剩下的情况，$u$ 就可以作为中位数。

因此利用 bfs 或 dfs 统计每个点的前继和后继数量即可。复杂度 $\mathcal{O}(nm)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN 100
using namespace std;

int n, m;

vector<int> e[MAXN + 10];
int pre[MAXN + 10], suc[MAXN + 10];
int vis[MAXN + 10];

// 找出 S 的所有后继，如果发现包含 S 的环返回 false，否则返回 true
bool bfs(int S) {
    queue<int> q;
    q.push(S); vis[S] = S;
    while (!q.empty()) {
        int sn = q.front(); q.pop();
        for (int fn : e[sn]) {
            if (fn == S) return false;
            if (vis[fn] == S) continue;
            q.push(fn); vis[fn] = S;
            // fn 是 S 的后继，S 也是 fn 的前继
            pre[fn]++; suc[S]++;
        }
    }
    return true;
}

void solve() {
    scanf("%d%d", &n, &m);
    for (int i = 1; i <= n; i++) e[i].clear();
    for (int i = 1; i <= m; i++) {
        int x, y; scanf("%d%d", &x, &y);
        e[x].push_back(y);
    }

    memset(pre, 0, sizeof(int) * (n + 3));
    memset(suc, 0, sizeof(int) * (n + 3));
    memset(vis, 0, sizeof(int) * (n + 3));
    for (int i = 1; i <= n; i++) if (!bfs(i)) {
        // 有环，无解
        for (int j = 1; j <= n; j++) printf("0");
        printf("\n");
        return;
    }

    for (int i = 1; i <= n; i++)
        // 前后继都不超过 floor(n / 2)，可以作为中位数
        if (pre[i] <= n / 2 && suc[i] <= n / 2) printf("1");
        else printf("0");
    printf("\n");
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
