import { Events, Raycaster, Vector2 } from 'mmgl/src/index';
//避免多次触发
let isChange = false;
let isMouseOver = false;
let isMouseOut = false;
let isClick = false;
let EVENT = null;
class Interaction extends Events {
    constructor(scene, camera, domElement) {
        super();
        let scope = this;
        this.raycaster = new Raycaster();
        this.currMousePos = new Vector2();

        this.camera = camera;
        this.scene = scene;
        this.target = null;
        this.domElement = (domElement !== undefined) ? domElement : document;

        this._onMouseMovebind = scope.onMouseMove.bind(scope);
        this._onMousedownbind = scope.onMousedown.bind(scope);
        this._onMouseupbind = scope.onMouseup.bind(scope);

        this.domElement.addEventListener('mousemove', this._onMouseMovebind, false);
        this.domElement.addEventListener('mousedown', this._onMousedownbind, false);
        this.domElement.addEventListener('mouseup', this._onMouseupbind, false);

        this.lastPos = null;

    }
    update() {
        if (!isChange) return;

        isChange = false;

        // update the picking ray with the camera and mouse position
        this.raycaster.setFromCamera(this.currMousePos, this.camera);

        // calculate objects intersecting the picking ray
        var intersects = this.raycaster.intersectObjects(this.scene.children, true);

        // for (var i = 0; i < intersects.length; i++) {

        //     intersects[i].object.material.color.set(0xff0000);

        // }
        if (intersects.length > 0) {
            if (this.target) {
                this.target.fire({ type: 'mousemove', event: EVENT, intersects });
            }
            if (intersects[0].object == this.target) {
                if (!isMouseOver) {
                    this.target.fire({ type: 'mouseover', event: EVENT, intersects });
                    isMouseOver = true;
                    isMouseOut = false;
                }
                if (isClick) {
                    this.target.fire({ type: 'click', event: EVENT, intersects });
                    isClick = false;
                }

            } else {
                if (this.target !== null && !isMouseOut) {
                    this.target.fire({ type: 'mouseout', event: EVENT, intersects });
                    isMouseOut = true;
                    isMouseOver = false;
                    // console.log({ type: 'mouseout' })
                }
                this.target = intersects[0].object;
            }

        } else {
            if (this.target !== null && !isMouseOut) {
                this.target.fire({ type: 'mouseout', event: EVENT, intersects });
                this.target = null;
                isMouseOut = true;
                isMouseOver = false;
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

        isChange = false;
        isMouseOver = false;
        isMouseOut = false;
        isClick = false;
        EVENT = null;
    }
    onMousedown(e) {
        //isClick = true;
        EVENT = event;
        let { x, y } = e;
        this.lastPos = { x, y };
    }
    onMouseup(e) {

        isChange = true;
        let { x, y } = e;
        if (x == this.lastPos.x && y == this.lastPos.y) {
            isClick = true;
            this.fire({ type: 'click', event: event });
        }

        this.fire({ type: 'refresh' });

        EVENT = event;
        // console.log('click');

    }

    onMouseMove(event) {
        event.preventDefault();
        this.currMousePos.x = (event.offsetX / this.domElement.clientWidth) * 2 - 1;
        this.currMousePos.y = -(event.offsetY / this.domElement.clientHeight) * 2 + 1;
        this.fire({ type: 'move', event: event });
        this.fire({ type: 'refresh' });
        EVENT = event;
        isChange = true;
    }

}




export { Interaction };