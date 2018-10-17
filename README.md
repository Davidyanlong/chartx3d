chartx3d  0.1 代码规范
=================

* 配置使用规范约定


```
 var data = [
            ["xfield", "uv", "pv", "click", "ppc"],
            [1, 40, 20, 33, 45],
            [2, 60, 51, 26, 76],
            [3, 80, 50, 50, 45],
            [4, 100, 60, 33, 64],
            [5, 120, 91, 126, 22],
            [6, 20, 50, 90, 45],
            [7, 20, 120, 33, 78],
            [8, 20, 51, 86, 234],
            [9, 20, 90, 150, 63]

        ];
 ```
 ```       
        var options = {
            //theme : [],
            controls: {

                boxWidth: 1500,         //空间中X的最大值(最大宽度)  
                boxHeight: 1000,        //空间中Y的最大值(最大高度)  
                boxDepth: 500,         //空间中Z的最大值(最大深度)

                distance: 900,        //默认相机距离
                maxDistance: 5000,     //最大相机距离
                minDistance: 300,      //最小相机距离 

                alpha: 20,    //绕X轴旋转
                beta: 40,      //绕Y轴旋转
            },
            tips:{
                enabled:true
            },
            coord: {
                type: "cartesian3d",
                xAxis: {
                    field: "xfield",
                    title: {
                        content: "xAxis"
                    },
                    label: {
                        textAlign: "center",
                        format: function (val) {
                            return val;
                            // return val%2==0? "x\nodfdfdfdfsdfo":val;
                        }
                    }

                    //dataSection : [1,3,5,7,9]
                },
                zAxis: {
                   // enabled: false,
                    // field : "ppc",
                    //depth: 1000,
                    title: {
                        content: "zAxis"
                    },
                    label: {
                        textAlign: "left",
                        format: function (val) {
                            return val;
                            //return "x\nodfdfdfdfsdfo"
                        }
                    },

                   // dataSection: ['页面访问数']
                },
                yAxis: [
                    {
                       // min:0,
                        field: 'uv',
                        title: {
                            content: "left"
                        },
                        // dataSection : [0,100,200,300,400,500,600,700,800],
                        label: {
                            format: function (val) {
                                
                            }
                        }
                    }
                ]
            },

            // tips : {
            //     pointer : "region"
            // },
            graphs: [
                {
                    type: "bar",
                    field: ['uv','pv','click','ppc'],
                    yAxisAlign: "left",
                    label: {
                        enabled: true,
                        verticalAlign: "middle",
                        position: "center",
                        fontColor: "#fff",
                        lineWidth: 2,
                        rotation: -90
                    }
                }

            ]

        };
        Chartx.create("canvasTest", data, options)
 ```       