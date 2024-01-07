---
title: C - 原根
date: 2023-12-09
---

# C - 原根

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2023 ICPC 亚洲区域赛南京站</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>245/342 (71.6%)</td>
</tr>
</table>

## 题解

### 解法一

$g \oplus (P - 1) \equiv 1 \pmod p$，即 $g \oplus (P - 1) = kP + 1$，即 $g = (kP + 1) \oplus (P - 1) \le m$。由于 $P$ 是定值，则 $g$ 的方案数就等于 $k$ 的方案数。

所有小于等于 $m$ 的数可以根据与 $m$ 最长公共前缀的长度分成 $\log m$ 种，例如小于等于 $m = 1011$ 的数可以分为 $m_3 = 0***$，$m_1 = 100*$，$m_0 = 1010$ 和 $1011$ 本身。

考虑最长公共前缀一直到第 $(t + 1)$ 低位的那一组 $m_t$。由 $(kP + 1) \oplus (P - 1) = m_t$ 可得 $kP + 1 = m_t \oplus (P - 1)$。对于 $m_t$ 的所有数，一直到第 $t$ 低位的前缀都是固定的，而剩下的后缀可以是任意数。因此 $m_t \oplus (P - 1)$ 一直到第 $t$ 低位的前缀也是固定的，而剩下的后缀仍然可以是任意数。也就是说，设 $p_t$ 为 $m_t \oplus (P - 1)$ 把所有星号都换成 $0$ 的值，则 $p_t \le kP + 1 < p_t + 2^{t}$，通过除法就能算出这个区间里有几个合法的 $k$。

复杂度 $\mathcal{O}(\log m)$。

### 解法二

注意到异或运算的性质：$a - b \le a \oplus b \le a + b$。

对于所有 $0 \le k \le \lfloor \frac{m}{P} \rfloor - 1$，均有 $(kP + 1) \oplus (P - 1) \le (k + 1)P \le m$，满足要求；对于所有 $k \ge \lceil \frac{m}{P} \rceil + 1$，均有 $(kP + 1) \oplus (P - 1) \ge (k - 1)P + 2 > m$，不满足要求。

因此我们只要检查所有 $\lfloor \frac{m}{P} \rfloor \le k \le \lceil \frac{m}{P} \rceil$ 的值即可。复杂度 $\mathcal{O}(1)$。

## 参考代码

### 解法一

```c++ linenums="1"
#include <bits/stdc++.h>
using namespace std;

long long P, m, ans;

// 求 0 <= kP + 1 <= x 的 k 的数量
long long calc(long long x) {
    x--;
    if (x < 0) return 0;
    else return x / P + 1;
}

// 求 L <=> kP + 1 <= R 的 k 的数量
long long calc(long long L, long long R) {
    return calc(R) - calc(L - 1);
}

void solve() {
    scanf("%lld%lld", &P, &m);
    ans = 0;
    // 枚举与 m 的最长公共前缀
    for (int i = 60; i >= 0; i--) if (m >> i & 1) {
        // 计算 kP + 1 的上下界
        long long L = m >> i ^ 1;
        L ^= (P - 1) >> i;
        L <<= i;
        long long R = L + (1LL << i) - 1;
        // 求特定范围内 k 的数量
        ans += calc(L, R);
    }
    // 别忘了 m 本身也要算
    ans += calc(m ^ (P - 1), m ^ (P - 1));
    printf("%lld\n", ans);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```

### 解法二

```c++ linenums="1"
#include <bits/stdc++.h>
using namespace std;

long long P, m, ans;

void solve() {
    scanf("%lld%lld", &P, &m);
    ans = m / P;
    for (long long k = m / P; k <= (m + P - 1) / P; k++)
        if (((k * P + 1) ^ (P - 1)) <= m) ans++;
    printf("%lld\n", ans);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
