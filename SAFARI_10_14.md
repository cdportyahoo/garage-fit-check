# 10.14 Safari drag and room artwork

Native touchstart/touchmove/end/cancel listeners on the stable interaction overlay now handle finger dragging independently of mouse Pointer Events. During an active touch drag, the body is fixed at its existing viewport position, document scrolling is locked, and non-passive handlers prevent scrolling. Touch end/cancel, Reset, blur and page hiding restore the original styles and scroll coordinates. Mouse pointer capture remains separate. Safari device confirmation is still required.

127 minimal-DOM checks pass, including native car drag to the garage boundary, native cabinet resize, page-scroll lock, original scroll-position restoration, unrelated touch-end protection, cancellation, blur and Reset cleanup, along with presets, measurements and saved layouts.

New generated architectural room artwork includes a concrete floor, walls and garage-door threshold. Its floor rectangle is mapped to the measured interior. Cabinet artwork has a realistic wood top and charcoal drawer fronts. Both remain illustrations: collision and clearance calculations use the entered rectangles. Drawn fixtures and materials do not certify actual door travel, overhead, anchoring or structural conditions. Cabinet images fall back to previous vectors on load error; the room image falls back to the previous schematic floor.

New WebP assets are assets/garage-room-v2.webp and assets/cabinet-workbench-v1.webp, generated using the supplied 5.2 screenshot as a style reference. Main-site publishing remains subject to GitHub Pages deployment status; previews are available separately. New print appearance remains unverified.
