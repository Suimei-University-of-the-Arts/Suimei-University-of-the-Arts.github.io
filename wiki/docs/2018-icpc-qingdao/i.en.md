---
title: I - Soldier Game
date: 2023-02-15
---

# I - Soldier Game

## Basic Information

<table>
<tr>
<td><b>Contest</b></td><td>The 2018 ICPC Asia Qingdao Regional Contest</td>
</tr>
<tr>
<td><b>Team AC Ratio</b></td><td>6/373 (1.6%)</td>
</tr>
</table>

## Tutorial

Let's describe the problem in another way.

> Use segments of length $1$ or $2$ to cover the whole sequence. The value of a segment is the sum of elements it covers. Minimize the difference between the maximum value and the minimum value.

Let's solve this problem using segment trees. Let $f(l, r, x \in \{0, 1\}, y \in \{0, 1\})$ indicate the smallest max-value to cover the sub-array $a_l, a_{l + 1}, \cdots, a_r$. More precisely:

* $x = 0$ indicates that the segment covering $a_l$ is completely included in interval $[l, r]$. That is, the segment covering $a_l$ is either $[l, l]$ or $[l, l + 1]$.
* $x = 1$ indicates that the segment covering $a_l$ is not completely included in interval $[l, r]$. That is, the segment covering $a_l$ is $[l - 1, l]$.
* $y = 0$ indicates that the segment covering $a_r$ is completely included in interval $[l, r]$. That is, the segment covering $a_r$ is either $[r, r]$ or $[r - 1, r]$.
* $y = 1$ indicates that the segment covering $a_r$ is not completely included in interval $[l, r]$. That is, the segment covering $a_r$ is $[r, r + 1]$.

We can get the recursive equation on segment tree:

$$
f(l, r, x, y) = \min_{k \in {0, 1}} \{ \max(f(l, m, x, k), f(m + 1, r, k, y)) \}
$$

where $m = \lfloor\frac{l + r}{2}\rfloor$. The answer is $f(1, n, 0, 0)$. The initial values are:

* $f(i, i, 0, 0) = a_i$, this is the segment of length $1$.
* $f(i, i, 0, 1) = a_i + a_{i + 1}$, this is the segment of length $2$.
* $f(i, i, 1, 0) = -\infty$, the cost covering $a_i$ is calculated in the previous interval.
* $f(i, i, 1, 1) = +\infty$, $a_i$ cannot be covered by two segments.

Next, we enumerate the min-value $v$, and remove all segments whose value is smaller than $v$ (no need to really remove them, just change their value to $+\infty$), now the answer becomes $f(1, n, 0, 0) - v$.

There are $(2n - 1)$ possible values of $v$. For each $v$ modify the value of segments with segment tree and calculate the value of $f$. The time complexity is $\mathcal{O}(n\log n)$.

## Solution

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 1e5)
#define INF ((long long) 1e18)
using namespace std;
typedef pair<int, int> pii;
typedef pair<long long, pii> plii;

int n, A[MAXN + 10];
long long ans;

long long f[MAXN * 4 + 10][2][2];

// update the value of f on segment trees according to recursive equations
void update(int id) {
    int nxt = id << 1;
    for (int i = 0; i <= 1; i++) for (int j = 0; j <= 1; j++) {
        f[id][i][j] = INF;
        for (int k = 0; k <= 1; k++) f[id][i][j] = min(f[id][i][j], max(f[nxt][i][k], f[nxt | 1][k][j]));
    }
}

// build the segment tree
void build(int id, int l, int r) {
    if (l == r) {
        // initial values
        f[id][0][0] = A[l];
        f[id][0][1] = l < n ? A[l] + A[l + 1] : INF;
        f[id][1][0] = l > 1 ? -INF : INF;
        f[id][1][1] = INF;
    } else {
        int nxt = id << 1, mid = (l + r) >> 1;
        build(nxt, l, mid);
        build(nxt | 1, mid + 1, r);
        update(id);
    }
}

// change the value of segment to +INF, the segment starts at `pos` and has a length of `len`
void modify(int id, int l, int r, int pos, int len) {
    if (l == r) {
        if (len == 1) f[id][0][0] = INF;
        else f[id][0][1] = INF;
    } else {
        int nxt = id << 1, mid = (l + r) >> 1;
        if (pos <= mid) modify(nxt, l, mid, pos, len);
        else modify(nxt | 1, mid + 1, r, pos, len);
        update(id);
    }
}

void solve() {
    scanf("%d", &n);
    for (int i = 1; i <= n; i++) scanf("%d", &A[i]);
    
    build(1, 1, n);
    // sort the value of all segments to enumerate the min-value
    vector<plii> vec;
    for (int i = 1; i <= n; i++) vec.push_back(plii(A[i], pii(i, 1)));
    for (int i = 1; i < n; i++) vec.push_back(plii(A[i] + A[i + 1], pii(i, 2)));
    sort(vec.begin(), vec.end());

    ans = INF;
    // enumerate the min-value
    for (plii p : vec) {
        ans = min(ans, f[1][0][0] - p.first);
        modify(1, 1, n, p.second.first, p.second.second);
    }
    printf("%lld\n", ans);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
