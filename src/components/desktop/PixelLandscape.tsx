import type { CSSProperties } from 'react'

const stars = [
  [116, 126, 3], [276, 72, 2], [446, 198, 2], [574, 95, 4], [702, 148, 2], [846, 65, 3],
  [982, 192, 2], [1136, 103, 3], [1285, 173, 2], [1370, 84, 4], [188, 294, 2], [370, 260, 3],
  [635, 318, 2], [782, 242, 4], [948, 295, 2], [1226, 278, 3], [1050, 355, 2], [504, 370, 2],
  [1320, 390, 2], [84, 410, 2], [716, 424, 2], [1174, 440, 2],
]

export default function PixelLandscape({ nightAmount }: { nightAmount: number }) {
  const style = { '--night': nightAmount } as CSSProperties

  return (
    <svg className="pixel-landscape" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Pixel art hills under a changing day and night sky" style={style}>
      <g className="day-layer">
        <rect width="1440" height="900" fill="#58b4e9" />
        <rect y="0" width="1440" height="128" fill="#83d0f1" />
        <rect y="128" width="1440" height="112" fill="#74c6ed" />
        <rect y="240" width="1440" height="112" fill="#69bfe9" />
        <rect y="352" width="1440" height="100" fill="#61b8e4" />

        <g className="sun-pixels">
          <rect x="1070" y="144" width="96" height="32" fill="#ffd970" opacity=".18" />
          <rect x="1082" y="156" width="72" height="12" fill="#ffe49a" opacity=".28" />
          <g fill="#ffe99a">
            <rect x="1104" y="170" width="24" height="8" />
            <rect x="1092" y="178" width="48" height="8" />
            <rect x="1084" y="186" width="64" height="52" />
            <rect x="1092" y="238" width="48" height="8" />
            <rect x="1104" y="246" width="24" height="8" />
            <rect x="1058" y="202" width="18" height="7" />
            <rect x="1156" y="202" width="18" height="7" />
            <rect x="1110" y="144" width="7" height="18" />
            <rect x="1110" y="258" width="7" height="18" />
          </g>
        </g>

        <g className="clouds">
          <g transform="translate(350 150)">
            <path fill="#b3e2f1" d="M8 48h24V32h20V16h32V8h32v8h24v16h16v24h12v20H0V56h8z" />
            <path fill="#fffdf4" d="M12 40h20V24h24V12h32V4h28v12h24v16h16v20h12v16H0V52h12z" />
            <rect x="26" y="68" width="104" height="7" fill="#d9f0f1" />
            <rect x="53" y="8" width="40" height="5" fill="#ffffff" />
          </g>
          <g transform="translate(760 280) scale(.82)">
            <path fill="#a5d9ee" d="M8 40h20V24h24V8h28V0h28v12h20v16h16v20h8v16H0V48h8z" />
            <path fill="#fffdf5" d="M8 34h20V18h24V4h28v-4h24v12h20v16h16v20h8v16H0V42h8z" />
            <rect x="21" y="58" width="92" height="6" fill="#d5edf1" />
          </g>
          <g transform="translate(1130 375) scale(.64)">
            <path fill="#acdced" d="M8 40h24V20h28V8h32V0h24v12h20v16h16v20h8v16H0V48h8z" />
            <path fill="#fffdf5" d="M8 34h24V16h28V4h32v-4h20v12h20v16h16v20h8v16H0V42h8z" />
            <rect x="23" y="58" width="82" height="6" fill="#d8eef2" />
          </g>
        </g>

        <path fill="#4d9658" d="M0 582h58v-10h48v-12h52v-14h58v-18h72v-14h76v-12h52v10h48v12h44v14h54v16h58v18h62v16h72v20h72v-14h62v-16h50v-17h48v-22h56v-20h62v-16h54v-10h48v10h54v12h60v16h52v18h52v20h66v18h56v14h52v-10h58v318H0z" />
        <path fill="#62aa5b" d="M0 666h62v-10h48v-14h54v-16h60v-18h72v-16h70v-12h54v10h44v14h48v18h58v20h62v18h74v20h80v-14h60v-16h52v-20h54v-18h56v-22h64v-16h62v-10h50v10h52v12h58v18h56v18h66v20h72v18h48v14h60v274H0z" />
        <path fill="#78bd63" d="M0 756h64v-12h50v-14h56v-18h64v-18h70v-16h68v-12h52v12h42v16h50v18h58v20h64v22h76v20h78v-14h62v-18h54v-22h58v-20h62v-18h66v-14h52v12h48v16h54v20h60v20h64v20h72v18h52v14h58v206H0z" />
        <path fill="#94ce70" d="M0 838h72v-10h54v-16h60v-18h68v-18h70v-16h66v-12h56v12h46v16h52v20h60v22h72v18h74v20h80v-16h62v-20h56v-20h58v-20h66v-16h62v-12h54v12h50v16h52v20h58v20h66v20h68v18h62v16h58v126H0z" />

        <g className="hill-texture" fill="#b6df7f">
          <rect x="170" y="762" width="28" height="6"/><rect x="202" y="756" width="10" height="6"/><rect x="356" y="728" width="34" height="6"/>
          <rect x="402" y="742" width="18" height="5"/><rect x="536" y="782" width="28" height="6"/><rect x="570" y="788" width="10" height="5"/>
          <rect x="660" y="820" width="32" height="6"/><rect x="894" y="770" width="30" height="5"/><rect x="932" y="764" width="12" height="6"/>
          <rect x="1080" y="710" width="26" height="6"/><rect x="1188" y="756" width="38" height="6"/><rect x="1292" y="810" width="22" height="5"/>
          <rect x="300" y="866" width="40" height="6"/><rect x="740" y="878" width="26" height="6"/><rect x="1018" y="850" width="32" height="5"/>
        </g>
        <g className="grass-pixels" fill="#d3e991">
          <rect x="240" y="820" width="4" height="14"/><rect x="248" y="814" width="4" height="20"/><rect x="256" y="822" width="4" height="12"/>
          <rect x="484" y="766" width="4" height="11"/><rect x="492" y="756" width="4" height="21"/><rect x="500" y="762" width="4" height="15"/>
          <rect x="1160" y="800" width="4" height="16"/><rect x="1168" y="790" width="4" height="26"/><rect x="1176" y="800" width="4" height="16"/>
        </g>
        <g className="tiny-flowers">
          <g transform="translate(324 776)"><rect x="7" y="0" width="5" height="5" fill="#fff1c0"/><rect x="2" y="5" width="5" height="5" fill="#f3a8b4"/><rect x="12" y="5" width="5" height="5" fill="#f3a8b4"/><rect x="7" y="10" width="5" height="5" fill="#f7d16e"/><rect x="7" y="15" width="5" height="13" fill="#4e9654"/></g>
          <g transform="translate(1000 774)"><rect x="6" y="0" width="5" height="5" fill="#f4d779"/><rect x="1" y="5" width="5" height="5" fill="#fff4cf"/><rect x="11" y="5" width="5" height="5" fill="#fff4cf"/><rect x="6" y="10" width="5" height="5" fill="#e9a3b4"/><rect x="6" y="15" width="5" height="12" fill="#4e9654"/></g>
        </g>
      </g>

      <g className="night-layer">
        <rect width="1440" height="900" fill="#0d183b" />
        <rect y="0" width="1440" height="128" fill="#14234c" />
        <rect y="128" width="1440" height="112" fill="#192d59" />
        <rect y="240" width="1440" height="112" fill="#203861" />
        <rect y="352" width="1440" height="100" fill="#294368" />
        {stars.map(([x, y, size], index) => (
          <g className={`twinkle twinkle-${index % 5}`} key={`${x}-${y}`} fill={index % 4 === 0 ? '#fff5c9' : '#d9e8ff'}>
            <rect x={x} y={y} width={size} height={size} />
            {size >= 4 && <><rect x={x + 1} y={y - 4} width="2" height="12"/><rect x={x - 3} y={y + 1} width="10" height="2"/></>}
          </g>
        ))}
        <g className="moon-pixels">
          <path fill="#ffedaf" d="M1120 154h18v-8h28v8h18v12h12v18h8v30h-8v20h-12v12h-18v8h-28v-8h-18v-12h-10v-20h-8v-30h8v-18h10z" />
          <rect x="1130" y="176" width="10" height="8" fill="#e7d184"/><rect x="1122" y="184" width="8" height="8" fill="#e7d184"/>
          <rect x="1164" y="205" width="14" height="10" fill="#e7d184"/><rect x="1178" y="213" width="8" height="8" fill="#e7d184"/>
          <rect x="1142" y="232" width="10" height="6" fill="#fff4c5"/><rect x="1152" y="226" width="8" height="6" fill="#fff4c5"/>
        </g>

        <path fill="#293f4d" d="M0 582h58v-10h48v-12h52v-14h58v-18h72v-14h76v-12h52v10h48v12h44v14h54v16h58v18h62v16h72v20h72v-14h62v-16h50v-17h48v-22h56v-20h62v-16h54v-10h48v10h54v12h60v16h52v18h52v20h66v18h56v14h52v-10h58v318H0z" />
        <path fill="#2f5949" d="M0 666h62v-10h48v-14h54v-16h60v-18h72v-16h70v-12h54v10h44v14h48v18h58v20h62v18h74v20h80v-14h60v-16h52v-20h54v-18h56v-22h64v-16h62v-10h50v10h52v12h58v18h56v18h66v20h72v18h48v14h60v274H0z" />
        <path fill="#386a4b" d="M0 756h64v-12h50v-14h56v-18h64v-18h70v-16h68v-12h52v12h42v16h50v18h58v20h64v22h76v20h78v-14h62v-18h54v-22h58v-20h62v-18h66v-14h52v12h48v16h54v20h60v20h64v20h72v18h52v14h58v206H0z" />
        <path fill="#467b53" d="M0 838h72v-10h54v-16h60v-18h68v-18h70v-16h66v-12h56v12h46v16h52v20h60v22h72v18h74v20h80v-16h62v-20h56v-20h58v-20h66v-16h62v-12h54v12h50v16h52v20h58v20h66v20h68v18h62v16h58v126H0z" />
        <g fill="#70a66c" opacity=".82">
          <rect x="170" y="762" width="28" height="6"/><rect x="356" y="728" width="34" height="6"/><rect x="536" y="782" width="28" height="6"/>
          <rect x="660" y="820" width="32" height="6"/><rect x="894" y="770" width="30" height="5"/><rect x="1080" y="710" width="26" height="6"/>
          <rect x="1188" y="756" width="38" height="6"/><rect x="740" y="878" width="26" height="6"/><rect x="1018" y="850" width="32" height="5"/>
        </g>
        <g fill="#9abe75" opacity=".78">
          <rect x="240" y="820" width="4" height="14"/><rect x="248" y="814" width="4" height="20"/><rect x="256" y="822" width="4" height="12"/>
          <rect x="484" y="766" width="4" height="11"/><rect x="492" y="756" width="4" height="21"/><rect x="500" y="762" width="4" height="15"/>
          <rect x="1160" y="800" width="4" height="16"/><rect x="1168" y="790" width="4" height="26"/><rect x="1176" y="800" width="4" height="16"/>
        </g>
      </g>
    </svg>
  )
}
