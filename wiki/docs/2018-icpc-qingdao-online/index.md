---
title: 2018 ICPC 亚洲区域赛青岛站网络赛
date: 2023-05-20
---

# 2018 ICPC 亚洲区域赛青岛站网络赛

## 基本信息

<table>
<tr>
<td><b>竞赛日期</b></td><td>2018/09/16</td>
</tr>
<tr>
<td><b>竞赛试题</b></td><td><a href="contest-en.pdf">English</a></a></td>
</tr>
<tr>
<td><b>竞赛榜单</b></td><td></td>
</tr>
<tr>
<td><b>在线练习</b></td><td><a href="https://qoj.ac/contest/1339">QOJ</a> | <a href="https://pintia.cn/problem-sets/91827364500/exam/problems/type/7?page=30">ZOJ 4047 ~ 4057</a></td>
</tr>
<tr>
<td><b>选手评价</b></td><td><a href="https://www.zhihu.com/question/294885868">zhihu</a></td>
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
      {"id": "A", "ac": 1492, "type": "正式赛队"},
      {"id": "A", "ac": 0, "type": "非正式赛队"},
      {"id": "B", "ac": 147, "type": "正式赛队"},
      {"id": "B", "ac": 0, "type": "非正式赛队"},
      {"id": "C", "ac": 971, "type": "正式赛队"},
      {"id": "C", "ac": 0, "type": "非正式赛队"},
      {"id": "D", "ac": 22, "type": "正式赛队"},
      {"id": "D", "ac": 0, "type": "非正式赛队"},
      {"id": "E", "ac": 0, "type": "正式赛队"},
      {"id": "E", "ac": 0, "type": "非正式赛队"},
      {"id": "F", "ac": 38, "type": "正式赛队"},
      {"id": "F", "ac": 0, "type": "非正式赛队"},
      {"id": "G", "ac": 121, "type": "正式赛队"},
      {"id": "G", "ac": 0, "type": "非正式赛队"},
      {"id": "H", "ac": 933, "type": "正式赛队"},
      {"id": "H", "ac": 0, "type": "非正式赛队"},
      {"id": "I", "ac": 7, "type": "正式赛队"},
      {"id": "I", "ac": 0, "type": "非正式赛队"},
      {"id": "J", "ac": 576, "type": "正式赛队"},
      {"id": "J", "ac": 0, "type": "非正式赛队"},
      {"id": "K", "ac": 1359, "type": "正式赛队"},
      {"id": "K", "ac": 0, "type": "非正式赛队"}
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
      {"ac": 0, "cnt": 0, "type": "正式赛队"},
      {"ac": 0, "cnt": 0, "type": "非正式赛队"},
      {"ac": 1, "cnt": 204, "type": "正式赛队"},
      {"ac": 1, "cnt": 0, "type": "非正式赛队"},
      {"ac": 2, "cnt": 311, "type": "正式赛队"},
      {"ac": 2, "cnt": 0, "type": "非正式赛队"},
      {"ac": 3, "cnt": 178, "type": "正式赛队"},
      {"ac": 3, "cnt": 0, "type": "非正式赛队"},
      {"ac": 4, "cnt": 306, "type": "正式赛队"},
      {"ac": 4, "cnt": 0, "type": "非正式赛队"},
      {"ac": 5, "cnt": 368, "type": "正式赛队"},
      {"ac": 5, "cnt": 0, "type": "非正式赛队"},
      {"ac": 6, "cnt": 93, "type": "正式赛队"},
      {"ac": 6, "cnt": 0, "type": "非正式赛队"},
      {"ac": 7, "cnt": 53, "type": "正式赛队"},
      {"ac": 7, "cnt": 0, "type": "非正式赛队"},
      {"ac": 8, "cnt": 24, "type": "正式赛队"},
      {"ac": 8, "cnt": 0, "type": "非正式赛队"},
      {"ac": 9, "cnt": 9, "type": "正式赛队"},
      {"ac": 9, "cnt": 0, "type": "非正式赛队"},
      {"ac": 10, "cnt": 4, "type": "正式赛队"},
      {"ac": 10, "cnt": 0, "type": "非正式赛队"},
      {"ac": 11, "cnt": 0, "type": "正式赛队"},
      {"ac": 11, "cnt": 0, "type": "非正式赛队"}
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

* [A - Live Love](a.md)
* [B - Red Black Tree](b.md)
* [C - Halting Problem](c.md)
* [D - Pixel Art](d.md)
* [E - Infinite Parenthesis Sequence](e.md)
* [F - Chaleur](f.md)
* [G - Couleur](g.md)
* [H - Traveling on the Axis](h.md)
* I - Kuririn MIRACLE (WIP)
* [J - Press the Button](j.md)
* [K - XOR Clique](k.md)
