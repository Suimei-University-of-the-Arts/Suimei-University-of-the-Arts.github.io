---
title: A - Calandar
date: 2023-07-12
---

# A - Calandar

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2019 山东省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>297/307 (96.7%)</td>
</tr>
</table>

## 题解

因为每年都是 $12$ 个月，每个月都是 $30$ 天，因此可以认为 $y$ 年 $m$ 月 $d$ 日是第 $(y \times 12 \times 30 + m \times 30 + d)$ 天。利用起始和目标天数的差值算出星期几即可。

复杂度 $\mathcal{O}(1)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
using namespace std;

// 星期的名称
char D[5][10] = {"Monday", "Tuesday", "Wednesday", "Thursday", "Friday"};

// 读入一个 y-m-d 的日期，并返回这是第几天
long long input() {
    long long y, m, d; scanf("%lld%lld%lld", &y, &m, &d);
    return y * 12 * 30 + m * 30 + d;
}

void solve() {
    long long a = input();

    // 把字符串转化成一个星期里的第几天
    char s[10]; scanf("%s", s);
    long long c;
    for (c = 0; c < 5; c++) if (strcmp(s, D[c]) == 0) break;

    long long b = input();

    // 利用起始和目标天数的差值，算出目标日期是一周里的第几天
    c = ((c + b - a) % 5 + 5) % 5;
    printf("%s\n", D[c]);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
