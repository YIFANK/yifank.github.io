---
layout: page
title: AquaGen
description: Interactive Aquarium Generated From Text
img: assets/img/aquarium/titleimage.jpg
importance: 1
category: work
permalink: /projects/aquagen/
---

# AquaGen: Interactive Aquarium Generated From Text

_Exploring generative modeling, physics-based animation, and real-time interaction in a unified creative experience_

---
_This is a final project for MIT's Computer Graphics Class (6.4400). It was ranked Top 3 out of 46 projects in the class._

**Authors:**  
_Dingning Cao, Yifan Kang_  
_Massachusetts Institute of Technology (MIT)_

**Demo Video:** [Watch the live-captured demo](https://drive.google.com/file/d/1SzuI6lRO2Jmws41mYrak4jIVwIUq3ZLh/view?usp=sharing)

---

## 🔍 Motivation

We aim to create a highly customizable, interactive virtual aquarium where users can generate and animate any fish from a simple text or image prompt. This project merges generative modeling, physics-based animation, and real-time interaction into a unified creative experience.

However, realizing this vision presents key challenges:

- **Diffusion-generated 3D models** produce richly detailed assets, but their dense and unstructured meshes are difficult to animate or deform physically
- **Traditional hand-authored animations** lack physically realistic secondary motion—subtle movements like fin swaying or body jiggle—unless supplemented by computationally intensive physics simulations
- **Standard 3D animation pipelines** involve complex and specialized steps including modeling, rigging, and simulation, typically requiring a team of artists

Our project addresses these gaps by introducing a fully automated pipeline that empowers users to generate and animate fish models in an interactive scene with minimal technical overhead.

---

{% include figure.liquid path="assets/img/aquarium/titleimage.jpg" title="Pre-rendered scene using sea creatures generated through our proposed pipeline" class="img-fluid rounded z-depth-1" %}

## 🛠️ Technical Approach

### Model Generation Pipeline

Our pipeline enables customized fish animation through a four-stage process:

{% include figure.liquid path="assets/img/aquarium/pipeline.png" title="The 4 stages of AquaGen Pipeline" class="img-fluid rounded z-depth-1" %}

1. **Text-to-Image Generation**: Users begin with either a natural image or a prompt, which is turned into a stylized fish image via [Nano-Banana Pro](https://github.com/nanobanana2025)
2. **3D Model Synthesis**: The resulting image is processed by [Hunyuan3D 2.5](https://github.com/lai2025hunyuan3d) to synthesize a textured 3D model
3. **Tetrahedral Meshing**: The mesh is converted into a tetrahedral format using TetWild. We optimized parameters (envelope: `b/1500`, ideal edge length: `b/25`) to balance geometric detail preservation and mesh density
4. **Physics-Based Animation**: Fast Complementary Dynamics simulates realistic secondary motion on the tetrahedral mesh using a linear blend skinning–based eigenmode solver. Affine handles are attached to each fish model to allow direct user interaction

### Complementary Dynamics

Complementary dynamics provides a method to augment rigged animations with detailed elastodynamics. The displacement field can be described as:

\[u = u^r + u^c\]

where \(u^r\) is the prescribed rigged motion and \(u^c\) is the secondary motion computed through physics simulation.

We used the approach from [Fast Complementary Dynamics via Skinning Eigenmodes](https://github.com/benchekroun2023FastComplemDynamics), which approximates secondary motion using a low-dimensional subspace of **skinning eigenmodes** \(B\), such that \(u^c \approx Bz\). This enables real-time performance by solving in a reduced basis rather than the full mesh space.

We also introduced a **secondary motion scale** parameter (0 to 1) to control the strength of secondary motion added to the model.

### Shader and Scene Setup

#### Underwater Lighting and Caustic Effects

Our fragment shader combines physically based shading, animated caustics, gradient backgrounds, and distance fog to approximate the appearance of an underwater environment. The base color uses a Blinn-Phong model:

\[I = I_a + I_d + I_s\]

with ambient, diffuse, and specular components modulated by material coefficients.

#### Animated Caustics

Caustics are produced using a horizontal texture atlas of \(N\) frames, animated by advancing the frame index and warping UVs with drift and wobble effects. Bright caustic values are added to the material:

\[I_{\text{final}} = I_{\text{surf}} + 0.15 \cdot C \cdot \mathbf{c}_{\text{tint}}\]

#### Underwater Fog

We approximate depth attenuation using linear fog in eye space, creating realistic distance-based color fading.

#### Bubble Particle System

We generate underwater bubbles as a particle system using instanced sphere meshes. Bubbles spawn randomly at ocean floor level and rise with randomized velocities, respawning when they reach the surface.

---

## 📊 Results

{% include figure.liquid path="assets/img/aquarium/results1.png" title="Nine models created through the AquaGen pipeline: from text to interactive model" class="img-fluid rounded z-depth-1" %}

{% include figure.liquid path="assets/img/aquarium/scene.png" title="Aquarium scene with bubble particle effect, water caustics, distance fogging, and 3D modeled rocks and ocean floor" class="img-fluid rounded z-depth-1" %}

{% include figure.liquid path="assets/img/aquarium/results2.png" title="Aquarium scene that supports secondary motion and translation, rotation, scaling for every fish. Rendered on Macbook 2020 Intel Chip computing 146,377 vertices and 553,127 tets in the scene total" class="img-fluid rounded z-depth-1" %}

### Interactive Controls

| Key / Input | Action |
|------------|--------|
| `g` | Toggle Gizmo transform mode (translate / rotate / scale) |
| `s` | Save current fish positions to `fish_positions.json` |
| `l` | Load fish positions from `fish_positions.json` |

---

## 🔬 Technical Highlights

- **Real-time Performance**: Successfully rendered 146,377 vertices and 553,127 tetrahedra in real-time on a Macbook 2020 Intel Chip
- **Automated Pipeline**: End-to-end generation from text prompt to interactive 3D model
- **Physics-Based Animation**: Realistic secondary motion computed using reduced-space eigenmode solver
- **Interactive Scene**: Full user control over fish positioning, rotation, and scaling with affine handles
- **Visual Effects**: Custom underwater shaders with animated caustics, fog, and particle systems

---

## 🚀 Future Work

We plan to extend the system with:

- **Automatic Rigging**: Integration of automatic rigging techniques (e.g., [UniRig](https://github.com/zhang2025unirig)) to generate fish animation and further enhance scene dynamics
- **Material-Aware Segmentation**: Implement material-aware mesh segmentation, using the `secondary_motion_scale` parameter to modulate deformation across different regions
- **Physical Fabrication**: Support physical fabrication by assigning 3D printing materials based on simulation parameters, enabling realistic, multi-material prints

---

## 💡 Key Takeaways

- Successfully synthesized over ten high-quality fish models through an automated pipeline
- Addressed technical challenges including gizmo handle implementation, secondary motion computation, and aquarium scene integration
- Demonstrated the feasibility of building a fully interactive, physically-driven animation pipeline
- Created a system that enables users to generate and animate custom 3D models with minimal technical overhead

---

## 📚 Related Work

This project draws from prior works in:
- **3D Content Creation**: [Hunyuan3D](https://github.com/lai2025hunyuan3d) for high-fidelity textured mesh generation
- **Text-to-Image**: [Nano-Banana Pro](https://github.com/nanobanana2025) for flexible text-to-image synthesis
- **Meshing**: Fast Tetrahedral Meshing in the Wild for robust volumetric representations
- **Dynamics**: Fast Complementary Dynamics via Skinning Eigenmodes for real-time secondary motion
- **Rendering**: Water caustics simulation for dynamic underwater effects

---

**Course:** MIT Computer Graphics (6.839)  
**Year:** 2025

