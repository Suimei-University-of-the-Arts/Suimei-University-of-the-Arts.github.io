---
title: D - Magic Multiplication
date: 2023-02-04
---

# D - Magic Multiplication

## Basic Information

<table>
<tr>
<td><b>Contest</b></td><td>The 2018 ICPC Asia Qingdao Regional Contest</td>
</tr>
<tr>
<td><b>Team AC Ratio</b></td><td>99/373 (26.5%)</td>
</tr>
</table>

## Tutorial

Once $a_1$ is determined, we can uniquely determine a $B$. This is because:

* If the current product starts with $0$, since $a_1 \neq 0$ is required by the problem, we must have $b_i=0$.
* If the current product starts with $1\leq x\leq 9$, then there is only one number among $1$ to $9$ that, when multiplied by $a_1$, can result in a number starting with $x$.

    You might be concerned about whether there exist $b_i'$ and $b_i''$ such that $a_1\times b_i' = x$ and $a_1\times b_i''$ is a two-digit number starting with $x$. Obviously, this is not possible, because a two-digit number starting with $x$ is at least $10$ times of $x$, so $b_i''$ must be at least $10$ times of $b_i'$, but we only consider numbers from $1$ to $9$.

Therefore, we enumerate $a_1$ from $1$ to $9$. After obtaining all the elements in $B$, we can reversely calculate all elements in $A$ using $b_1$, and finally check whether this group of $A$ and $B$ is valid.

The time complexity is $\mathcal{O}(9 \times |s|)$.

## Solution

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 2e5)
using namespace std;

int n, m, sLen;
char s[MAXN + 10];

int A[MAXN + 10], B[MAXN + 10], f[10][100];

// given a factor (1 ~ 9) of the product, calculate the other factor (0 ~ 9)
// x: the given factor
// now: the position of product in s
int gao(int x, int &now) {
    if (now > sLen) return -1;

    // product starts with 0, the other factor must be 0
    if (s[now] == '0') {
        now++;
        return 0;
    }

    // product not start with 0, check the multiplication table
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

// enumerate a_1 = X
bool check(int X) {
    A[1] = X;

    // use a_1 to determine all elements in B
    int now = 1;
    for (int i = 1; i <= m; i++) {
        B[i] = gao(X, now);
        if (B[i] < 0) return false;
    }
    // problem requires that b_1 != 0
    if (B[1] == 0) return false;

    for (int i = 2; i <= n; i++) {
        // use b_1 to reversely calculate a_i
        // here b_1 != 0, so we can also use the gao() function
        A[i] = gao(B[1], now);
        if (A[i] < 0) return false;
        // check if the remaining product matches
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

    // we must use up all characters in the string
    return now == sLen + 1;
}

void solve() {
    scanf("%d%d%s", &n, &m, s + 1);
    sLen = strlen(s + 1);

    // enumerate a_1
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
    // pre-calculate the multiplication table
    for (int i = 1; i <= 9; i++) for (int j = 1; j <= 9; j++) f[i][i * j] = j;

    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
