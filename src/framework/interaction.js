import { Events, Raycaster, Vector2 } from 'mmgl/src/index';

class Interaction extends Events {
    constructor(view, domElement) {
        super();
        let scope = this;
        this.raycaster = new Raycaster();
        this.currMousePos = new Vector2();

        this.camera = view.getCamera();
        this.scene = view.getScene();
        this.view = view;
        this.target = null;
        this.domElement = (domElement !== undefined) ? domElement : document;

        this._onMouseMovebind = scope.onMouseMove.bind(scope);
        this._onMousedownbind = scope.onMousedown.bind(scope);
        this._onMouseupbind = scope.onMouseup.bind(scope);

        this.domElement.addEventListener('mousemove', this._onMouseMovebind, false);
        this.domElement.addEventListener('mousedown', this._onMousedownbind, false);
        this.domElement.addEventListener('mouseup', this._onMouseupbind, false);

        this.lastPos = null;
        //避免多次触发
        this.isChange = false;
        this.isMouseOver = false;
        this.isMouseOut = false;
        this.isClick = false;
        this.EVENT = null;

    }
    update() {
        this.camera = this.view.getCamera();
        if (!this.isChange) return;

        this.isChange = false;

        this.camera.updateMatrixWorld();

        // update the picking ray with the camera and mouse position
        this.raycaster.setFromCamera(this.currMousePos, this.camera);

        // calculate objects intersecting the picking ray
        var intersects = this.raycaster.intersectObjects(this.scene.children, true);
        //console.log(intersects.length)
        //没有绑定事件的不往下计算
        if (intersects.length > 0) {
            intersects.forEach((item, i) => {
                if (!item.object._listeners) {
                    intersects.splice(i, 1);
                }
            })
        }

        if (intersects.length > 0) {
            // if (this.camera.type === "OrthographicCamera") {
            //     debugger
            // }
            // console.log('Interaction debug', intersects.length)
            if (this.target) {
                this.target.fire({ type: 'mousemove', event: this.EVENT, intersects });
            }
            if (intersects[0].object == this.target) {
                if (!this.isMouseOver) {
                    this.target.fire({ type: 'mouseover', event: this.EVENT, intersects });
                    this.isMouseOver = true;
                    this.isMouseOut = false;
                }
                if (this.isClick) {
                    this.target.fire({ type: 'click', event: this.EVENT, intersects });
                    this.isClick = false;
                }

            } else {
                if (this.target !== null && !this.isMouseOut) {
                    this.target.fire({ type: 'mouseout', event: this.EVENT, intersects });
                    this.isMouseOut = true;
                    this.isMouseOver = false;
                    // console.log({ type: 'mouseout' })
                }
                this.target = intersects[0].object;
            }

        } else {
            if (this.target !== null && !this.isMouseOut) {
                this.target.fire({ type: 'mouseout', event: this.EVENT, intersects });
                this.target = null;
                this.isMouseOut = true;
                this.isMouseOver = false;
                //console.log({ type: 'mouseout' })
            }
        }


    }

    dispose() {
        let scope = this;
        // scope.domElement.removeEventListener('contextmenu', onContextMenu, false);
        scope.domElement.removeEventListener('mousedown', scope._onMousedownbind, false);
        scope.domElement.removeEventListener('mouseup', scope._onMouseupbind, false);
        // scope.domElement.removeEventListener('wheel', onMouseWheel, false);

        // scope.domElement.removeEventListener('touchstart', onTouchStart, false);
        // scope.domElement.removeEventListener('touchend', onTouchEnd, false);
        // scope.domElement.removeEventListener('touchmove', onTouchMove, false);

        scope.domElement.removeEventListener('mousemove', scope._onMouseMovebind, false);
        // document.removeEventListener('mouseup', onMouseUp, false);
        // window.removeEventListener('keydown', onKeyDown, false);

        scope._onMousedownbind = null;
        scope._onMouseupbind = null;
        scope._onMouseMovebind = null;



        this.raycaster = null;
        this.currMousePos = null;

        this.camera = null;
        this.scene = null;
        this.target = null;
        this.domElement = null;


        this.lastPos = null;

        this.isChange = false;
        this.isMouseOver = false;
        this.isMouseOut = false;
        this.isClick = false;
        this.EVENT = null;
    }
    onMousedown(e) {
        //this.isClick = true;
        this.EVENT = event;
        let { x, y } = e;
        this.lastPos = { x, y };
    }
    onMouseup(e) {

        this.isChange = true;
        let { x, y } = e;

        if (x == this.lastPos.x && y == this.lastPos.y) {
            this.isClick = true;
            this.fire({ type: 'click', event: event });
            // console.log('click');
        }
        setTimeout(() => {
            this.fire({ type: 'refresh' });
        }, 16);

        this.EVENT = event;
        //console.log('refresh');

    }

    onMouseMove(event) {
        event.preventDefault();
        this.currMousePos.x = (event.offsetX / this.domElement.clientWidth) * 2 - 1;
        this.currMousePos.y = -(event.offsetY / this.domElement.clientHeight) * 2 + 1;
        this.fire({ type: 'move', event: event });
        this.fire({ type: 'refresh' });
        this.EVENT = event;
        this.isChange = true;
    }

}




export { Interaction };