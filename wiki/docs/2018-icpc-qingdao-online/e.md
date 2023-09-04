---
title: E - Infinite Parenthesis Sequence
date: 2023-09-04
---

# E - Infinite Parenthesis Sequence

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2018 ICPC 亚洲区域赛青岛站网络赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>0/1550 (0.0%)</td>
</tr>
</table>

## 题解

考虑计算 $f(k, i)$ 表示 $B^k$ 中第 $i$ 个左括号的下标（$i$ 可以为 $0$ 甚至负数），设 $g(k, p)$ 表示满足 $f(k, i) \le p$ 的最大的 $i$，则区间 $[l, r]$ 里左括号的总数即为 $g(k, r) - g(k, l - 1)$。$g$ 的值通过二分 $i$ 即可算出。

另外，由于我们只关心 $g$ 的差值，因此第 $0$ 个左括号具体对应哪个括号其实可以随便指定。方便起见，把最开始的有限字符串中的第一个左括号选为第 $0$ 个左括号。

接下来考虑 $f(k, i)$ 的转移方程。

* 如果 $f(k, i)$ 的下一个字符是右括号，因为 `() -> )(`，有 $f(k + 1, i) = f(k, i) + 1$。
* 如果 $f(k, i)$ 的下一个字符是左括号，因为 `(( -> (*`，有 $f(k + 1, i) = f(k, i + 1) - 1$。

综合起来，转移方程为

$$
f(k + 1, i) = \min(f(k, i) + 1, f(k, i + 1) - 1)
$$

假设 $f(k, i)$ 是从 $f(0, j)$ 转移过来的，那么第一维从 $0$ 走到 $k$ 的过程中，$\min$ 中的第二项恰选了 $(j - i)$ 次，第一项恰选了 $(k - (j - i))$ 次，因此转移方程还可以写为

$$
f(k, i) = \min\limits_{i \le j \le i + k}(f(0, j) + k - 2(j - i))
$$

容易看出决策区间的长度是 $(i + k) - i = k$。设最开始的有限字符串中，左括号的数量共有 $m$ 个。首先分析 $k \le m$ 的时候如何求出最小值。

设 $F(j) = f(0, j) - 2j$。注意到 $f(0, j + m) - f(0, j) = n$，有

$$
F(j + t) = F(j \bmod m + t) + (n - 2m) \times \lfloor\frac{j}{m}\rfloor
$$

其中 $t$ 是任意非负数。因此我们可以用 RMQ 预处理 $F(0)$ 到 $F(2m - 1)$，然后把 $[i, i + k]$ 映射到 $[i \bmod m, i \bmod m + k]$ 求最小值即可。

接下来分析 $k$ 比较大时的解法。讨论 $(n - 2m)$ 的值：

* 若 $n - 2m \ge 0$，说明 $F(j + m) \ge F(j)$，因此最小值只存在于 $i \le j < i + m$ 这个范围中。
* 若 $n - 2m < 0$，说明 $F(j + m) < F(j)$，因此最小值只存在于 $i + k - m < j \le i + k$ 这个范围中。

这样我们就把区间长度缩小到了 $m$，又可以通过 RMQ 求出最小值了。

上面还有一个细节问题没有解决：二分 $g$ 的时候，上下界是多少？我们来看 $f(k, 0)$ 的取值范围。

* 取 $j = 0$ 时，有 $f(k, 0) \le f(0, 0) + k < n + k$，因此 $g(k, l)$ 的最小值可能是 $(n + k - l)$。
* 由于 $f(0, j) \ge 0$，$-2(j - i) \ge -2k$，因此 $f(0, 0) \ge -k$，则 $g(k, r)$ 的最大值可能是 $(r + k)$。

所以二分上下界取 $[-3 \times 10^9, 3 \times 10^9]$ 即可。

复杂度 $\mathcal{O}(n\log n + q\log (n + k - l + r))$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 1e5)
#define MAXP 20
using namespace std;

int n, m, q;
char s[MAXN + 10];

int lg[MAXN + 10], rmq[MAXP][MAXN * 2 + 10];

// RMQ 预处理 F(0) 到 F(2m - 1)
void preRmq() {
    m = 0;
    for (int i = 0; i < n; i++) if (s[i] == '(') rmq[0][m++] = i;
    for (int i = m; i < m * 2; i++) rmq[0][i] = rmq[0][i - m] + n;
    for (int i = 0; i < m * 2; i++) rmq[0][i] -= i * 2;

    for (int p = 1; p < MAXP; p++) for (int i = 0, ii = (1 << p) - 1; ii < m * 2; i++, ii++) {
        int j = i + (1 << (p - 1));
        rmq[p][i] = min(rmq[p - 1][i], rmq[p - 1][j]);
    }
}

long long calc(long long K, long long i) {
    long long L, R;
    // 根据 n - 2m 的值，将区间长度缩小到 min(m, k)
    if (m * 2 <= n) {
        L = i;
        R = min(i + K, L + m - 1);
    } else {
        R = i + K;
        L = max(i, R - m + 1);
    }

    // 将区间 [L, R] 映射到 [L mod m, L mod m + R - L]，再用 RMQ 求最小值
    long long div = (L >= 0 ? L / m : (L + 1) / m - 1);
    int mod = (L % m + m) % m;
    long long delta = n * div - 2 * div * m;
    int len = R - L + 1, p = lg[len];
    return min(rmq[p][mod], rmq[p][mod + len - (1 << p)]) + delta + K + 2 * i;
}

// 二分求 g(K, lim) 的值
long long query(long long K, long long lim) {
    long long head = -3e9, tail = 3e9;
    while (head < tail) {
        long long mid = (head + tail + 1) >> 1;
        if (calc(K, mid) <= lim) head = mid;
        else tail = mid - 1;
    }
    return head;
}

void solve() {
    scanf("%s", s); n = strlen(s);
    preRmq();

    scanf("%d", &q);
    while (q--) {
        long long K, l, r; scanf("%lld%lld%lld", &K, &l, &r);
        // 特殊情况：没有左括号
        if (m == 0) printf("0\n");
        else printf("%lld\n", query(K, r) - query(K, l - 1));
    }
}

int main() {
    lg[1] = 0;
    for (int i = 2; i <= MAXN; i++) lg[i] = lg[i >> 1] + 1;
        
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
