/**
 * /*
 *
 * @format
 * @Description:
 * @Version: 2.0
 * @Author: yangsen
 * @Date: 2022-03-09 21:19:44
 * @LastEditors: yangsen
 * @LastEditTime: 2022-03-21 19:57:48
 */

import * as THREE from 'three';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import mtlcar6 from '../assets/low-poly-car.mtl';
import objcar6 from '../assets/low-poly-car.obj';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let car;

// 创建场景
var scene = new THREE.Scene();
// 设置摄像机 OrthographicCamera是正交相机  PerspectiveCamera是透视相机
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 50);
// 设置相机的位置
camera.position.x = 10;
camera.position.y = 10;
camera.position.z = 10;
camera.speed = {
  z: 0,
  x: 0,
};
camera.lookAt(0, 0, 0);
// 添加相机辅助对象
scene.add(new THREE.CameraHelper(camera));
// 做一个更远的相机，来让这个添加辅助的相机能够看到，不然看到的就是相机视椎体的近截面的两条垂直的灰色的线
const camera1 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera1.position.set(20, 20, 20);
// console.log(scene.position); // scene.position默认位置在{x: 0, y: 0, z: 0}
// 创建渲染器
var renderer = new THREE.WebGLRenderer();
// 设置设备像素比。通常用于避免HiDPI设备上绘图模糊
// Window 接口的devicePixelRatio返回当前显示设备的物理像素分辨率与CSS像素分辨率之比
renderer.setPixelRatio(window.devicePixelRatio);
// 设置canvas画布大小
renderer.setSize(window.innerWidth, window.innerHeight);
// 设置颜色及其透明度
renderer.setClearColor(new THREE.Color(0x08c924), 1);
// 设置阴影贴图
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// 创建坐标轴
const axes = new THREE.AxesHelper(2000);
scene.add(axes);
// 创建地面几何体
const playground = new THREE.PlaneGeometry(50, 50);
// 创建地面材质
const materialGround = new THREE.MeshStandardMaterial({ color: 0xcccccc });
// 创建地面
const ground = new THREE.Mesh(playground, materialGround);
ground.position.set(0, 0, 0);
ground.rotateX(-Math.PI / 2);
// 接收阴影
ground.receiveShadow = true;
scene.add(ground);

// 创建一个正方体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(40, 0, 3);
cube.castShadow = true;
// cube.translateX(2);
// cube.translateZ(2);
scene.add(cube);

renderer.render(scene, camera1);
// mtl加载器 MTL文件是材质描述文件
const mtlLoader = new MTLLoader();
// mtlLoader.setPath('./assets/'); // 路径 loader上的方法 当你使用import引入静态资源之后，就不能用setPath方法了，否则就会报错出现两个http请求
// 开始从URL中加载，并返回已加载的材质。
mtlLoader.load(mtlcar6, function (materials) {
  console.log('mtl加载成功');
  materials.side = THREE.DoubleSide;
  // 材质完成之后再导入obj
  // materials.preload();
  var objLoader = new OBJLoader();
  // 设置由 MTLLoader 载入的材质
  objLoader.setMaterials(materials);
  objLoader.load(
    objcar6,
    function (object) {
      car = object;
      console.log('obj加载成功');
      console.dir(object);
      //返回的是模型对象 基类为Object3D
      object.children.forEach(function (item) {
        // 对象是否被渲染到阴影贴图中。默认值为false。
        item.castShadow = true;
      });
      // 表示对象局部位置的Vector3。默认值为(0, 0, 0)。
      object.position.x = 1;
      object.position.y = 0;
      object.position.z = 1;
      // 设置物体的旋转
      object.rotateY((Math.PI * 5) / 4);
      // 对象是否被渲染到阴影贴图中
      object.castShadow = true;
      scene.add(object);
      // 点光源 光照颜色、光照强度、表示从光源到光照强度为0的位置的距离、沿着光照距离的衰退量
      var pointLight = new THREE.PointLight(0xffffff, 1, 0, 0);
      // 点光源位置
      pointLight.position.set(0, 10, 0);
      // 对象是否被渲染到阴影贴图中。默认值为false。
      pointLight.castShadow = true;
      // 把点光源添加到场景中
      scene.add(pointLight);
      // 光源2
      var pointLight2 = new THREE.PointLight(0xffffff);
      // 点光源位置
      pointLight2.position.set(-1, 5, -3);
      // 对象是否被渲染到阴影贴图中。默认值为false。
      pointLight2.castShadow = true;
      pointLight2.target = cube;
      // 把点光源添加到场景中
      // scene.add(pointLight2);
      // 光源3
      var pointLight3 = new THREE.PointLight(0xffffff, 1, 0, 0);
      // 点光源位置
      pointLight3.position.set(5, 5, 0);
      // 对象是否被渲染到阴影贴图中。默认值为false。
      pointLight3.castShadow = true;
      // 把点光源添加到场景中
      // scene.add(pointLight3);
      // 光源4
      var pointLight4 = new THREE.PointLight(0xffffff, 1, 0, 0);
      // 点光源位置
      pointLight4.position.set(-5, 5, -5);
      // 对象是否被渲染到阴影贴图中。默认值为false。
      pointLight4.castShadow = true;
      // 把点光源添加到场景中
      // scene.add(pointLight4);
      // 光源5
      var pointLight5 = new THREE.PointLight(0xffffff, 1, 0, 0);
      // 点光源位置
      pointLight5.position.set(0, -5, 0);
      // 对象是否被渲染到阴影贴图中。默认值为false。
      pointLight5.castShadow = true;
      // 把点光源添加到场景中
      // scene.add(pointLight5);
      // 用相机(camera)渲染一个场景(scene)或是其它类型的object。 必须在这里给渲染器追加场景和相机，在外面添加会看不到模型
      renderer.render(scene, camera);
      // 平行光源;
      var light = new THREE.DirectionalLight(0xffffff, 0.5);
      light.position.set(1000, 5000, 1000);
      // scene.add(light);

      // self.car = car;
      // params.cb();
    },
    function () {
      console.log('progress');
    },
    function (err) {
      console.log(err);
    }
  );
});

// 一个canvas，渲染器在其上绘制输出。 必须要将渲染器添加到DOM中，否则画面是白的
document.getElementById('webgl-output').appendChild(renderer.domElement);
// 创建controls对象;
var controls = new OrbitControls(camera1, renderer.domElement);
// 监听控制器的鼠标事件，执行渲染内容
controls.addEventListener('change', () => {
  controls.target = car.position;
  renderer.render(scene, camera1);
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
