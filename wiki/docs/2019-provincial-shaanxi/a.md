---
title: A - Digit Mode
date: 2023-07-18
---

# A - Digit Mode

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2019 陕西省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>2/111 (1.8%)</td>
</tr>
</table>

## 题解

设 $n$ 共有 $r$ 位。与数位 dp 类似，我们枚举数位 $p$ 表示我们考虑的数中，最高 $(p - 1)$ 位和 $n$ 的最高 $(p - 1)$ 位相同，但第 $p$ 高位比 $n$ 的第 $p$ 高位要小。这样第 $(p + 1)$ 位到第 $r$ 位就可以随便填了。

此时我们枚举众数是数码 $m$，以及众数的出现次数 $c$，就能算出其它每种数码在第 $(p + 1)$ 位到第 $r$ 位中最多能再填几个，用多重背包计算即可。具体来说，令 $f(i, j)$ 表示前 $i$ 个数码在第 $(p + 1)$ 位到第 $r$ 位中填了 $j$ 个，则根据 [多重集的排列数](https://oi-wiki.org/math/combinatorics/combination/#%E5%A4%9A%E9%87%8D%E9%9B%86%E7%9A%84%E6%8E%92%E5%88%97%E6%95%B0--%E5%A4%9A%E9%87%8D%E7%BB%84%E5%90%88%E6%95%B0)，转移方程为

$$
f(i, j) = \sum\limits_{k} f(i - 1, j - k) \times \frac{j!}{(j - k)!} \times \frac{1}{k!}
$$

设众数在前 $p$ 位中出现次数为 $c'$，则方案数为

$$
f(9, (n - p + 1) - (c - c')) \times \frac{(n - p + 1)!}{((n - p + 1) - (c - c'))!} \times \frac{1}{(c - c')!}
$$

这个转移方程还可以减少计算的次数。可以发现 $\frac{j!}{(j - k)!}$ 主要用于改变多重集排列数的分母，因为最后的答案中，分母总是 $(n - p + 1)!$，因此可以把 $\frac{j!}{(j - k)!}$ 这一项去掉，最后把答案统一乘以 $\frac{(n - p + 1)!}{(c - c')!}$ 即可。

当然，别忘了考虑长度比 $n$ 要短的数。枚举长度以及第一位的数码，剩下的位置按上述的方法计算多重背包即可。

设数码共有 $d = 10$ 个，则每次多重背包的复杂度为 $\mathcal{O}(d \times \log^2 n)$，再乘上外围的所有枚举，总体复杂度 $\mathcal{O}(d^3 \times \log^4 n)$。这个复杂度看起来非常大，但实际上常数很小，在最大的数据下，最内层的循环执行次数在 $1.8 \times 10^8$ 左右，可以在时限内通过。

## 参考代码

```c++ linenums="1"
// 由于包含大量 long long 运算，cf 上建议使用 64 位编译器，运行速度快
#include <bits/stdc++.h>
#define MAXN 50
#define MOD ((int) 1e9 + 7)
using namespace std;

int n;
long long ans;
char s[MAXN + 10];

int A[MAXN + 10];
long long f[MAXN + 10], fac[MAXN + 10], ifac[MAXN + 10];

// 计算第 L 到 R 位随便填的贡献
void gao(int L, int R) {
    int len = R - L + 1;
    // 统计已经枚举的前缀部分，每种数码出现了几次
    int cnt[10] = {0};
    for (int i = 1; i < L; i++) cnt[A[i]]++;

    // 枚举众数 m，以及出现次数 c
    for (int m = 1; m <= 9; m++) for (int c = cnt[m]; c <= cnt[m] + len; c++) {
        int tot = len - (c - cnt[m]);
        // 计算多重背包
        auto calc = [&]() {
            memset(f, 0, sizeof(long long) * (tot + 3));
            f[0] = 1;
            for (int i = 0; i <= 9; i++) if (i != m) {
                int lim = c - (i > m ? 1 : 0) - cnt[i];
                if (lim < 0) return 0LL;
                for (int j = tot; j > 0; j--) for (int k = 1; k <= lim && k <= j; k++)
                    f[j] = (f[j] + f[j - k] * ifac[k]) % MOD;
            }
            return f[tot];
        };
        ans = (ans + m * calc() % MOD * fac[len] % MOD * ifac[c - cnt[m]]) % MOD;
    }
}

void solve() {
    scanf("%s", s + 1); n = strlen(s + 1);

    ans = 0;
    // 考虑长度比 n 短的数，只要枚举第一个数码，后面随便填
    for (int i = 1; i < n; i++) for (A[1] = 1; A[1] <= 9; A[1]++) gao(2, i);
    // 考虑长度和 n 一样长的数，枚举从哪一位开始前缀不同
    for (int i = 1; i <= n; i++) for (A[i] = (i == 1 ? 1 : 0); A[i] < s[i] - '0'; A[i]++) gao(i + 1, n);
    // 别忘了 n 本身也要统计一下
    gao(n + 1, n);
    printf("%lld\n", ans);
}

int main() {
    fac[0] = 1;
    for (int i = 1; i <= MAXN; i++) fac[i] = fac[i - 1] * i % MOD;
    ifac[0] = ifac[1] = 1;
    for (int i = 2; i <= MAXN; i++) ifac[i] = (MOD - MOD / i) * ifac[MOD % i] % MOD;
    for (int i = 2; i <= MAXN; i++) ifac[i] = ifac[i] * ifac[i - 1] % MOD;

    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
