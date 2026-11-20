<!--
  Site-wide illustrated backdrop, drawn as SVG so every colour comes from a --bd-* token
  (assets/css/tokens.css) and can switch with a light/dark theme. Laid out on a 1920×1080
  canvas and cropped to cover the viewport, like the PNG it replaces.
-->
<template>
    <div class="backdrop" aria-hidden="true">
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="bd-wave" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1920" y2="0">
                    <stop offset="0" style="stop-color: var(--bd-wave-1)" />
                    <stop offset="0.45" style="stop-color: var(--bd-wave-2)" />
                    <stop offset="0.72" style="stop-color: var(--bd-wave-2)" />
                    <stop offset="1" style="stop-color: var(--bd-wave-3)" />
                </linearGradient>
                <linearGradient id="bd-streak" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="140" y2="-60">
                    <stop offset="0" style="stop-color: var(--bd-star); stop-opacity: 0.9" />
                    <stop offset="1" style="stop-color: var(--bd-star); stop-opacity: 0" />
                </linearGradient>
                <radialGradient id="bd-planet" cx="0.35" cy="0.35" r="0.75">
                    <stop offset="0" style="stop-color: var(--bd-planet-light)" />
                    <stop offset="1" style="stop-color: var(--bd-planet)" />
                </radialGradient>
                <linearGradient id="bd-rocket" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" style="stop-color: var(--bd-rocket-light)" />
                    <stop offset="1" style="stop-color: var(--bd-rocket)" />
                </linearGradient>
                <clipPath id="bd-planet-clip">
                    <circle cx="195" cy="160" r="85" />
                </clipPath>
            </defs>

            <!-- faint starfield, drifting slowly sideways; two copies side by side so the
                 drift loops without a seam. A few stars twinkle. -->
            <g class="stars-drift">
                <g v-for="offset in [0, 1920]" :key="offset" class="stars" :transform="`translate(${offset} 0)`">
                    <circle
                        v-for="(star, i) in stars"
                        :key="i"
                        :cx="star.x"
                        :cy="star.y"
                        :r="star.r"
                        :class="{ twinkle: star.twinkle }"
                        :style="star.twinkle ? { animationDelay: `${star.delay}s` } : undefined"
                    />
                </g>
            </g>

            <!-- an occasional shooting star across the upper sky -->
            <g class="shooting-star">
                <line x1="0" y1="0" x2="140" y2="-60" stroke="url(#bd-streak)" />
            </g>

            <!-- the wave ribbon -->
            <g class="wave" fill="none" stroke="url(#bd-wave)">
                <path v-for="(d, i) in waveLines" :key="i" :d="d" />
            </g>

            <!-- ringed planet with sparkles -->
            <g class="planet">
                <ellipse class="ring" cx="195" cy="160" rx="200" ry="38" transform="rotate(-22 195 160)" />
                <circle cx="195" cy="160" r="85" fill="url(#bd-planet)" />
                <g clip-path="url(#bd-planet-clip)" class="bands">
                    <path d="M100 110 q30 -14 60 0 t60 0 t60 0" />
                    <path d="M95 140 q25 12 50 0 t55 4 t70 -6" />
                    <path d="M100 175 q35 -12 70 2 t70 -4 t40 4" />
                    <path d="M110 205 q30 10 55 -2 t60 4 t50 -4" />
                </g>
                <path class="ring" d="M30 228 C 120 200, 300 120, 383 90" transform="rotate(0)" />
                <path class="sparkle" d="M295 42 l6 20 l20 6 l-20 6 l-6 20 l-6 -20 l-20 -6 l20 -6z" />
                <path class="sparkle" d="M64 146 l4 13 l13 4 l-13 4 l-4 13 l-4 -13 l-13 -4 l13 -4z" />
                <path class="sparkle" d="M298 222 l5 16 l16 5 l-16 5 l-5 16 l-5 -16 l-16 -5 l16 -5z" />
                <path class="sparkle sparkle-gold" d="M130 128 l3 9 l9 3 l-9 3 l-3 9 l-3 -9 l-9 -3 l9 -3z" />
                <path class="sparkle sparkle-gold" d="M248 186 l3 9 l9 3 l-9 3 l-3 9 l-3 -9 l-9 -3 l9 -3z" />
            </g>

            <!-- dashed orbit from the planet down to the rocket -->
            <g class="orbit">
                <path d="M252 292 C 330 300, 410 380, 392 470 C 370 580, 230 640, 190 760 C 165 840, 150 900, 176 965" />
                <circle cx="252" cy="292" r="17" />
                <circle cx="176" cy="965" r="17" />
            </g>

            <!-- rocket (outer group floats; the inner keeps its placement transform) -->
            <g class="rocket-float">
            <g class="rocket" transform="translate(395 905) rotate(-24)">
                <path class="fin" d="M60 -40 C 90 -95, 140 -110, 160 -100 C 130 -80, 110 -55, 100 -38 z" />
                <path class="fin" d="M60 40 C 90 95, 140 110, 160 100 C 130 80, 110 55, 100 38 z" />
                <path d="M-150 0 C -90 -50, 30 -62, 120 -45 L 135 0 L 120 45 C 30 62, -90 50, -150 0 z" fill="url(#bd-rocket)" />
                <path class="nose" d="M-150 0 C -120 -32, -85 -45, -60 -48 C -70 -20, -70 20, -60 48 C -85 45, -120 32, -150 0 z" />
                <path class="fin-tail" d="M118 -46 L 150 -30 L 150 30 L 118 46 C 128 20, 128 -20, 118 -46 z" />
                <path class="fin" d="M75 -8 C 120 -10, 160 -6, 175 0 C 160 6, 120 10, 75 8 z" />
                <circle class="window-rim" cx="-10" cy="0" r="24" />
                <circle class="window" cx="-10" cy="0" r="15" />
                <circle class="window-glint" cx="-15" cy="-5" r="5" />
            </g>
            </g>

            <!-- blob and squiggle -->
            <path class="blob-peach drift-a" d="M578 150 C 560 110, 600 100, 640 92 C 670 86, 676 60, 692 66 C 710 74, 700 120, 690 138 C 676 160, 640 150, 615 165 C 595 178, 588 168, 578 150 z" />
            <path class="squiggle drift-b" d="M1302 58 C 1270 50, 1258 82, 1268 104 C 1278 126, 1310 112, 1306 96 C 1300 76, 1262 102, 1268 128 C 1274 150, 1296 150, 1294 166" />

            <!-- graduation cap and diploma -->
            <g class="graduation">
                <!-- rolled diploma resting behind the cap -->
                <g transform="rotate(-18 1660 190)">
                    <rect class="diploma" x="1570" y="172" width="180" height="38" rx="19" />
                    <ellipse class="diploma-end" cx="1588" cy="191" rx="9" ry="19" />
                    <rect class="ribbon" x="1652" y="170" width="12" height="42" />
                </g>
                <!-- skull cap under the board -->
                <path class="cap-base" d="M1632 112 L 1632 166 C 1662 186, 1718 186, 1748 166 L 1748 112 z" />
                <!-- board: a square seen from above, with its thickness showing underneath -->
                <path class="cap-edge" d="M1580 96 L 1690 150 L 1800 96 L 1800 104 L 1690 158 L 1580 104 z" />
                <path class="cap-top" d="M1690 42 L 1800 96 L 1690 150 L 1580 96 z" />
                <!-- button, cord to the corner, and the tassel hanging off it -->
                <path class="tassel-cord" d="M1690 96 C 1730 92, 1770 92, 1794 100 L 1794 150" />
                <circle class="tassel" cx="1690" cy="96" r="6" />
                <g class="tassel-swing">
                    <circle class="tassel" cx="1794" cy="150" r="5" />
                    <path class="tassel" d="M1788 152 h12 l6 40 h-24 z" />
                </g>
            </g>

            <!-- working at the desk -->
            <g class="desk-scene">
                <!-- plant -->
                <path class="pot" d="M1438 818 h26 l-4 26 h-18 z" />
                <g class="leaves">
                <path class="leaf" d="M1450 818 C 1440 800, 1432 788, 1436 780 C 1450 790, 1454 805, 1450 818 z" />
                <path class="leaf" d="M1452 818 C 1458 798, 1468 786, 1474 784 C 1474 800, 1464 812, 1452 818 z" />
                </g>
                <!-- monitor and keyboard -->
                <rect class="monitor" x="1498" y="760" width="94" height="66" rx="4" />
                <path class="monitor-stand" d="M1535 826 h18 l4 18 h-26 z" />
                <rect class="keyboard" x="1552" y="834" width="56" height="8" rx="2" />
                <!-- desk -->
                <rect class="desk-top" x="1390" y="842" width="356" height="12" rx="2" />
                <rect class="drawers" x="1394" y="854" width="106" height="150" />
                <path class="drawer-line" d="M1394 890 h106 M1452 854 v150" />
                <path class="desk-leg" d="M1740 854 v150" />
                <!-- office chair, pulled out beside the desk and turned towards the monitor -->
                <path class="chair-frame" d="M1797 907 v62 M1765 984 l32 -14 l32 14 M1822 896 l6 -14" />
                <circle class="chair" cx="1765" cy="990" r="5" />
                <circle class="chair" cx="1829" cy="990" r="5" />
                <circle class="chair" cx="1797" cy="992" r="5" />
                <path class="chair" d="M1818 806 C 1824 798, 1840 800, 1842 812 L 1838 878 C 1836 888, 1824 890, 1820 882 z" />
                <rect class="chair" x="1762" y="894" width="70" height="13" rx="5" />
                <path class="chair-frame" d="M1778 872 h28 M1800 872 v22" />
            </g>
        </svg>
    </div>
