---
title: G - Couleur
date: 2023-09-02
---

# G - Couleur

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2018 ICPC 亚洲区域赛青岛站网络赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>121/1550 (7.8%)</td>
</tr>
</table>

## 题解

被删除的位置把序列 $a_1, a_2, \cdots, a_n$ 分成了若干段。由于子数组的逆序对数不会超过原数组，因此只需要考虑每一整段的逆序对数，就能从中选出逆序对数最多的子数组。

用 `map` 维护每段的逆序对数，接下来考虑如何将一段拆成两段。考虑将子数组 $[l, r]$ 从 $x$ 处拆成两个子数组 $[l, x - 1]$ 和 $[x + 1, r]$。设 `rev(l, r)` 表示子数组 $[l, r]$ 里的逆序对数。

如果 $x - l < r - x$（即拆分后第一个子数组里的元素较少），则

```
rev(x + 1, r) = rev(l, r)
              - rev(l, x - 1)
              - (一个元素在 [l, x - 1]，另一个元素在 [x + 1, r] 的逆序对数)
              - (其中一个元素是 a_x 的逆序对数)
```

如果 $x - l > r - x$（即拆分后第二个子数组里的元素较少），则

```
rev(l, x - 1) = rev(l, r)
              - rev(x + 1, r)
              - (一个元素在 [l, x - 1]，另一个元素在 [x + 1, r] 的逆序对数)
              - (其中一个元素是 a_x 的逆序对数)
```

我们可以用表示值域的主席树（可持久化线段树）维护 $f(i, u, v)$ 表示前 $i$ 个元素中，有几个整数在 $[u, v]$ 的范围内，这样就能用 $\mathcal{O}(\min(x - l, r - x)\log n)$ 的复杂度把等式里的后三项暴力算出来。

根据启发式分裂，由于每次枚举的子数组长度都至多为原来的一半，因此每个元素参与暴力计算的次数至多为 $\mathcal{O}(\log n)$ 次，因此总体复杂度 $\mathcal{O}(n\log^2 n)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 1e5)
#define MAXP 20
using namespace std;

int n, A[MAXN + 10];

int tot, sumo[MAXN * MAXP + 10], ch[MAXN * MAXP + 10][2], root[MAXN + 10];
// map key 都是已删除的位置
// mp[i]：以 A[i + 1] 为开头的段的逆序对数
map<int, long long> mp;
// 保存所有段的逆序对数
multiset<long long> ms;

// 新建线段树节点
int newNode() {
    tot++;
    sumo[tot] = 0;
    ch[tot][0] = ch[tot][1] = 0;
    return tot;
}

// 添加一个整数 pos
void add(int id, int l, int r, int old, int pos) {
    sumo[id] = sumo[old];
    ch[id][0] = ch[old][0]; ch[id][1] = ch[old][1];

    if (l == r) sumo[id]++;
    else {
        int mid = (l + r) >> 1;
        if (pos <= mid) add(ch[id][0] = newNode(), l, mid, ch[old][0], pos);
        else add(ch[id][1] = newNode(), mid + 1, r, ch[old][1], pos);
        sumo[id] = sumo[ch[id][0]] + sumo[ch[id][1]];
    }
}

// 询问整数 ql 到 qr 一共有几个
int query(int id, int l, int r, int ql, int qr) {
    if (ql > qr) return 0;
    if (ql <= l && r <= qr) return sumo[id];
    int mid = (l + r) >> 1;
    return
        (ql <= mid ? query(ch[id][0], l, mid, ql, qr) : 0) +
        (qr > mid ? query(ch[id][1], mid + 1, r, ql, qr) : 0);
}

// 启发式分裂，将区间 [L + 1, R - 1] 从 X 处分裂
void split(int L, int R, int X) {
    long long old = mp[L]; ms.erase(ms.find(old));
    // base：一个元素是 A[X] 的逆序对数
    long long base = query(root[R - 1], 1, n, 1, A[X] - 1) - query(root[X], 1, n, 1, A[X] - 1);
    base += query(root[X - 1], 1, n, A[X] + 1, n) - query(root[L], 1, n, A[X] + 1, n);
    if (X - L < R - X) {
        // 左半边更短，枚举左半边
        // a：[L + 1, X - 1] 的逆序对数
        // b：base + 一个元素在 [L + 1, X - 1]，另一个元素在 [X + 1, R - 1] 的逆序对数
        long long a = 0, b = base;
        for (int i = L + 1; i < X; i++) {
            a += query(root[i - 1], 1, n, A[i] + 1, n) - query(root[L], 1, n, A[i] + 1, n);
            b += query(root[R - 1], 1, n, 1, A[i] - 1) - query(root[X], 1, n, 1, A[i] - 1);
        }
        mp[L] = a; ms.insert(mp[L]);
        mp[X] = old - a - b; ms.insert(mp[X]);
    } else {
        // 右半边更短，枚举右半边
        // a：[X + 1, R - 1] 的逆序对数
        // b：base + 一个元素在 [L + 1, X - 1]，另一个元素在 [X + 1, R - 1] 的逆序对数
        long long a = 0, b = base;
        for (int i = X + 1; i < R; i++) {
            a += query(root[i - 1], 1, n, A[i] + 1, n) - query(root[X], 1, n, A[i] + 1, n);
            b += query(root[X - 1], 1, n, A[i] + 1, n) - query(root[L], 1, n, A[i] + 1, n);
        }
        mp[L] = old - a - b; ms.insert(mp[L]);
        mp[X] = a; ms.insert(mp[X]);
    }
}

void solve() {
    scanf("%d", &n);
    for (int i = 1; i <= n; i++) scanf("%d", &A[i]);

    // 将 A[1] 到 A[n] 依次加入主席树
    // root[i] 就是加入 A[i] 之后的情况
    tot = 0;
    for (int i = 1; i <= n; i++) add(root[i] = newNode(), 1, n, root[i - 1], A[i]);

    // 计算整个序列的逆序对数
    long long tmp = 0;
    for (int i = 1; i <= n; i++) tmp += query(root[i - 1], 1, n, A[i] + 1, n);

    // 把下标 0 和 n + 1 视为已删除的下标，方便处理
    mp.clear(); ms.clear();
    mp[0] = tmp; ms.insert(tmp);
    mp[n + 1] = 0; ms.insert(0);

    long long ans = *prev(ms.end());
    for (int i = 1; i <= n; i++) {
        printf("%lld%c", ans, "\n "[i < n]);
        long long x; scanf("%lld", &x);
        x ^= ans;
        auto it = prev(mp.lower_bound(x));
        split(it->first, next(it)->first, x);
        ans = *prev(ms.end());
    }
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
