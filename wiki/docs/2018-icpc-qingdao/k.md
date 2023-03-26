---
title: K - Airdrop
date: 2023-02-05
---

# K - Airdrop

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2018 ICPC 亚洲区域赛青岛站</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>10/373 (2.7%)</td>
</tr>
</table>

## 题解

不妨以空投为原点建立新的坐标系，研究哪些玩家可能会相撞。

* 由于所有玩家同时移动，因此只有到原点距离相等的玩家可能相撞。
* 由于所有玩家优先上下移动，然后才左右移动，因此只有处于 $y$ 轴同一侧的玩家才可能相撞。
* 根据题目定义，在 $y$ 轴上的玩家永远不可能与别人相撞。

接下来考虑当坐标轴原点渐渐向右移动时，相撞玩家的数量将如何变化。根据上述第二点，我们可以把 $y$ 轴左边和右边的玩家分开考虑。以下只考虑 $y$ 轴左边玩家的相撞情况。

* 如果没有玩家从 $y$ 轴上掉到 $y$ 轴左边，由于 $y$ 轴左边玩家到原点的距离同时增加相同的值，因此相撞情况不变。
* 如果有一些玩家即将从 $y$ 轴上掉到 $y$ 轴左边，我们来观察所有距离原点恰为 $d$ 的玩家。
    - 即将从 $y$ 轴上掉到 $y$ 轴左边的玩家至多有 $2$ 名，它们的 $y$ 坐标分别为 $d$ 和 $-d$。
    - 由于所有相撞的玩家都会被消灭，原来就在 $y$ 轴左边且幸存的玩家至多只有 $1$ 名。
    - 两类玩家的数量加起来必须恰为 $1$ 才会产生这一距离的幸存玩家。

从以上分析中可以看出，我们只对玩家的 $x$ 值，以及和它们相差恰为 $1$ 的 $x$ 值感兴趣。只有这些 $x$ 值才有可能让相撞情况产生变化。因此我们需要进行 $3n$ 次计算。

模拟以上过程即可算出 $L(x)$ 和 $R(x)$，分别表示当空投横坐标为 $x$ 时，空投左边和右边各有多少玩家幸存。再加上此时横坐标恰等于 $x$ 的玩家数量，就是玩家幸存的总数。

时间复杂度 $\mathcal{O}(n\log n)$，主要是排序、去重等的复杂度。核心算法的时间复杂度为 $\mathcal{O}(n)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 1e5)
#define MAXX ((int) 1e5)
using namespace std;

int n, X[MAXN + 10], Y[MAXN + 10];

// mp[x][y]：横坐标为 x，纵坐标绝对值为 y 的玩家数，至多为 2
unordered_map<int, int> mp[MAXX + 10];
int L[MAXN * 3 + 10], R[MAXN * 3 + 10];

void gao(vector<int> &keys, int *f) {
    // 保存目前有哪些距离的人幸存
    unordered_set<int> live;
    int BIAS = 0;

    f[keys[0]] = 0;
    for (int i = 1; i < keys.size(); i++) {
        int x = keys[i], last = keys[i - 1];
        if (mp[last].size() > 0) {
            // 有玩家来到空投左边
            for (auto &p : mp[last]) {
                int y = p.first, cnt = p.second;
                // 两类玩家总数必须恰为 1，这个距离才能产生幸存者，否则全部被消灭
                if (live.count(y - BIAS) + cnt == 1) live.insert(y - BIAS);
                else live.erase(y - BIAS);
            }
        }
        // 所有玩家到原点的距离增加相同的值
        BIAS += abs(x - last);
        // 记录空投横坐标为 x 时的幸存玩家数量
        f[x] = live.size();
    }
}

void solve() {
    // 调整坐标，让空投位于坐标 x 轴上
    int Y0; scanf("%d%d", &n, &Y0);
    for (int i = 1; i <= n; i++) {
        scanf("%d%d", &X[i], &Y[i]);
        Y[i] -= Y0;
    }

    // 提取我们感兴趣的 x 值
    vector<int> keys;
    for (int i = 1; i <= n; i++) {
        mp[X[i]][abs(Y[i])]++;
        for (int j = -1; j <= 1; j++) keys.push_back(X[i] + j);
    }

    // 计算空投左边的幸存情况
    sort(keys.begin(), keys.end());
    keys.resize(unique(keys.begin(), keys.end()) - keys.begin());
    gao(keys, L);
    
    // 计算空投右边的幸存情况
    reverse(keys.begin(), keys.end());
    gao(keys, R);
    
    // 计算答案
    int mn = n + 1, mx = 0;
    for (int x : keys) {
        // 左边加右边的幸存人数
        int t = L[x] + R[x];
        // 加上横坐标和空投恰好相等的人数
        if (mp[x].size() > 0) for (auto &p : mp[x]) t += p.second;
        mn = min(mn, t);
        mx = max(mx, t);
    }
    printf("%d %d\n", mn, mx);

    // 多组数据，清理全局数据结构
    for (int x : keys) mp[x].clear(), L[x] = R[x] = 0;
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
