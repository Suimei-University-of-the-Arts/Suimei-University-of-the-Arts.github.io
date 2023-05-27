---
title: L - 经典问题
date: 2023-05-14
---

# L - 经典问题

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2023 广东省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>0/295 (0.0%)</td>
</tr>
</table>

## 题解

求完全图的最小生成树通常使用 [Boruvka 算法](https://oi-wiki.org/graph/mst/#boruvka-%E7%AE%97%E6%B3%95)。

称特殊边连接的节点为特殊点，其它节点为一般点。可以发现，$2m$ 个特殊点将一般点分成了 $(2m + 1)$ 段。一般点和其它点的连边权值至少为 $1$。因此最后肯定存在一种最小生成树，使得每段一般点 $l, (l + 1), \cdots, r$ 内部是从小到大依次相连的。

连接后，我们可以把图缩为 $(2m + 1)$ 个“连续点”（每个连续点代表连续的一段一般点）以及 $2m$ 个特殊点的完全图。接下来我们需要在这张图上运行 Boruvka 算法，问题变为：快速维护每个点向其它连通块连边的最小边权。

??? 缩点的正确性证明

    考虑使用反证法。假设最后求出来答案 $T$ 的不是最小生成树，真正的最小生成树其实是 $T'$。考虑在 $T'$ 而不在 $T$ 上的某条边 $e$，有以下两种情况：

    * $e$ 连接了缩点后的图上两个不同的点：不可能，因为 Boruvka 是在缩点后的图上运行的，求出来的肯定是 **缩点后的图** 的最小生成树。
    * $e$ 的两端都在同一个连续点内：加入 $e$ 之后，会在该连续点内部形成一个环。但连续点内的其他边权值都是 $1$，$e$ 的权值肯定是环上最大的，选 $e$ 不优，与 $T'$ 是真正的最小生成树矛盾。

每一轮 Boruvka 刚开始时，计算 `pre[i]` 表示点 $i$ 左边最近的，且和它不在同一连通块的点是哪个。同理，计算 `nxt[i]` 表示点 $i$ 右边最近的，且和它不在同一连通块的点是哪个。接下来从左到右枚举每个点：

* 如果当前是连续点，选择 `pre[i]` 和 `nxt[i]` 中距离最近的即可。
* 如果当前是特殊点，则需要向左 / 右枚举到第一个和它没有连特殊边，且不在同一连通块内的点。另外还要考虑与它相邻的所有特殊边。这一步总体是 $\mathcal{O}(m)$ 的。实现详见参考代码的注释。

Boruvka 算法执行 $\mathcal{O}(\log \text{点数})$ 轮，因此总体复杂度为 $\mathcal{O}(m \log m)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXM ((int) 1e5)
using namespace std;
typedef pair<int, int> pii;

int n, m;
long long ans;

// 缩点后图上的一个节点
struct Vert {
    // spec == true：特殊点；spec == false：连续点
    bool spec;
    // 对于特殊点，L = R = 点的编号；对于连续点，L 是所代表区间的左端点，R 是右端点
    int L, R;
    // 只对特殊点有用，记录与该特殊点相邻的所有特殊边，key 是终点编号，value 是权值
    unordered_map<int, int> e;
};
vector<Vert> V;

int root[MAXM * 4 + 10], pre[MAXM * 4 + 10], nxt[MAXM * 4 + 10];

int findroot(int x) {
    if (root[x] != x) root[x] = findroot(root[x]);
    return root[x];
}

void solve() {
    scanf("%d%d", &n, &m);
    map<int, vector<pii>> e;
    for (int i = 1; i <= m; i++) {
        int x, y, z; scanf("%d%d%d", &x, &y, &z);
        e[x].push_back(pii(y, z)); e[y].push_back(pii(x, z));
    }
    
    // 用特殊点把一般点分成一段段区间
    V.clear();
    int last = 0;
    for (auto &entry : e) {
        int pos = entry.first;
        if (last + 1 != pos) V.push_back(Vert{false, last + 1, pos - 1, {}});
        V.push_back(Vert{true, pos, pos, {}});
        last = pos;
    }
    if (last != n) V.push_back(Vert{false, last + 1, n, {}});
    n = V.size();
    
    // 把原图的点编号转换成缩点后图的点编号
    unordered_map<int, int> mp;
    for (int i = 0; i < n; i++) if (V[i].spec) mp[V[i].L] = i;
    auto it = e.begin();
    for (auto &v : V) if (v.spec) {
        for (auto &[fn, val] : it->second) v.e[mp[fn]] = val;
        it++;
    }
    
    // 把每个连续点内部连起来
    ans = 0;
    for (auto &v : V) if (!v.spec) ans += v.R - v.L;
    
    for (int i = 0; i < n; i++) root[i] = i;
    int comp = n;
    // boruvka
    while (comp > 1) {
        // pre[i] 表示点 i 左边最近的，且和它不在同一连通块的点是哪个
        pre[0] = -1;
        for (int i = 1; i < n; i++) pre[i] = (findroot(i - 1) == findroot(i) ? pre[i - 1] : i - 1);
        // nxt[i] 表示点 i 右边最近的，且和它不在同一连通块的点是哪个
        nxt[n - 1] = n;
        for (int i = n - 2; i >= 0; i--) nxt[i] = (findroot(i + 1) == findroot(i) ? nxt[i + 1] : i + 1);
        
        vector<int> best(n, -1), len(n, 2e9);
        for (int i = 0; i < n; i++) {
            int r = findroot(i);
            if (V[i].spec) {
                // 考虑与该特殊点相连的所有特殊边
                // 特殊边一共 m 条，所以每一轮 boruvka 这一段总共执行 m 次
                for (auto &[fn, val] : V[i].e)
                    if (r != findroot(fn) && val < len[r]) best[r] = fn, len[r] = val;
                // 寻找左边第一个和它没有连特殊边，且不在同一连通块内的点
                //
                // 简单分析一下这段代码的复杂度。找的时候共有 3 种情况：
                //   1. 碰到有特殊边相连的点，直接继续往前考虑一个点。
                //   2. 碰到同一连通块内的点，通过 pre[j] 直接跳到前一个不在同一连通块内的点。
                //   3. 找到了，直接退出。
                //
                // 情况 1 可能会跳到情况 1, 2, 3 的任意一种。情况 2 只会跳到情况 1 和 3。
                // 因为情况 1 每轮 boruvka 最多出现 m 次，而情况 2 只能从情况 1 跳过去，
                // 因此情况 2 每轮也最多出现 m 次。
                // 所以这一段代码的复杂度也是每轮 O(m) 的。
                for (int j = pre[i]; j >= 0; ) {
                    // 同一连通块内的点，通过 pre[j] 直接跳
                    if (r == findroot(j)) j = pre[j];
                    // 和 j 有特殊边相连，不能考虑这个点
                    else if (V[i].e.count(j)) j--;
                    else {
                        // 找到了
                        int val = V[i].L - V[j].R;
                        if (val < len[r]) best[r] = j, len[r] = val;
                        break;
                    }
                }
                // 寻找右边第一个和它没有连特殊边，且不在同一连通块内的点，与上面类似的逻辑
                for (int j = nxt[i]; j < n; ) {
                    if (r == findroot(j)) j = nxt[j];
                    else if (V[i].e.count(j)) j++;
                    else {
                        int val = V[j].L - V[i].R;
                        if (val < len[r]) best[r] = j, len[r] = val;
                        break;
                    }
                }
            } else {
                // 连续点，考虑 pre[i] 和 nxt[i] 哪个更好即可
                int j = pre[i];
                if (j >= 0) {
                    int val = V[i].L - V[j].R;
                    if (val < len[r]) best[r] = j, len[r] = val;
                }
                j = nxt[i];
                if (j < n) {
                    int val = V[j].L - V[i].R;
                    if (val < len[r]) best[r] = j, len[r] = val;
                }
            }
        }
        
        // 把这一轮我们选上的边连接一下
        for (int i = 0; i < n; i++) if (best[i] >= 0) {
            int x = findroot(i), y = findroot(best[i]);
            if (x == y) continue;
            root[x] = y;
            ans += len[i];
            comp--;
        }
    }
    printf("%lld\n", ans);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
