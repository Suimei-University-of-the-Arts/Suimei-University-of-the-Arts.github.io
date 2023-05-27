---
title: E - 新怀质问
date: 2023-05-14
---

# E - 新怀质问

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2023 广东省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>51/295 (17.3%)</td>
</tr>
</table>

## 题解

本题名称来自日文“新しい、でも懐かしい質問”（意为新的，但是令人怀念的问题），因为有人说命题人的题目都很有年代感...

考虑从左到右确定答案的每一位。我们举个例子来介绍这一过程。

假设我们已经确定了答案的前三位是 `abc`，接下来要确定第四位。为了让字典序尽量小，我们需要从 `a` 到 `z` 枚举第四位。

假设我们枚举到了 `d`，我们考虑已知答案为 `abcd*` 时，与已知答案为 `abc*` 时相比，能选择的字符串数量如何变化。

* 所有 `abc[a-d]*` 都能选择，因为它们的最长公共前缀肯定小于等于 `abcd*`。
* 所有 `abc[e-z]*` 的字符串，原来答案是 `abc*` 的时候都能选择，现在每种字母只能选一个，否则比如 `abce*` 选了两个，那答案就至少是 `abce` > `abcd*` 了。
* 剩下的字符串可选情况维持不变。

如果我们能选至少 $k$ 个字符串，那么答案的第四位就是 `d`，否则我们要继续枚举 `e`、`f`、...

确定了答案的第四位以后，我们还要确定答案是不是只有四位。考虑已知答案为 `abcd` 时，与已知答案为 `abcd*` 时相比，能选的字符串数量如何变化。

* 所有 `abcd[a-z]*` 的字符串，原来答案是 `abcd*` 时都能选择，现在每种字母只能选一个，否则答案大于 `abcd`。
* 剩下的字符串可选情况维持不变。

如果我们能选至少 $k$ 个字符串，那么答案就只有四位，否则继续枚举第五位。复杂度 $\mathcal{O}(\sum |s|)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXLEN ((int) 1e6)
using namespace std;

int n, K;
char s[MAXLEN + 10];

// sz[i]：有几个字符串恰好被节点 i 代表
// tot[i]：以节点 i 为根的子树里一共有几个字符串
int nCnt, sz[MAXLEN + 10], tot[MAXLEN + 10], ch[MAXLEN + 10][26];

// 新建一个 trie 节点，返回节点编号
int newNode() {
    nCnt++;
    sz[nCnt] = tot[nCnt] = 0;
    memset(ch[nCnt], 0, sizeof(ch[nCnt]));
    return nCnt;
}

// 将 s 里保存的字符串加入 trie
void add() {
    int now = 1;
    tot[now]++;
    for (int i = 1; s[i]; i++) {
        int &c = ch[now][s[i] - 'a'];
        if (!c) c = newNode();
        tot[now = c]++;
    }
    sz[now]++;
}

void solve() {
    // 新建 trie 根节点，编号为 1
    nCnt = 0; newNode();

    scanf("%d%d", &n, &K);
    // 将每个字符串加入 trie
    for (int i = 1; i <= n; i++) {
        scanf("%s", s + 1);
        add();
    }

    // 逐位确定答案，now 表示目前已确定的答案前缀在 trie 上是哪个节点
    int now = 1;
    while (true) {
        // 判断答案是否就是 now 所在的节点
        // 首先，now 代表的字符串一定都可以选
        int t = sz[now];
        // 以 now 子节点为根的子树里，每棵子树最多选一个字符串
        for (int i = 0; i < 26; i++) if (tot[ch[now][i]]) t++;
        if (t >= K) {
            // 答案就是 now 所在的节点
            if (now == 1) printf("EMPTY");
            printf("\n");
            return;
        }

        // 枚举答案的下一个字母
        for (int i = 0; i < 26; i++) if (tot[ch[now][i]]) {
            // 现在以 now 子节点为根的子树里，每棵子树可以选任意个字符串
            t = t - 1 + tot[ch[now][i]];
            if (t >= K) {
                // 确定了下一个字母为 i
                K -= t - tot[ch[now][i]];
                now = ch[now][i];
                printf("%c", i + 'a');
                break;
            }
        }
    }
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```
