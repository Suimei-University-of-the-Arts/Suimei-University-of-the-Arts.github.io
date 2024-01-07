---
title: M - 接雨水
date: 2023-12-10
---

# M - 接雨水

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2023 ICPC 亚洲区域赛南京站</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>69/342 (20.2%)</td>
</tr>
</table>

## 题解

可以发现，$f_i$ 的值从左往右逐渐增加，在经过 $\max a_i$ 之后保持不变。同样地，$g_i$ 从右往左逐渐增加，在经过 $\max a_i$ 之后保持不变。也就是说，$\min(f_i, g_i) = f_i + g_i - \max a_i$。所以我们要求的答案就是

$$
\sum\limits_{i = 1}^n f_i + \sum\limits_{i = 1}^n g_i - n \times \max a_i - \sum\limits_{i = 1}^n a_i
$$

$n \times \max a_i$ 和 $\sum\limits_{i = 1}^n a_i$ 都很容易维护，接下来我们考虑怎样维护 $\sum\limits_{i = 1}^n f_i$。

可以发现，$f_i$ 可以被分成若干段，每一段都有相同的值，且不同段的值是单调递增的。因此我们可以维护一个 `set<pair<int, long long>>` 记录每一段的开头以及每一段的值。由于 $a_i$ 的值只会增加，因此每次操作后，set 里的元素最多只会增加一个。我们将操作结果插入 set 后，为了保证值的单调性，需要把插入位置后面比操作结果小的元素都移除。

由于每个元素最多被移除一次，因此一共只会执行 $\mathcal{O}(n + q)$ 次移除操作，复杂度 $\mathcal{O}((n + q)\log(n + q))$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 1e5)
#define INF ((long long) 1e18)
using namespace std;
typedef pair<int, long long> pil;

int n, q;
long long A[MAXN + 10];

struct Magic {
    long long A[MAXN + 10], sm;
    set<pil> st;

    void clear() {
        memset(A, 0, sizeof(long long) * (n + 3));
        sm = 0;
        st.clear(); st.insert(pil(1, 0)); st.insert(pil(n + 1, INF));
    }

    // A[x] += v
    void update(int x, long long v) {
        A[x] += v;
        // 尝试将操作结果插入 set 中
        auto it = prev(st.upper_bound(pil(x, INF)));
        // 如果插入位置的前一个元素都比操作结果大，那么本次操作无影响
        if (it->second >= A[x]) return;
        sm -= (next(it)->first - it->first) * it->second;
        sm += (x - it->first) * it->second + (next(it)->first - x) * A[x];
        it = st.insert(pil(x, A[x])).first;
        // 将插入位置后面比操作结果小的元素都移除
        while (next(it)->second <= A[x]) {
            sm -= (next(it)->first - x) * A[x] + (next(next(it))->first - next(it)->first) * next(it)->second;
            st.erase(next(it));
            sm += (next(it)->first - x) * A[x];
        }
    }
} f, g;

void solve() {
    scanf("%d", &n);
    long long mx = 0, sm = 0;
    for (int i = 1; i <= n; i++) {
        scanf("%lld", &A[i]);
        mx = max(mx, A[i]); sm += A[i];
    }

    // g 的维护其实只要把序列 A 倒过来，剩下的操作和 f 的维护都是一样的
    f.clear(); g.clear();
    for (int i = 1; i <= n; i++) f.update(i, A[i]), g.update(n + 1 - i, A[i]);

    scanf("%d", &q);
    while (q--) {
        int x, v; scanf("%d%d", &x, &v);
        A[x] += v;
        mx = max(mx, A[x]); sm += v;
        f.update(x, v); g.update(n + 1 - x, v);
        printf("%lld\n", f.sm + g.sm - n * mx - sm);
    }
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
