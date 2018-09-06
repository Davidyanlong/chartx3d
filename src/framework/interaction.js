import { Events, Raycaster, Vector2 } from 'mmgl/src/index';

let isChange = false;
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


        this.domElement.addEventListener('mousemove', scope.onMouseMove.bind(scope), false);

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
            if (intersects[0].object == this.target) {
                this.target.fire({ type: 'mouseover' });

            } else {
                if (this.target !== null) {
                    this.target.fire({ type: 'mouseout' });
                }
                this.target = intersects[0].object;
            }
        } else {
            if (this.target !== null) {
                this.target.fire({ type: 'mouseout' });
                this.target = null;
            }
        }


    }

    dispose() {
        //let scope = this;
        // scope.domElement.removeEventListener('contextmenu', onContextMenu, false);
        // scope.domElement.removeEventListener('mousedown', onMouseDown, false);
        // scope.domElement.removeEventListener('wheel', onMouseWheel, false);

        // scope.domElement.removeEventListener('touchstart', onTouchStart, false);
        // scope.domElement.removeEventListener('touchend', onTouchEnd, false);
        // scope.domElement.removeEventListener('touchmove', onTouchMove, false);

        document.removeEventListener('mousemove', onMouseMove, false);
        // document.removeEventListener('mouseup', onMouseUp, false);
        // window.removeEventListener('keydown', onKeyDown, false);
    }

    onMouseMove(event) {
        event.preventDefault();
        this.currMousePos.x = (event.offsetX / this.domElement.clientWidth) * 2 - 1;
        this.currMousePos.y = -(event.offsetY / this.domElement.clientHeight) * 2 + 1;
        this.fire({ type: 'move' });
        isChange = true;
    }

}




export { Interaction };