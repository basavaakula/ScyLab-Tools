LOGOS README
===============

This file explains how to add official brand logos to the documentation site. For legal and trademark reasons, the repository does not include official logos. Follow these steps to add them locally:

1. Download official vector logos (SVG) for each project from their official sites or brand resources pages:
   - VTK: https://vtk.org/ (look for brand/logo resources)
   - Qt: https://www.qt.io/ (brand resources)
   - WebAssembly / Emscripten: use the WebAssembly logo from https://webassembly.org/ and Emscripten from https://emscripten.org/
   - HDF5: HDF Group brand resources at https://www.hdfgroup.org/

2. Save the SVG files into this folder (`docs/assets/`) using the exact filenames below so the docs page will automatically use them (otherwise the site uses bundled fallback badges):

   - `vtk_logo.svg`
   - `qt_logo.svg`
   - `wasm_logo.svg` (WebAssembly / Emscripten)
   - `hdf5_logo.svg`

3. Keep the files as SVG (vector) for best rendering and scaling.

4. Attribution and license:
   - Check each project's brand or trademark policy before use. Some logos have restrictions for commercial use or require attribution.
   - Prefer linking to the official brand pages if you redistribute the docs publicly.

5. Once the files are placed here, the intro page (`docs/index.md`) will render them automatically; if a file is missing, the site falls back to a neutral badge.

If you'd like, I can add a small script to validate the presence and dimensions of these files, or produce a downloadable ZIP of recommended placeholder logos for internal use.
