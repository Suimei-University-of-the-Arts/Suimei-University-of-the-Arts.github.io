---
title: K - Escape Plan
date: 2023-07-17
---

# K - Escape Plan

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2019 陕西省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>3/111 (2.7%)</td>
</tr>
</table>

## 题解

维护 `dis[x]` 表示最差情况下从点 $x$ 走到任意终点的最短路，显然 `dis[终点] = 0`，其它的 `dis` 值考虑从终点倒推回来。

考虑从终点开始 Dijkstra 的过程。

* 当我们从 Dijkstra 的堆顶第一次取出节点 $v$ 时（假设对应的是边 $u_1 \to v$），说明从 $v$ 出发，走 $v - u_1$ 这条边是去终点的最近道路。为了让答案尽可能差，我们必须得把这条边堵上。
* 同样地，当我们从 Dijkstra 的堆顶第二次取出节点 $v$ 时（假设对应的是边 $u_2 \to v$），说明从 $v$ 出发，走 $v - u_2$ 这条边是去终点的第二近道路。为了让答案尽可能差，我们也得把这条边堵上。
* ...
* 当我们从 Dijkstra 的堆顶第 $(d_v + 1)$ 次取出节点 $v$ 时，因为我们的堵塞次数已经用完了，那么 `dis[v]` 的值就确定为本次取出的距离。节点 $v$ 继续向相邻节点转移。

最后 `dis[1]` 就是答案。复杂度 $\mathcal{O}(m\log m)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 1e5)
using namespace std;
typedef pair<long long, int> pli;

int n, m, D[MAXN + 10];
vector<int> EX;

vector<int> e[MAXN + 10], v[MAXN + 10];
long long dis[MAXN + 10];

void dijkstra() {
    memset(dis, -1, sizeof(long long) * (n + 3));
    priority_queue<pli, vector<pli>, greater<pli>> pq;
    for (int x : EX) pq.push(pli(0, x));
    while (!pq.empty()) {
        pli p = pq.top(); pq.pop();
        int sn = p.second;
        if (dis[sn] >= 0) continue;
        // 只有堵塞次数不够了，才能够更新 dis[sn]
        if (--D[sn] >= 0) continue;
        dis[sn] = p.first;
        for (int i = 0; i < e[sn].size(); i++) {
            int fn = e[sn][i];
            if (dis[fn] >= 0) continue;
            pq.push(pli(dis[sn] + v[sn][i], fn));
        }
    }
}

void solve() {
    int K; scanf("%d%d%d", &n, &m, &K);

    EX.clear();
    while (K--) {
        int x; scanf("%d", &x);
        EX.push_back(x);
    }
    
    for (int i = 1; i <= n; i++) scanf("%d", &D[i]);
    // 把终点的堵塞次数都改成 0，防止 dijkstra 无法开始
    for (int x : EX) D[x] = 0;

    for (int i = 1; i <= n; i++) e[i].clear(), v[i].clear();
    for (int i = 1; i <= m; i++) {
        int x, y, z; scanf("%d%d%d", &x, &y, &z);
        e[x].push_back(y); v[x].push_back(z);
        e[y].push_back(x); v[y].push_back(z);
    }

    dijkstra();
    printf("%lld\n", dis[1]);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
