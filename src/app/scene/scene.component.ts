import { Component, OnInit } from '@angular/core';
import {ElementRef, Injectable, NgZone, OnDestroy, ViewChild} from '@angular/core';

import {
  BoxBufferGeometry,
  Color,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  AmbientLight
} from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss']
})
export class SceneComponent implements OnInit {

  //three variable
   private canvas: HTMLCanvasElement;
   private renderer: WebGLRenderer;
   private camera: PerspectiveCamera;
   private scene: Scene;
   private light: AmbientLight;
   private geometry:BoxBufferGeometry;
   private material: MeshBasicMaterial;
   private cube: Mesh;
   private frameId: number = null

   @ViewChild('rendererCanvas', { static: true })
  public rendererCanvas: ElementRef<HTMLCanvasElement>;

  constructor(private ngZone: NgZone) { }

  async ngOnInit() {
    await this.createScene(this.rendererCanvas).catch((err) => {
      console.error(err);
    });;
    //this.animate();
  }

  public async createScene(canvas: ElementRef<HTMLCanvasElement>){
    this.scene = new Scene();
    this.scene.background = new Color('skyblue');

    this.canvas = canvas.nativeElement;

    const fov = 35; // AKA Field of View
    const aspect = this.canvas.clientWidth / this.canvas.clientHeight;
    const near = 0.1; // the near clipping plane
    const far = 100; // the far clipping plane

    this.camera = new PerspectiveCamera(fov, aspect, near, far);

    // every object is initially created at ( 0, 0, 0 )
    // move the camera back so we can view the scene
    this.camera.position.set(0,0,10);

    // create a geometry
    this.geometry = new BoxBufferGeometry(2,2,2);

    // create a default (white) Basic material
    this.material = new  MeshBasicMaterial();

    // create a Mesh containing the geometry and material
    this.cube = new Mesh(this.geometry, this.material);

    // add the mesh to the scene
    this.scene.add(this.cube);

    // create the renderer
    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      alpha: true,    // transparent background
      antialias: true // smooth edges
    });
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.renderer.render(this.scene, this.camera);

  }

}
