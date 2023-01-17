---
title: C - Fabulous Fungus Frenzy
date: 2022-12-16
---

# C - Fabulous Fungus Frenzy

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2022 ICPC 亚洲区域赛南京站</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>1/465 (0.2%)</td>
</tr>
<tr>
<td><b>提交通过率</b></td><td>1/14 (7.1%)</td>
</tr>
</table>

## 题解

### 贪心策略

直接做比较难以处理盖章操作，考虑时光倒流，从目标状态开始一步步撤销操作得到能匹配初始状态的矩阵。交换操作与旋转操作均可逆，对于盖章操作，逆操作相当于将一个能与要盖的章匹配上的子矩阵全变为通配符。

由于存在交换操作，字符的位置几乎是无关紧要的，只需要对每种字符判断个数就能知道一个章是否可能盖下去。将一个字符变为通配符后，会将原来不能盖的章变得能盖（而不会倒过来使原来能盖的章变得不能盖），因此通配符越多越好。也就是说，我们可以遵循“能盖的章现在就盖”的贪心策略。如果保证每次盖章操作至少新增一个通配符，盖章次数就不会超过 $nm$ 次，符合 $400$ 次盖章操作的限制。

不妨选定盖章的位置就是矩阵左上角。一开始选定一个能盖的章后，通过交换操作使得左上角矩阵与章匹配上，使用盖章操作将这些位置全变成通配符。接下来每次移动一个章里有的字符到左上角矩阵对应位置，再进行盖章操作就能新增一个通配符。一直盖同一个章，直到无法再新增更多通配符，这个章之后也都用不上了。接下来找到下一个能盖的章，重复以上操作。

当所有的章都已经用不上时，检查当前矩阵每种字符的数量判断是否可能经过若干次交换操作后与初始矩阵进行匹配。其实就是把初始矩阵也视为一个章，然后检查这个章是否能盖上。如果可能匹配则有解，并构造交换方案，否则无解。

### 操作步数分析

以上操作方案中，分为“盖一个新章”和“用旧章转化一个字符”两种操作。以下分析每种操作需要消耗的交换步数。

如果把初始矩阵也视为一个章，则“盖一个新章”操作将进行 $(k + 1)$ 次，每次可能会移动矩阵中所有的字符（也就是 $nm$ 个字符），而每个字符移动到目标位置最多会花 $(n + m - 1)$ 步。因此，“盖一个新章”最多消耗 $nm(n + m - 1)(k + 1)$ 步交换。

而“用旧章转化一个字符”最多进行 $nm$ 次，每次只移动给一个字符到目标位置，最多花费 $(n + m - 1)$ 步。因此，“用旧章转化一个字符”最多消耗 $nm(n + m - 1)$ 步交换。

因此，所有操作最多总共消耗 $nm(n + m - 1)(k + 2)$ 步交换，加上 $400$ 次盖章操作也符合 $4 \times 10^5$ 次操作的限制。这个限制实际上是比较宽松的，旋转操作也用不上。

### 复杂度分析

接下来分析程序的复杂度。我们在模拟过程中，需要用一个数组动态维护当前矩阵中每种字符的个数，以及通配符的数量。

由于每次操作都至少将一个字符变为通配符，我们需要检查 $nm$ 次当前章是否还能盖。这一部分的复杂度是 $\mathcal{O}(nm|\Sigma|)$，其中 $|\Sigma|$ 是字符集的大小。

如果当前章不能盖了，我们要换一个新章来盖。换章将会进行 $(k + 1)$ 次。我们直接枚举接下来盖哪个章，这一部分的复杂度是 $\mathcal{O}(k^2|\Sigma|)$。

接下来，``盖一个新章'' 操作将进行 $(k + 1)$ 次，每次我们暴力寻找目标字符的初始位置，并将它移动到目标位置。这一部分的复杂度是 $\mathcal{O}(n^2m^2(n + m))$。

最后，``用旧章转化一个字符'' 操作将进行 $nm$ 次，每次仍然暴力寻找目标字符的初始位置，并将它移动到目标位置。这一部分的复杂度是 $\mathcal{O}(n^2m^2(n + m))$。

因此总体复杂度为 $\mathcal{O}(n^2m^2(n + m) + (nm + k^2)|\Sigma|)$，大概不到 $10^7$，能很快运行完成。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN 20
#define MAXM 20
#define MAXK 20
#define MAXC ((int) 'z')
using namespace std;

int n, m, K;
vector<vector<int>> ans;
char MAP[MAXN + 5][MAXM + 5];
int nn[MAXK + 5], mm[MAXK + 5];
char PAT[MAXK + 5][MAXN + 5][MAXM + 5];

// star：目前有几个通配符
// have[c]：目前有几个字符 c
// need[p][c]：盖章 p 需要几个字符 c
int star, have[MAXC + 1], need[MAXK + 1][MAXC + 1];

// 检查章 which 现在至少需要几个通配符才能盖
int miss(int which) {
    int ret = 0;
    for (int i = '0'; i <= MAXC; i++) ret += max(0, need[which][i] - have[i]);
    return ret;
}

