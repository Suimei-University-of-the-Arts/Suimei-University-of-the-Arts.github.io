---
title: M - Function and Function
date: 2023-01-29
---

# M - Function and Function

## Basic Information

<table>
<tr>
<td><b>Contest</b></td><td>The 2018 ICPC Asia Qingdao Regional Contest</td>
</tr>
<tr>
<td><b>Team AC Ratio</b></td><td>372/373 (99.7%)</td>
</tr>
</table>

## Tutorial

Notice that

* When $x \ge 2$, the value of $f(x)$ is about $\log x$.
* When $x \le 1$, $g^k(x)$ alternates between $0$ and $1$.

So we can directly calculate the first few iterations of $f(x)$, until $f(x)$ becomes $0$ or $1$. We then decide the answer by checking whether the remaining number of iterations is odd or even.

The time complexity is $\mathcal{O}(\log x)$。

## Solution

```c++ linenums="1"
#include <bits/stdc++.h>
using namespace std;

int f[] = {1, 0, 0, 0, 1, 0, 1, 0, 2, 1};

void solve() {
    int x, K;
    scanf("%d%d", &x, &K);
    // directly calculate the first few iterations,
    // until f(x) becomes less than or equal to 1 or the number of iterations is exhausted
    while (x > 1 && K > 0) {
        int t = 0;
        for (; x; x /= 10) t += f[x % 10];
        x = t;
        K--;
    }
    if (K > 0) {
        // iteration is not completed
        // decide the answer by checking whether the remaining number of iterations is odd or even
        if (K & 1) printf("%d\n", x ^ 1);
        else printf("%d\n", x);
    } else {
        // iteration is completed, output the answer directly
        printf("%d\n", x);
    }
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
