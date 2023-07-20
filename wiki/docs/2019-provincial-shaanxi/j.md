---
title: J - Coolbits
date: 2023-07-16
---

# J - Coolbits

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2019 陕西省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>11/111 (9.9%)</td>
</tr>
</table>

## 题解

考虑从高位到低位确定答案。假设现在需要确定第 $p$ 位的答案，令 $v_i$ 表示已经确定第 $i$ 个数从最高位到第 $(p + 1)$ 位要填什么。

如果答案的第 $p$ 位要填 $1$，那么区间 $[v_i + 2^p, v_i + 2^{p + 1} - 1]$ 必须与 $[l_i, r_i]$ 有交集。如果对于所有 $i$ 都有交集，那么答案的第 $p$ 位可以填 $1$，所有的 $v_i$ 增加 $2^p$。

否则答案的第 $p$ 位只能填 $0$，我们还要对于第 $i$ 个数考虑它的第 $p$ 位填什么。

* 如果 $[v_i + 2^p, v_i + 2^{p + 1} - 1]$ 和 $[l_i, r_i]$ 没有交集，那第 $i$ 个数的第 $p$ 位只能填 $0$。
* 否则看一下 $x = v_i + 2^p - 1$ 是否在 $[l_i, r_i]$ 的范围内，也就是第 $p$ 位填 $0$，后面全填 $1$。如果在范围内，因为后面可以全填 $1$，所以这个数以后就可以不用考虑了，这一位直接填 $0$ 就行。否则必然有 $x < l_i$（如果是 $x > r_i$ 则 $v_i + 2^p = x + 1 > r_i$，不可能和 $[l_i, r_i]$ 有交集），那只能填 $1$。

复杂度 $\mathcal{O}(n\log \max(r_i))$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 1e5)
#define MAXP 29
using namespace std;

int n, ans, L[MAXN + 10], R[MAXN + 10];
int now[MAXN + 10];

void solve() {
    scanf("%d", &n);
    for (int i = 1; i <= n; i++) scanf("%d%d", &L[i], &R[i]);

    ans = 0;
    memset(now, 0, sizeof(int) * (n + 3));
    for (int i = MAXP; i >= 0; i--) {
        bool flag = true;
        for (int j = 1; j <= n; j++) {
            int l = now[j] + (1 << i), r = now[j] + (2 << i) - 1;
            // 区间没有交集，答案无法填 1
            if (l > R[j] || r < L[j]) { flag = false; break; }
        }

        if (flag) {
            // 答案可以填 1 的情况
            ans |= 1 << i;
            for (int j = 1; j <= n; j++) now[j] |= 1 << i;
        } else {
            // 答案只能填 0 的情况，看每个数的第 i 位填什么
            for (int j = 1; j <= n; j++) {
                int l = now[j] + (1 << i), r = now[j] + (2 << i) - 1;
                if (l <= R[j] && r >= L[j]) {
                    if (l - 1 < L[j]) now[j] |= 1 << i;
                }
            }
        }
    }
    printf("%d\n", ans);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
