import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')


// Scene
const scene = new THREE.Scene()

// Fog
const fog_background_color = "#262837"
const fog = new THREE.Fog(fog_background_color,1,25)
scene.fog=fog
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')


const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')


// bricksColorTexture.repeat.set(8,8)
// bricksAmbientOcclusionTexture.repeat.set(8,8)
// bricksNormalTexture.repeat.set(8,8)
// bricksRoughnessTexture.repeat.set(8,8)

// bricksColorTexture.wrapS = 2
// bricksAmbientOcclusionTexture.wrapS = 2
// bricksNormalTexture.wrapS = 2
// bricksRoughnessTexture.wrapS = 2

// bricksColorTexture.wrapT = THREE.RepeatWrapping
// bricksAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
// bricksNormalTexture.wrapT = THREE.RepeatWrapping
// bricksRoughnessTexture.wrapT = THREE.RepeatWrapping

// bricksColorTexture.offset = 1
// bricksAmbientOcclusionTexture.offset = 1
// bricksNormalTexture.offset = 1
// bricksRoughnessTexture.offset = 1

const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')

grassColorTexture.repeat.set(8,8)
grassAmbientOcclusionTexture.repeat.set(8,8)
grassNormalTexture.repeat.set(8,8)
grassRoughnessTexture.repeat.set(8,8)

grassColorTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping

const glassColorTexture = textureLoader.load('/textures/glass/color.jpg')
const glassAmbientOcclusionTexture = textureLoader.load('/textures/glass/aùbientOcclusion.jpg')
const glassNormalTexture = textureLoader.load('/textures/glass/normal.jpg')
const glassHeightTexture = textureLoader.load('/textures/glass/height.png')
const glassMetalnessTexture = textureLoader.load('/textures/glass/metalness.jpg')
const glassRoughnessTexture = textureLoader.load('/textures/glass/roughness.jpg')







/**
 * House
 */


 const house = new THREE.Group()

 scene.add(house)
 
 const walls = new THREE.Mesh(
     new THREE.BoxGeometry(6,3,6),
     new THREE.MeshStandardMaterial({
        map:bricksColorTexture,
        normalMap:bricksNormalTexture,
        transparent:true,
        aoMap:bricksAmbientOcclusionTexture,
        roughness:bricksRoughnessTexture
    })
 )



 walls.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
     )

 walls.position.y = walls.geometry.parameters.height / 2
 walls.position.z = 1
 house.add(walls)
 

 const tower1 = new THREE.Mesh(
    new THREE.BoxGeometry(4,8,4),
    new THREE.MeshStandardMaterial({
       map:bricksColorTexture,
       normalMap:bricksNormalTexture,
       transparent:true,
       aoMap:bricksAmbientOcclusionTexture,
       roughness:bricksRoughnessTexture
   })
)

tower1.position.y = tower1.geometry.parameters.height / 2
tower1.position.x = tower1.geometry.parameters.width + 1
house.add(tower1)

const windowMaterial = new THREE.MeshStandardMaterial()
windowMaterial.metalness = 0.45
windowMaterial.roughness = 0.45
windowMaterial.map = glassColorTexture
windowMaterial.aoMap = glassAmbientOcclusionTexture
windowMaterial.aoMapIntensity = 0.1
windowMaterial.displacementMap = glassHeightTexture
windowMaterial.displacementScale = 0.01
windowMaterial.roughnessMap = glassRoughnessTexture
// windowMaterial.metalness = glassMetalnessTexture
// windowMaterial.normalMap = glassNormalTexture
// windowMaterial.normalScale.set(0.5,0.5)
// windowMaterial.transparent = true
gui.add(windowMaterial, 'aoMapIntensity').min(0).max(1).step(0.001)
// gui.add(windowMaterial, 'metalness').min(0).max(1).step(0.001)
gui.add(windowMaterial, 'roughness').min(0).max(1).step(0.001)




const window1 = new THREE.Mesh(
    new THREE.PlaneGeometry(1.2,1.2),
    windowMaterial

)

const window2 = new THREE.Mesh(
    new THREE.PlaneGeometry(1.2,1.2),
    windowMaterial

)

const window3 = new THREE.Mesh(
    new THREE.PlaneGeometry(1.2,1.2),
    windowMaterial

)

const window4 = new THREE.Mesh(
    new THREE.PlaneGeometry(1.2,1.2),
    windowMaterial

)

const window5 = new THREE.Mesh(
    new THREE.PlaneGeometry(1.2,1.2),
    windowMaterial

)

const window6 = new THREE.Mesh(
    new THREE.PlaneGeometry(1.2,1.2),
    windowMaterial

)

const window7 = new THREE.Mesh(
    new THREE.PlaneGeometry(1.2,1.2),
    windowMaterial

)

