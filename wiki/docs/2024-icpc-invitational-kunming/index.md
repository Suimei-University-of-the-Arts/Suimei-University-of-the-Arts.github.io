---
title: 2024 ICPC 全国邀请赛昆明站
date: 2024-09-17
---

# 2024 ICPC 全国邀请赛昆明站

## 基本信息

<table>
<tr>
<td><b>竞赛日期</b></td><td>2024/05/26</td>
</tr>
<tr>
<td><b>竞赛试题</b></td><td><a href="contest-en.pdf">English</a> | <a href="contest-zh.pdf">中文</a></td>
</tr>
<tr>
<td><b>竞赛榜单</b></td><td><a href="board">SUA Board</a> | <a href="https://board.xcpcio.com/icpc/49th/kunming-invitational">XCPC Board</a></td>
</tr>
<tr>
<td><b>在线练习</b></td><td><a href="https://codeforces.com/gym/105386">Codeforces Gym</a> | <a href="https://qoj.ac/contest/1802">QOJ</a></td>
</tr>
<tr>
<td><b>选手评价</b></td><td><a href="https://www.zhihu.com/question/652342182">zhihu</a></td>
</tr>
<tr>
<td><b>现场直播</b></td><td><a href="https://www.bilibili.com/video/BV1gZ421W72J/">bilibili</a></td>
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
      {"id": "A", "ac": 206, "type": "正式赛队"},
      {"id": "A", "ac": 9, "type": "非正式赛队"},
      {"id": "B", "ac": 255, "type": "正式赛队"},
      {"id": "B", "ac": 15, "type": "非正式赛队"},
      {"id": "C", "ac": 3, "type": "正式赛队"},
      {"id": "C", "ac": 0, "type": "非正式赛队"},
      {"id": "D", "ac": 0, "type": "正式赛队"},
      {"id": "D", "ac": 0, "type": "非正式赛队"},
      {"id": "E", "ac": 93, "type": "正式赛队"},
      {"id": "E", "ac": 4, "type": "非正式赛队"},
      {"id": "F", "ac": 5, "type": "正式赛队"},
      {"id": "F", "ac": 1, "type": "非正式赛队"},
      {"id": "G", "ac": 242, "type": "正式赛队"},
      {"id": "G", "ac": 12, "type": "非正式赛队"},
      {"id": "H", "ac": 6, "type": "正式赛队"},
      {"id": "H", "ac": 1, "type": "非正式赛队"},
      {"id": "I", "ac": 230, "type": "正式赛队"},
      {"id": "I", "ac": 10, "type": "非正式赛队"},
      {"id": "J", "ac": 33, "type": "正式赛队"},
      {"id": "J", "ac": 0, "type": "非正式赛队"},
      {"id": "K", "ac": 3, "type": "正式赛队"},
      {"id": "K", "ac": 1, "type": "非正式赛队"},
      {"id": "L", "ac": 25, "type": "正式赛队"},
      {"id": "L", "ac": 1, "type": "非正式赛队"},
      {"id": "M", "ac": 42, "type": "正式赛队"},
      {"id": "M", "ac": 1, "type": "非正式赛队"}
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
      {"ac": 0, "cnt": 9, "type": "正式赛队"},
      {"ac": 0, "cnt": 1, "type": "非正式赛队"},
      {"ac": 1, "cnt": 12, "type": "正式赛队"},
      {"ac": 1, "cnt": 1, "type": "非正式赛队"},
      {"ac": 2, "cnt": 12, "type": "正式赛队"},
      {"ac": 2, "cnt": 4, "type": "非正式赛队"},
      {"ac": 3, "cnt": 26, "type": "正式赛队"},
      {"ac": 3, "cnt": 2, "type": "非正式赛队"},
      {"ac": 4, "cnt": 89, "type": "正式赛队"},
      {"ac": 4, "cnt": 5, "type": "非正式赛队"},
      {"ac": 5, "cnt": 70, "type": "正式赛队"},
      {"ac": 5, "cnt": 2, "type": "非正式赛队"},
      {"ac": 6, "cnt": 22, "type": "正式赛队"},
      {"ac": 6, "cnt": 0, "type": "非正式赛队"},
      {"ac": 7, "cnt": 13, "type": "正式赛队"},
      {"ac": 7, "cnt": 0, "type": "非正式赛队"},
      {"ac": 8, "cnt": 6, "type": "正式赛队"},
      {"ac": 8, "cnt": 0, "type": "非正式赛队"},
      {"ac": 9, "cnt": 1, "type": "正式赛队"},
      {"ac": 9, "cnt": 0, "type": "非正式赛队"},
      {"ac": 10, "cnt": 2, "type": "正式赛队"},
      {"ac": 10, "cnt": 1, "type": "非正式赛队"},
      {"ac": 11, "cnt": 1, "type": "正式赛队"},
      {"ac": 11, "cnt": 0, "type": "非正式赛队"},
      {"ac": 12, "cnt": 1, "type": "正式赛队"},
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
