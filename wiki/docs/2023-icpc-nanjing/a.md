---
title: A - 酷，昨日四次重现
date: 2023-12-10
---

# A - 酷，昨日四次重现

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2023 ICPC 亚洲区域赛南京站</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>152/342 (44.4%)</td>
</tr>
</table>

## 题解

考虑用 $(i, j, i', j')$ 表示两只分别位于 $(i, j)$ 和 $(i', j')$ 的袋鼠。这个状态可以往上走到 $(i - 1, j, i' - 1, j')$，往下走到 $(i + 1, j, i' + 1, j')$，往左走到 $(i, j - 1, i', j' - 1)$，往右走到 $(i, j + 1, i', j' + 1)$。如果最后能走到 $(r, c, r', c')$，其中 $(r, c)$ 是空地，$(r', c')$ 是洞或者棋盘外面，那么一开始位于 $(i, j)$ 的袋鼠就能“打败”一开始位于 $(i', j')$ 的袋鼠。

按上面的描述连边，通过一次 bfs 即可求出任意两只袋鼠之间的“打败”关系。对于一只袋鼠，直接判断它是否可以打败其它所有袋鼠，那么它就是可能的赢家。

为什么直接这样判断就是对的呢？会不会一开始 $(i, j)$ 可以打败 $(i_1, j_1)$，结果经过一些操作先把另一只袋鼠 $(i_2, j_2)$ 移除之后，$(i_1, j_1)$ 变得无法移除了？

注意到两只袋鼠的相对位置都是不变的，因此一只袋鼠移除了另一只袋鼠之后，可以让它回到原位，此时其它袋鼠也回到了原位，再继续移除下一只袋鼠即可。

复杂度 $\mathcal{O}(n^2m^2)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXP 1000
using namespace std;

int n, m, ans;
vector<string> MAP;

char s[MAXP + 10];
// vis[x]：状态 x 位于哪个连通块里
// 如果状态 x 和 y 的两只袋鼠都没有被移除，那么它们之间的连边就是双向的，可以维护连通块
int vis[MAXP * MAXP + 10];
// flag[x]：状态 x 是否能达成第一只袋鼠打败第二只袋鼠的情况
bool flag[MAXP * MAXP + 10];

// 把状态 (i, j, r, c) 映射成一个整数
int gao(int i, int j, int r, int c) {
    return
        i * m * n * m +
        j * n * m +
        r * m +
        c;
}

// 把整数 msk 映射回状态 (i, j, r, c)
void ungao(int msk, int &i, int &j, int &r, int &c) {
    i = msk / (m * n * m);
    j = msk / (n * m) % m;
    r = msk / m % n;
    c = msk % m;
}

// 检查 (i, j) 是不是洞或者棋盘外面
bool fall(int i, int j) {
    return i < 0 || j < 0 || i >= n || j >= m || MAP[i][j] == 'O';
}

short dir[4][2] = {0, 1, 1, 0, -1, 0, 0, -1};
// 从状态 S 开始 bfs
void bfs(int S) {
    queue<int> q;
    q.push(S); vis[S] = S;
    flag[S] = false;

    while (!q.empty()) {
        int i, j, r, c; ungao(q.front(), i, j, r, c); q.pop();
        for (int k = 0; k < 4; k++) {
            int ii = i + dir[k][0], jj = j + dir[k][1];
            int rr = r + dir[k][0], cc = c + dir[k][1];
            // 第一只袋鼠还在空地上
            if (fall(ii, jj)) continue;
            // 如果第二只袋鼠此时被移除了
            // 则 S 所在的连通块的所有状态，都能达成第一只袋鼠打败第二只袋鼠
            if (fall(rr, cc)) { flag[S] = true; continue; }
            int nxt = gao(ii, jj, rr, cc);
            if (vis[nxt] >= 0) continue;
            q.push(nxt); vis[nxt] = S;
        }
    }
}

// 检查一开始位于 (i, j) 的袋鼠能否打败其它所有袋鼠
int check(int i, int j) {
    for (int r = 0; r < n; r++) for (int c = 0; c < m; c++) if (MAP[r][c] == '.') {
        if (i == r && j == c) continue;
        int msk = gao(i, j, r, c);
        if (vis[msk] == -1) bfs(msk);
        if (!flag[vis[msk]]) return 0;
    }
    return 1;
}

void solve() {
    scanf("%d%d", &n, &m);
    MAP.clear();
    for (int i = 0; i < n; i++) {
        scanf("%s", s);
        MAP.push_back(string(s));
    }

    memset(vis, -1, sizeof(int) * (n * m * n * m + 3));
    ans = 0;
    // 检查每只袋鼠能否打败其它所有袋鼠
    for (int i = 0; i < n; i++) for (int j = 0; j < m; j++) if (MAP[i][j] == '.') ans += check(i, j);
    printf("%d\n", ans);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
