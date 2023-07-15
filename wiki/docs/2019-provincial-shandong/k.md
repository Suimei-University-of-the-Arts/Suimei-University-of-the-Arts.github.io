---
title: K - Happy Equation
date: 2023-07-12
---

# K - Happy Equation

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2019 山东省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>21/307 (6.8%)</td>
</tr>
</table>

## 题解

通过打表可以发现，当 $a$ 为奇数时，答案为 $1$。

??? "证明"

    当 $a$ 为奇数时，可以证明 $x = a \bmod 2^p$ 是一个解。

    首先，当 $a < 2^p$ 时，$x = a \bmod 2^p = a$ 显然满足 $a^x = x^a \pmod {2^p}$

    当 $a \ge 2^p$ 时，根据模的乘法有 $a^x = x^x \pmod {2^p}$，根据 [欧拉定理](https://oi-wiki.org/math/number-theory/euler/#%E6%AC%A7%E6%8B%89%E5%AE%9A%E7%90%86) 有

    $$
    x^{\phi(2^p)} = x^{2^{p - 1}} = 1 \pmod {2^p}
    $$

    则

    $$
    \begin{aligned}
    x^a &= x^{k \times 2^p + x} \\ &= x^{2k \times 2^{p - 1} + x} \\ &= (x^{2^{p - 1}})^{2k} \times x^x \\ &= x^x \\ &= a^x \pmod {2^p}
    \end{aligned}
    $$

    $\blacksquare$

    当 $a$ 为奇数时，若 $x$ 为偶数，则 $a^x$ 是奇数，$x^a$ 是偶数，不可能对 $2^p$ 取模后相等。因此 $x$ 也是奇数。

    首先通过反证法证明以下引理。
    
    > 引理 1：不存在两个奇数 $x$ 和 $y$ 满足 $x, y \in [1, 2^p]$ 且 $x^a = y^a \pmod {2^p}$。

    假设存在两个满足要求的奇数 $x$ 和 $y$，进行因式分解得

    $$
    x^a - y^a = (x - y) \times \sum\limits_{i = 0}^{a - 1} x^iy^{a - 1 - i}
    $$

    $\sum$ 里的每一项都是奇数，共有 $a$ 项，奇数个奇数项加起来仍然是奇数，不存在质因子 $2$。而 $x - y \le 2^p - 1 < 2^p$，因此质因子 $2$ 少于 $p$ 个。即

    $$
    x^a - y^a \ne 0 \pmod {2^p}
    $$

    与假设矛盾。

    $\blacksquare$

    令 $v_2(t)$ 表示 $t$ 的质因数分解中 $2$ 的数量。接下来通过反证法证明以下引理。

    > 引理 2：设 $x = y \pmod {2^p}$ 且 $v_2(x) < p$ 且 $v_2(y) < p$，则 $v_2(x) = v_2(y)$。

    不失一般性地，假设 $v_2(x) < v_2(y)$，由题设有

    $$
    x - k_x \times 2^{p} = y - k_y \times 2^{p}
    $$

    等式两边同时除以 $2^{v_2(x)}$ 得

    $$
    \frac{x}{2^{v_2(x)}} - k_x \times 2^{p - v_2(x)} = \frac{y}{2^{v_2(y)}} - k_y \times 2^{p - v_2(x)}
    $$

    $\frac{x}{2^{v_2(x)}}$ 是奇数，由于 $v_2(x) < p$ 则 $k_x \times 2^{p - v_2(x)}$ 是偶数，因此等式左边是奇数；由于 $v_2(x) < v_2(y)$ 则 $\frac{y}{2^{v_2(y)}}$ 是偶数，由于 $v_2(x) < p$ 则 $k_y \times 2^{p - v_2(x)}$ 是偶数，因此等式右边是偶数。产生矛盾。

    $\blacksquare$

    接下来通过反证法证明：不存在两个奇数 $x$ 和 $y$ 满足 $1 \le x < y \le 2^p$ 且 $a^x = x^a \pmod {2^p}$ 且 $a^y = y^a \pmod {2^p}$。

    假设存在两个满足要求的奇数 $x$ 和 $y$，相减得

    $$
    a^y - a^x = y^a - x^a \pmod {2^p}
    $$

    令 $v_2(t)$ 表示 $t$ 的质因数分解中 $2$ 的数量。由引理 1 得 $v_2(y^a - x^a) < p$，则 $v_2(a^y - a^x) < p$（否则 $a^y - a^x = 0 \ne y^a - x^a \pmod {2^p}$），由引理 2 得 $v_2(a^y - a^x) = v_2(y^a - x^a)$

    根据 [升幂（LTE）定理](https://oi-wiki.org/math/number-theory/lift-the-exponent/) 有

    $$
    \begin{aligned}
    v_2(a^y - a^x) &= v_2(a^x(a^{y - x} - 1)) & \text{（因式分解）} \\
    &= v_2(a^x(a^{y - x} - 1^{y - x})) & \\
    &= v_2(a^x) + v_2(a^{y - x} - 1^{y - x}) & \text{（根据 } v_2 \text{ 的定义）} \\
    &= v_2(a^x) + v_2(a - 1) + v_2(a + 1) + v_2(y - x) - 1 & \text{（升幂定理）}
    \end{aligned}
    $$

    $$
    \begin{aligned}
    v_2(y^a - x^a) &= v_2(y - x) & \text{（升幂定理）}
    \end{aligned}
    $$

    即

    $$
    v_2(a^x) + v_2(a - 1) + v_2(a + 1) - 1 = 0
    $$

    因为 $a^x$ 是奇数，所以 $v_2(a^x) = 0$。因为 $a$ 是奇数，当 $a \ge 3$ 时，$(a - 1)$ 和 $(a + 1)$ 均为正偶数，因此 $v_2(a - 1) \ge 1$，$v_2(a + 1) \ge 1$。因此

    $$
    v_2(a^x) + v_2(a - 1) + v_2(a + 1) - 1 \ge 1 \ne 0
    $$

    产生矛盾。

    当 $a = 1$ 时，满足 $1^x = x^1 \pmod {2^p}$ 且 $x \in [1, 2^p]$ 的 $x$ 显然只有 $x = 1$。

    $\blacksquare$

当 $a$ 为偶数时，设 $a$ 的质因数分解中有 $q$ 个 $2$，那么 $a^x$ 的质因数分解中就有 $qx$ 个 $2$。当 $qx \ge p$ 时，$a^x \bmod 2^p = 0$。因为 $a$ 是正偶数，即 $q \ge 1$，所以当 $x \ge p$ 时我们只要考虑满足 $x^a \bmod 2^p = 0$ 的 $x$。

同样，设 $x$ 的质因数分解中有 $k$ 个 $2$，那么 $x^a$ 的质因数分解中就有 $ka$ 个 $2$。为了让 $x^a \bmod 2^p = 0$，必须要有 $ka \ge p$，即 $k \ge \lceil\frac{p}{a}\rceil = k'$。$[p, 2^p]$ 中，$2^{k'}$ 的倍数有 $(2^{p - k'} - \lfloor\frac{p - 1}{2^{k'}}\rfloor)$ 个。

由于 $p \le 30$，$x < p$ 的部分枚举即可。复杂度 $\mathcal{O}(p \log (a + p))$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
using namespace std;

long long power(long long a, int b, int MOD) {
    long long y = 1;
    for (; b; b >>= 1) {
        if (b & 1) y = y * a % MOD;
        a = a * a % MOD;
    }
    return y;
}

void solve() {
    int a, p; scanf("%d%d", &a, &p);
    if (a & 1) { printf("1\n"); return; }

    int ans = 0;
    for (int x = 1; x < p; x++) ans += (power(a, x, 1 << p) == power(x, a, 1 << p) ? 1 : 0);
    int k = (p + a - 1) / a;
    ans += (1 << (p - k)) - (p - 1) / (1 << k);
    printf("%d\n", ans);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
