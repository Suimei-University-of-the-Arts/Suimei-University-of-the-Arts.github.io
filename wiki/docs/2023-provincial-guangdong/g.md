---
title: G - 交换操作
date: 2023-05-13
---

# G - 交换操作

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2023 广东省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>2/295 (0.7%)</td>
</tr>
</table>

## 题解

假设已经确定了分界点 $k$，考虑交换哪两个数才有意义。

令 $f(i, j) = a_i \,\&\, a_{i + 1} \,\&\, \cdots \,\&\, a_j$，称满足 $f(1, i) \ne f(1, i - 1)$ 的下标 $i$ 为“前缀关键点”。可以发现，关键点只有 $\log a_i$ 个。同理，称满足 $f(i, n) \ne f(i + 1, n)$ 的下标 $i$ 为“后缀关键点”，关键点也只有 $\log a_i$ 个。

因此，交换可以被分为三类情况。

* 交换两个非关键点：如果从一个前缀里拿走一个非关键点，这个前缀的 $\,\&\,$ 值不会改变；同理，如果从一个后缀里拿走一个非关键点，这个后缀的 $\,\&\,$ 值也不会改变。交换后，相当于原来前（后）缀的 $\,\&\,$ 值又多 $\,\&\,$ 了一个数。由于多 $\,\&\,$ 一个数不会让值变大，因此这样的交换没有意义。

* 交换两个关键点：前后缀关键点分别只有 $\log a_i$ 种，直接枚举即可。这一类的总复杂度为 $\mathcal{O}(n\log^2 a_i)$。

* 交换一个关键点和一个非关键点：不妨假设交换的是前缀关键点 $i$ 和后缀非关键点 $j$。与第一类情况的分析类似，因为从后缀拿走的是非关键点，所以交换之后，后缀的 $\,\&\,$ 值为 $f(k + 1, n) \,\&\, a_i$。也就是说，只要选定了 $i$，无论选哪个 $j$ 都不影响后缀的 $\,\&\,$ 值，那么我们选择让交换之后，前缀的 $\,\&\,$ 值最大的 $j$ 即可。即最大化 $f(1, i - 1) \,\&\, f(i + 1, k) \,\&\, a_j$。

    注意到对于一个固定的关键点 $i$，$f(i + 1, k)$ 的值只有 $\log a_i$ 种，而关键点 $i$ 也只有 $\log a_i$ 种，那么 $v = f(1, i - 1) \,\&\, f(i + 1, k)$ 的值只有 $\log^2 a_i$ 种。因此对于每种 $v$，$\mathcal{O}(n)$ 计算 $g(v, k)$ 表示 $k + 1 \le j \le n$ 里，$v \,\&\, a_j$ 的最大值即可。这一类的总复杂度也为 $\mathcal{O}(n\log^2 a_i)$。

因此本题复杂度 $\mathcal{O}(n\log^2 a_i)$，涉及到对 $f$ 值的计算可以通过 [RMQ](https://oi-wiki.org/topic/rmq/) 在 $\mathcal{O}(n \log n)$ 的复杂度内预处理，后续每次查询只要 $\mathcal{O}(1)$ 的复杂度。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 1e5)
#define MAXP 18
using namespace std;

int n, ans, A[MAXN + 10];

int rmq[MAXP][MAXN + 10], lg[MAXN + 10];
unordered_map<int, vector<int>> f, g;

// 询问 A[l] & A[l + 1] & ... & A[r]
int query(int l, int r) {
    if (l > r) return (1 << 30) - 1;
    int p = lg[r - l + 1];
    return rmq[p][l] & rmq[p][r - (1 << p) + 1];
}

// 对于特定的 val，求满足 j <= lim 的 A[j] 中，val & A[j] 的最大值
int gaoPre(int val, int lim) {
    if (f.count(val) == 0) {
        // 根据题解分析，val 只有 log^2 种，所以下面的 for 枚举只会进行 log^2 次
        vector<int> &vec = f[val];
        vec.resize(n + 2);
        for (int i = 1; i <= n; i++) vec[i] = max(vec[i - 1], val & A[i]);
    }
    return f[val][lim];
}

// 对于特定的 val，求满足 j >= lim 的 A[j] 中，val & A[j] 的最大值
int gaoSuf(int val, int lim) {
    if (g.count(val) == 0) {
        // 根据题解分析，val 只有 log^2 种，所以下面的 for 枚举只会进行 log^2 次
        vector<int> &vec = g[val];
        vec.resize(n + 2);
        for (int i = n; i > 0; i--) vec[i] = max(vec[i + 1], val & A[i]);
    }
    return g[val][lim];
}

void solve() {
    scanf("%d", &n);
    // 读入数据并预处理 rmq
    for (int i = 1; i <= n; i++) scanf("%d", &A[i]), rmq[0][i] = A[i];
    for (int i = 1, half = 1; i < MAXP; i++, half *= 2) for (int j = 1; j + half * 2 - 1 <= n; j++)
        rmq[i][j] = rmq[i - 1][j] & rmq[i - 1][j + half];
    lg[1] = 0;
    for (int i = 2; i <= n; i++) lg[i] = lg[i >> 1] + 1;

    // 计算前后缀关键点，分别保存在 pre 和 suf 里
    vector<int> pre, suf;
    int now = (1 << 30) - 1;
    for (int i = 1; i <= n; i++) {
        int nxt = now & A[i];
        if (now != nxt) pre.push_back(i);
        now = nxt;
    }
    now = (1 << 30) - 1;
    for (int i = n; i > 0; i--) {
        int nxt = now & A[i];
        if (now != nxt) suf.push_back(i);
        now = nxt;
    }

    // 计算不进行任何交换的答案
    ans = 0;
    for (int k = 1; k < n; k++) ans = max(ans, query(1, k) + query(k + 1, n));

    // 枚举交换两个关键点的情况
    for (int k = 1; k < n; k++)
        for (int i : pre) if (i <= k)
            for (int j : suf) if (j > k)
                ans = max(ans, (query(1, i - 1) & A[j] & query(i + 1, k)) + (query(k + 1, j - 1) & A[i] & query(j + 1, n)));
    
    // 枚举交换前缀关键点 + 后缀非关键点的情况
    g.clear();
    for (int k = 1; k < n; k++)
        for (int i : pre) if (i <= k) {
            int val = query(1, i - 1) & query(i + 1, k);
            // 对于特定的 val，求满足 j >= k + 1 的 A[j] 中，val & A[j] 的最大值
            int best = gaoSuf(val, k + 1);
            ans = max(ans, best + (query(k + 1, n) & A[i]));
        }
    
    // 枚举交换后缀关键点 + 前缀非关键点的情况
    f.clear();
    for (int k = 1; k < n; k++)
        for (int j : suf) if (j > k) {
            int val = query(k + 1, j - 1) & query(j + 1, n);
            // 对于特定的 val，求满足 j <= k 的 A[j] 中，val & A[j] 的最大值
            int best = gaoPre(val, k);
            ans = max(ans, best + (query(1, k) & A[j]));
        }
    
    printf("%d\n", ans);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
