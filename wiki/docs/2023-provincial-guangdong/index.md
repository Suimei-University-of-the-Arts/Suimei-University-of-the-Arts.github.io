---
title: 2023 广东省大学生程序设计竞赛
date: 2023-05-15
---

# 2023 广东省大学生程序设计竞赛

## 基本信息

<table>
<tr>
<td><b>竞赛日期</b></td><td>2023/05/14</td>
</tr>
<tr>
<td><b>竞赛试题</b></td><td><a href="contest-en.pdf">English</a> | <a href="contest-zh.pdf">中文</a></td>
</tr>
<tr>
<td><b>竞赛榜单</b></td><td><a href="board">SUA Board</a> | <a href="https://board.xcpcio.com/provincial-contest/2023/guangdong">XCPC Board</a></td>
</tr>
<tr>
<td><b>在线练习</b></td><td><a href="https://codeforces.com/gym/104369">Codeforces Gym</a> | <a href="https://cpc.csgrandeur.cn/csgoj/problemset#search=%E5%B9%BF%E4%B8%9C%E7%9C%81%E7%AC%AC%E4%BA%8C%E5%8D%81%E5%B1%8A%E5%A4%A7%E5%AD%A6%E7%94%9F%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%E7%AB%9E%E8%B5%9B%EF%BC%88GDCPC2023%EF%BC%89">CSG 1200 ~ 1212</a></td>
</tr>
<tr>
<td><b>选手评价</b></td><td><a href="https://www.zhihu.com/question/600856118">zhihu</a></td>
</tr>
</table>

## 统计数据

```vegalite
{
  "title": {
    "text": "题目通过数统计",
    "fontSize": 20
  },
  "data": {
    "values": [
      {"id": "A", "ac": 236, "type": "正式赛队"},
      {"id": "A", "ac": 59, "type": "非正式赛队"},
      {"id": "B", "ac": 32, "type": "正式赛队"},
      {"id": "B", "ac": 25, "type": "非正式赛队"},
      {"id": "C", "ac": 198, "type": "正式赛队"},
      {"id": "C", "ac": 56, "type": "非正式赛队"},
      {"id": "D", "ac": 145, "type": "正式赛队"},
      {"id": "D", "ac": 44, "type": "非正式赛队"},
      {"id": "E", "ac": 30, "type": "正式赛队"},
      {"id": "E", "ac": 21, "type": "非正式赛队"},
      {"id": "F", "ac": 11, "type": "正式赛队"},
      {"id": "F", "ac": 20, "type": "非正式赛队"},
      {"id": "G", "ac": 0, "type": "正式赛队"},
      {"id": "G", "ac": 2, "type": "非正式赛队"},
      {"id": "H", "ac": 0, "type": "正式赛队"},
      {"id": "H", "ac": 6, "type": "非正式赛队"},
      {"id": "I", "ac": 123, "type": "正式赛队"},
      {"id": "I", "ac": 43, "type": "非正式赛队"},
      {"id": "J", "ac": 2, "type": "正式赛队"},
      {"id": "J", "ac": 7, "type": "非正式赛队"},
      {"id": "K", "ac": 135, "type": "正式赛队"},
      {"id": "K", "ac": 44, "type": "非正式赛队"},
      {"id": "L", "ac": 0, "type": "正式赛队"},
      {"id": "L", "ac": 0, "type": "非正式赛队"},
      {"id": "M", "ac": 6, "type": "正式赛队"},
      {"id": "M", "ac": 13, "type": "非正式赛队"}
    ]
  },
  "transform": [{
    "calculate": "if(datum.type === 'off', 0, 1)",
    "as": "typeOrder"
  }],
  "layer": [
    {
      "mark": {"type": "bar", "tooltip": true, "width": {"band": 0.5}},
      "encoding": {
        "x": {
          "field": "id",
          "type": "nominal",
          "axis": {"labelAngle": 0, "labelFontSize": 14, "title": "题目编号", "titleFontSize": 14},
          "sort": "-y"
        },
        "y": {
          "field": "ac",
          "aggregate": "sum",
          "type": "quantitative",
          "axis": {"labelAngle": 0, "labelFontSize": 14, "title": "通过数", "titleFontSize": 14}
        },
        "tooltip": [
          {
            "field": "type",
            "type": "nominal",
            "title": "队伍类型"
          },
          {
            "field": "ac",
            "aggregate": "sum",
            "type": "quantitative",
            "title": "通过数"
          }
        ],
        "color": {
          "field": "type",
          "type": "nominal",
          "scale": {
            "domain": ["正式赛队", "非正式赛队"],
            "range": ["#4c78a8", "#616166"]
          },
          "legend": null
        },
        "order": {"field": "typeOrder"}
      }
    },
    {
      "mark": {"type": "text", "style": "label", "fontSize": 14, "dy": -10},
      "encoding": {
        "x": {
          "field": "id",
          "type": "nominal",
          "sort": "-y"
        },
        "y": {
          "field": "ac",
          "aggregate": "sum",
          "type": "quantitative"
        },
        "text": {
          "field": "ac",
          "aggregate": "sum",
          "type": "quantitative"
        }
      }
    }
  ]
}
```

