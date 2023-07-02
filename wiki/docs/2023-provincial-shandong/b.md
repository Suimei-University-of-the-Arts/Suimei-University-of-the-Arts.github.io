---
title: B - 建筑公司
date: 2023-07-01
---

# B - 建筑公司

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2023 山东省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>43/276 (15.6%)</td>
</tr>
</table>

## 题解

本题类似于拓扑排序。

我们维护每项工程还有几条要求没有满足，并将不同工种的要求分别维护。所有要求都被满足的工程将加入队列。

从队列中取出一项工程后，我们会获得该工程的奖励。当工种为 $t$ 的员工加入公司后，我们检查和工种 $t$ 有关的人数最少的未满足需求。如果这项需求被满足了，则对应工程的要求数减一。要求数减少为零的工程继续加入队列。

答案就是从队列中取出的工程数。复杂度 $\mathcal{O}(n\log n)$，主要是每次拿出“人数最少的需求”需要预先排序或使用堆等数据结构。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 1e5)
using namespace std;
typedef pair<int, int> pii;

int g, n, A[MAXN + 10][2];

// M[i] 表示第 i 项工程还有几条要求未满足
int M[MAXN + 10];
// B[i] 表示第 i 项工程的奖励
vector<pii> B[MAXN + 10];

// mp[i] 是一个按人数排序的小根堆，维护了与工种 i 有关的未满足需求
unordered_map<int, priority_queue<pii, vector<pii>, greater<pii>>> mp;
// have[i] 表示公司现有工种 i 的员工数量
unordered_map<int, long long> have;
queue<int> q;

// 公司增加工种 t 的员工共 u 名
void add(int t, int u) {
    long long &val = have[t];
    val += u;
    priority_queue<pii, vector<pii>, greater<pii>> &pq = mp[t];
    // 看哪些和工种 t 有关的需求被满足了
    while (!pq.empty()) {
        pii p = pq.top();
        if (p.first > val) break;
        pq.pop();
        // 工程所有要求都被满足，加入队列
        if ((--M[p.second]) == 0) q.push(p.second);
    }
}

int main() {
    scanf("%d", &g); assert(g >= 1);
    for (int i = 1; i <= g; i++) scanf("%d%d", &A[i][0], &A[i][1]);
    scanf("%d", &n);
    for (int i = 1; i <= n; i++) {
        scanf("%d", &M[i]);
        for (int j = 1; j <= M[i]; j++) {
            int a, b; scanf("%d%d", &a, &b);
            mp[a].push(pii(b, i));
        }
        int K; scanf("%d", &K);
        for (int j = 1; j <= K; j++) {
            int c, d; scanf("%d%d", &c, &d);
            B[i].push_back(pii(c, d));
        }
    }

    // 把没有任何要求的工程加入队列
    for (int i = 1; i <= n; i++) if (M[i] == 0) q.push(i);
    // 公司一开始就有的员工
    for (int i = 1; i <= g; i++) add(A[i][0], A[i][1]);

    int ans = 0;
    // 类似拓扑排序，不断从队列中拿出工程，并获得奖励
    while (!q.empty()) {
        int idx = q.front(); q.pop();
        ans++;
        for (pii p : B[idx]) add(p.first, p.second);
    }
    printf("%d\n", ans);
    return 0;
}
```