// 检查盖章 which 能否新产生通配符
bool haveAny(int which) {
    for (int i = '0'; i <= MAXC; i++) if (need[which][i] && have[i]) return true;
    return false;
}

// 上次盖的章是 now，看接下来盖哪个章
// return 0：所有章都不能盖
// return 1：上一次的章还能接着盖
// return 2：换了一个新章
int choose(int &now) {
    if (now > 0) { if (!haveAny(now) || star < miss(now)) now = 0; }
    // 这个章能盖就继续盖
    if (now > 0) return 1;
    // 不能盖就选新章
    for (int k = 1; k <= K; k++) if (haveAny(k) && star >= miss(k)) {
        now = k;
        return 2;
    }
    return 0;
}

// 记录交换操作
void Swap(int i, int j, int ii, int jj) {
    if (i > ii) ans.push_back({-4, i, j});
    else if (i < ii) ans.push_back({-3, i, j});
    else if (j > jj) ans.push_back({-2, i, j});
    else ans.push_back({-1, i, j});
    swap(MAP[i][j], MAP[ii][jj]);
}

// 记录盖章操作
void Stamp(int which) {
    for (int i = 1; i <= nn[which]; i++) for (int j = 1; j <= mm[which]; j++) MAP[i][j] = '*';
    ans.push_back({which, 1, 1});
}

// 把任意一个字符 c 移动到 (GI, GJ)
// 盖章范围位于左上角的 (SI, SJ)
void Move(char c, int GI, int GJ, int SI, int SJ) {
    for (int i = 1; i <= n; i++) for (int j = 1; j <= m; j++) {
        bool smaller = (i < GI) || (i == GI && j < GJ);
        // 我们不想破坏 (GI, GJ) 之前已经整理好的部分
        if (i <= SI && j <= SJ && smaller) continue;
        // 在可以破坏的范围内找到了字符 c
        if (MAP[i][j] == c) {
            // 为了不破坏已经整理好的部分
            // 先把它在 (SI, SJ) 的范围外移动到对应行 / 列，再一次性移动过去
            if (i <= GI) {
                while (i < GI) Swap(i, j, i + 1, j), i++;
                while (i > GI) Swap(i, j, i - 1, j), i--;
                while (j < GJ) Swap(i, j, i, j + 1), j++;
                while (j > GJ) Swap(i, j, i, j - 1), j--;
            } else {
                while (j < GJ) Swap(i, j, i, j + 1), j++;
                while (j > GJ) Swap(i, j, i, j - 1), j--;
                while (i < GI) Swap(i, j, i + 1, j), i++;
                while (i > GI) Swap(i, j, i - 1, j), i--;
            }
            return;
        }
    }
    assert(false);
}

// 接着盖同一个章
void gao1(int which) {
    for (int i = 1; i <= nn[which]; i++) for (int j = 1; j <= mm[which]; j++)
        if (have[PAT[which][i][j]]) {
            // 选择任意一个字符变成通配符
            Move(PAT[which][i][j], i, j, nn[which], mm[which]);
            star++;
            have[PAT[which][i][j]]--;
            Stamp(which);
            return;
        }
    assert(false);
}

// 盖一个新章
void gao2(int which) {
    for (int i = 1; i <= nn[which]; i++) for (int j = 1; j <= mm[which]; j++) {
        if (have[PAT[which][i][j]]) {
            // 需要的字符还有，把它移动到目标位置
            Move(PAT[which][i][j], i, j, nn[which], mm[which]);
            star++;
            have[PAT[which][i][j]]--;
        } else {
            // 需要的字符没了，用通配符代替
            Move('*', i, j, nn[which], mm[which]);
        }
    }
    Stamp(which);
}

int main() {
    scanf("%d%d%d", &n, &m, &K);

    for (int i = 1; i <= n; i++) scanf("%s", PAT[0][i] + 1);
    nn[0] = n; mm[0] = m;

    for (int i = 1; i <= n; i++) scanf("%s", MAP[i] + 1);
    for (int i = 1; i <= n; i++) for (int j = 1; j <= m; j++) have[MAP[i][j]]++;

    for (int k = 1; k <= K; k++) {
        scanf("%d%d", &nn[k], &mm[k]);
        for (int i = 1; i <= nn[k]; i++) scanf("%s", PAT[k][i] + 1);
    }
    for (int k = 0; k <= K; k++) for (int i = 1; i <= nn[k]; i++) for (int j = 1; j <= mm[k]; j++) need[k][PAT[k][i][j]]++;

    // 持续盖章，直到任何一个章都不能盖
    int now = 0;
    while (true) {
        int t = choose(now);
        if (t == 0) break;
        else if (t == 1) gao1(now);
        else gao2(now);
    }

    // 把初始局面看成章 0，检查章 0 是否能盖
    if (miss(0) <= star) {
        // 能盖章 0，有解
        if (haveAny(0)) {
            gao2(0);
            ans.pop_back();
        }
        printf("%d\n", ans.size());
        while (!ans.empty()) {
            printf("%d %d %d\n", ans.back()[0], ans.back()[1], ans.back()[2]);
            ans.pop_back();
        }
    } else {
        // 不能盖章 0，无解
        printf("-1\n");
    }
    
    return 0;
}
```