const window8 = new THREE.Mesh(
    new THREE.PlaneGeometry(1.2,1.2),
    windowMaterial

)

const window9 = new THREE.Mesh(
    new THREE.PlaneGeometry(1.2,1.2),
    windowMaterial

)

const window10 = new THREE.Mesh(
    new THREE.PlaneGeometry(1.2,1.2),
    windowMaterial

)

const window11 = new THREE.Mesh(
    new THREE.PlaneGeometry(1.2,1.2),
    windowMaterial

)

const window12 = new THREE.Mesh(
    new THREE.PlaneGeometry(1.2,1.2),
    windowMaterial

)


window1.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(window1.geometry.attributes.uv.array, 2)
     )
window1.position.set(5,1.5,-2)
window1.rotation.y = Math.PI

window2.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(window1.geometry.attributes.uv.array, 2)
     )
window2.position.set(5,4,-2)
window2.rotation.y = Math.PI

window3.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(window1.geometry.attributes.uv.array, 2)
     )
window3.position.set(5,6.5,-2)
window3.rotation.y = Math.PI


window4.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(window1.geometry.attributes.uv.array, 2)
     )
window4.position.set(-5,1.5,-2)
window4.rotation.y = Math.PI

window5.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(window1.geometry.attributes.uv.array, 2)
     )
window5.position.set(-5,4,-2)
window5.rotation.y = Math.PI

window6.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(window1.geometry.attributes.uv.array, 2)
     )
window6.position.set(-5,6.5,-2)
window6.rotation.y = Math.PI



// Facade porte

window7.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(window1.geometry.attributes.uv.array, 2)
     )
window7.position.set(5,1.5,2)

window8.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(window1.geometry.attributes.uv.array, 2)
     )
window8.position.set(5,4,2)

window9.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(window1.geometry.attributes.uv.array, 2)
     )
window9.position.set(5,6.5,2)


window10.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(window1.geometry.attributes.uv.array, 2)
     )
window10.position.set(-5,1.5,2)

window11.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(window1.geometry.attributes.uv.array, 2)
     )
window11.position.set(-5,4,2)

window12.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(window1.geometry.attributes.uv.array, 2)
     )
window12.position.set(-5,6.5,2)

// gui.add(window1.position, 'x').min(0).max(5).step(0.01)
// gui.add(window1.position, 'y').min(0).max(5).step(0.01)
// gui.add(window1.position, 'z').min(-5).max(5).step(0.01)


house.add(window1, window2, window3, window4, window5, window6, window7, window8, window9, window10, window11, window12)

const tower2 = new THREE.Mesh(
    new THREE.BoxGeometry(4,8,4),
    new THREE.MeshStandardMaterial({
       map:bricksColorTexture,
       normalMap:bricksNormalTexture,
       transparent:true,
       aoMap:bricksAmbientOcclusionTexture,
       roughnessMap:bricksRoughnessTexture,
       roughness:0.8
   })
)

tower2.position.y = tower2.geometry.parameters.height / 2
tower2.position.x = - tower2.geometry.parameters.width - 1
house.add(tower2)




 const roof = new THREE.Mesh(
    new THREE.ConeGeometry(4.5,1,4),
    new THREE.MeshStandardMaterial({
        color: '#b35f45'
    })
 )

 roof.position.y = walls.geometry.parameters.height + roof.geometry.parameters.height /2
 roof.rotation.y = Math.PI * 0.25
 roof.position.z = 1

 house.add(roof)

 const roof2 = new THREE.Mesh(
    new THREE.ConeGeometry(3.5,6,4),
    new THREE.MeshStandardMaterial({
        color: '#b35f45'
    })
 )

 roof2.position.x = tower1.geometry.parameters.width + 1
 roof2.position.y = tower1.geometry.parameters.height + roof2.geometry.parameters.height /2
 roof2.rotation.y = Math.PI * 0.25


 house.add(roof2)

 const roof3 = new THREE.Mesh(
    new THREE.ConeGeometry(3.5,6,4),
    new THREE.MeshStandardMaterial({
        color: '#b35f45'
    })
 )

 roof3.position.x = - tower1.geometry.parameters.width - 1
 roof3.position.y = tower1.geometry.parameters.height + roof2.geometry.parameters.height /2
 roof3.rotation.y = Math.PI * 0.25


 house.add(roof3)

 // Door

 const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2,2.2, 100, 100),
    new THREE.MeshStandardMaterial({
        map:doorColorTexture,
        transparent:true,
        alphaMap:doorAlphaTexture,
        aoMap:doorAmbientOcclusionTexture,
        displacementMap:doorHeightTexture,
        displacementScale:0.1,
        normalMap:doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture

        
    })
 )


 door.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
     )

 door.position.set(0,1,walls.geometry.parameters.width * 0.5+1.01)

 house.add(door)

 // Bushes

 const bushGeometry = new THREE.SphereBufferGeometry(1,16,16)
