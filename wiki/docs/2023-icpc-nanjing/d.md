---
title: D - 红黑树
date: 2023-12-17
---

# D - 红黑树

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2023 ICPC 亚洲区域赛南京站</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>19/342 (5.6%)</td>
</tr>
</table>

## 题解

设 $f(u, x)$ 表示以 $u$ 为根的子树是完美的，且从 $u$ 到任意后代叶子节点的路径上都有 $x$ 个黑色点需要的最少修改次数。有朴素的 dp 方程：

$$
f(u, x) = \min\limits_{i \in [0, 1]} (g(u, i) + \sum\limits_{v \in \text{son}(u)} f(v, x - i))
$$

其中 $g(u, 0/1)$ 是让节点 $u$ 变红/黑的代价。节点 $u$ 的答案就是 $\min\limits_x f(u, x)$。

可以归纳证明 $f(u, x)$ 是关于 $x$ 的凸序列：

* $g(u, 0/1)$ 是凸序列，因为这个序列只有两个点。
* 根据归纳假设，$f(v, x - i)$ 是凸序列。由于凸序列的和还是凸序列，因此 $\sum\limits_{v \in \text{son}(u)} f(v, x - i)$ 也是凸序列。
* 凸序列的 $(\min, +)$ 卷积也还是凸序列，因此 $f(u, x)$ 是凸序列。

凸序列常用单调的差分数组进行维护。我们维护 $h(u) = \{f(u, 1) - f(u, 0), f(u, 2) - f(u, 1), \cdots\}$，这个序列是单调递增的，因此 $\min\limits_x f(u, x) = f(u, 0) + \sum\limits_{h(u, x) < 0} h(u, x)$，我们还要顺便维护差分数组 $h$ 的负值之和。接下来我们看看差分数组 $h$ 如何加快上述 dp 方程的计算。

首先是 $f$ 求和的部分。原数组求和，差分数组也是求和。注意到 $x$ 的取值范围是 $u$ 所有子节点的最小深度 $d$ 加一，因此我们只要暴力地把所有子节点长度为 $(d + 1)$ 的前缀加起来即可。这样做的复杂度是多少呢？大家可能知道，如果每个点是计算是把其它链合并到最长的链上，那么复杂度是线性的（对树进行长链剖分，每个点只会在长链的顶端被合并一次），而本题甚至是把其它链合并到最短的链上，因此复杂度肯定不会高于线性。

接下来考虑与 $g(u, i)$ 进行 $(\min, +)$ 卷积。同样考虑 $g$ 的差分，注意到 $g(u, 1) - g(u, 0) = \pm 1$，因此我们还要支持往差分数组里插入一个 $1$ 或 $-1$，并维持差分数组的单调性。

如果直接使用 `set` 维护差分数组，复杂度是 $\mathcal{O}(n\log n)$ 的。这里注意到我们每次插入的数都是固定的 $1$ 或 $-1$，因此可以考虑这样的数据结构：维护两个 `vector`，一个 `vector` 保存所有负数，一个 `vector` 保存所有正数，再开一个变量记录有几个 $0$。这样插入 $1$ 就往正数 `vector` 的开头插，插入 $-1$ 就往负数 `vector` 的末尾插。这样复杂度仍然是 $\mathcal{O}(n)$ 的。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 1e5)
using namespace std;

int n, ans[MAXN + 10];
char s[MAXN + 10];

vector<int> e[MAXN + 10];

// 维护差分数组的数据结构
struct Magic {
    // neg 保存所有负数的差分值，pos 保存所有正数的差分值
    vector<int> neg, pos;
    // zero 表示有几个差分值是 0，negSm = sum(neg)
    int zero, negSm;
 
    Magic(): zero(0), negSm(0) {};
 
    // 用差分数组 vec 初始化数据结构
    Magic(vector<int> &vec): zero(0), negSm(0) {
        for (int x : vec) {
            if (x < 0) neg.push_back(x), negSm += x;
            else if (x == 0) zero++;
            else pos.push_back(x);
        }
        reverse(pos.begin(), pos.end());
    }
 
    int size() {
        return neg.size() + pos.size() + zero;
    }
 
    // 取出差分数组中下标为 idx 的元素
    int at(int idx) {
        if (idx < neg.size()) return neg[idx];
        else if (idx < neg.size() + zero) return 0;
        else {
            idx -= neg.size() + zero;
            return pos[pos.size() - 1 - idx];
        }
    }
 
    // 往差分数组里插入 1 或 -1
    void insert(int x) {
        assert(x == 1 || x == -1);
        if (x == 1) pos.push_back(1);
        else neg.push_back(-1), negSm--;
    }
};

typedef pair<int, Magic> pim;

pim dfs(int sn) {
    int v = 0;
    Magic magic;

    for (int fn : e[sn]) {
        pim tmp = dfs(fn);
        v += tmp.first;
        if (magic.size() == 0) magic = move(tmp.second);
        else {
            int sz = min(magic.size(), tmp.second.size());
            // 只保留两个差分数组较短的前缀
            vector<int> vec(sz);
            for (int i = 0; i < sz; i++) vec[i] = magic.at(i) + tmp.second.at(i);
            magic = Magic(vec);
        }
    }

    // 根据 sn 原来的颜色，往差分数组里插入 1 或 -1
    v += s[sn] - '0';
    if (s[sn] == '0') magic.insert(1);
    else magic.insert(-1);

    ans[sn] = v + magic.negSm;
    return pim(v, move(magic));
}

void solve() {
    scanf("%d%s", &n, s + 1);
    for (int i = 1; i <= n; i++) e[i].clear();
    for (int i = 2; i <= n; i++) {
        int x; scanf("%d", &x);
        e[x].push_back(i);
    }
    dfs(1);
    for (int i = 1; i <= n; i++) printf("%d%c", ans[i], "\n "[i < n]);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
