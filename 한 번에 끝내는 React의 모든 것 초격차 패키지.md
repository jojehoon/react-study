* JSX는 `React.createElement`의 표현식
* Babel이 JSX를 JavaScript Compiler

```
<script type="text/babel">
const rootElement = document.getElementById('root')
const props = { className: 'title', 'children': 'hello, world' }
// const element = React.createElement('h1', { className: 'title', children: 'hello world'}, 'hello world')
const element = <h1 className={props.className} children={props.children} />
// or
const element = <h1 {...props} />
ReactDOM.render(element, rootElement)
</script>
```

* **props**는 변경 금지, 순수 함수
* **state**는 직접 수정 금지
  * 리렌더링이 되지 않을 수 있음


### useState
**함수형 업데이트**로 성능 최적화가 가능하다

* 객체 state를 업데이트 하기 위해서는 불변성을 지키면서 업데이트 해야한다 {...state, new}
```
const [number, setNumber] = useState(0)

const onIncrease () => {
  setNumber((prevNumber) => prevNumber + 1)
}
```


### useRef
* 특정 DOM 선택하기
* useRef로 관리하는 변수는 업데이트 되어도 컴포넌트가 리렌더링 되지 않는다

### useEffect
* componentDidMount
* componentWillUnmount
```
useEffect(() => {
  // componentDidMount 로직
  // props -> state
  // REST API
  // D3 Video.js
  // setInterval, setTimeout
  return () => {
    // componentWillUnmount 로직
    // clearInterval, clearTimeout
    // 라이브러리 인스턴스 제거
  }
}, [])
```

#### 컴포넌트가 렌더링하는 것을 막기
* 다른 컴포넌트에 의해 렌더링 될 때 컴포넌트 자체를 숨길 때, 렌더링 결과를 출력하는 대신 `null`을 반환하면 해결


## 리스트와 Key
* Key는 React가 어떤 항목을 변경, 추가 또는 삭제할지 식별
* key는 엘리먼트에 안정적인 고유성을 부여하기 위해 배열 내부의 엘리먼트에 지정
* 렌더링 한 항목에 대한 안정적인 ID가 없다면 최후의 수단으로 항목의 인덱스를 key로 사용
  * 항목의 순서가 바뀔 수 있는 경우 key에 인덱스를 사용하는 것은 비권장
  * 성능이 저하되거나 컴포넌트의 state와 관련된 문제가 발생 야기
* 리스트 항목에 명시적으로 key를 지정하지 않으면 React는 기본적으로 인덱스를 key로 사용


### Effect Hook
컴포넌트 안에서 데이터를 가져오거나 구독하고, DOM을 직접 조작하는 등의 일련의 동작은 Side Effects 라고 한다
이것은 다른 컴포넌트에 영향을 줄 수도 있고, 렌더링 과정에서는 구현할 수 없는 작업이기 때문이다
* `useEffect` Hook은 `componentDidMount`, `componentDidUpdate`, `componentWillUnmount` 의 API를 통합
* React는 DOM 렌더링 한 후에 `effect` 함수를 실행
* `effect`는 함수 컴포넌트 안에 선언되어있기 때문에 props와 state에 접근 가능
* `effect`를 해제할 필요가 있다면, 해제하는 함수(cleanup)를 반환 하고, 이는 선택적 (optional) 이다
* `useEffect`를 컴포넌트 안에서 불러내기 때문에 컴포넌틍l state, props에 접근 가능
* `useEffect`는 컴포넌트 렌더링 이후 매번 수행 된다
  * `useEffect`가 수행되는 시점에 이미 DOM이 업데이트 되었음을 보장
  
#### Clean-up
* 네트워크 리퀘스트, DOM 수동 조작, 로깅등은 정리(clean-up)가 필요 없는 경우
* 외부 데이터에 구독을 설정해야 하는 경우 메모리 누수가 발생하지 않도록 정리(clean-up)하는 것은 매우 중요하다
* `useEffect`에서 clean-up 함수를 반환하는 이유는 구독의 추가와 제거를 하나의 effect로 구성하는 것이다

### Hook 사용 규칙
* Hook JavaScript 함수이지만, 두 가지 규칙을 준수해야 한다
  * 최상위에서만 Hook을 호출
    * 반복문, 조건문, 중첩된 함수 내에서 Hook 함수를 실행하면 안된다
  * React 함수 컴포넌트에서만 Hook 함수를 호출
    * 일반 JavaScript 함수에서 Hook 호출해서는 안된다
    * Custom Hook에서는 Hook 호출 가능
    * 함수 컴포넌트는 `this`를 가질 수 없다
* 일반적으로 일반 변수는 함수가 끝날 때 사라지지만, state 변수는 React에 의해 사라지지 않는다
* Hook은 항상 `use` 키워드로 시작한다


### Custom Hook
* Custom Hook은 기능이라기 보다는 컨벤션에 가깝다
* `use`로 시작하고, 안에서 다른 Hook을 호출 한다면 그 함수를 Custom Hook 이라 할 수 있다
* `useSomething` 이라는 네이밍 컨벤션은 린터 플러그인이 Hook을 인식하고 버그를 찾을 수 있게 해준다


### useContext
* 컴포넌트를 중첩하지 않고 React Context를 구독


### useReducer
* 복잡한 컴포넌트들의 state를 reducer로 관리