---
title: I - Connected Intervals
date: 2023-07-15
---

# I - Connected Intervals

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2019 山东省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>1/307 (0.3%)</td>
</tr>
</table>

## 题解

设 $f(l, r)$ 表示只考虑 $[l, r]$ 里的节点，一共有几个连通块。考虑加入节点 $(r + 1)$ 会带来什么影响。

假设节点 $(r + 1)$ 有两个相邻的节点 $u, v \in [l, r]$，那么如果只考虑 $[l, r]$ 里的节点，则 $u$ 和 $v$ 一定在不同的连通块中。否则原图中从 $u$ 到 $v$ 将会有至少两种路径：一种经过 $(r + 1)$，一种不经过，这样原图就不是树了。

也就是说，对于节点 $(r + 1)$ 所有满足 $u \in [l, r]$ 的相邻节点 $u$，节点 $(r + 1)$ 的加入会导致它们从不同的连通块全部进入同一个连通块。那么 $f(l, r + 1) - f(l, r)$ 就是满足 $u \in [l, r]$ 的邻居 $u$ 的数量，换个角度来看，就是节点 $u$ 将会对所有 $l \le u$ 的 $f(l, r)$ 产生贡献。

因此我们从 $1$ 到 $n$ 枚举 $r$，同时用线段树对每个 $l$ 维护 $f(l, r)$ 的值即可。复杂度 $\mathcal{O}(n \log n)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 3e5)
using namespace std;

int n;
long long ans;

vector<int> e[MAXN + 10];
// mino：区间最小值
// cnto：区间里等于最小值的元素数量
int mino[MAXN * 4 + 10], cnto[MAXN * 4 + 10], lazy[MAXN * 4 + 10];

void maintain(int id) {
    int nxt = id << 1;
    mino[id] = min(mino[nxt], mino[nxt | 1]);
    cnto[id] = 0;
    if (mino[id] == mino[nxt]) cnto[id] += cnto[nxt];
    if (mino[id] == mino[nxt | 1]) cnto[id] += cnto[nxt | 1];
}

void build(int id, int l, int r) {
    lazy[id] = 0;
    if (l == r) mino[id] = 0, cnto[id] = 1;
    else {
        int nxt = id << 1, mid = (l + r) >> 1;
        build(nxt, l, mid); build(nxt | 1, mid + 1, r);
        maintain(id);
    }
}

void down(int id) {
    int nxt = id << 1;
    mino[nxt] += lazy[id]; lazy[nxt] += lazy[id];
    mino[nxt | 1] += lazy[id]; lazy[nxt | 1] += lazy[id];
    lazy[id] = 0;
}

// 给区间 [ql, qr] 的每个元素加上 val
void add(int id, int l, int r, int ql, int qr, int val) {
    if (ql <= l && r <= qr) mino[id] += val, lazy[id] += val;
    else {
        if (lazy[id]) down(id);
        int nxt = id << 1, mid = (l + r) >> 1;
        if (ql <= mid) add(nxt, l, mid, ql, qr, val);
        if (qr > mid) add(nxt | 1, mid + 1, r, ql, qr, val);
        maintain(id);
    }
}

// 询问区间 [ql, qr] 中 1 有几个，保证每个元素都至少是 1
int query(int id, int l, int r, int ql, int qr) {
    if (ql <= l && r <= qr) return mino[id] == 1 ? cnto[id] : 0;
    else {
        if (lazy[id]) down(id);
        int nxt = id << 1, mid = (l + r) >> 1;
        return 
            (ql <= mid ? query(nxt, l, mid, ql, qr) : 0) +
            (qr > mid ? query(nxt | 1, mid + 1, r, ql, qr) : 0);
    }
}

void solve() {
    scanf("%d", &n);
    for (int i = 1; i <= n; i++) e[i].clear();
    for (int i = 1; i < n; i++) {
        int x, y; scanf("%d%d", &x, &y);
        e[x].push_back(y);
        e[y].push_back(x);
    }

    build(1, 1, n);
    ans = 0;
    for (int sn = 1; sn <= n; sn++) {
        // sn 自己是一个新的连通块
        add(1, 1, n, 1, sn, 1);
        // fn 将会对所有 l <= fn 的 f(l, sn) 产生贡献
        for (int fn : e[sn]) if (fn < sn) add(1, 1, n, 1, fn, -1);
        // 询问有几个 l 满足 f(l, sn) == 1
        ans += query(1, 1, n, 1, sn);
    }
    printf("%lld\n", ans);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
