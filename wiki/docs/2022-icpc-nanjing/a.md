---
title: A - 停停，昨日请不要再重现
date: 2022-12-16
---

# A - 停停，昨日请不要再重现

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2022 ICPC 亚洲区域赛南京站</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>237/465 (51.0%)</td>
</tr>
</table>

## 题解

### 简化问题

首先考虑一个简单一点的问题：如果没有洞，应用操作序列之后，网格上会剩下多少袋鼠？

如果每一步模拟所有袋鼠的移动，复杂度将达到 $\mathcal{O}(|s|nm)$，显然不可接受。我们不妨反过来想：所有袋鼠都向上移动一步，相当于上下边界向下移动一步；所有袋鼠都向左移动一步，相当于左右边界向右移动一步。

因此我们每一步不模拟所有袋鼠的移动，而是模拟边界的移动。由于在任意一步掉出边界的袋鼠都会被移除，我们维护以下内容：

* $u$ 表示上边界（一开始在第 $1$ 行）在移动过程中最大移动到了哪一行。
* $d$ 表示下边界（一开始在第 $n$ 行）在移动过程中最小移动到了哪一行。
* $l$ 表示左边界（一开始在第 $1$ 列）在移动过程中最大移动到了哪一列。
* $r$ 表示右边界（一开始在第 $m$ 列）在移动过程中最小移动到了哪一列。

只有初始位置满足 $u \le i \le d$ 且 $l \le j \le r$ 的袋鼠才会被保留。因此这个简单问题的答案就是 $(d - u + 1) \times (r - l + 1)$。当然要特判如果 $u > d$ 或 $l > r$ 则没有任何袋鼠存留。

### 原问题

现在我们回到原问题，我们可以利用相似的思路模拟洞的反向移动。我们记录洞每一步相对于初始坐标的偏移量 $(i, j)$ 并去重，由于洞的初始坐标是 $(i_h, j_h)$，因此如果 $u \le i_h + i \le d$ 以及 $l \le j_h + j \le r$，那么位于 $(i_h + i, j_h + j)$ 的袋鼠将额外被去除。

因此我们枚举 $i_h$ 和 $j_h$，并计算洞经过的偏移量中是否恰有 $(k - (d - u + 1) \times (r - l + 1))$ 个偏移量满足 $u - i_h \le i \le d - i_h$ 以及 $l - j_h \le j \le r - j_h$。这就是一个二维前缀和问题，在枚举坐标之前预处理前缀和即可。

您可能还有这样的疑问：洞移动的次数至多为 $|s|$ 次，可能的偏移量范围是否达到了 $\mathcal{O}(|s|^2)$ 的级别，无法简单用二维前缀和解决？其实不然，因为洞移动的时候，边界也在移动。如果洞的行坐标的绝对值超过了 $n$，那么将出现 $u > d$；如果洞的列坐标的绝对值超过了 $m$，那么将出现 $l > r$。只要之前特判了这些情况，洞的偏移量范围将受到限制，可以简单地用二维前缀和处理。

总体复杂度 $\mathcal{O}(|s| + nm)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN 1000
#define MAXM 1000
#define MAXS ((int) 1e6)
using namespace std;

int n, m, K, ans;
char s[MAXS + 10];

int f[MAXN * 2 + 10][MAXM * 2 + 10];

void solve() {
    scanf("%d%d%d%s", &n, &m, &K, s + 1);
    // 维护边界移动的最值
    int U = 1, D = n, L = 1, R = m;
    for (int i = 1, u = 1, d = n, l = 1, r = m; s[i]; i++) {
        if (s[i] == 'U') u++, d++;
        else if (s[i] == 'D') u--, d--;
        else if (s[i] == 'L') l++, r++;
        else l--, r--;
        U = max(U, u);
        D = min(D, d);
        L = max(L, l);
        R = min(R, r);
    }

    // 特判没有任何袋鼠存留的情况
    if (U > D || L > R) {
        if (K == 0) printf("%d\n", n * m);
        else printf("0\n");
        return;
    }

    // 计算还差几只袋鼠需要用洞解决
    int delta = (D - U + 1) * (R - L + 1) - K;
    if (delta < 0) {
        printf("0\n");
        return;
    }

    // 记录洞的偏移量
    // 偏移量范围是 [-n, n] 以及 [-m, m]，因此都加上 n + 1 和 m + 1 变成非负数
    for (int i = 0; i <= n * 2 + 5; i++) for (int j = 0; j <= m * 2 + 5; j++) f[i][j] = 0;
    int BIAS_R = n + 1, BIAS_C = m + 1;
    f[BIAS_R][BIAS_C] = 1;
    for (int i = 1, r = BIAS_R, c = BIAS_C; s[i]; i++) {
        if (s[i] == 'U') r++;
        else if (s[i] == 'D') r--;
        else if (s[i] == 'L') c++;
        else if (s[i] == 'R') c--;
        f[r][c] = 1;
    }
    // 二维前缀和
    for (int i = 1; i <= n * 2 + 5; i++) for (int j = 1; j <= m * 2 + 5; j++) f[i][j] += f[i][j - 1];
    for (int i = 1; i <= n * 2 + 5; i++) for (int j = 1; j <= m * 2 + 5; j++) f[i][j] += f[i - 1][j];
    
    ans = 0;
    // 枚举洞的初始坐标
    for (int i = 1; i <= n; i++) for (int j = 1; j <= m; j++) {
        int biasR = BIAS_R - i, biasC = BIAS_C - j;
        int t = f[D + biasR][R + biasC] - f[U - 1 + biasR][R + biasC] - f[D + biasR][L - 1 + biasC] + f[U - 1 + biasR][L - 1 + biasC];
        if (t == delta) ans++;
    }
    printf("%d\n", ans);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
