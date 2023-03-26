---
title: E - Plants vs. Zombies
date: 2023-02-04
---

# E - Plants vs. Zombies

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2018 ICPC 亚洲区域赛青岛站</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>121/373 (32.4%)</td>
</tr>
</table>

## 题解

容易想到二分答案，接下来考虑如何检验答案 $x$。

由于每一次浇水前必须先移动，因此为了把第一棵植物浇到高度 $x$ 同时又不浪费水，就需要在第一和第二棵植物之间反复移动。完成第一棵植物的浇水后，为了把第二棵植物浇到高度 $x$ 同时又不浪费水，就需要在第二和第三棵植物之间反复移动...

模拟以上贪心过程即可。时间复杂度 $\mathcal{O}(n\log (m \times \max a_i))$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 1e5)
using namespace std;

int n, A[MAXN + 10];
long long m;

// 表示目前每棵植物的高度
long long B[MAXN + 10];

bool check(long long LIM) {
    long long step = 0;
    memset(B, 0, sizeof(long long) * (n + 3));
    for (int i = 1; i <= n; i++) {
        if (LIM > B[i]) {
            // 第 i 棵植物需要继续浇水
            // 在它和第 (i + 1) 棵植物之间反复移动
            long long t = LIM - B[i];
            t = (t + A[i] - 1) / A[i];
            step += t * 2 - 1;
            // 步数超出限制就即刻退出
            // 否则数据范围可能超出 long long
            if (step > m) return false;
            B[i + 1] += A[i + 1] * (t - 1);
        } else {
            // 第 i 棵植物不需要继续浇水
            // 直接路过，但步数还要算
            // 这里步数可能会超过限制
            // 但是只要右边没有其它需要浇水的植物，就不会返回 false
            step++;
        }
    }
    return true;
}

void solve() {
    scanf("%d%lld", &n, &m);
    for (int i = 1; i <= n; i++) scanf("%d", &A[i]);
    
    // 二分答案
    long long head = 0, tail = 1e18;
    while (head < tail) {
        long long mid = (head + tail + 1) >> 1;
        if (check(mid)) head = mid;
        else tail = mid - 1;
    }
    printf("%lld\n", head);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
