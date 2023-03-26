---
title: G - Repair the Artwork
date: 2023-02-07
---

# G - Repair the Artwork

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2018 ICPC 亚洲区域赛青岛站</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>8/373 (2.1%)</td>
</tr>
</table>

## 题解

### 只有 0 和 1 的情况

首先考虑只有 $0$ 和 $1$ 时的答案，显然答案就是 $k^m$，其中 $k$ 是不包含 $1$ 的区间数量。

### 加入少量的 2

记 $\{a_1a_2\cdots a_n\}$ 表示序列 $a_1, a_2, \cdots, a_n$ 的答案。

我们首先来考虑只包含一个 $2$ 的例子，例如 $021$。我们要求的是“$2$ 必须被覆盖的方案数”，可以把它转化为“$2$ 可能被覆盖的方案数”减去“$2$ 一定不被覆盖的方案数”。

一个位置如果“可能被覆盖”，相当于这个位置是 $0$；一个位置如果“一定不被覆盖”，相当于这个位置是 $1$。用式子来表示即为

$$
\{021\} = \{0\underline{0}1\} - \{0\underline{1}1\}
$$

原本 $2$ 的位置用下划线标注。这样就转化为了只有 $0$ 和 $1$ 的情况。

接下来考虑只包含两个 $2$ 的例子，例如 $02121$。可以利用相同的思路得到下面的式子

$$
\begin{matrix}
\{02121\} & = & \{0\underline{0}121\} - \{0\underline{1}121\} \\
 & = & (\{0\underline{0}1\underline{0}1\} - \{0\underline{0}1\underline{1}1\}) - (\{0\underline{1}1\underline{0}1\} - \{0\underline{1}1\underline{1}1\}) \\
 & = & \{0\underline{0}1\underline{0}1\} - \{0\underline{0}1\underline{1}1\} - \{0\underline{1}1\underline{0}1\} + \{0\underline{1}1\underline{1}1\} \\
\end{matrix}
$$

同样转化为了只有 $0$ 和 $1$ 的情况。

### 推广到任意情况

熟悉容斥原理的读者应该很快发现，上述式子正是容斥原理的式子。不难将答案表示为容斥原理的形式，即为

$$
\sum (-1)^{c(a_1a_2\cdots a_n)} \times k(a_1a_2\cdots a_n)^m
$$

其中 $a_1, a_2, \cdots, a_n$ 是一个由 $0$，$1$，$\underline{0}$ 和 $\underline{1}$ 构成的序列，$c(a_1a_2\cdots a_n)$ 表示序列中 $\underline{1}$ 的数量，$k(a_1a_2\cdots a_n)$ 表示序列中不包含 $1$ 或 $\underline{1}$ 的区间数量。

注意到式子的值只和 $c$ 的奇偶性以及合法区间的数量有关，因此维护 $f(i, j, 0/1)$ 表示只考虑前 $i$ 个元素组成的子序列，其中合法区间的数量为 $j$，且 $1$ 和 $\underline{1}$ 总共出现了偶数次或奇数次的情况数。由于合法区间的数量只和 $1$（$\underline{1}$）的位置有关，因此我们可以跳过所有的 $0$，只在可能会出现 $1$（$\underline{1}$）的位置之间进行递推。

为了方便计算，定义 $a_0 = a_{n + 1} = 1$。这并不影响答案。最终答案就是

$$
\sum\limits_{j=0}^{\frac{n(n + 1)}{2}} (f(n + 1, j, 0) - f(n + 1, j, 1)) \times j^m
$$

注意到容斥的式子里，每一项的正负只和序列中 $\underline{1}$ 出现的次数有关，而状态里的 $0/1$ 是 $1$ 和 $\underline{1}$ 总共出现的次数。因此如果 **原序列** 中 $1$ 出现了奇数次，那么答案要再乘以 $-1$。

考虑当序列末尾加入一个 $1$（$\underline{1}$）时，区间数量会增加多少。显然增加的区间数量只和上一个 $1$（$\underline{1}$）的位置有关，因此我们枚举上一个 $1$（$\underline{1}$）的位置进行转移。得到转移方程

$$
f(i, k + \frac{(i - j)(i - j - 1)}{2}, 0/1) = \sum\limits_{j=\text{last}}^{i - 1} f(j, k, 1/0)
$$

其中 $\text{last}$ 表示 **原序列** 中上一个 $1$ 的位置（不会比这个位置更往前，因为 $2$ 可以选择变成 $\underline{0}$，而原来就是 $1$ 的位置没得选）。初值 $f(0, 0, 0) = 0$，$f(0, 0, 1) = 1$（因为 $a_0 = 1$）。

时间复杂度 $\mathcal{O}(n^4)$，但常数非常小。例如，参考代码的复杂度为

$$
\sum\limits_{i=1}^n\sum\limits_{j=1}^i \frac{j^2}{2} \approx \frac{n^4}{48}
$$

可以轻松通过。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN 100
#define MOD ((int) 1e9 + 7)
using namespace std;

int n, m, A[MAXN + 10];
long long ans;

long long f[MAXN + 10][(MAXN + 1) * MAXN / 2 + 10][2];
int lim[MAXN + 10];

// 快速幂求 a ** b
long long power(long long a, long long b) {
    long long y = 1;
    for (; b; b >>= 1) {
        if (b & 1) y = y * a % MOD;
        a = a * a % MOD;
    }
    return y;
}

void solve() {
    scanf("%d%d", &n, &m);
    for (int i = 1; i <= n; i++) scanf("%d", &A[i]);
    A[0] = A[n + 1] = 1;

    f[0][0][0] = 0; f[0][0][1] = 1; lim[0] = 0;
    for (int i = 1, last = 0; i <= n + 1; i++) if (A[i] > 0) {
        // lim[i] 表示前 i 个元素最多有几个合法的区间
        lim[i] = lim[last] + (i - last) * (i - last - 1) / 2;
        for (int j = 0; j <= lim[i]; j++) f[i][j][0] = f[i][j][1] = 0;
        // 套用转移方程
        for (int j = last; j < i; j++) if (A[j] > 0) {
            int delta = (i - j) * (i - j - 1) / 2;
            for (int k = 0; k <= lim[j]; k++) {
                f[i][k + delta][0] = (f[i][k + delta][0] + f[j][k][1]) % MOD;
                f[i][k + delta][1] = (f[i][k + delta][1] + f[j][k][0]) % MOD;
            }
        }
        if (A[i] == 1) last = i;
    }

    // 如果原序列中 1 出现了奇数次，答案取反
    bool odd = false;
    for (int i = 0; i <= n + 1; i++) if (A[i] == 1) odd = !odd;

    ans = 0;
    for (int i = 0; i <= lim[n + 1]; i++) ans = (ans + (f[n + 1][i][0] - f[n + 1][i][1] + MOD) * power(i, m)) % MOD;
    if (odd) ans = (MOD - ans) % MOD;
    printf("%lld\n", ans);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
