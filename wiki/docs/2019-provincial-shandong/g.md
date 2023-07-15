---
title: G - Heap
date: 2023-07-15
---

# G - Heap

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2019 山东省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>2/307 (0.7%)</td>
</tr>
</table>

## 题解

首先回顾一下大根堆的插入过程。如果往大根堆里插入第 $i$ 个数，将会依此检查 $a_{i / 2}, a_{i / 4}, \cdots$ 并进行交换，直到来到堆顶，或者遇到一个更大的数。

例如，下图展示了往大根堆里插入第 $10$ 个数前后的变化。可以看到，只有插入路径上的元素发生了变化。插入路径上的元素都“向下”移动了一层，空出来的位置就是新元素最终插入的位置。

![g-editorial.png](g-editorial.png)

而本题要求我们逆转插入的过程。我们考虑从堆中按 $v_n$ 到 $v_1$ 的顺序依此“抽出”元素。之前插入第 $i$ 个数时，可能“向下”移动一层的元素只有 $a_{i/2}, a_{i/4}, \cdots$。因此我们在这些元素中找出 $v_i$，并把路径上 $v_i$ 下面的元素全部“向上”移动一层，即可还原成插入 $v_i$ 之前的样子。

这里有一个细节问题：如果路径上有多个 $v_i$，应该选择哪一个呢？显然应该选择最下面的 $v_i$，因为根据题中的伪代码，如果父节点和当前节点一样大，那么肯定会退出循环。

剩下的问题就是确定插入 $v_i$ 时，是按小根堆还是大根堆插入的。如果抽出 $v_i$ 之前，路径上 $v_i$ 下面的元素都比它大，而且 $v_i$ 的父节点比它小，那么就是按小根堆插入的；如果路径上 $v_i$ 下面的元素都比它小，而且 $v_i$ 的父节点比它大，那么就是按大根堆插入的。有一种特殊情况是：$v_i$ 本来就位于最后一层，而 $v_i$ 的父节点恰好和它一样大，那么大根堆和小根堆都有可能，为了最小化答案的字典序我们认为是小根堆。剩下的情况都是 `Impossible`。

模拟上述分析过程即可，复杂度 $\mathcal{O}(n\log n)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 1e5)
using namespace std;

int n, V[MAXN + 10], A[MAXN + 10];
char ans[MAXN + 10];

// 从堆中抽出 v_i，合法返回 true，非法返回 false
bool gao(int i) {
    // flag：-1 表示不确定是小根堆还是大根堆，0 表示确定为小根堆，1 表示确定为大根堆
    int flag = -1, j = i;
    // vec 里按从深到浅保存了插入路径上的所有节点
    vector<int> vec;

    while (j > 0) {
        vec.push_back(j);
        if (A[j] == V[i]) {
            // 找到了 v_i
            if (j / 2 > 0) {
                // 检查目标元素和父节点的大小关系
                if (A[j / 2] > A[j]) {
                    // 比父节点小，应该是大根堆
                    if (flag == 0) return false;
                    flag = 1;
                } else if (A[j / 2] < A[j]) {
                    // 比父节点大，应该是小根堆
                    if (flag == 1) return false;
                    flag = 0;
                }
            }
            break;
        } else if (A[j] > V[i]) {
            // 还没找到 v_i，v_i 下面的点比 v_i 大，应该是小根堆
            if (flag == 1) return false;
            flag = 0;
        } else {
            // 还没找到 v_i，v_i 下面的点比 v_i 小，应该是大根堆
            if (flag == 0) return false;
            flag = 1;
        }
        // 往父节点移动
        j >>= 1;
    }
    // 根本没找到 v_i，非法
    if (j == 0) return false;

    // 小根大根都可以，为了最小化答案的字典序，选择小根堆
    if (flag == -1) flag = 0;
    ans[i] = flag + '0';
    // 把路径上 v_i 下面的元素都往上移动一层
    while (vec.size() > 1) {
        swap(A[vec.back()], A[vec[vec.size() - 2]]);
        vec.pop_back();
    }
    return true;
}

void solve() {
    scanf("%d", &n);
    for (int i = 1; i <= n; i++) scanf("%d", &V[i]);
    for (int i = 1; i <= n; i++) scanf("%d", &A[i]);

    ans[n + 1] = 0;
    for (int i = n; i; i--) if (!gao(i)) { printf("Impossible\n"); return; }
    printf("%s\n", ans + 1);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
