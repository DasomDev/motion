<script setup>
// node_modules
import { ref, onMounted, nextTick } from "vue"

// makes_modules
import { gsap } from "gsap"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"

gsap.registerPlugin(MotionPathPlugin)

// data
const jsonText = ref(null)
const animationData = ref({
  points: [
    { x: 100, y: 100 },
    { x: 300, y: 200 },
  ],
  motionType: "line",
  curviness: 1.5,
  ease: "power2.inOut",
  duration: 2,
})

const animatedObject = ref(null)

const canvasWidth = ref(600)
const canvasHeight = ref(300)

const curveDirection = ref("left")

const jsonOutput = ref(null)

// mounted
onMounted(async () => {
  await nextTick()
  // updateUI()
})

const addPoint = () => {
  animationData.value.points.push({ x: 0, y: 0 })
  updateUI()
}

const removePoint = (index) => {
  animationData.points.splice(index, 1)
  updateUI()
}

const animateObject = async () => {
  await resetPosition()
  const { motionType, curviness, ease, duration, points } = animationData.value

  let motionPathData
  if (motionType === "line") {
    motionPathData = {
      path: points,
      type: "line",
      autoRotate: true,
    }
  } else if (motionType === "curve") {
    // 곡선의 제어점 계산

    const p1 = points[0]
    const p2 = points[1]
    const curveControlPoint = getCurveControlPoints(
      p1,
      p2,
      curviness,
      curveDirection.value
    )

    motionPathData = {
      path: [
        { x: points[0].x, y: points[0].y },
        { x: curveControlPoint.x, y: curveControlPoint.y },
        { x: points[1].x, y: points[1].y },
      ],
      type: "curve", // cubic 타입 (곡선)
      curviness: curviness,
      autoRotate: true,
    }
  }

  gsap.to(animatedObject.value, {
    duration: duration,
    motionPath: motionPathData,
    ease: ease,
  })
  jsonText.value = {
    duration: duration,
    motionPath: motionPathData,
    ease: ease,
  }
}

const getCurveControlPoints = (p1, p2, curviness, direction) => {
  const midX = (p1.x + p2.x) / 2
  const midY = (p1.y + p2.y) / 2

  // 두 점을 잇는 직선의 법선 벡터 계산
  const dx = p2.x - p1.x
  const dy = p2.y - p1.y
  let normalX = -dy
  let normalY = dx

  // 우곡선일 경우 방향 반대로 설정
  console.log(direction, "direction?")
  if (direction === "right") {
    normalX *= -1
    normalY *= -1
  }

  // 정규화
  const length = Math.sqrt(normalX * normalX + normalY * normalY)
  const unitX = normalX / length
  const unitY = normalY / length

  // 곡선 깊이 적용
  return {
    x: midX + unitX * curviness * 50,
    y: midY + unitY * curviness * 50,
  }
}

const exportJSON = () => {
  jsonOutput.value = JSON.stringify(jsonText.value, null, 2)
}

const resetPosition = async (type) => {
  if (type === "zero") {
    gsap.to(animatedObject.value, {
      duration: 0,
      x: 0,
      y: 0,
    })
    return
  }

  gsap.to(animatedObject.value, {
    duration: 0,
    x: animationData.value.points[0].x,
    y: animationData.value.points[0].y,
  })
}

