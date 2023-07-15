---
title: E - BaoBao Loves Reading
date: 2023-07-15
---

# E - BaoBao Loves Reading

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2019 山东省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>16/307 (5.2%)</td>
</tr>
</table>

## 题解

如果桌子的大小是 $k$，那么最近看过的 $k$ 种书都会在桌子上。考虑第 $i$ 分钟刚开始，准备看书 $a_i$。设上一次看它是在第 $i'$ 分钟，如果 $[i' + 1, i - 1]$ 里已经有至少 $k$ 种书了，说明 $a_i$ 不是最近看过的 $k$ 种书，即 $a_i$ 不在桌子上。

因此令 $g(i)$ 表示 $[i' + 1, i - 1]$ 里书的种类数，只要桌子大小至多为 $g(i)$，第 $i$ 分钟就必须去书柜取书。因此桌子大小为 $k$ 时的答案就是满足 $k \le g(i)$ 的下标 $i$ 的数量，用后缀和一次性把所有答案算出来即可。

剩下的问题就是如何求出 $g(i)$。离线询问区间元素种类数是一个非常经典的问题，可以先将所有询问区间按右端点排序，用树状数组维护每个元素最后出现的下标即可。详细做法参见 [[SDOI2009] HH 的项链](https://www.luogu.com.cn/problem/P1972)。

复杂度 $\mathcal{O}(n\log n)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 1e5)
using namespace std;

int n;

// last[i]：第 i 种书最后出现的下标
// f[i]：有几个下标 x 满足 g(x) = i，后缀和就是答案
int last[MAXN + 10], f[MAXN + 10];
int tree[MAXN + 10];

int lb(int x) { return x & (-x); }

void add(int pos, int val) {
    for (; pos <= n; pos += lb(pos)) tree[pos] += val;
}

int query(int pos) {
    int ret = 0;
    for (; pos; pos -= lb(pos)) ret += tree[pos];
    return ret;
}

void solve() {
    scanf("%d", &n);
    memset(last, 0, sizeof(int) * (n + 3));
    memset(f, 0, sizeof(int) * (n + 3));
    memset(tree, 0, sizeof(int) * (n + 3));

    for (int i = 1; i <= n; i++) {
        int x; scanf("%d", &x);
        if (last[x] == 0) {
            // 第一次看这本书，肯定要去书柜拿
            f[n]++;
        } else {
            // 桌子大小不超过 [last[x] + 1, i - 1] 里的元素种类数时，才需要去书柜拿
            f[query(i - 1) - query(last[x])]++;
            // 树状数组维护每种元素最后出现的下标
            add(last[x], -1);
        }
        // 树状数组维护每种元素最后出现的下标
        add(i, 1);
        last[x] = i;
    }

    // 后缀和一次性求出答案
    for (int i = n - 1; i > 0; i--) f[i] += f[i + 1];
    for (int i = 1; i <= n; i++) printf("%d%c", f[i], "\n "[i < n]);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
