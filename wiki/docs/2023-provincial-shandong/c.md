---
title: C - 字典树
date: 2023-07-01
---

# C - 字典树

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2023 山东省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>2/276 (0.7%)</td>
</tr>
</table>

## 题解

本题思路类似于后缀数组的计算过程。

对于同一个节点，考虑如何将字母分给它的所有子树。显然，`a` 应该分给最小的子树，`b` 应该分给第二小的子树，...

这里，子树 $i$ 小于子树 $j$，指的是子树 $i$ 里最小的关键字符串比子树 $j$ 里的小，如果一样就比第二小的关键字符串... 如果某个子树里的字符串已经比完了，那么哪个子树有更多的字符串，哪个子树就更小。

假设对于每棵子树，我们已经知道一个值 `rank[i]`，`rank[i]` 越小的子树越小。因为同一层的子树会在它们的最近公共祖先进行比较，因此我们需要按层给子树算 rank。

如上所述，子树的排序依据是：把根节点的所有子节点的 rank 放进一个 `vector` 里，并把该 `vector` 排序。这样，`vector` 里的第 $i$ 个元素就是该子树中所有以第 $i$ 个字母开头的字符串，因此两个子树的大小关系只要比较 `vector` 的字典序大小即可。注意，当一个 `vector` 是另一个 `vector` 的前缀时，更长的 `vector` 应该排在更前面。

复杂度 $\mathcal{O}(n \log n)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 2e5)
using namespace std;
typedef pair<int, int> pii;
typedef pair<vector<int>, int> pvi;

int n, m;
bool flag[MAXN + 10];
char ans[MAXN + 10];

vector<int> e[MAXN + 10];
// dep[d]：所有深度为 d 的节点
vector<int> dep[MAXN + 10];
// rnk[x]：节点 x 的 rank
int rnk[MAXN + 10];

// 通过 dfs 算出每个节点的深度
void dfs1(int sn, int d) {
    dep[d].push_back(sn);
    for (int fn : e[sn]) dfs1(fn, d + 1);
}

// 算出每个节点的 rank 之后再次进行 dfs
// 给当前节点连向子节点的边按子节点 rank 大小填入字母
// 另外题目要求满足条件以后，答案字典序尽可能小，因此 rank 一样的子节点，编号更小的要排前面
void dfs2(int sn) {
    vector<pii> vec;
    for (int fn : e[sn]) vec.push_back(pii(rnk[fn], fn));
    sort(vec.begin(), vec.end());
    for (int i = 0; i < vec.size(); i++) ans[vec[i].second] = i + 'a';
    for (int fn : e[sn]) dfs2(fn);
}

void solve() {
    scanf("%d%d", &n, &m);
    for (int i = 0; i <= n; i++) e[i].clear();
    for (int i = 1; i <= n; i++) {
        int x; scanf("%d", &x);
        e[x].push_back(i);
    }
    memset(flag, 0, sizeof(bool) * (n + 3));
    for (int i = 1; i <= m; i++) {
        int x; scanf("%d", &x);
        flag[x] = true;
    }

    for (int i = 0; i <= n; i++) dep[i].clear();
    dfs1(0, 0);

    // 按深度给每一层的节点分别算 rank
    for (int i = n; i >= 0; i--) {
        vector<pvi> vec;
        // 每棵节点的排序依据是所有子节点的 rank 形成的有序 vector
        for (int sn : dep[i]) {
            vector<int> ch;
            if (flag[sn]) ch.push_back(0);
            for (int fn : e[sn]) ch.push_back(rnk[fn]);
            sort(ch.begin(), ch.end());
            vec.push_back(pvi(ch, sn));
        }
        sort(vec.begin(), vec.end(), [](pvi &a, pvi &b) {
            for (int i = 0; i < a.first.size() && i < b.first.size(); i++) {
                if (a.first[i] != b.first[i]) return a.first[i] < b.first[i];
            }
            return a.first.size() > b.first.size();
        });
        // 算出每个节点的 rank，一样的有序 vector 就是一样的 rank
        int now = 1;
        for (int j = 0; j < vec.size(); j++) {
            rnk[vec[j].second] = now;
            if (j + 1 < vec.size() && vec[j].first != vec[j + 1].first) now++;
        }
    }

    dfs2(0);
    ans[n + 1] = 0;
    printf("%s\n", ans + 1);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