</template>

<script setup lang="ts">
// Starfield: fixed pseudo-random positions (seeded, so server and client render the same
// stars and hydration matches). Most are static; every seventh one twinkles.
function seeded(seed: number) {
    return () => {
        seed = (seed * 16807) % 2147483647
        return seed / 2147483647
    }
}
const rand = seeded(7)
const stars = Array.from({ length: 90 }, (_, i) => ({
    x: Math.round(rand() * 1920),
    y: Math.round(rand() * 1080),
    r: +(0.7 + rand() * 1.1).toFixed(1),
    twinkle: i % 7 === 0,
    delay: +(rand() * 6).toFixed(1),
}))

// The wave ribbon: 26 lines that drift apart and cross over each other, like a twisted sheet.
// Generated once (it's static), rounded to keep the inline SVG small.
const LINES = 26
const STEP = 24
const TAU = Math.PI * 2

function centre(x: number) {
    return 520 - 190 * Math.sin((TAU * (x - 120)) / 1180) + 55 * Math.sin((TAU * x) / 520 + 1.2)
}

function spread(x: number) {
    return 150 * Math.cos((TAU * x) / 980 + 0.4)
}

const waveLines = Array.from({ length: LINES }, (_, i) => {
    const t = i / (LINES - 1)
    const pts: [number, number][] = []
    for (let x = -60; x <= 1980; x += STEP) {
        const y = centre(x + 260 * t) + (t - 0.5) * (200 + spread(x))
        pts.push([x, y])
    }
    // smooth through the points with quadratic curves between midpoints
    let d = `M${pts[0][0]} ${pts[0][1].toFixed(1)}`
    for (let p = 1; p < pts.length - 1; p++) {
        const [x, y] = pts[p]
        const [nx, ny] = pts[p + 1]
        d += `Q${x} ${y.toFixed(1)} ${(x + nx) / 2} ${((y + ny) / 2).toFixed(1)}`
    }
    return d
})
</script>

