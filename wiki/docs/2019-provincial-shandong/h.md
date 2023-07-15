---
title: H - Tokens on the Segments
date: 2023-07-14
---

# H - Tokens on the Segments

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2019 山东省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>55/307 (17.9%)</td>
</tr>
</table>

## 题解

如果我们有多条线段可以放硬币，显然应该选择右端点最小的线段。用堆模拟这一贪心过程即可。复杂度 $\mathcal{O}(n\log n)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 1e5)
using namespace std;
typedef pair<int, int> pii;

int n, ans;
pii A[MAXN + 10];

void solve() {
    scanf("%d", &n);
    // 读入线段并按左端点排序
    for (int i = 1; i <= n; i++) scanf("%d%d", &A[i].first, &A[i].second);
    sort(A + 1, A + n + 1);

    ans = 0;
    // 堆里保存目前所有可选线段的右端点
    priority_queue<int, vector<int>, greater<int>> pq;
    // nxt：下一条线段的下标
    // x：最左边的可以放硬币的位置
    int nxt = 1, x = -1;
    while (true) {
        // 移除所有右端点比 x 小的线段
        while (!pq.empty() && pq.top() < x) pq.pop();
        if (pq.empty()) {
            // 目前没有线段可选，直接跳到下一条线段的左端点
            if (nxt > n) break;
            x = A[nxt].first;
        } else {
            // 有线段可选，选择右端点最小的
            ans++;
            pq.pop();
            x++;
        }
        // 把左端点等于 x 的线段加入堆
        while (nxt <= n && A[nxt].first <= x) {
            pq.push(A[nxt].second);
            nxt++;
        }
    }
    printf("%d\n", ans);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
