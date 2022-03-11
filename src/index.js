/*
 * @Description:
 * @Version: 2.0
 * @Author: yangsen
 * @Date: 2022-03-09 21:19:44
 * @LastEditors: yangsen
 * @LastEditTime: 2022-03-10 21:35:02
 */
import * as THREE from 'three';
import { mtlLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { objLoader } from 'three/examples/jsm/loaders/OBJLoader';

// 创建场景
var scene = new THREE.Scene();
// 设置摄像机 OrthographicCamera是正交相机  PerspectiveCamera是透视相机
var camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
// 设置相机的位置
camera.position.z = 0;
camera.position.x = 0;
camera.position.y = 0;
camera.speed = {
  z: 0,
  x: 0,
};
scene.add(camera);
// console.log(scene.position); // scene.position默认位置在{x: 0, y: 0, z: 0}
// 创建渲染器
var webGLRenderer = new THREE.WebGLRenderer();
// 设置设备像素比。通常用于避免HiDPI设备上绘图模糊
// Window 接口的devicePixelRatio返回当前显示设备的物理像素分辨率与CSS像素分辨率之比
webGLRenderer.setPixelRatio(window.devicePixelRatio);
// 设置canvas画布大小
webGLRenderer.setSize(window.innerWidth, window.innerHeight);
// 设置颜色及其透明度
webGLRenderer.setClearColor(new THREE.Color(0x0077ec), 1);
// 设置阴影贴图
webGLRenderer.shadowMap.enabled = true;
webGLRenderer.shadowMap.type = THREE.PCFShadowMap;
// 将three.js的生成的canvas添加到DOM中
// 必须要将渲染器添加到DOM中，否则画面是白的
document.getElementById('webgl-output').appendChild(webGLRenderer.domElement);

// 创建坐标轴
const axes = new THREE.AxesHelper(20);
scene.add(axes);

// mtl加载器 MTL文件是材质描述文件
// var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath('./assets/'); // 路径 loader上的方法
// 开始从URL中加载，并返回已加载的材质。
mtlLoader.load('car4.mtl', function (materials) {
  // 材质完成之后再导入obj
  materials.preload();
  // var objLoader = new THREE.OBJLoader();
  // 设置由 MTLLoader 载入的材质
  objLoader.setMaterials(materials);
  objLoader.setPath('./assets/');
  objLoader.load(
    'car4.obj',
    function (object) {
      //返回的是模型对象 基类为Object3D
      // car = object;
      object.children.forEach(function (item) {
        // 对象是否被渲染到阴影贴图中。默认值为false。
        item.castShadow = true;
      });
      // 表示对象局部位置的Vector3。默认值为(0, 0, 0)。
      object.position.z = -20;
      object.position.y = -5;

      scene.add(object);
      // 点光源 光照颜色、光照强度、表示从光源到光照强度为0的位置的距离、沿着光照距离的衰退量
      var pointLight = new THREE.PointLight(0xffffff, 1, 0, 0);
      // 点光源位置
      pointLight.position.set(-10, 20, -20);
      // 对象是否被渲染到阴影贴图中。默认值为false。
      pointLight.castShadow = true;
      // 把点光源添加到场景中
      scene.add(pointLight);

      // var light = new THREE.DirectionalLight(0xffffff, 0.5);
      // light.position.setScalar(100);
      // scene.add(light);
      // 用相机(camera)渲染一个场景(scene)或是其它类型的object。
      webGLRenderer.render(scene, camera);
      // self.car = car;

      // params.cb();
    },
    function () {
      console.log('progress');
    },
    function () {
      console.log('error');
    }
  );
});

// 点光源 光照颜色、光照强度、表示从光源到光照强度为0的位置的距离、沿着光照距离的衰退量
// var pointLight = new THREE.PointLight(0xccbbaa, 1, 0, 0);
// 点光源位置
// pointLight.position.set(-10, 20, -20);
// 对象是否被渲染到阴影贴图中。默认值为false。
// pointLight.castShadow = true;
// 把点光源添加到场景中
// scene.add(pointLight);

/*var dirLight = new THREE.DirectionalLight(0xccbbaa, 0.5, 100);
dirLight.position.set(-120, 500, -0);
dirLight.castShadow = true;

dirLight.shadow.mapSize.width = 1000;
dirLight.shadow.mapSize.height = 1000;

dirLight.shadow.camera.near = 2;
dirLight.shadow.camera.far = 1000;
dirLight.shadow.camera.left = -50;
dirLight.shadow.camera.right = 50;
dirLight.shadow.camera.top = 50;
dirLight.shadow.camera.bottom = -50;

scene.add(dirLight);*/
// 光源的基类
// var light = new THREE.AmbientLight(0xccbbaa, 0.1);
// scene.add(light);

// document.body.appendChild(webGLRenderer.domElement);

// function Ground() {
//     var meshBasicMaterial = new THREE.MeshLambertMaterial({
//         color: 0xff0000,
//         side: THREE.DoubleSide
//     });
//     var objLoader = new THREE.OBJLoader();

//     objLoader.setPath('./assets/');
//     objLoader.load('ground.obj', function (object) {
//         object.children.forEach(function (item) {
//             item.receiveShadow = true;
//         });
//         object.position.y = -5;

//         scene.add(object);

//     }, function () {
//         console.log('progress');
//     }, function () {
//         console.log('error');
//     });
// }

// document.body.addEventListener('keydown', function (e) {
//     // console.log(e.keyCode);
//     switch (e.keyCode) {
//         case 87: // w
//             car.run = true;
//             break;
//         case 65: // a
//             car.rSpeed = 0.02;
//             break;
//         case 68: // d
//             car.rSpeed = -0.02;
//             break;
//         case 32: // space
//             car.brake();
//             break;
//     }
// });

// document.body.addEventListener('keyup', function (e) {
//     switch (e.keyCode) {
//         case 87: // w
//             car.run = false;
//             break;
//         case 65: // a
//             car.rSpeed = 0;
//             break;
//         case 68: // d
//             car.rSpeed = 0;
//             break;
//         case 32: // space
//             car.cancelBrake();
//             break;
//     }
// });

// var car = new Car({
//     scene: scene,
//     cb: start,
//     light: pointLight
// });

// var ground;

// function start() {
//     ground = new Ground({
//         scene: scene
//     });

//     render();
// }

// function render() {
//     car.tick();

//     requestAnimationFrame(render);
//     webGLRenderer.render(scene, camera);
// }
