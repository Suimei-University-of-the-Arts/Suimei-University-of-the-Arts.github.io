---
title: M - Sekiro
date: 2023-07-12
---

# M - Sekiro

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2019 山东省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>291/307 (94.8%)</td>
</tr>
</table>

## 题解

题目求的是 $n$ 连续进行 $k$ 次除以 $2$ 上取整的结果。

如果 $n = 0$，显然答案就是 $0$。否则 $n$ 将在 $\mathcal{O}(\log n)$ 次操作之后变成 $1$，因此最多只要模拟 $\mathcal{O}(\log n)$ 次操作即可。

复杂度 $\mathcal{O}(\log n)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
using namespace std;

void solve() {
    int n, K; scanf("%d%d", &n, &K);
    if (n == 0) printf("0\n");
    else {
        while (K > 0 && n > 1) K--, n = (n + 1) / 2;
        printf("%d\n", n);
    }
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
