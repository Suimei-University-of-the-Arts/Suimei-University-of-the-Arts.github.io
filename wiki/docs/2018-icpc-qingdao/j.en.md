---
title: J - Books
date: 2023-01-29
---

# J - Books

## Basic Information

<table>
<tr>
<td><b>Contest</b></td><td>The 2018 ICPC Asia Qingdao Regional Contest</td>
</tr>
<tr>
<td><b>Team AC Ratio</b></td><td>350/373 (93.8%)</td>
</tr>
</table>

## Tutorial

You might think of binary search at the beginning. However this problem cannot be solved with binary search. Consider three books whose prices are $4$, $1$ and $2$ respectively. If we have $3$ coins we can by the last two books, however if we have $4$ coins we can only buy the first book, and then if we have $5$ coins we can buy the first two books.

Let's first deal with some special cases.

* If all the books are bought, the answer is `Richman`.
* As books with a price of $0$ must be bought, let $z$ be the number of books with a price of $0$, if $z > m$ the answer is `Impossible`.

We now solve the common cases. Firstly remove all the books of price $0$, we will then buy $(m - z)$ books from the remaining $(n - z)$ books. It is not hard to find out that the answer is the sum of the prices of the first $(m - z)$ books, plus the minimum price of the remaining $(n - m)$ books, and then minus one. It is easy to see that if we increase our initial money by any amount, we'll buy at least one more remaining book.

The time complexity is $\mathcal{O}(n)$.

## Solution

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 1e5)
using namespace std;

int n, m, A[MAXN + 10];

void solve() {
    scanf("%d%d", &n, &m);

    int zero = 0;
    for (int i = 1; i <= n; i++) {
        scanf("%d", &A[i]);
        if (A[i] == 0) zero++;
    }

    // special cases
    if (n == m) printf("Richman\n");
    else if (zero > m) printf("Impossible\n");
    else {
        m -= zero;
        // calculate the sum of prices of the first (m - zero) books
        long long sm = 0;
        int i;
        for (i = 1; m > 0; i++) {
            if (A[i] == 0) continue;
            sm += A[i];
            m--;
        }
        // calculate the minimum price of the remaining (n - m) books
        int mn = 1e9;
        for (; i <= n; i++) if (A[i] > 0) mn = min(mn, A[i]);
        // output the answer
        printf("%lld\n", sm + mn - 1);
    }
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