<style scoped>
.backdrop {
    position: fixed;
    inset: 0;
    z-index: -1;
    pointer-events: none;
}

svg {
    width: 100%;
    height: 100%;
    display: block;
}

.wave {
    stroke-width: 2.4;
    stroke-linecap: round;
    opacity: var(--bd-wave-opacity);
    transform-origin: 50% 50%;
    transform-box: view-box;
    animation: wave-breathe 14s ease-in-out infinite;
}

@keyframes wave-breathe {
    50% {
        transform: scaleY(0.94) translateY(8px);
    }
}

.stars circle {
    fill: var(--bd-star);
    /* a halo of the same colour makes the stars larger where the background is light */
    stroke: var(--bd-star);
    stroke-width: var(--bd-star-halo);
    stroke-opacity: 0.5;
    opacity: var(--bd-star-opacity);
}

.stars-drift {
    animation: star-drift 240s linear infinite;
}

@keyframes star-drift {
    to {
        transform: translateX(-1920px);
    }
}

/* travels down-left for a moment, then waits off-screen for the rest of the cycle */
.shooting-star {
    stroke-width: 2;
    stroke-linecap: round;
    opacity: 0;
    animation: shooting-star 14s ease-out 4s infinite;
}

@keyframes shooting-star {
    0% {
        opacity: 0;
        transform: translate(1380px, 70px);
    }
    2% {
        opacity: var(--bd-shooting-opacity);
    }
    7% {
        opacity: 0;
        transform: translate(1060px, 210px);
    }
    100% {
        opacity: 0;
        transform: translate(1060px, 210px);
    }
}

.stars .twinkle {
    animation: twinkle 6s ease-in-out infinite;
}

@keyframes twinkle {
    50% {
        opacity: calc(var(--bd-star-opacity) * 3);
    }
}

.ring {
    fill: none;
    stroke: var(--bd-ring);
    stroke-width: 12;
}

.bands path {
    fill: none;
    stroke: var(--bd-planet-band);
    stroke-width: 9;
    stroke-linecap: round;
    opacity: 0.75;
}

.sparkle {
    fill: var(--bd-sparkle);
}

.sparkle-gold {
    fill: var(--bd-ring-light);
}

.orbit path {
    fill: none;
    stroke: var(--bd-orbit);
    stroke-width: 6;
    stroke-dasharray: 26 18;
    stroke-linecap: round;
}