const setPoints = async () => {
  if (animationData.motionType === "line") {
    animatedObject.value.points = [
      { x: 100, y: 100 },
      { x: 300, y: 200 },
    ]
    animatedObject.value.points = [
      { x: 100, y: 100 },
      { x: 300, y: 200 },
    ]
  }
}
</script>
<template>
  <div class="flex flex-col items-center p-10 h-full w-[1000px] mx-auto">
    <div class="text-[22px] font-bold h-10">GSAP 애니메이션 설정</div>

    <div
      class="border border-[#000] relative"
      :style="{
        width: `${canvasWidth}px`,
        height: `${canvasHeight}px`,
      }"
    >
      <span class="absolute bottom-full right-full">(0,0)</span>
      <span class="absolute top-full left-full"
        >({{ canvasWidth }},{{ canvasHeight }})</span
      >
      <div
        v-for="(p, index) in animationData.points"
        :key="`target-point-${index}`"
        class="bg-[#000] w-2 h-2 rounded-full absolute z-[99999]"
        :style="{
          top: `${p.y + 12}px`,
          left: `${p.x + 12}px`,
        }"
      >
        <span class="absolute top-full text-[12px]">{{
          index === 0 ? "start" : "end"
        }}</span>
      </div>
      <svg
        class="w-full h-full absolute top-0 left-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="gray"
              stroke-width="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <div ref="animatedObject" class="bg-[#825feb] w-8 h-8 rounded-full"></div>
    </div>

    <div class="flex flex-col gap-2 w-full p-10 h-full">
      <div class="flex border border-[#000] h-full">
        <div
          class="w-[100px] flex items-center justify-center border-r border-[#000]"
        >
          캔버스 사이즈
        </div>
        <div class="p-2 flex gap-4">
          <div class="flex flex-col gap-2">
            <div class="flex gap-4 items-center">
              <div>너비:</div>
              <input
                class="h-8 px-2 rounded border border-[#000] w-[80px]"
                type="number"
                v-model="canvasWidth"
                min="100"
              />px
            </div>
            <div class="flex gap-4 items-center">
              <div>높이:</div>
              <input
                class="h-8 px-2 rounded border border-[#000] w-[80px]"
                type="number"
                v-model="canvasHeight"
                min="100"
              />px
            </div>
          </div>
        </div>
      </div>
      <div class="border border-[#000] flex h-full">
        <div
          class="border-r border-[#000] w-[100px] flex items-center justify-center"
        >
          이동 방식:
        </div>
        <div class="p-2 flex flex-col gap-2">
          <div class="flex gap-4 items-center">
            <div>이동 속성:</div>
            <select
              class="border border-[#000] rounded h-8 w-[100px] px-2"
              v-model="animationData.motionType"
              @change="setPoints"
            >
              <option value="line">직선 이동</option>
              <option value="curve">곡선 이동</option>
            </select>
          </div>
          <div
            v-if="animationData.motionType === 'curve'"
            class="flex flex-col gap-2"
          >
            <div class="flex gap-4 items-center">
              곡선 방향:
              <select
                class="border border-[#000] rounded h-8 w-[100px] px-2"
                v-model="curveDirection"
              >
                <option value="left">좌곡선</option>
                <option value="right">우곡선</option>
              </select>
            </div>
            <div class="flex gap-4 items-center w-full">
              <div>곡률 조정:</div>
              <input
                class="flex w-[300px]"
                type="range"
                v-model="animationData.curviness"
                min="0"
                max="3"
                step="0.1"
                value="1.5"
              />
              {{ animationData.curviness }}
            </div>
          </div>
        </div>
      </div>
      <div class="border border-[#000] flex h-full">
        <div
          class="border-r border-[#000] w-[100px] flex items-center justify-center"
        >
          애니메이션
        </div>
        <div class="p-2 flex flex-col gap-2">
          <div class="flex gap-4 items-center">
            <div class="w-[100px]">Ease 선택:</div>
            <select
              class="border border-[#000] rounded h-8 w-[150px] px-2"
              v-model="animationData.ease"
            >
              <option value="linear">linear</option>
              <option value="power1.inOut">power1.inOut</option>
              <option value="power2.inOut">power2.inOut</option>
              <option value="elastic.out">elastic.out</option>
            </select>
          </div>
          <div class="flex gap-4 items-center">
            <div class="w-[100px]">지속 시간 (초):</div>
            <input
              class="border border-[#000] rounded h-8 w-[100px] px-2"
              type="number"
              v-model="animationData.duration"
              min="0.5"
              step="0.1"
              value="2"
            />
          </div>
        </div>
      </div>
      <div class="border border-[#000] flex h-full">
        <div
          class="border-r border-[#000] w-[100px] flex items-center justify-center"
        >
          이동 좌표
        </div>
        <div class="p-2 flex flex-col gap-2">
          <div
            v-for="(p, index) in animationData.points"
            :key="`point-${index}`"
            class="flex gap-2"
          >
            <div class="flex gap-2 items-center">
              X:
              <input
                class="border border-[#000] rounded h-8 w-[100px] px-2"
                type="number"
                min="0"
                :max="canvasWidth"
                v-model="p.x"
              />
            </div>
            <div class="flex gap-2 items-center">
              Y:
              <input
                class="border border-[#000] rounded h-8 w-[100px] px-2"
                type="number"
                min="0"
                :max="canvasHeight"
                v-model="p.y"
              />
            </div>
          </div>
          <!-- <button
            class="bg-[#d9d9d9] rounded border border-[#000] px-4"
            @click="addPoint()"
          >
            좌표 추가
          </button> -->
        </div>
      </div>
      <div class="flex gap-2">
        <button class="w-1/3 bg-[#d9d9d9] rounded h-8" @click="animateObject()">
          재생
        </button>
        <button
          class="w-1/3 bg-[#d9d9d9] rounded h-8"
          @click="resetPosition('zero')"
        >
          원점으로 돌아가기
        </button>
        <button class="w-1/3 bg-[#d9d9d9] rounded h-8" @click="exportJSON()">
          JSON 내보내기
        </button>
      </div>
      <textarea
        class="border border-[#000] rounded resize-none h-[200px] overflow-y-auto p-4"
        v-model="jsonOutput"
      />
    </div>
  </div>
</template>
