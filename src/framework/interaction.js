import { Events, Raycaster, Vector2 } from 'mmgl/src/index';
import { _ } from 'mmvis/src/index';
class Interaction extends Events {
    constructor(domElement) {
        super();
        let scope = this;

        this.currMousePos = new Vector2();
        this.views = [];

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
    addView(view) {
        view.target = null;
        this.views.push(view);
    }
    update() {

        this.views.forEach(view => {
            if (this.isChange) {
                view.isChange = true;
            }
        });
        if (this.isChange) this.isChange = false;

        this.views.forEach((view, i) => {

            let scene = view.getScene();

            if (!view.isChange) return;
            view.isChange = false;

            let raycaster = view.getRaycaster(this.currMousePos);
            // calculate objects intersecting the picking ray
            let intersects = raycaster.intersectObjects(scene.children, true);

            //console.log('intersects', intersects.length, '----' + i + '-----');

            //没有绑定事件的不往下计算
            if (intersects.length > 0) {

                for (let i = 0, l = intersects.length; i < l; i++) {
                    if (_.isEmpty(intersects[i].object._listeners)) {
                        intersects.splice(i, 1);
                        l--;
                        i--;
                    }
                }
                
            }


            if (intersects.length > 0) {
                if (intersects[0].object == view.target) {
                    if (view.target) {
                        view.target.fire({ type: 'mousemove', event: this.EVENT, intersects });
                    }

                    if (!this.isMouseOver) {
                        view.target.fire({ type: 'mouseover', event: this.EVENT, intersects });
                        this.isMouseOver = true;
                        this.isMouseOut = false;
                    }
                    if (this.isClick) {
                        view.target.fire({ type: 'click', event: this.EVENT, intersects });
                        this.isClick = false;
                    }

                } else {
                    if (view.target !== null && !this.isMouseOut) {
                        view.target.fire({ type: 'mouseout', event: this.EVENT, intersects });
                        this.isMouseOut = true;
                        this.isMouseOver = false;
                        // console.log({ type: 'mouseout' })
                    }
                    view.target = intersects[0].object;
                }

            } else {
                if (view.target !== null && !this.isMouseOut) {
                    view.target.fire({ type: 'mouseout', event: this.EVENT, intersects });
                    view.target = null;
                    this.isMouseOut = true;
                    this.isMouseOver = false;
                    //console.log({ type: 'mouseout' })
                }
            }



        })

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

        this.currMousePos = null;
        this.views = [];

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
        //console.log('down', x, y);
    }
    onMouseup(e) {

        this.isChange = true;
        let { x, y } = e;
        //console.log('up', x, y);
        if (x == this.lastPos.x && y == this.lastPos.y) {
            this.isClick = true;
            this.fire({ type: 'click', event: event });
            // console.log('click');
            this.lastPos = { x: -1, y: -1 };
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