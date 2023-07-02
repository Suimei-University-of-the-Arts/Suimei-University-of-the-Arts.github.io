---
title: J - 不是一道路径查询问题
date: 2023-07-01
---

# J - 不是一道路径查询问题

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2023 山东省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>28/276 (10.1%)</td>
</tr>
</table>

## 题解

类似于数位 dp 的思想，大于 $V$ 的数 $v'$ 都有一段前缀与 $V$ 相同（假设最高位补零到相同的长度）。设最长公共前缀的长度为 $i$，考虑第 $(i + 1)$ 高位：

* 若 $V$ 的第 $(i + 1)$ 高位是 $0$，则 $v'$ 的第 $(i + 1)$ 高位是 $1$，那么 $v'$ 的更低位可以任意选择。此时目标值的前 $(i + 1)$ 位是确定的，我们只要让这 $(i + 1)$ 位中的所有 $1$ 在所选边权中都出现即可，最后通过 BFS 检查起点和终点是否连通。
* 若 $V$ 的第 $(i + 1)$ 高位是 $1$，则 $v'$ 的第 $(i + 1)$ 高位是 $0$，得出 $V > v'$，矛盾。

因此我们只要枚举最长公共前缀的长度即可。长度共有 $\mathcal{O}(\log(\max(V, w_i)))$ 种，因此复杂度为 $\mathcal{O}(n + m + q)\log(\max(V, w_i))$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 1e5)
#define MAXQ ((int) 5e5)
using namespace std;

int n, m, q, qry[MAXQ + 10][2];
long long V;
bool ans[MAXQ + 10];

vector<int> e[MAXN + 10];
vector<long long> v[MAXN + 10];
int bel[MAXN + 10];

// 求包含 S 的连通块，要求所选边权包含 t 里所有的 1
void bfs(int S, long long t) {
    queue<int> q;
    q.push(S); bel[S] = S;
    while (!q.empty()) {
        int sn = q.front(); q.pop();
        for (int i = 0; i < e[sn].size(); i++) {
            int fn = e[sn][i];
            long long val = v[sn][i];
            if (bel[fn] || (val & t) != t) continue;
            q.push(fn); bel[fn] = S;
        }
    }
}

// 对于前缀 t 检查哪些点是连通的
void gao(long long t) {
    memset(bel, 0, sizeof(int) * (n + 3));
    // 通过 bfs 检查两个点是否位于同一连通块
    for (int i = 1; i <= n; i++) if (!bel[i]) bfs(i, t);
    for (int i = 1; i <= q; i++) ans[i] = ans[i] || bel[qry[i][0]] == bel[qry[i][1]];
}

int main() {
    scanf("%d%d%d%lld", &n, &m, &q, &V);
    for (int i = 1; i <= m; i++) {
        int x, y;
        long long z;
        scanf("%d%d%lld", &x, &y, &z);
        e[x].push_back(y); v[x].push_back(z);
        e[y].push_back(x); v[y].push_back(z);
    }
    for (int i = 1; i <= q; i++) scanf("%d%d", &qry[i][0], &qry[i][1]);

    if (V == 0) gao(0);
    // 通过每次 += lowbit，枚举值域范围内所有不同的前缀
    else for (long long t = V; t < (1LL << 60); t += t & (-t)) gao(t);
    for (int i = 1; i <= q; i++)
        if (ans[i]) printf("Yes\n");
        else printf("No\n");
    return 0;
}
```
