---
title: F - 格子旅行
date: 2023-05-10
---

# F - 格子旅行

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2023 广东省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>31/295 (10.5%)</td>
</tr>
</table>

## 题解

显然旅行的范围是包含起点的连续区间。每次询问，我们通过二分找出旅行的左右端点，然后询问该区间的权值之和即可。

为了通过二分找出旅行的端点，我们需要快速求出一个区间里所有的颜色是否都在 $\mathbb{A}$ 里。也就是说，求 $\mathbb{A}$ 中所有颜色在区间中出现次数之和，是否等于区间长度。我们维护一个线段树 / 树状数组，每个节点保存一个哈希表，表示该区间中出现了哪些颜色，以及每种颜色出现了几次即可。

如果先二分答案，然后再算颜色出现次数之和的复杂度是 $\mathcal{O}(\sum k \log^2 n)$ 的，需要较小的常数才能通过本题。正确的做法应该是 [直接在线段树 / 树状数组上进行二分 / 倍增](https://oi-wiki.org/ds/fenwick/#%E5%8D%95%E7%82%B9%E4%BF%AE%E6%94%B9%E6%9F%A5%E8%AF%A2%E5%85%A8%E5%B1%80%E7%AC%AC-k-%E5%B0%8F)，复杂度 $\mathcal{O}(\sum k \log n)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 3e5)
using namespace std;

// 比 unordered_map 更快的哈希表
#include <ext/pb_ds/assoc_container.hpp>
using namespace __gnu_pbds;
const int RANDOM = chrono::high_resolution_clock::now().time_since_epoch().count();
struct chash {
    int operator()(int x) const { return x ^ RANDOM; }
};
typedef gp_hash_table<int, int, chash> hash_t;

int n, q, C[MAXN + 10], V[MAXN + 10];

hash_t colTree[MAXN + 10];
long long smTree[MAXN + 10];

int lb(int x) { return x & (-x); }

// val == -1：把位置 pos 的颜色 c 删掉
// val == 1：把位置 pos 的颜色设为 c
void addCol(int pos, int c, int val) {
    for (; pos <= n; pos += lb(pos)) colTree[pos][c] += val;
}

// 查询 vec 里的所有颜色在前 pos 个位置中一共出现了几次
int queryCol(int pos, vector<int> &vec) {
    int ret = 0;
    for (; pos; pos -= lb(pos)) for (int c : vec) {
        auto it = colTree[pos].find(c);
        if (it != colTree[pos].end()) ret += it->second;
    }
    return ret;
}

// 树状数组上倍增，
// 返回值 l 满足 vec 里所有颜色在区间 [l, lim] 中出现的总次数等于区间长度，且 l 最小
int gao1(int lim, vector<int> &vec) {
    int base = queryCol(lim, vec);
    if (base == lim) return 1;

    int b;
    for (b = 1; b <= n; b <<= 1);

    int now = 0, cnt = 0;
    for (b >>= 1; b; b >>= 1) {
        int nxt = now | b, tmp = 0;
        for (int c : vec) {
            auto it = colTree[nxt].find(c);
            if (it != colTree[nxt].end()) tmp += it->second;
        }
        if (nxt > lim || base - (cnt + tmp) == lim - nxt) {
            // do nothing
        } else {
            now = nxt; cnt += tmp;
        }
    }
    return now + 2;
}

// 树状数组上倍增，
// 返回值 r 满足 vec 里所有颜色在区间 [lim, r] 中出现的总次数等于区间长度，且 r 最大
int gao2(int lim, vector<int> &vec) {
    int base = queryCol(lim, vec);

    int b;
    for (b = 1; b <= n; b <<= 1);

    int now = 0, cnt = 0;
    for (b >>= 1; b; b >>= 1) {
        int nxt = now | b, tmp = 0;
        for (int c : vec) {
            auto it = colTree[nxt].find(c);
            if (it != colTree[nxt].end()) tmp += it->second;
        }
        if (nxt < lim || (cnt + tmp) - base == nxt - lim) {
            now = nxt; cnt += tmp;
        } else {
            // do nothing
        }
    }
    return now;
}

// 位置 pos 的权值增加 val
void addSm(int pos, long long val) {
    for (; pos <= n; pos += lb(pos)) smTree[pos] += val;
}

// 求前 pos 个位置的权值之和
long long querySm(int pos) {
    long long ret = 0;
    for (; pos; pos -= lb(pos)) ret += smTree[pos];
    return ret;
}

void solve() {
    scanf("%d%d", &n, &q);
    for (int i = 1; i <= n; i++) {
        scanf("%d", &C[i]);
        addCol(i, C[i], 1);
    }
    for (int i = 1; i <= n; i++) {
        scanf("%d", &V[i]);
        addSm(i, V[i]);
    }

    while (q--) {
        int op, x, y; scanf("%d%d%d", &op, &x, &y);
        if (op == 1) {
            addCol(x, C[x], -1);
            addCol(x, y, 1);
            C[x] = y;
        } else if (op == 2) {
            addSm(x, y - V[x]);
            V[x] = y;
        } else {
            bool ok = false;
            vector<int> vec;
            for (int i = 1; i <= y; i++) {
                int z; scanf("%d", &z);
                if (C[x] == z) ok = true;
                vec.push_back(z);
            }
            if (!ok) { printf("0\n"); continue; }

            int L = gao1(x, vec), R = gao2(x, vec);
            printf("%lld\n", querySm(R) - querySm(L - 1));
        }
    }

    for (int i = 1; i <= n; i++) colTree[i].clear();
    for (int i = 1; i <= n; i++) smTree[i] = 0;
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
