---
title: D - Magic Multiplication
date: 2023-02-04
---

# D - Magic Multiplication

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2018 ICPC 亚洲区域赛青岛站</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>99/373 (26.5%)</td>
</tr>
</table>

## 题解

只要确定了 $a_1$，我们就能唯一确定一个 $B$。这是因为：

* 如果当前乘积以 $0$ 开头，由于题目要求 $a_1 \ne 0$，因此必须有 $b_i = 0$。
* 如果当前乘积以 $1 \le x \le 9$ 开头，那么 $1$ 到 $9$ 中只有一个数乘以 $a_1$ 能够以 $x$ 开头。
    
    有的读者可能担心，会不会存在 $b_i'$ 和 $b_i''$，使得 $a_1 \times b_i' = x$，而 $a_1 \times b_i''$ 是一个以 $x$ 为开头的两位数？显然不会，因为以 $x$ 为开头的两位数至少是 $x$ 的 $10$ 倍，那么 $b_i''$ 必须至少是 $b_i'$ 的 $10$ 倍，但我们只考虑 $1$ 到 $9$。

因此我们从 $1$ 到 $9$ 枚举 $a_1$。求出 $B$ 中的所有元素后，我们就能反过来用 $b_1$ 求出 $A$ 中的所有元素，最后检查求出的这一组 $A$ 和 $B$ 是否合法即可。

复杂度 $\mathcal{O}(9 \times |s|)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 2e5)
using namespace std;

int n, m, sLen;
char s[MAXN + 10];

int A[MAXN + 10], B[MAXN + 10], f[10][100];

// 给乘积的一个因数（1 ~ 9），求出另一个因数（0 ~ 9）
// x：给定的乘积因数
// now：乘积在 s 中的位置
int gao(int x, int &now) {
    if (now > sLen) return -1;

    // 以 0 开头的乘积，另一个因数必须是 0
    if (s[now] == '0') {
        now++;
        return 0;
    }

    // 以非 0 开头的乘积，查乘法表
    int t = s[now] - '0';
    if (f[x][t] > 0) {
        now++;
        return f[x][t];
    }

    t = t * 10 + (s[now + 1] - '0');
    if (now < sLen && f[x][t] > 0) {
        now += 2;
        return f[x][t];
    }

    return -1;
}

// 枚举 a_1 = X
bool check(int X) {
    A[1] = X;

    // 用 a_1 求出 B 中所有元素
    int now = 1;
    for (int i = 1; i <= m; i++) {
        B[i] = gao(X, now);
        if (B[i] < 0) return false;
    }
    // 题目要求 b_1 != 0
    if (B[1] == 0) return false;

    for (int i = 2; i <= n; i++) {
        // 用 b_1 反求 a_i，这里 b_1 != 0，可以复用 gao 函数
        A[i] = gao(B[1], now);
        if (A[i] < 0) return false;
        // 检查剩下的乘积是否符合要求
        for (int j = 2; j <= m; j++) {
            int t = A[i] * B[j];
            int l = t >= 10 ? 2 : 1;
            for (int k = l - 1; k >= 0; k--) {
                if (now + k > sLen || s[now + k] - '0' != t % 10) return false;
                t /= 10;
            }
            now += l;
        }
    }

    // 必须恰好把字符串处理完
    return now == sLen + 1;
}

void solve() {
    scanf("%d%d%s", &n, &m, s + 1);
    sLen = strlen(s + 1);

    // 枚举 a_1 求答案
    for (int i = 1; i <= 9; i++) if (check(i)) {
        for (int j = 1; j <= n; j++) printf("%d", A[j]);
        printf(" ");
        for (int j = 1; j <= m; j++) printf("%d", B[j]);
        printf("\n");
        return;
    }
    printf("Impossible\n");
}

int main() {
    // 预处理乘法表
    for (int i = 1; i <= 9; i++) for (int j = 1; j <= 9; j++) f[i][i * j] = j;

    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
