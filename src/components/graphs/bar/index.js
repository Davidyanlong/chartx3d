
import { Component, _ } from '../../Component';
import { Vector3, MeshBasicMaterial } from 'mmgl/src/index';

let renderOrder = 100;
class Bar extends Component {
    constructor(chart3d, opt) {
        super(chart3d.currCoord);

        this.type = "bar";


        // this.field  = null;
        // this.enabledField = null;

        // this.yAxisAlign = "left"; //默认设置为左y轴
        // this._xAxis = this.root._coord._xAxis;

        //trimGraphs的时候是否需要和其他的 bar graphs一起并排计算，true的话这个就会和别的重叠
        //和css中得absolute概念一致，脱离文档流的绝对定位
        // this.absolute = false; 

        this.node = {
            shapeType: 'box',
            width: 0,
            _width: 0,
            maxWidth: 50,
            minWidth: 1,
            minHeight: 0,

            radius: 3,
            fillStyle: null,
            fillAlpha: 0.95,
            _count: 0, //总共有多少个bar
            xDis: null,
            filter: null
        };

        this.label = {
            enabled: false,
            animation: true,
            fontColor: null, //如果有设置text.fontColor那么优先使用fontColor
            fontSize: 12,
            format: null,
            lineWidth: 0,
            strokeStyle: null,

            rotation: 0,
            align: "center",  //left center right
            verticalAlign: "bottom", //top middle bottom
            position: "top", //top,topRight,right,rightBottom,bottom,bottomLeft,left,leftTop,center
            offsetX: 0,
            offsetY: 0
        };

        //this.sort = null; //TODO:这个设置有问题，暂时所有sort相关的逻辑都注释掉

        // this._barsLen = 0;

        //this.txtsSp = null;

        this.proportion = false;//比例柱状图，比例图首先肯定是个堆叠图

        _.extend(true, this, opt);

        this.init();

    }
    init() {
        this.barsGroup = this._root.renderView.addGroup({ name: 'bars_gruop' });

    }
    computePos() {
        let me = this;
        let fields = [];
        if (!_.isArray(this.field)) {
            fields.push(this.field);
        } else {
            fields = this.field.slice(0);
        }
        this.drawPosData = [];
        let xDatas = this._coordSystem.xAxisAttribute.data;
        let yDatas = this._coordSystem.yAxisAttribute.data;
        //x轴返回的数据是单列
        if (xDatas.length == 1) {
            xDatas = _.flatten(xDatas);
        }

        //yDatas = _.flatten(yDatas);
        //let dd = false;
        let lastArray = [];

        let DataOrg = function () {
            //this.org = [];
            this.isStack = false;
            //this.stack = [];
            //具体XYZ的值
            this.value = null;
            this.stackValue = null
            //
            //this.pos = null;
        };

        //let ceil = this.getCeilSize();

        xDatas.forEach((xd, no) => {
            lastArray = [];
            yDatas.forEach((yda, index) => {

                let zd = fields[index].toString();

                if (yda.length > 1) {
                    yda.forEach((ydad, num) => {

                        let ydadd = _.flatten(ydad).slice(0);
                        ydadd.forEach((yd, i) => {
                            if (i === no) {
                                let _tmp = new DataOrg();
                                if (num > 0) {
                                    _tmp.isStack = true;
                                    _tmp.value = new Vector3(xd, yd, zd);
                                    _tmp.stackValue = new Vector3(xd, lastArray[i], zd);

                                } else {

                                    _tmp.value = new Vector3(xd, yd, zd);

                                }
                                me.drawPosData.push(_tmp);
                            }

                        })
                        _.flatten(ydad).slice(0).forEach((t, y) => {
                            lastArray[y] = (lastArray[y] || 0) + t;
                        })
                        //lastArray = _.flatten(ydad).slice(0);
                    })

                } else {
                    let _tmp = new DataOrg();
                    _.flatten(yda).slice(0).forEach((yd, i) => {
                        if (i === no) {
                            _tmp.value = new Vector3(xd, yd, zd);
                            me.drawPosData.push(_tmp);
                        }

                    })
                }

            })

        })
    }
    draw() {
        this.computePos();
        let ceil = this._coordSystem.getCeilSize();
        let getXAxisPosition = this._coordSystem.getXAxisPosition.bind(this._coordSystem);
        let getYAxisPosition = this._coordSystem.getYAxisPosition.bind(this._coordSystem);
        let getZAxisPosition = this._coordSystem.getZAxisPosition.bind(this._coordSystem);
        let boxWidth = ceil.x * 0.8;
        let boxDepth = ceil.z * 0.8;
        let boxHeight = 1;
        this.drawPosData.forEach(dataOrg => {

            let metaril = new MeshBasicMaterial({
                color: 0xffffff * Math.random(),
                transparent: true,
                opacity: 1,
                depthTest: true,
                depthWrite: true,
                // polygonOffset: true,
                // polygonOffsetFactor: 1,
                // polygonOffsetUnits: 1.5
            })

            let pos = new Vector3();
            let stack = new Vector3();
            pos.setX(getXAxisPosition(dataOrg.value.x));
            pos.setY(getYAxisPosition(dataOrg.value.y));
            pos.setZ(getZAxisPosition(dataOrg.value.z));
            if (dataOrg.isStack) {
                stack.setX(pos.x - boxWidth * 0.5);
                stack.setY(getYAxisPosition(dataOrg.stackValue.y));
                stack.setZ(-pos.z + boxDepth * 0.5);

            } else {

                stack.setX(pos.x - boxWidth * 0.5);
                stack.setY(0);
                stack.setZ(-pos.z + boxDepth * 0.5);

            }
            boxHeight = Math.max(Math.abs(pos.y), 1);
            console.log('boxHeight', boxHeight, dataOrg.value.y);
            let box = this._root.renderView.createBox(boxWidth, boxHeight, boxDepth, metaril);
            box.position.copy(stack);
            box.renderOrder = renderOrder++;
            this.group.add(box);

            box.on('mouseover', function () {
                this.userData.color = this.material.color.clone();
                this.material.setValues({ color: 0xf00000 });
            })
            box.on('mouseout', function () {
                this.material.setValues({ color: this.userData.color });
            })



        });

    }
}

export { Bar };

