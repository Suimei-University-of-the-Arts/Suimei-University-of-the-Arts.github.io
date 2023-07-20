---
title: B - Grid with Arrows
date: 2023-07-16
---

# B - Grid with Arrows

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2019 陕西省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>61/111 (55.0%)</td>
</tr>
</table>

## 题解

把每个格子看作有向图中的一个节点，那么每个节点至多向别的节点连一条边。这就是典型的基环外向树。

如果有入度为 $0$ 的节点，那么必须从该节点出发并检查（否则不可能经过其它点访问入度为 $0$ 的节点）；否则整张图可能是一个或多个环，随便挑一个节点出发并检查即可。复杂度 $\mathcal{O}(nm)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 1e5)
#define MAXM ((int) 1e5)
#define MAXPROD ((int) 1e5)
using namespace std;

int n, m;
char s[MAXM + 10];
string MAP[MAXN + 10];
vector<int> A[MAXN + 10];

int deg[MAXPROD + 10];
bool vis[MAXPROD + 10];

// 求节点 t 指向的下一个节点
int nxt(int t) {
    int i = t / m, j = t % m, ii = i, jj = j;
    if (MAP[i][j] == 'u') ii -= A[i][j];
    else if (MAP[i][j] == 'd') ii += A[i][j];
    else if (MAP[i][j] == 'l') jj -= A[i][j];
    else jj += A[i][j];
    if (ii < 0 || jj < 0 || ii >= n || jj >= m) return -1;
    return ii * m + jj;
}

// 检查从节点 t 出发能否遍历全图
bool check(int t) {
    for (; t >= 0 && !vis[t]; t = nxt(t)) vis[t] = true;
    for (int i = 0; i < n * m; i++) if (!vis[i]) return false;
    return true;
}

void solve() {
    scanf("%d%d", &n, &m);
    for (int i = 0; i < n; i++) MAP[i].clear(), A[i].clear();
    for (int i = 0; i < n; i++) scanf("%s", s), MAP[i] = string(s);
    for (int i = 0; i < n; i++) for (int j = 0; j < m; j++) {
        int x; scanf("%d", &x);
        A[i].push_back(x);
    }

    // 计算每个节点的入度
    memset(deg, 0, sizeof(int) * (n * m + 3));
    for (int i = 0, t = 0; i < n; i++) for (int j = 0; j < m; j++, t++) deg[nxt(t)]++;

    memset(vis, 0, sizeof(bool) * (n * m + 3));
    // 寻找入度为 0 的节点
    for (int t = 0; t < n * m; t++) if (deg[t] == 0) {
        if (check(t)) printf("Yes\n");
        else printf("No\n");
        return;
    }
    // 没有入度为 0 的节点，随便从一个点出发
    if (check(0)) printf("Yes\n");
    else printf("No\n");
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
