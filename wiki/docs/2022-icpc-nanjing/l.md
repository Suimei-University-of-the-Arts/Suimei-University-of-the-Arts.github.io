---
title: L - Proposition Composition
date: 2022-12-25
---

# L - Proposition Composition

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2022 ICPC 亚洲区域赛南京站</td>
</tr>
<tr>
<td><b>在线练习</b></td><td>暂无</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>0/465 (0.0%)</td>
</tr>
<tr>
<td><b>提交通过率</b></td><td>0/11 (0.0%)</td>
</tr>
</table>

## 题解

### 分类讨论

注意到额外边 $(u,v)$（$u\leq v$）与链边 $(u,u+1)\cdots(v-1,v)$ 构成一个环。我们称这条额外边覆盖这些链边。

显然选择两条额外边是无效的，因此一对满足条件的边 $(e,f)$ 符合如下条件之一：

* $e$ 与 $f$ 中有至少一条割边（是链边且没有被任何额外边覆盖）。
* $e$ 与 $f$ 中有一条额外边，另一条边是条链边，且该链边只被这条额外边覆盖。
* $e$ 与 $f$ 都是链边，且所有额外边要么同时覆盖 $e$ 与 $f$，要么同时不覆盖 $e$ 与 $f$（被覆盖情况完全相同）。为了不与第一类情况重复，同时要求 $e$ 和 $f$ 都不是割边（至少被一条边覆盖）。

??? 第三类情况的简要证明

    如果 $e$ 和 $f$ 被覆盖的情况不同，不失一般性地，假设存在一条额外边 $a$ 只覆盖 $e$ 不覆盖 $f$。另外假设 $e$ 和 $f$ 同时被另一条额外边 $b$ 覆盖。由下图容易看出，即使去掉 $e$ 和 $f$，左中右三部分也可以通过 $a$ 和 $b$ 连通。因此 $e$ 和 $f$ 被覆盖的情况必须相同。

    ![l-editorial.png](l-editorial.png)

前两类情况可以用并查集或线段树等数据结构维护。接下来我们考虑如何维护第三类情况。

### 维护双向链表

我们用双向链表把所有被覆盖情况完全相同的链边串在一起。那么每次加入一条额外边时，本质是有些双向链表需要被切开。

注意到被切开的位置始终是某条边本身被新的额外边覆盖，但它在链表上的前驱（或后继）没有被新的额外边覆盖的情况。我们用线段树维护区间最远前驱和最远后继，就能 $\mathcal{O}(c \log n)$ 地找到所有被切开的位置，其中 $c$ 是被切的位置数量。由于每次被切会增加双向链表的数量，且最多只有 $(n-1)$ 条链表，因此这里复杂度为 $\mathcal{O}(n \log n)$ 。

对于每条被切的双向链表，我们需要维护它的大小。这里用启发式分裂即可，复杂度为 $\mathcal{O}(n \log n)$。

注意双向链表有中间某段被切出来的情况，此时两个切点都会被上述线段树找到。具体实现详见参考代码。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 2.5e5)
using namespace std;
typedef pair<int, int> pii;

int n, Q;

// pre[i]：链边 i 在双向链表上的前驱，如果没有前驱就等于 i
// nxt[i]：链边 i 在双向链表上的后继，如果没有后继就等于 i
int pre[MAXN + 10], nxt[MAXN + 10];
// lCnt：最新产生的双向链表的编号
// root[i]：双向链表 i 的第一个元素
// siz[i]：双向链表 i 的大小
// bel[i]：第 i 条链边属于哪个双向链表
int lCnt, root[MAXN + 10], siz[MAXN + 10], bel[MAXN + 10];
// X：选出两个在同一双向链表中的元素的方案数
long long X;

// cnto[id][0/1]：区间里有几条链边恰被 0/1 条边覆盖
int cnto[MAXN * 4 + 10][2], lazy[MAXN * 4 + 10];
// mino[id]：区间里的最小前驱
// maxo[id]：区间里的最大后继
int mino[MAXN * 4 + 10], maxo[MAXN * 4 + 10];

