# Browser

# 1강

- Window size
  1. Window.screen : 모니터의 크기를 나타낸다. // window.screenWidth , window.screenHeight
  2. Window.outer : 검색창, 스크롤바를 등을 포함한 크기를 나타낸다. // window.outerWidth , window.outerHeight
  3. Window.inner : 검색창, 스크롤바를 제외한 크기를 나타낸다. // window.innerWidth , window.innerHeight
  4. document.documentElement.client : 검색창, 스크롤바를 제외하고 문서의 크기를 나타낸다. //document.documentElement.clientWidth, document.documentElement.clientHeight
- event.coordinates

  1. event.page : event객체의 좌표를 페이지를 기준으로 정해진다. 즉 문서의 전체 크기 기준
  2. event.screen : event객체의 좌표를 브라우저 좌표를 기준으로 정해진다. 즉 눈에 보이는 좌표

- scroll event

  1. scrollTo(x,y) : 어디에 위치하든 x,y 좌표로 이동하는 메서드이다.
  2. scrollBy(x,y) : 현재 위치에서 x,y 좌표 만큼 이동하는 메서드이다.
  3. DOMElement.scrollIntoView({option}) : 어디에 있든 해당 요소로 위동하는 메서드이다.

- load event
  1. load : 페이지에 필요한 모든 요소(css,javascript,image) 등이 모두 준비되었을때 호출되는 event이다.
  2. DOMContentLoaded : html만 준비되어도 호출되는 메서드이다.
  3. <script defer> : html이 모두 parsing 되면 호출되는 메서드로 가장 빠르게 호출된다.
