/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        library390: { min: '391px' },
        library1200: { min: '1200px' },
        aiMobile1280: { min: '1280px' }, // 렌딩페이지 연구실 섹션에서 사용됨
        laboratoryMain1480: { min: '1480px' }, // 기획오더: 크게해달라! -> 영상이 준비되지 않아서 임시로 스케일로 했음 맥북
        // 13인치에서 스크롤이 발생하지 않도록 분기처리
        laboratoryMain1920: { min: '1920px' },
        laboratoryMain2560: { min: '2560px' },
        wqhd: { min: '2560px' },
        laboratoryMain3018: { min: '3008px' },
        laboratoryMain6026: { min: '6026px' },
        laptop13: { max: '1470px' },
        laptop15: { max: '1680px' },
        above1921: { min: '1921px', max: '3007px' },
      },
      colors: {
        identity: '#3D228D',
        identity_tint: '#805EE8',
        lavender: '#E5DCFF',
      },
      borderColor: {
        'custom-gray': 'rgba(0, 0, 0, 0.5)',
      },
      letterSpacing: {
        tightest: '-0.26px',
      },
    },
  },
  plugins: [],
}
