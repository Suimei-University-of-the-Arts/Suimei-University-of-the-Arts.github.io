---
title: G - Repair the Artwork
date: 2023-02-07
---

# G - Repair the Artwork

## Basic Information

<table>
<tr>
<td><b>Contest</b></td><td>The 2018 ICPC Asia Qingdao Regional Contest</td>
</tr>
<tr>
<td><b>Team AC Ratio</b></td><td>8/373 (2.1%)</td>
</tr>
</table>

## Tutorial

### Considering Only 0 and 1

First, let's consider the case where only $0$ and $1$ are present. Obviously, the answer is $k^m$, where $k$ is the number of intervals that do not contain $1$.

### Adding a Few 2s

Let $\{a_1a_2\cdots a_n\}$ represent the answer to the sequence $a_1, a_2, \cdots, a_n$.

Let's first consider an example with only one $2$, such as $021$. What we want is the "number of ways where $2$ **must** be covered." We can transform this into the "number of ways where $2$ **may** be covered" minus the "number of ways where $2$ **must not** be covered."

A position that "may be covered" is equivalent to a $0$, and a position that "must not be covered" is equivalent to a $1$. We can represent this with the following equation:

$$
\{021\} = \{0\underline{0}1\} - \{0\underline{1}1\}
$$

The position of $2$ in the original sequence is indicated by an underline. This transforms the problem into the case where only $0$ and $1$ are present.

Next, let's consider an example with two $2$s, such as $02121$. We can use the same method to obtain the following equation:

$$
\begin{matrix}
\{02121\} & = & \{0\underline{0}121\} - \{0\underline{1}121\} \\
 & = & (\{0\underline{0}1\underline{0}1\} - \{0\underline{0}1\underline{1}1\}) - (\{0\underline{1}1\underline{0}1\} - \{0\underline{1}1\underline{1}1\}) \\
 & = & \{0\underline{0}1\underline{0}1\} - \{0\underline{0}1\underline{1}1\} - \{0\underline{1}1\underline{0}1\} + \{0\underline{1}1\underline{1}1\} \\
\end{matrix}
$$

This also transforms the problem into the case where only $0$ and $1$ are present.

### Generalizing

If you are familiar with the principle of inclusion-exclusion, you may quickly recognize that the above equations are examples of this principle. We can express the answer in terms of the principle of inclusion-exclusion:

$$
\sum (-1)^{c(a_1a_2\cdots a_n)} \times k(a_1a_2\cdots a_n)^m
$$

Here, $a_1, a_2, \cdots, a_n$ is a sequence composed of $0$, $1$, $\underline{0}$, and $\underline{1}$, $c(a_1a_2\cdots a_n)$ represents the number of underlined $1$s in the sequence, and $k(a_1a_2\cdots a_n)$ represents the number of intervals in the sequence that do not contain $1$ or $\underline{1}$.

Note that the value of the expression only depends on the parity of $c$ and the number of valid intervals, so we maintain $f(i,j,0/1)$ which represents the number of valid intervals with even/odd total occurrences of $1$ and $\underline{1}$, considering only the first $i$ elements. Since the number of valid intervals only depends on the position of $1$ and $\underline{1}$, we can skip all the $0$s and only perform DP between the possible positions of $1$ and $\underline{1}$.

To simplify the calculation, we define $a_0=a_{n+1}=1$, which does not affect the final answer. The final answer is then

$$
\sum\limits_{j=0}^{\frac{n(n + 1)}{2}} (f(n + 1, j, 0) - f(n + 1, j, 1)) \times j^m
$$

Note that in the inclusion-exclusion formula, the sign of each term only depends on the number of occurrences of $\underline{1}$ in the sequence, while in the DP state $0/1$ represents the total number of both $1$ and $\underline{1}$. Therefore, if $1$ occurs an odd number of times in the **original sequence**, the answer needs to be multiplied by $-1$.

Consider how many valid intervals will be added when we add a $1$ or $\underline{1}$ to the end of the sequence. Obviously, the number of valid intervals only depends on the position of the previous $1$ or $\underline{1}$, so we iterate over the previous $1$ or $\underline{1}$ and obtain the equation:

$$
f(i, k + \frac{(i - j)(i - j - 1)}{2}, 0/1) = \sum\limits_{j=\text{last}}^{i - 1} f(j, k, 1/0)
$$

where $\text{last}$ is the position of the previous $1$ in the **original sequence** (no need to consider earlier than this position, because $2$ can be replaced with $\underline{0}$, but a position that was originally $1$ cannot be replaced). The initial values are $f(0,0,0)=0$ and $f(0,0,1)=1$ (because $a_0=1$).

The time complexity is $\mathcal{O}(n^4)$, but the constant factor is very small. For example, the complexity of the solution below is

$$
\sum\limits_{i=1}^n\sum\limits_{j=1}^i \frac{j^2}{2} \approx \frac{n^4}{48}
$$

which can pass easily.

## Solution

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN 100
#define MOD ((int) 1e9 + 7)
using namespace std;

int n, m, A[MAXN + 10];
long long ans;

long long f[MAXN + 10][(MAXN + 1) * MAXN / 2 + 10][2];
int lim[MAXN + 10];

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
        // lim[i] indicates the maximum possible number of valid intervals in the first i elements
        lim[i] = lim[last] + (i - last) * (i - last - 1) / 2;
        for (int j = 0; j <= lim[i]; j++) f[i][j][0] = f[i][j][1] = 0;
        // use the formula
        for (int j = last; j < i; j++) if (A[j] > 0) {
            int delta = (i - j) * (i - j - 1) / 2;
            for (int k = 0; k <= lim[j]; k++) {
                f[i][k + delta][0] = (f[i][k + delta][0] + f[j][k][1]) % MOD;
                f[i][k + delta][1] = (f[i][k + delta][1] + f[j][k][0]) % MOD;
            }
        }
        if (A[i] == 1) last = i;
    }

    // if 1 occurs an odd number of times in the original sequence, the answer should multiply -1
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
