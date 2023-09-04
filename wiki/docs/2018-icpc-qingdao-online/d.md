---
title: D - Pixel Art
date: 2023-09-04
---

# D - Pixel Art

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2018 ICPC 亚洲区域赛青岛站网络赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>22/1550 (1.4%)</td>
</tr>
</table>

## 题解

实际上是一道模拟题。把每一条黑色横线或者竖线看成一个矩形，用 `map` 维护当前行有哪些列被矩形覆盖，以及每个矩形属于哪个连通块。扫描线往下移动一行时，把新出现的矩形也加入 `map`，检查新矩形的上、左、右三个方向是否与其它矩形相连，如果是则进行合并。详细实现请看参考代码的注释。

这样做的复杂度是 $\mathcal{O}(n + t\log k)$，其中 $t$ 是相邻矩形的数量。

实际上 $t$ 是 $\mathcal{O}(k)$ 级别的。这是因为，考虑每对上下相邻的矩形，其中较短的矩形最多只会和 $4$ 个更长的矩形相邻，如下图所示。左右相邻的矩形也是同样的道理。

![d.png](d.png)

因此复杂度为 $\mathcal{O}(n + k\log k)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 1e5)
#define MAXK ((int) 1e5)
using namespace std;
typedef pair<int, int> pii;

int n, K, ans1, ans2;
int R1[MAXK + 10], C1[MAXK + 10], R2[MAXK + 10], C2[MAXK + 10];

// add[i]：第 i 行要加入哪些矩形
// del[i]：第 i 列要删除哪些矩形
vector<int> add[MAXK + 10], del[MAXK + 10];
int root[MAXK + 10];

// 求并查集的根
int findroot(int x) {
    if (root[x] != x) root[x] = findroot(root[x]);
    return root[x];
}

// 合并集合 x 和 y
void merge(int x, int y) {
    x = findroot(x); y = findroot(y);
    if (x == y) return;
    root[x] = y;
    ans2--;
}

void solve() {
    scanf("%d%*d%d", &n, &K);
    for (int i = 1; i <= n + 1; i++) add[i].clear(), del[i].clear();
    for (int i = 1; i <= K; i++) {
        scanf("%d%d%d%d", &R1[i], &C1[i], &R2[i], &C2[i]);
        add[R1[i]].push_back(i);
        del[R2[i] + 1].push_back(i);
    }
    for (int i = 1; i <= K; i++) root[i] = i;

    ans1 = ans2 = 0;
    // cnt：当前行有几个黑色格子
    int cnt = 0;
    // map key 是区间，map value 是这个区间包含的列属于哪个连通块
    map<pii, int> mp;
    for (int i = 1; i <= n; i++) {
        // 检查新加入的矩形和上方矩形的相邻情况
        for (int idx : add[i]) {
            auto it = mp.lower_bound(pii(C1[idx], 0));
            if (it != mp.begin()) it = prev(it);
            while (it != mp.end() && it->first.first <= C2[idx]) {
                if (it->first.second >= C1[idx]) merge(it->second, idx);
                it++;
            }
        }

        // 删除在上一行结束的矩形
        for (int idx : del[i]) {
            cnt -= C2[idx] - C1[idx] + 1;
            mp.erase(pii(C1[idx], C2[idx]));
        }

        // 加入新的矩形
        for (int idx : add[i]) {
            cnt += C2[idx] - C1[idx] + 1;
            mp[pii(C1[idx], C2[idx])] = idx;
            auto it = mp.find(pii(C1[idx], C2[idx]));
            // 检查和左方矩形的相邻情况
            if (it != mp.begin() && prev(it)->first.second == C1[idx] - 1) merge(prev(it)->second, idx);
            // 检查和右方矩形的相邻情况
            if (next(it) != mp.end() && next(it)->first.first == C2[idx] + 1) merge(next(it)->second, idx);
        }

        ans1 += cnt; ans2 += add[i].size();
        printf("%d %d\n", ans1, ans2);
    }
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