// 线段树建树
void build(int id, int l, int r) {
    lazy[id] = 0;
    if (l == r) {
        cnto[id][0] = 1; cnto[id][1] = 0;
        mino[id] = pre[l];
        maxo[id] = nxt[l];
    } else {
        int ch = id << 1, mid = (l + r) >> 1;
        build(ch, l, mid); build(ch | 1, mid + 1, r);
        cnto[id][0] = cnto[ch][0] + cnto[ch | 1][0];
        cnto[id][1] = cnto[ch][1] + cnto[ch | 1][1];
        mino[id] = min(mino[ch], mino[ch | 1]);
        maxo[id] = max(maxo[ch], maxo[ch | 1]);
    }
}

// 区间覆盖数增加是一个区间操作，需要标记下推
void down(int id) {
    int ch = id << 1;
    if (lazy[id] == 1) {
        cnto[ch][1] = cnto[ch][0]; cnto[ch][0] = 0; 
        cnto[ch | 1][1] = cnto[ch | 1][0]; cnto[ch | 1][0] = 0;
    } else {
        cnto[ch][0] = cnto[ch][1] = 0;
        cnto[ch | 1][0] = cnto[ch | 1][1] = 0;
    }
    lazy[ch] += lazy[id]; lazy[ch | 1] += lazy[id];
    lazy[id] = 0;
}

// [ql, qr] 的链边增加一次覆盖
void add(int id, int l, int r, int ql, int qr) {
    if (l != r && lazy[id]) down(id);
    if (ql <= l && r <= qr) {
        cnto[id][1] = cnto[id][0]; cnto[id][0] = 0;
        lazy[id]++;
    } else {
        int ch = id << 1, mid = (l + r) >> 1;
        if (ql <= mid) add(ch, l, mid, ql, qr);
        if (qr > mid) add(ch | 1, mid + 1, r, ql, qr);
        cnto[id][0] = cnto[ch][0] + cnto[ch | 1][0];
        cnto[id][1] = cnto[ch][1] + cnto[ch | 1][1];
    }
}

// 找到 [ql, qr] 中，双向链表前驱比 ql 小的链边有哪些
// 把 (双向链表编号, 链边编号) 存在 vec 里
void findL(int id, int l, int r, int ql, int qr, vector<pii> &vec) {
    if (l == r) {
        vec.push_back(pii(bel[l], l));
    } else {
        int ch = id << 1, mid = (l + r) >> 1;
        if (ql <= mid && mino[ch] < ql) findL(ch, l, mid, ql, qr, vec);
        if (qr > mid && mino[ch | 1] < ql) findL(ch | 1, mid + 1, r, ql, qr, vec);
    }
}

// 找到 [ql, qr] 中，双向链表后继比 qr 大的链边有哪些
// 把 (双向链表编号, 链边编号) 存在 vec 里
void findR(int id, int l, int r, int ql, int qr, vector<pii> &vec) {
    if (l == r) {
        vec.push_back(pii(bel[l], nxt[l]));
    } else {
        int ch = id << 1, mid = (l + r) >> 1;
        if (ql <= mid && maxo[ch] > qr) findR(ch, l, mid, ql, qr, vec);
        if (qr > mid && maxo[ch | 1] > qr) findR(ch | 1, mid + 1, r, ql, qr, vec);
    }
}

// 更改链边 pos 在双向链表里的前驱为 val
void setPre(int id, int l, int r, int pos, int val) {
    if (l == r) {
        pre[l] = mino[id] = val;
    } else {
        int ch = id << 1, mid = (l + r) >> 1;
        if (pos <= mid) setPre(ch, l, mid, pos, val);
        else setPre(ch | 1, mid + 1, r, pos, val);
        mino[id] = min(mino[ch], mino[ch | 1]);
    }
}

// 更改链边 pos 在双向链表里的后继为 val
void setNxt(int id, int l, int r, int pos, int val) {
    if (l == r) {
        nxt[l] = maxo[id] = val;
    } else {
        int ch = id << 1, mid = (l + r) >> 1;
        if (pos <= mid) setNxt(ch, l, mid, pos, val);
        else setNxt(ch | 1, mid + 1, r, pos, val);
        maxo[id] = max(maxo[ch], maxo[ch | 1]);
    }
}

// 把 vec 里的所有链边都划到新的双向链表里
// 前驱后继的修改操作在其它地方进行
void newChain(vector<int> &vec) {
    lCnt++;
    root[lCnt] = vec[0];
    siz[lCnt] = vec.size();
    for (int x : vec) bel[x] = lCnt;
}

