---
title: K - 困难的构造题
date: 2023-07-01
---

# K - 困难的构造题

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2023 山东省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>8/276 (2.9%)</td>
</tr>
</table>

## 题解

假设字符串头尾不存在问号，只有中间有问号。可以发现，当把一个字符从 $0$ 变成 $1$，或者从 $1$ 变成 $0$ 后，满足条件的下标数量将会增加或减少 $2$。因此满足条件的下标数量可以取到最小值和最大值之间的所有奇（偶）数。

因此计算 $f(i, 0/1)$ 以及 $g(i, 0/1)$，表示只考虑从第 $i$ 个字符开始的后缀，且第 $i$ 个字符填 $0/1$ 时，后缀中最少（最多）有几个满足条件的下标。转移方程为

$$
\begin{matrix}
f(i, j) = \min(f(i + 1, j), f(i + 1, 1 - j) + 1) \\
g(i, j) = \max(g(i + 1, j), g(i + 1, 1 - j) + 1)
\end{matrix}
$$

这样我们就可以从头开始逐位确定答案。先看 $f(1, s_1)$ 和 $k$ 的奇偶性是否一样，对于每一位再看是否 $f(i, 0/1) \le k - k' \le g(i, 0/1)$ 来判断这一位能否选 $0/1$（因为要求答案字典序最小，所以能选 $0$ 就选），其中 $k'$ 表示前 $i$ 个字符中满足条件的下标数量。

最后考虑问号在字符串头尾的情况。其实只要枚举头尾的两个字符是 $0$ 还是 $1$ 即可。复杂度 $\mathcal{O}(n)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 1e5)
#define INF ((int) 1e9)
using namespace std;

int n, K;
char s[MAXN + 10];

int L[MAXN + 10][2], R[MAXN + 10][2];

string gao() {
    // 后缀中最少（最多）有几个满足条件的下标
    for (int j = 0; j <= 1; j++) {
        if (s[n] == j + '0') L[n][j] = R[n][j] = 0;
        else L[n][j] = 1e9, R[n][j] = -1e9;
    }
    for (int i = n - 1; i > 0; i--) for (int j = 0; j <= 1; j++) {
        if (s[i] == j + '0' || s[i] == '?') {
            L[i][j] = min(L[i + 1][j], L[i + 1][j ^ 1] + 1);
            R[i][j] = max(R[i + 1][j], R[i + 1][j ^ 1] + 1);
        } else {
            L[i][j] = 1e9; R[i][j] = -1e9;
        }
    }

    // 先看 L[1][s_1] 的奇偶性和 k 是否一样
    if (K % 2 != L[1][s[1] - '0'] % 2) return "2";

    string ret;
    int cnt = 0;
    for (int i = 1; i <= n; i++) {
        bool ok = false;
        for (int j = 0; j <= 1; j++) {
            // cnt + t 表示前 i 个字符中满足条件的下标数量
            int t = (i > 1 && j != ret[i - 2] - '0' ? 1 : 0);
            // 看第 i 位能否填入字符 j
            if (L[i][j] + cnt + t <= K && R[i][j] + cnt + t >= K) {
                ret.push_back(j + '0');
                cnt += t;
                ok = true;
                break;
            }
        }
        // 0 和 1 都填不进第 i 位，无解
        if (!ok) return "2";
    }
    assert(cnt == K);
    return ret;
}

void solve() {
    scanf("%d%d%s", &n, &K, s + 1);

    char x = s[1], y = s[n];
    string ans = "2";
    // 枚举第一个和最后一个字符
    for (int i = 0; i <= 1; i++) if (x == '?' || x == i + '0') 
        for (int j = 0; j <= 1; j++) if (y == '?' || y == j + '0') {
            s[1] = i + '0'; s[n] = j + '0';
            ans = min(ans, gao());
        }
    if (ans == "2") printf("Impossible\n");
    else printf("%s\n", ans.c_str());
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
