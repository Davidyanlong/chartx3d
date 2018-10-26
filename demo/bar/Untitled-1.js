//http://wow.techbrood.com/fiddle/2024
;
(function() {
    //global variables
    var coordinatesDataObj = {};
    var polynomial = 0;
    var init = true;
    var lastLat;
    var lastLon;

    $(function() {
        //instantiate SonicPlayerView, SonicPlayerModel, SonicPlayerController
        var sonicPlayerView = new SonicPlayerView();
        var sonicPlayerModel = new SonicPlayerModel();
        var sonicPlayerController = new SonicPlayerController(sonicPlayerView, sonicPlayerModel);
        // call init
        sonicPlayerController.init();
    });
    ////////////////
    ///Controller/
    ////////////
    function SonicPlayerController(aSonicPlayerView, aSonicPlayerModel) {
        this.view = aSonicPlayerView;
        this.model = aSonicPlayerModel;
    }
    SonicPlayerController.prototype = {
        // define init();
        init: function() {
            var scope = this;
            scope.view.initThreeDimentionalScene();
            scope.view.render();
            setInterval(function() {
                console.log('hello world');
                if (init === true) {
                    var latA = Math.random() * 360;
                    var lonA = Math.random() * 360;
                    var latB = Math.random() * 360;
                    var lonB = Math.random() * 360;
                    lastLat = latB;
                    lastLon = lonB;
                    init = false;
                } else {
                    var latA = lastLat;
                    var lonA = lastLon;
                    var latB = Math.random() * 360;
                    var lonB = Math.random() * 360;
                    lastLat = latB;
                    lastLon = lonB;
                }
                scope.model.calcSpatialCoordinate(latA, lonA, latB, lonB);
                scope.view.isRendering = true;
            }, 1000);
        }
    }

    //////////////
    /////view//
    /////////
    function SonicPlayerView() {
        // var renderer;
        // var camera;
        // var scene;
        this.isRendering = false;
    }
    SonicPlayerView.prototype = {
            initThreeDimentionalScene: function() {
                // create a 3D scene
                scene = new THREE.Scene();

                // create a camera
                camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

                // create a render
                renderer = new THREE.WebGLRenderer();
                renderer.setClearColor(0x000000, 1.0);
                renderer.setSize(window.innerWidth, window.innerHeight);
                renderer.shadowMapEnabled = true;

                //sphere
                var sphereGeometry = new THREE.SphereGeometry(20, 20, 20);
                //var sphereGeometry = new THREE.SphereGeometry();
                var material = new THREE.MeshLambertMaterial({
                    color: 0x1E60EE,
                    transparent: true
                });
                material.opacity = 0.6;
                var sphere = new THREE.Mesh(sphereGeometry, material);
                scene.add(sphere);

                //camera position
                camera.position.x = 0;
                camera.position.y = 0;
                camera.position.z = 100;
                camera.lookAt(scene.position);

                // add spotlight for the shadows
                var spotLight = new THREE.SpotLight(0xffffff);
                //spotLight.position.set(20, 20, 20);
                spotLight.position.set(500, 500, 1000);
                spotLight.shadowCameraNear = 20;
                spotLight.shadowCameraFar = 100;
                spotLight.castShadow = true;

                scene.add(spotLight);

                // add the output of the renderer to the html element
                document.body.appendChild(renderer.domElement);
            },
            render: function() {
                //if isRenderingTrue, render a bezier curve
                if (this.isRendering === true) {
                    this.animateBezierCurve();
                };
                //rotation speed
                var rotSpeed = 0.01;
                camera.position.x = camera.position.x * Math.cos(rotSpeed) + camera.position.z * Math.sin(rotSpeed);
                camera.position.z = camera.position.z * Math.cos(rotSpeed) - camera.position.x * Math.sin(rotSpeed);
                camera.lookAt(scene.position);
                camera.lookAt(scene.position);
                //resquestAnimationFrame
                requestAnimationFrame(this.render.bind(this));
                renderer.render(scene, camera);
            },
            startBezierAnimation: function() {

            },
            addBezierCurve: function() {
                //draw bezier
                var SUBDIVISIONS = 20;
                var geometry = new THREE.Geometry();
                var quadraticCurve = new THREE.QuadraticBezierCurve3();
                quadraticCurve.v0 = new THREE.Vector3(coordinatesData.v0x, coordinatesData.v0y, coordinatesData.v0z);
                quadraticCurve.v1 = new THREE.Vector3(coordinatesData.v1x, coordinatesData.v1y, coordinatesData.v1z);
                quadraticCurve.v2 = new THREE.Vector3(coordinatesData.v2x, coordinatesData.v2y, coordinatesData.v2z);
                for (var i = 0; i <= SUBDIVISIONS; i++) {
                    geometry.vertices.push(quadraticCurve.getPoint(i / SUBDIVISIONS));
                };
                var material = new THREE.LineBasicMaterial({
                    color: 0xEE4950,
                    linewidth: 5
                });
                var line = new THREE.Line(geometry, material);
                scene.add(line);
            },
            animateBezierCurve: function() {
                if (polynomial > 40) {
                    polynomial = 0;
                    this.isRendering = false;
                    return false;
                };
                var SUBDIVISIONS = 20;
                var geometry = new THREE.Geometry();
                var curve = new THREE.QuadraticBezierCurve3();
                curve.v0 = new THREE.Vector3(coordinatesDataObj.v0x, coordinatesDataObj.v0y, coordinatesDataObj.v0z);
                curve.v1 = new THREE.Vector3(coordinatesDataObj.v1x, coordinatesDataObj.v1y, coordinatesDataObj.v1z);
                curve.v2 = new THREE.Vector3(coordinatesDataObj.v2x, coordinatesDataObj.v2y, coordinatesDataObj.v2z);
                for (var i = 0; i <= SUBDIVISIONS; i++) {
                    geometry.vertices.push(curve.getPoint(i / ((40 - polynomial) + SUBDIVISIONS)));
                };
                var material = new THREE.LineBasicMaterial({
                    color: 0xE5EE15,
                    linewidth: 1
                });
                var line = new THREE.Line(geometry, material);
                scene.add(line);
                polynomial++;
            },

        }
        //////////////
        /////model//
        /////////
    function SonicPlayerModel() {
        this.CLIENT_ID = "8f474de4d1dedd5a6a4f4cbb60f4e6b8";
        this.spaceCoordinatesDataBox = {
                v0x: 0,
                v0y: 0,
                v0z: 0,
                v1x: 0,
                v1y: 0,
                v1z: 0,
                v2x: 0,
                v2y: 0,
                v2z: 0
            },
            this.getGeoPoints = function() {
                var latitudeA = $('#latitudeA').val();
                var longitudeA = $('#longitudeA').val();
                var latitudeB = $('#latitudeB').val();
                var longitudeB = $('#longitudeB').val();
                var coordinateArr = [latitudeA, longitudeA, latitudeB, longitudeB];
                console.log(latitudeA);

            }
    }
    SonicPlayerModel.prototype = {
        getTrack: function(aGenre) {
            SC.get('/tracks', {
                genres: 'minimal',
                limit: 1
            }, function(tracks) {
                var track = tracks[0];
            })
        },
        calcSpatialCoordinate: function(latitudeA, longitudeA, latitudeB, longitudeB) {
            var radius = 20;
            console.log(this);

            //calculate v0(x, y, z)
            var v0y = Math.sin(latitudeA / 180 * Math.PI) * radius;
            var anotherRadius = Math.cos(latitudeA / 180 * Math.PI) * radius;
            var v0x = Math.cos(longitudeA / 180 * Math.PI) * anotherRadius;
            var v0z = Math.sin(longitudeA / 180 * Math.PI) * anotherRadius;

            //calculate v2(x,y, z)
            var v2y = Math.sin(latitudeB / 180 * Math.PI) * radius;
            var anotherRadius = Math.cos(latitudeB / 180 * Math.PI) * radius;
            var v2x = Math.cos(longitudeB / 180 * Math.PI) * anotherRadius;
            var v2z = Math.sin(longitudeB / 180 * Math.PI) * anotherRadius;

            //calculate the mid between v0 and v2
            var midPointX = (v0x + v2x) / 2;
            var midPointY = (v0y + v2y) / 2;
            var midPointZ = (v0z + v2z) / 2;

            //calculate the bistance beween the two dots
            var distance = Math.sqrt(Math.pow(v2x - v0x, 2) + Math.pow(v2y - v0y, 2) + Math.pow(v2z - v0z, 2));

            //calculate multipleVal to get the vector length (distance twice length)
            var multipleVal = Math.pow(distance, 2) / ((Math.pow(midPointX, 2)) + (Math.pow(midPointY, 2)) + (Math.pow(midPointZ, 2)));
            //apply the multipleVal to get v1(x, y, z)
            var v1x = midPointX + multipleVal * midPointX;
            var v1y = midPointY + multipleVal * midPointY;
            var v1z = midPointZ + multipleVal * midPointZ;

            // store each coordinate in spaceCoordinatesDataBox
            this.spaceCoordinatesDataBox.v0x = v0x;
            this.spaceCoordinatesDataBox.v0y = v0y;
            this.spaceCoordinatesDataBox.v0z = v0z;
            this.spaceCoordinatesDataBox.v1x = v1x;
            this.spaceCoordinatesDataBox.v1y = v1y;
            this.spaceCoordinatesDataBox.v1z = v1z;
            this.spaceCoordinatesDataBox.v2x = v2x;
            this.spaceCoordinatesDataBox.v2y = v2y;
            this.spaceCoordinatesDataBox.v2z = v2z;

            // also, store them into a global array coordinatesData
            coordinatesDataObj.v0x = v0x;
            coordinatesDataObj.v0y = v0y;
            coordinatesDataObj.v0z = v0z;
            coordinatesDataObj.v1x = v1x;
            coordinatesDataObj.v1y = v1y;
            coordinatesDataObj.v1z = v1z;
            coordinatesDataObj.v2x = v2x;
            coordinatesDataObj.v2y = v2y;
            coordinatesDataObj.v2z = v2z;

            console.log(this.spaceCoordinatesDataBox);
        }
    }

})();