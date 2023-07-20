---
title: I - Unrooted Trie
date: 2023-07-16
---

# I - Unrooted Trie

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2019 陕西省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>13/111 (11.7%)</td>
</tr>
</table>

## 题解

如果一个节点 $u$ 相邻的边有三个一样的字母，或者两对一样的字母就无解。如果相邻的边没有一样的字母，那么不影响根的选择。剩下的情况就是恰有一对相同的字母。

设有相同字母的边是 $u - x$ 和 $u - y$，那么 trie 的根必须在这两条边的同一侧，不能在两条边的中间。先随便选一个点作为根进行 DFS（只是 DFS 的根，不一定是 trie 的根）。考虑 $u$、$x$、$y$ 三个点在 DFS 序中的位置。

* 如果 $u$ 在 $x$ 和 $y$ 的前面，说明在 DFS 过程中，$u$ 是 $x$ 和 $y$ 的父节点。那么 trie 的根只能在 $x$ 的子树或者 $y$ 的子树里。
* 否则 $u$ 肯定在 $x$ 和 $y$ 之间，不妨设 $x$ 在 $y$ 的前面，那么 DFS 过程中，$x$ 是 $u$ 的父节点。那么 trie 的根只能在 $y$ 的子树里，或者在除了 $u$ 的子树以外的其他地方。

因为子树对应的就是 DFS 序里的一段区间，因此我们可以用差分数组，把不可能成为 trie 的根的区间标出来。最后算一下前缀和，没有标记的位置就可以成为 trie 的根。

复杂度 $\mathcal{O}(n + m)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 1e5)
using namespace std;

int n, ans;

vector<int> e[MAXN + 10];
vector<char> v[MAXN + 10];

int clk, bgn[MAXN + 10], fin[MAXN + 10];
int f[MAXN + 10];

void dfs(int sn, int fa) {
    bgn[sn] = ++clk;
    for (int fn : e[sn]) if (fn != fa) dfs(fn, sn);
    fin[sn] = clk;
}

void solve() {
    scanf("%d", &n);
    for (int i = 1; i <= n; i++) e[i].clear(), v[i].clear();
    for (int i = 1; i < n; i++) {
        int x, y;
        char z[3];
        scanf("%d%d%s", &x, &y, z);
        e[x].push_back(y); v[x].push_back(z[0]);
        e[y].push_back(x); v[y].push_back(z[0]);
    }

    clk = 0; dfs(1, 0);
    memset(f, 0, sizeof(int) * (n + 3));
    for (int sn = 1; sn <= n; sn++) {
        vector<int> vec[26];
        for (int i = 0; i < e[sn].size(); i++) vec[v[sn][i] - 'a'].push_back(e[sn][i]);
        int t = -1;
        for (int i = 0; i < 26; i++) {
            // 相同的字母有至少三个
            if (vec[i].size() > 2) { printf("0\n"); return; }
            else if (vec[i].size() == 2) {
                // 有至少两对相同的字母
                if (t >= 0) { printf("0\n"); return; }
                t = i;
            }
        }
        // 没有相同字母，不影响答案
        if (t == -1) continue;

        int x = vec[t][0], y = vec[t][1];
        if (bgn[x] > bgn[y]) swap(x, y);
        if (bgn[sn] < bgn[x] && bgn[sn] < bgn[y]) {
            // sn 在 dfs 中是 x 和 y 的父节点
            // 只有 x 的子树和 y 的子树可能成为 trie 的根
            f[1]++; f[n + 1]--;
            f[bgn[x]]--; f[fin[x] + 1]++;
            f[bgn[y]]--; f[fin[y] + 1]++;
        } else {
            // x 在 dfs 中是 sn 的父节点
            // 除了 sn 的子树以外的地方可能成为 trie 的根
            f[bgn[sn]]++; f[fin[sn] + 1]--;
            // y 的子树可能成为 trie 的根
            f[bgn[y]]--; f[fin[y] + 1]++;
        }
    }

    ans = 0;
    for (int i = 1; i <= n; i++) {
        f[i] += f[i - 1];
        // 没有标记的位置可以成为 trie 的根
        if (f[i] == 0) ans++;
    }
    printf("%d\n", ans);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