```vegalite
{
  "title": {
    "text": "队伍过题数统计",
    "fontSize": 20
  },
  "data": {
    "values": [
      {"ac": 0, "cnt": 6, "type": "正式赛队"},
      {"ac": 0, "cnt": 1, "type": "非正式赛队"},
      {"ac": 1, "cnt": 35, "type": "正式赛队"},
      {"ac": 1, "cnt": 3, "type": "非正式赛队"},
      {"ac": 2, "cnt": 40, "type": "正式赛队"},
      {"ac": 2, "cnt": 9, "type": "非正式赛队"},
      {"ac": 3, "cnt": 23, "type": "正式赛队"},
      {"ac": 3, "cnt": 2, "type": "非正式赛队"},
      {"ac": 4, "cnt": 36, "type": "正式赛队"},
      {"ac": 4, "cnt": 3, "type": "非正式赛队"},
      {"ac": 5, "cnt": 59, "type": "正式赛队"},
      {"ac": 5, "cnt": 16, "type": "非正式赛队"},
      {"ac": 6, "cnt": 19, "type": "正式赛队"},
      {"ac": 6, "cnt": 3, "type": "非正式赛队"},
      {"ac": 7, "cnt": 14, "type": "正式赛队"},
      {"ac": 7, "cnt": 4, "type": "非正式赛队"},
      {"ac": 8, "cnt": 8, "type": "正式赛队"},
      {"ac": 8, "cnt": 6, "type": "非正式赛队"},
      {"ac": 9, "cnt": 1, "type": "正式赛队"},
      {"ac": 9, "cnt": 5, "type": "非正式赛队"},
      {"ac": 10, "cnt": 1, "type": "正式赛队"},
      {"ac": 10, "cnt": 6, "type": "非正式赛队"},
      {"ac": 11, "cnt": 0, "type": "正式赛队"},
      {"ac": 11, "cnt": 2, "type": "非正式赛队"},
      {"ac": 12, "cnt": 0, "type": "正式赛队"},
      {"ac": 12, "cnt": 0, "type": "非正式赛队"},
      {"ac": 13, "cnt": 0, "type": "正式赛队"},
      {"ac": 13, "cnt": 0, "type": "非正式赛队"}
    ]
  },
  "layer": [
    {
      "mark": {"type": "bar", "tooltip": true, "width": {"band": 0.5}},
      "encoding": {
        "x": {
          "field": "ac",
          "type": "nominal",
          "axis": {"labelAngle": 0, "labelFontSize": 14, "title": "过题数", "titleFontSize": 14}
        },
        "y": {
          "field": "cnt",
          "aggregate": "sum",
          "type": "quantitative",
          "axis": {"labelAngle": 0, "labelFontSize": 14, "title": "队伍数", "titleFontSize": 14}
        },
        "tooltip": [
          {
            "field": "type",
            "type": "nominal",
            "title": "类型"
          },
          {
            "field": "cnt",
            "aggregate": "sum",
            "type": "quantitative",
            "title": "队伍数"
          }
        ],
        "color": {
          "field": "type",
          "type": "nominal",
          "scale": {
            "domain": ["正式赛队", "非正式赛队"],
            "range": ["#4c78a8", "#616166"]
          },
          "legend": null
        },
        "order": {"field": "typeOrder"}
      }
    },
    {
      "mark": {"type": "text", "style": "label", "fontSize": 14, "dy": -10},
      "encoding": {
        "x": {
          "field": "ac",
          "type": "nominal"
        },
        "y": {
          "field": "cnt",
          "aggregate": "sum",
          "type": "quantitative"
        },
        "text": {
          "field": "cnt",
          "aggregate": "sum",
          "type": "quantitative"
        }
      }
    }
  ]
}
```

## 题解列表

### 简要题解

* [pdf](tutorial-sketch-zh.pdf)

### 详细题解

* [A - 算法竞赛](a.md)
* [B - 基站建设](b.md)
* [C - 市场交易](c.md)
* [D - 新居规划](d.md)
* [E - 新怀质问](e.md)
* [F - 格子旅行](f.md)
* [G - 交换操作](g.md)
* [H - 流画溢彩](h.md)
* [I - 路径规划](i.md)
* [J - X 等于 Y](j.md)
* [K - 独立钻石](k.md)
* [L - 经典问题](l.md)
* [M - 计算几何](m.md)
