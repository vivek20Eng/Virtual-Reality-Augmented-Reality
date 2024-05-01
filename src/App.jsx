import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
<script src="https://aframe.io/releases/1.5.0/aframe.min.js"></script>
AFRAME.registerComponent('change-color-on-hover', {
  schema: {
    color: {default: 'red'}
  },

  init: function () {
    var data = this.data;
    console.log(data,"change--");
    var el = this.el;  // <a-box>
    var defaultColor = el.getAttribute('material').color;

    el.addEventListener('mouseenter', function () {
      el.setAttribute('color', data.color);
    });

    el.addEventListener('mouseleave', function () {
      el.setAttribute('color', defaultColor);
    });
    // Wait for model to load.
    this.el.addEventListener('model-loaded', () => {
      // Grab the mesh / scene.
      const obj = this.el.getObject3D('mesh');
      // Go over the submeshes and modify materials we want.
      obj.traverse(node => {
        if (node.name.indexOf('ship') !== -1) {
          node.material.color.set('red');
        }
      });
    });
      
  }
});
function App() {
  
  const [count, setCount] = useState(0);
  AFRAME.registerPrimitive("a-ocean", {
    // Attaches the `ocean` component by default.
    // Defaults the ocean to be parallel to the ground.
    defaultComponents: {
      ocean: {},
      rotation: { x: -90, y: 0, z: 0 },
    },

    // Maps HTML attributes to the `ocean` component's properties.
    mappings: {
      width: "ocean.width",
      depth: "ocean.depth",
      density: "ocean.density",
      color: "ocean.color",
      opacity: "ocean.opacity",
    },
  });
  return (
    <>
    <a-scene background="color: #ECECEC" inspector="url: http://localhost:3333/dist/aframe-inspector.js" avatar-replayer="spectatorMode: true">
    <a-assets>
    <a-entity
  text="value: Hello, A-Frame!; color: #BBB"
  position="-0.9 0.2 -3"
  scale="1.5 1.5 1.5"></a-entity>
    <audio src="https://cdn.aframe.io/basic-guide/audio/backgroundnoise.wav" autoplay
      preload></audio>
  </a-assets>
    <a-assets>
    <a-asset-item id="cityModel" src="https://cdn.aframe.io/test-models/models/glTF-2.0/virtualcity/VC.gltf"></a-asset-item>
  </a-assets>
  <a-entity gltf-model="#cityModel" modify-materials></a-entity>
</a-scene>
      <a-scene physics>
        <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9" change-color-on-hover="color: blue"></a-box>
        <a-entity cursor="rayOrigin: mouse"></a-entity>
        <a-scene avatar-recorder></a-scene>
        <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
        <a-cylinder
          position="1 0.75 -3"
          radius="0.5"
          height="1.5"
          color="#FFC65D"
        ></a-cylinder>
        <a-plane
          position="0 0 -4"
          rotation="-90 0 0"
          width="4"
          height="4"
          color="red"
        ></a-plane>
        {/* <a-sky position="1 0.75 -3" color="#ECECEC"></a-sky> */}

        <a-box
          position="-1 4 -3"
          rotation="0 45 0"
          color="yellow"
          dynamic-body
          event-set__enter="_event: mouseenter; color: #8FF7FF"
          event-set__leave="_event: mouseleave; color: #4CC3D9"
        ></a-box>

        <a-plane
          light="type: point"
          position="0 0 -4"
          rotation="-90 0 0"
          width="4"
          height="4"
          color="blue"
          static-body
        ></a-plane>
        {/* <a-sky color="gray"></a-sky> */}
        <a-ocean color="aqua" depth="100" width="100"></a-ocean>
        <a-entity cursor="rayOrigin: mouse"></a-entity>
        <a-camera><a-cursor></a-cursor></a-camera>

        <a-entity foo="bar: 5; baz: bazValue"></a-entity>
        <a-entity light="type: point; color: green"></a-entity>
      </a-scene>

      {/* <a-scene> */}
    <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"
           event-set__enter="_event: mouseenter; color: #8FF7FF"
           event-set__leave="_event: mouseleave; color: #4CC3D9" animation__position="property: object3D.position.y; to: 2.2; dir: alternate; dur: 2000; loop: true"
           animation__mouseenter="property: scale; to: 2.3 2.3 2.3; dur: 300; startEvents: mouseenter"
           animation__mouseleave="property: scale; to: 2 2 2; dur: 300; startEvents: mouseleave"></a-box>

    {/* <a-camera>
      <a-cursor></a-cursor>
    </a-camera>
  </a-scene> */}
    </>
  );
}

export default App;
