---
title: H - Traveling on the Axis
date: 2023-08-31
---

# H - Traveling on the Axis

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2018 ICPC 亚洲区域赛青岛站网络赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>933/1550 (60.2%)</td>
</tr>
</table>

## 题解

考虑 $t(p, q - 1)$ 和 $t(p, q)$ 的关系。容易发现：

* 若 $s_{q - 1} = s_q$，则 $t(p, q) = t(p, q - 1) + 2$。
* 若 $s_{q - 1} \ne s_q$，则 $t(p, q) = t(p, q - 1) + 1$。

设 $f(q) = \sum\limits_{p = 0}^{q - 1} t(p, q)$，则有递推式

$$
f(q) = \begin{cases}
f(q - 1) + 2(q - 1) + t(q - 1, q) & \text{if } s_{q - 1} = s_q \\
f(q - 1) + (q - 1) + t(q - 1, q) & \text{otherwise}
\end{cases}
$$

初值 $f(0) = 0$，答案就是 $\sum\limits_{q = 1}^n f(q)$。复杂度 $\mathcal{O}(n)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 1e5)
using namespace std;

char s[MAXN + 10];
long long ans;

void solve() {
    scanf("%s", s + 1);
    
    ans = 0;
    long long sm = 0;
    for (int i = 1; s[i]; i++) {
        if (s[i] == s[i - 1]) sm += 2 * (i - 1);
        else sm += i - 1;
        if (s[i] == '1') sm++;
        else sm += 2;
        ans += sm;
    }
    printf("%lld\n", ans);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
