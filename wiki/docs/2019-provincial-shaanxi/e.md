---
title: E - Turn It Off
date: 2023-07-16
---

# E - Turn It Off

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2019 陕西省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>80/111 (72.1%)</td>
</tr>
</table>

## 题解

二分 $L$，每次操作令 $i$ 为最左边亮着的灯的下标即可。复杂度 $\mathcal{O}(n\log n)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 2e5)
using namespace std;

int n, K;
char s[MAXN + 10];

bool check(int L) {
    int cnt = 0;
    for (int i = 1; i <= n; ) {
        // 位置 i 的灯是亮的，进行关灯操作
        if (s[i] == '1') cnt++, i += L;
        // 位置 i 的灯是灭的，不操作
        else i++;
    }
    return cnt <= K;
}

void solve() {
    scanf("%d%d%s", &n, &K, s + 1);
    // 二分答案
    int head = 1, tail = n;
    while (head < tail) {
        int mid = (head + tail) >> 1;
        if (check(mid)) tail = mid;
        else head = mid + 1;
    }
    printf("%d\n", head);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