.orbit circle {
    fill: var(--bd-orbit);
}

.fin,
.fin-tail {
    fill: var(--bd-rocket-fin);
}

.nose {
    fill: var(--bd-rocket-nose);
}

.window-rim {
    fill: var(--bd-rocket-nose);
}

.window {
    fill: var(--bd-rocket-window);
}

.window-glint {
    fill: var(--bd-rocket-light);
    opacity: 0.8;
}

.blob-peach {
    fill: var(--bd-blob-peach);
}


.squiggle {
    fill: none;
    stroke: var(--bd-squiggle);
    stroke-width: 9;
    stroke-linecap: round;
}

.diploma,
.diploma-end {
    fill: var(--bd-diploma);
}

.diploma-end {
    filter: brightness(0.92);
}

.ribbon {
    fill: var(--bd-rocket-fin);
}

.cap-base {
    fill: var(--bd-cap);
}

.cap-top {
    fill: var(--bd-cap-light);
}

.cap-edge {
    fill: var(--bd-cap);
    filter: brightness(0.8);
}

.tassel {
    fill: var(--bd-tassel);
}

.tassel-cord {
    fill: none;
    stroke: var(--bd-tassel);
    stroke-width: 4;
}

.chair {
    fill: var(--bd-chair);
}

.chair-frame {
    fill: none;
    stroke: var(--bd-chair);
    stroke-width: 6;
    stroke-linecap: round;
}

.pot {
    fill: var(--bd-pot);
}

.leaf {
    fill: var(--bd-leaf);
}

.monitor {
    fill: var(--bd-monitor);
}

.monitor-stand {
    fill: var(--bd-desk);
}

.desk-top {
    fill: var(--bd-desk-top);
}

.drawers {
    fill: var(--bd-desk);
}

.drawer-line,
.desk-leg {
    fill: none;
    stroke: var(--bd-desk-top);
    stroke-width: 6;
}

.keyboard {
    fill: var(--bd-desk-top);
}

/* Idle motion for the objects, so they float in the same scene as the breathing wave.
   Each has its own period (none a multiple of another) so they never move in lockstep,
   and all move less than the wave does. The desk stays grounded except for the plant. */
.planet,
.graduation,
.rocket-float,
.drift-a,
.drift-b {
    transform-box: fill-box;
    transform-origin: 50% 50%;
    animation: float 11s ease-in-out infinite;
}

.graduation {
    animation-name: float-tilt;
    animation-duration: 13s;
    animation-delay: -4s;
}

.rocket-float {
    animation-name: rocket-bob;
    animation-duration: 7s;
}

.drift-a {
    animation-duration: 17s;
    animation-delay: -6s;
}

.drift-b {
    animation-duration: 19s;
    animation-delay: -11s;
}

@keyframes float {
    50% {
        transform: translateY(-10px);
    }
}

@keyframes float-tilt {
    50% {
        transform: translateY(-9px) rotate(2deg);
    }
}

@keyframes rocket-bob {
    50% {
        transform: translate(5px, -12px) rotate(-1.5deg);
    }
}

.sparkle {
    transform-box: fill-box;
    transform-origin: 50% 50%;
    animation: sparkle 5s ease-in-out infinite;
}

.sparkle:nth-of-type(2n) {
    animation-delay: -1.7s;
}

.sparkle:nth-of-type(3n) {
    animation-delay: -3.3s;
}

@keyframes sparkle {
    50% {
        transform: scale(0.7) rotate(20deg);
        opacity: 0.6;
    }
}

/* dashes flow along the orbit towards the rocket */
.orbit path {
    animation: orbit-flow 3s linear infinite;
}

@keyframes orbit-flow {
    to {
        stroke-dashoffset: -44;
    }
}

.tassel-swing {
    transform-box: view-box;
    transform-origin: 1794px 150px;
    animation: swing 4.5s ease-in-out infinite;
}

@keyframes swing {
    0%,
    100% {
        transform: rotate(5deg);
    }
    50% {
        transform: rotate(-5deg);
    }
}

.leaves {
    transform-box: view-box;
    transform-origin: 1451px 818px;
    animation: swing-small 6s ease-in-out infinite;
}

@keyframes swing-small {
    0%,
    100% {
        transform: rotate(3deg);
    }
    50% {
        transform: rotate(-3deg);
    }
}

@media (prefers-reduced-motion: reduce) {
    .stars-drift,
    .shooting-star,
    .stars .twinkle,
    .wave,
    .planet,
    .graduation,
    .rocket-float,
    .drift-a,
    .drift-b,
    .sparkle,
    .orbit path,
    .tassel-swing,
    .leaves {
        animation: none;
    }
}
</style>