// 双向链表中，x 和它的前驱断开
void disconn(int x) {
    int y = pre[x];
    setPre(1, 1, n - 1, x, x);
    setNxt(1, 1, n - 1, y, y);
}

// 双向链表中，x 成为 y 的前驱
void conn(int x, int y) {
    setPre(1, 1, n - 1, y, x);
    setNxt(1, 1, n - 1, x, y);
}

// 从 x 个元素里选 2 个的方案数
long long gao(int x) {
    return 1LL * x * (x - 1) / 2;
}

// 启发式分裂
// 把元素 [P1, P2) 从链表 which 中抽出来，剩下的部分重新连好
void cut(int which, int P1, int P2) {
    X -= gao(siz[which]);

    vector<int> v1, v2;
    int i = root[which], j = P1;
    while (true) {
        v1.push_back(i); v2.push_back(j);
        int ii;
        if (nxt[i] == P1) ii = P2;
        else ii = nxt[i];
        int jj = nxt[j];
        if (i == ii) {
            newChain(v1);
            root[which] = P1;
            siz[which] -= v1.size();
            break;
        } else if (jj == P2) {
            newChain(v2);
            siz[which] -= v2.size();
            break;
        } else {
            i = ii;
            j = jj;
        }
    }

    int tmp = pre[P1];
    disconn(P1); disconn(P2); conn(tmp, P2);

    X += gao(siz[lCnt]) + gao(siz[which]);
}

// 启发式分裂
// 把元素 P 以及以后的部分从链表 which 中抽出来
void cut(int which, int P) {
    X -= gao(siz[which]);

    vector<int> v1, v2;
    int i = root[which], j = P;
    while (true) {
        v1.push_back(i); v2.push_back(j);
        if (nxt[i] == P) {
            newChain(v1);
            root[which] = P;
            siz[which] -= v1.size();
            break;
        } else if (nxt[j] == j) {
            newChain(v2);
            siz[which] -= v2.size();
            break;
        } else {
            i = nxt[i];
            j = nxt[j];
        }
    }

    disconn(P);

    X += gao(siz[lCnt]) + gao(siz[which]);
}

// 统计加入 q 条额外边后的答案
void calcAns(int q) {
    if (n > 2 && lazy[1]) down(1);
    int zero = cnto[1][0], one = cnto[1][1];
    // 第一类情况：选择一条割边
    long long ans = 1LL * zero * (n - 2 + q) - 1LL * zero * (zero - 1) / 2;
    // 第二类情况：选择恰被覆盖一次的链边和它的额外边
    ans += one;
    // 第三类情况：选择两条覆盖情况相同的边，但不能是割边
    ans += X - 1LL * zero * (zero - 1) / 2;
    printf("%lld\n", ans);
}

void solve() {
    scanf("%d%d", &n, &Q);

    if (n == 1) {
        for (int q = 1; q <= Q; q++) {
            scanf("%*d%*d");
            printf("0\n");
        }
        return;
    }

    // 一开始所有链边都在同一条双向链表里
    lCnt = 1; root[1] = 1; siz[1] = n - 1;
    for (int i = 1; i < n; i++) {
        pre[i] = max(1, i - 1);
        nxt[i] = min(n - 1, i + 1);
        bel[i] = 1;
    }
    X = gao(n - 1);
    build(1, 1, n - 1);

    for (int q = 1; q <= Q; q++) {
        int x, y; scanf("%d%d", &x, &y);
        if (x > y) swap(x, y);
        if (x == y) { calcAns(q); continue; }
        y--;

        // 链边 [x, y] 被覆盖次数增加
        add(1, 1, n - 1, x, y);
        // 找到所有双向链表中需要被切开的地方
        vector<pii> vec;
        findL(1, 1, n - 1, x, y, vec);
        findR(1, 1, n - 1, x, y, vec);
        sort(vec.begin(), vec.end());
        // 切开双向链表
        for (int i = 0; i < vec.size(); ) {
            if (i + 1 < vec.size() && vec[i].first == vec[i + 1].first) {
                // 双向链表有中间某段被切出来的情况
                cut(vec[i].first, vec[i].second, vec[i + 1].second);
                i += 2;
            } else {
                cut(vec[i].first, vec[i].second);
                i++;
            }
        }
        calcAns(q);
    }
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