const bushMaterial = new THREE.MeshStandardMaterial(
    {
        color: '#89c854'
    }
)

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5,0.5,0.5)
bush1.position.set(0.8,0.2,walls.geometry.parameters.width *0.65 +0.8)
const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25,0.25,0.25)
bush2.position.set(1.3,0.2,walls.geometry.parameters.width *0.65 + 0.9)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4,0.4,0.4)
bush3.position.set(-1.2,0.2,walls.geometry.parameters.width *0.65 +0.8)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15,0.15,0.15)
bush4.position.set(-1.5,0.1,walls.geometry.parameters.width *0.65 +1)




house.add(bush1, bush2, bush3, bush4)

// Graves

const graves = new THREE.Group()

scene.add(graves)

const graveGeometry = new THREE.BoxGeometry(0.6,0.8,0.2)
const graveMaterial = new THREE.MeshStandardMaterial({
    color: '#828282'
})

for (let i = 0; i < 80; i++) {
    
    const angle = Math.random() * Math.PI *2
    const radius = walls.geometry.parameters.width + 2 + Math.random() * 12

    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius

    const grave = new THREE.Mesh(graveGeometry, graveMaterial)
    grave.position.set(x,0.3,z)

    grave.rotation.y = (Math.random() - 0.5) * 0.4
    grave.rotation.z = (Math.random() - 0.5) * 0.4
    grave.castShadow = true
    graves.add(grave)
    
}

 
 

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 40),
    new THREE.MeshStandardMaterial({ 
        map:grassColorTexture,
        normalMap:grassNormalTexture,
        aoMap:grassAmbientOcclusionTexture,
        roughnessMap:grassRoughnessTexture,
        roughness:0.8
     })
)

floor.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
     )

floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.52)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

// Door light
const doorLight = new THREE.PointLight('#ff7d46',0.8,7)
doorLight.position.set(0,2.2,4.3)
house.add(doorLight)




// Ghosts

const ghost1 = new THREE.PointLight('#ff00ff', 1.5,5)
scene.add(ghost1)

const ghost2 = new THREE.PointLight('#00ffff', 1.5,5)
scene.add(ghost2)

const ghost3 = new THREE.PointLight('#ffff00', 1.5,5)
scene.add(ghost3)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// const camera = new THREE.PerspectiveCamera( 45, sizes.width / sizes.height, 1, 1000 );

camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(fog_background_color)


/**
 * Shadows
 */

moonLight.castShadow = true
doorLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

walls.castShadow = true
bush1.castShadow = true
bush2.castShadow = true
bush3.castShadow = true
bush4.castShadow = true

floor.receiveShadow = true
walls.receiveShadow = true

doorLight.shadow.mapSize.width = 256
doorLight.shadow.mapSize.height = 256
doorLight.shadow.camera.far = 7 

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 7 

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 7 

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 7 


renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

/**
 * Controls with keyboard
 */

//  document.addEventListener('keydown', (event) => {

//     if(event.code === "ArrowUp" ) {
//         camera.position.x -= 0.05*Math.cos(camera.rotation.x)
//         camera.position.z -= 0.05*Math.cos(camera.rotation.x)

//     }
//     if(event.code === "ArrowDown" ) {
//         console.log("up")
//     }
//     if(event.code === "ArrowLeft" ) {
//         console.log("up")
//     }
//     if(event.code === "ArrowRight" ) {
//         console.log(camera)
//     }

//     if(event.code === "KeyD" ) {
//         console.log(camera)
//         camera.rotation.y -= 0.05

//     }


//     if(event.code === "KeyA" ) {
//         console.log(camera)
//         camera.rotation.y += 0.05
//     }



//     console.log(event.code)
//  });



/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update Ghosts
    const ghost1Angle = elapsedTime * 0.25
    ghost1.position.x = Math.cos(ghost1Angle) *18
    ghost1.position.z = Math.sin(ghost1Angle) *18
    ghost1.position.y = Math.abs(Math.sin(ghost1Angle *3))

    const ghost2Angle = elapsedTime * 0.45
    ghost2.position.x = Math.cos(ghost2Angle) *(8 + Math.sin(elapsedTime+0.7))
    ghost2.position.z = Math.sin(ghost2Angle) *(8 + Math.sin(elapsedTime+0.4))
    ghost2.position.y = Math.abs(Math.sin(ghost2Angle *3))

    const ghost3Angle = - elapsedTime * 0.15
    ghost3.position.x = Math.cos(ghost3Angle) *(9 + Math.sin(elapsedTime + 0.3))
    ghost3.position.z = Math.sin(ghost3Angle) *(9 + Math.sin(elapsedTime + 0.2))
    ghost3.position.y = (Math.sin(ghost3Angle *3))


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()