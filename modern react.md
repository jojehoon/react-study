### 설치
`npx create-react-app <appName> . --template typescript`
 
* `ReactDOM`
  * rootDOM의 render 역할
  * 브라우저에 있는 실제 DOM 내부에 React 컴포넌트를 렌더링
* APP 
 
React Fragment
별도의 Element를 생성하지 않음
 
 
### JSX 규칙
* 태그는 꼭 닫기
  * 두 개 이상의 태그는 무조건 하나의 태그로 감싸기
  * (Fragment <></> 브라우저 상에서 따로 별도의 엘리먼트로 나타나지 않음)
* JSX 내부에 자바스크립트 변수
  * {} 으로 감싸기
* JSX 에서 style 과 CSS class
  * 인라인 스타일은 객체 형태로 작성 & camelCase 형태로 네이밍
  * class는 className= 으로 설정
* 주석
  * `{/* 안보이는 주석 */}`
  * `/* 보이는 주석 */`
  * `// 인라인 주석`
 
 
### Props
* properties의 줄임말
* 여러개의 Props는 비구조화 할당으로 간결하게 작성
* 상위 컴포넌트에서 하위 컴포넌트로 데이터 전달
* `defaultProps`로 기본값 설정
* `props.children`으로 컴포넌트 태그 사이의 값을 조회
 
### 조건부 렌더링
* JSX 에서 null, false, undefined 를 렌더링하게 된다면 아무것도 나타나지 않음
* 보여주고 숨기고의 단순한 처리라면 && 연산자를 사용해서 처리
* props 이름만 작성하고 값을 생략한다면 `true`로 간주
 
 
### 함수형 컴포넌트에서 상태 관리
* `useState` Hooks 사용
  * 첫번째 원소는 현재 State
  * 두번째 원소는 Setter 함수
* 함수형 업데이트
  * **Setter 함수의 인자로 함수를 전달**(update 함수)
  * 컴포넌트 최적화 목적으로 사용
 
 
### Input 상태 관리
* 이벤트 핸들러에서 이밴트 객체를 매개변수로 받아와 사용
 
 
### 여러개의 input 상태 관리
* 객체를 수정할 때는 직접 수정 하면 안된다 (불변성)
* 새로운 객체를 만들어서 새로운 객체에 변화를 주고, 이를 상태로 사용한다
* 불변성을 지켜주어야만 리액트 컴포넌트에서 상태의 업데이트를 감지하고 필요한 리렌더링이 진행
  * `inputs[name] = value` 같은 기존 state를 직접 수정하면, 값을 바꿔도 리렌더링 되지 않음
* 리액트에서는 불변성을 지켜주어야만 컴포넌트 업데이트 성능 최적화가 가능
```js
const onChange = (e) => {
  const { name, value } = e.target;

  const nextInputs = {
    ...inputs,     // 불변성
    [name]: value  // computed property
  }

  setInputs(nextInputs)
}
```

 
### useRef로 특정 DOM 선택
* `ref`로 DOM 접근
* 함수형 컴포넌트에서는 `ref` 사용시 `useRef` Hook 사용
* 클래스형 컴포넌트에서는 Callback 함수나 `React.createRef` 함수 사용
 
### 배열 렌더링하기
* 동적인 배열을 렌더링 할 때는 자바스크립트 배열 빌트인 함수 `map()` 사용
* 배열을 렌더링 할 때에는 `key` 라는 props 를 설정 (고유값)`key`
 * `key`는 배열의 상태가 업데이트의 최적화에 필요
 
### useRef로 컴포넌트 안의 변수 만들기
* `useRef` Hook으로 컴포넌트 안에서 조회 및 수정 할 수 있는 변수 관리
* `useRef`로 관리하는 변수는 값이 업데이트 되어도 컴포넌트가 리렌더링 되지 않음
* `useRef`로 관리하는 변수는 설정 후 바로 조회 가능
* 변수를 사용하여 다음과 같은 값을 관리
 * `setTimeout`, `setInterval` 을 통해 만들어진 id
 * 외부 라이브러리를 사용하여 생성된 인스턴스
 * scroll 위치
* `useRef`로 넘긴 인자가  `.current`의 기본값으로 설정
 * 수정할 때는 `.current` 값을 수정
 * 조회할 때는 `.current` 값을 조회
 
### 배열에 항목 추가
* 배열을 추가 할 때는 객체와 마찬가지로 불변성을 지켜야 한다
* `push`, `splice`, `sort`와 같은 함수를 사용하면 안된다
* `spread` 연산자나`concat` 함수를 사용하여 배열을 추가
 
### 배열에 항목 제거
* 배열의 항목을 제거할 때는 추가할 때와 마찬가지로 불변성을 지켜야 한다
* `filter` 함수 사용
 
### 배열 항목 수정
* 배열의 항목을 수정할 때는 불변성 유지
* `map` 함수 사용
 
### useEffect로 mount/unmount/update 설정
* `useEffect(func, [deps])`
* `useEffect`가 리턴하는 함수를 **cleanup 함수**라고 한다
* `uesEffect`에서 사용되는 의존값(state, props)가 있다면 `deps`에 넣어주는 것이 규칙
* `deps`에 의존값을 넣지 않는다면, `useEffect`에 등록한 함수가 실행 될 때 업데이트 된 의존값을 가르키지 않게 된다
 
* **deps 배열** 빈배열
 * 컴포넌트가 최초 마운트 되었을 때만 `useEffect`에 등록한 함수가 호출 (componentDidMount)
 * 컴포넌트가 사라질 때 cleanup 함수 호출 (componentWillUnmount)
* **deps 배열** 의존값
 * 컴포넌트가 최초 마운트 되었을 때 호출 (componentDidMount)
 * 의존값이 업데이트 되었을 때 호출 (componentDidUpdate)
 * 컴포넌트가 언마운트 때 호출, 값이 변경 되기 전에 호출 (componentWillUnmount)
* **deps 배열** 없음
 * 컴포넌트가 리렌더링 될 때 마다 호출
 
* Mount
 * `props`로 받은 값을 컴포넌트의 로컬 상태로 설정
 * 외부 API 요청 (RSET API 등)
 * 라이브러리 사용 (D3, Video.js 등...)
 * setInterval을 통한 반복작업 혹은 setTimeout을 통한 작업 예약
* Unmount
 * setInterval, setTimeout으로 등록한 작업들 초기화(clearInterval, clearTimeout)
 * 라이브러리 인스턴스 제거
 
 
### useMemo으로 연산한 값 재사용하기
* `useMemo(func, [deps])`
* 성능 최적화 목적으로 연산된 값응ㄹ `useMemo` Hook으로 재사용
* memo는 **memoized**의 약자로, 이전에 계산 한 값을 재사용 한다는 의미
* `useMemo(연산할 함수, 의존성 배열)`
 * 의존성 배열이 업데이트 될 때만 함수가 실행
 * 그렇지 않다면 이전의 값을 재사용
```js
const count = useMemo(() => countActiveUsers(users), [users]);
```
 
### useCallback으로 함수 재사용하기
* `useCallback(func, [deps])`은 함수를 새로 만들지 않고 재사용하고 싶을 때 사용
* `useCallback` 함수 안에서 사용되는 의존값이 있다면, 반드시 `deps` 배열에 포함
 * `deps` 배열에 의존값을 포함하지 않으면, `useCallback`에서 최신 의존값 참조를 보장해주지 않음
 * props로 받아온 함수가 있다면, 이 또한 `deps`로 지정
* `useCallback`은 `useMemo`을 기반으로 구성됨
 * `useMemo(() => () => { /**/ }, [deps])`
* 컴포넌트 렌더링 최적화 작업을 해주어야만 성능이 최적화
*  `setState`를 `useCallback`으로 최적화 할 때는 `setState`에 함수형 업데이트로 최적화를 진행하고, `useCallback`의 의존성은 빈 배열로 지정
 
### React.memo로 컴포넌트 리렌더링 방지
* `React.memo(컴포넌트, propsAreEqaul(prevProps, nextProps) => ...)`는 컴포넌트의 props가 바뀌지 않는다면, 리렌더링을 방지하여 성능 최적화
* state 관리 시 함수형 업데이트를 하면 최신 state를 참조하기 때문에 `useCallback`의 `deps`에 의존값을 넣지 않아도 됨
* 렌더링 최적화를 하지 않을 컴포넌트에 사용하는 것은 불필요한 props만 비교 및 버그 야기
* `useCallback`, `useMemo`, `React.memo`는 컴포넌트의 성능을 실제로 개선할 수 있는 상황에서만 사용할 것
 
 
### userReducer로 state 업데이트 로직 분리
* state 관리 Hooks에는 `useState`와 `useReducer`가 있다
* `useReducer` Hook은 state 관리 로직을 컴포넌트에서 분리
  * 상태 업데이트 로직을 컴포넌트 밖으로 분리 가능
* `reducer`란 현재 state와 action 객체(type 값을 가진)를 매개변수로 받아와서 새로운 state를 반환 해주는 함수
* `reducer` 상태를 업데이트 하는 함수
* `action` 객체를 기반으로 상태를 업데이트
  * `type` 키를 기반으로 어떤 업데이트를 진행할 것인지 명시
```js
const reducer = (state, action) => {
 // 새로운 상태를 만드는 로직
 // const nextState = ...
 return nextState
}
```
* `const [state, dispatch] = useReducer(reducer, initialState)`
 * `dispatch({ type: 'SOME_NAME })`는 action을 발생시키는 함수
* `useState`의 setter를 여러번 사용해야 하는 일이 발생하면 `useReducer`를 고려
```js
const [number, dispatch] = useReducer(reducer(state, action), 0)

```
 
### Custom Hooks 만들기
* 반복되는 로직을 커스텀 Hooks로 만들어 재사용
* `src/hooks/`
* use라는 키워드로 시작하는 파일을 만들고 그 안에 함수를 작성
```js
// useInputs
import { useState, useCallback } from 'react';

function useInput(initialForm) {
  const [form, setForm] = useState(initialForm);
  const onChange = useCallback(e => {
    const { name, value } = e.targe;
    setForm(form => ({...form, [name]: value }));
  }, []);
  const reset = useCallback(() => setForm(initialForm), [initialForm]);

  return [form, onChange, reset];
}

export default useInput;

// app.js
import useInput from './useInput'

const [form, onChange, reset] = useInput({
  username: '',
  email: '',
})
```
 
 
### Context API를 사용한 전역 값 관리
* `Context API`를 사용하여 state 혹은 값을 전역으로 관리
```js
import { createContext } from 'react';

const UserDispatch = React.createContext(null)
<UserDispatch.Provider value={dispatch}>
 ...
</UserDispatch.Provier>
```
* `createContext`의 파라미터로 Context의 기본값 설정
* Context 사용할 때 값을 따로 지정하지 않을 경우 사용되는 기본 값
* `useContext`는 Context에 있는 값을 읽고 사용할 수 있는 Hook
* `Context.Provider` 컴포넌트의 `value` 속성으로 Context의 값 지정
* `Provider`로 감싸진 컴포넌트 중 어디서든지 Context의 값을 조회 가능
* 여러 함수들을 전달할 때는 reducer의 dispatch를 관리하는 Context를 만들어서 전달
```js
import { createContext, useContext } from 'react';

const MyContext = createContext('defaultValue');

function Child() {
  const text = useContext(MyContext);
  return <div>Hello? { text }</div>
}

function GrandParent({ text }) {
  return <Child text={ text } />
}

function ContextSample() {
  return (
    <MyContext.Provider value="Good">
      <GrandParent />
    </MyContext.Provider>
  )
}

```


### Prettier
```js
npm i -D eslint-config-prettier

// package.json
"eslintConfig": {
  "extends": [
    "react-app",
    "react-app/jest",
    "prettier" // 추가
  ]
},
```


### SCSS
* scss 설치
```js
npm i node-sass
```

* classnames
  * 다중 클래스를 편리하게 사용
```js
npm i classnames
```
- - - - - -

* CSS Module
```js
import styles from '.Component.module.css'

function Component() {
  return (
    <div className={styles.reewoo}></div>
  )
}

// css module + classnames
npm i classnames

import styles from '.Component.module.css'
import classNames from 'classnames/bind'

const cx = classNames.bind(styels);

function Component() {
  return (
    <div className={cx('reewoo', 'kami')}></div>
  )
}

```
### CSS In JS
* emotion, styled-components 등 중에서 styled-components를 가장 많이 사용
* Tagged Template Literal
```js
const red = '빨간색'
const blue = '파란색'

function favoriteColors(texts, ...values) {
  console.log(texts)
  console.log(values)
}

favoriteColors`제가 좋아하는 색은 ${red}과 ${blue}입니다.`
// ['제가 좋아하는 색은 ', '과 ', '입니다.']
// ['빨간색', '파란색']
```

```js
npm i styled-components
```



## API 연동하기
* `useEffect`의 첫번째 파마리터로 등록하는 함수에는 `async`를 사용할 수 없기 때문에, 함수 내부에서 `async`를 사용하는 새로운 함수를 선언





## 리액트 라우터
### 라우터 패키지 설치
```js
npm i react-router-dom
```

### 라우터 적용
* `BrowserRouter` 컴포넌트로 App 컴포넌트를 랩핑
```js
<BrowserRouter>
  <App />
</BrowserRouter>
```

### 라우터 연결
* 라우터 폴더명은 주로 `pages`, `routes`를 사용
```js
import { Routes, Route } from 'react-router-dom';

<Routes>
  <Route path="주소규칙" element={ 보여 줄 컴포넌트 JSX }>
</Routes>
```
Link
useParams
const [searchParams, setSearchParams ] = useSearchParams()

### URL 파라미터와 쿼리스트링
* URL 파라미터
  * 주소의 경로에 유동적인 값을 넣는 형태
  * ID 또는 이름을 사용하여 특정 데이터를 조회할 때 사용
* 쿼리스트링
  * 주소 뒷부분에 `?` 문자열 이후에 `key=value`로 값을 정의하여 `&`로 구분하는 형태
  * 키워드 검색, 페이지네이션, 정렬 방식 등 데이터 조회에 필요한 옵션을 전달할 때 사용

#### URL 파라미터
* `useParams` Hook을 사용하여 객체 형태로 조회
* URL 파라미터의 이름은 라우트를 설정할 때 `Route` 컴포넌트의 `path` props을 통하여 설정
* URL 파라미터는 `/profile/:username` 경로에 `:`을 사용하여 설정
* 여러개인 경우에는 `/profile/:username/:field`와 같은 형태로 사용
```js
// App.js

<Routes>
  <Route path="/profile/:username" element={ <Profile />} />
</Routes>
```

#### 쿼리스트링
* `useLocation` Hook을 사용
  * pathname: 현재 주소의 경로 (쿼리스트링 제외)
  * search: 맨 앞의 ? 문자 포함한 쿼리스트링 값
  * hash: 주소의 # 문자열 뒤의 값 (주로 History API 가 지원되지 않는 구형 브라우저에서 클라이언트 라우팅을 사용할 때 쓰는 해시 라우터에서 사용)
  * state: 페이지로 이동할때 임의로 넣을 수 있는 상태 값
  * key: location 객체의 고유 값, 초기에는 default 이며 페이지가 변경될때마다 고유의 값이 생성됨
  * 쿼리스트링은 location.search 값을 통해 조회
```js
import { useLocation } from 'react-router-dom'

const About = () => {
  const location = useLocation()
  return (
    <div>
      { location.search }
    </div>
  )
}
```
* 리액트 라우터 v6 부터 `useSearchParams` Hook으로 쿼리스트링을 쉽게 파싱
  * `useSearchParams`는 배열 타입의 값을 반환
  * 첫번째 원소는 쿼리파라미터를 조회, 수정 하는 메서드들이 담긴 객체를 반환
    * `get` 메서드로 조회 `set` 메서드로 업데이트
    * 조회시 쿼리파라미터가 존재하지 않는다면 `null`로 조회
  * 두번째 원소는 쿼리파라미터를 객체 형태로 업데이트할 수 있는 함수를 반환
  * 쿼리파리이터 조회시 값은 무조건 문자열 타입이다
    * Boolean 데이터를 사용한다면 `'true'` 와 같이 사용
    * Number 데이터를 다룬다면 `parseInt`를 사용하여 Number 타입으로 변환
```js
import { useSearchParams } from 'react-router-dom'

const About = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const detail = searchParams.get('detail')
  const mode = searchParams.get('mode')
  const onToggleDetail = () => {
    setSearchParams({ 
      mode,
      detail: detail === 'true' ? false : true
    })
  }
  const onIncreaseMode = () => {
    const nextMode = mode === null ? 1 : parseInt(mode) + 1
    setSearchParams({ 
      mode: nextMode,
      detail,
    })
  }
}
```

### 중첩된 라우트
* `Outlet` 컴포넌트는 `Route`의 `children`으로 들어가는 JSX 엘리먼트를 보여주는 역할
* `Outlet` 컴포넌트를 사용한 자리에 중첩된 라우트가 표시
```js
// App.js

const App = () => {
  return (
    <Routes>
      <Route path="/articles" element={<Articles />}>
        <Route path=":id" element={<Article />} />
      </Route>
    </Routes>
  );
};

// Aricles.js
import { Link, Outlet } from 'react-router-dom';
const Articles = () => {
  return (
    <div>
      <Outlet />
      <ul>
        <li><Link to="/articles/1">게시글 1</Link></li>
        <li><Link to="/articles/2">게시글 2</Link></li>
        <li><Link to="/articles/3">게시글 3</Link></li>
      </ul>
    </div>
  );
};
```
* `Outlet` 컴포넌트로 공통 레이아웃 컴포넌트를 사용할 수 있다
* `Route` 컴포넌트의 `index` props는 `path="/"`와 동일한 의미를 가진다
```js
<Route path="/" element={ <Home /> } />
// pr
<Route index element={ <Home /> } />

```
### 리액트 라우터의 부가기능
* `useNavigate`는 `Link` 컴포넌트를 사용하지 않고 다른 페이지로 이동하는 상황에 사용하는 Hook
  * `navigate(-1)`
  * `navigate('/articles')`
  * `navigate('/articles', { replace: treu })`
* `NavLink` 컴포넌트는 링크에서 사용하는 경로가 현재 라우트의 경로와 일치하는 경우 특정 스타일 및 CSS 클래스를 적용하는 컴포넌트
  * `style` 또는 `className`을 설정할 때 `{ isActive : boolean }`을 파리미터로 전달받는 함수 타입의 값을 전달
```js
<NavLink style={({ isActive }) => isActive ? activeStyle : undefined } />
<NavLink className={ ({ isActive}) => isActive ? 'active' : undefined } />
```
* NotFound 페이지
```js
// App.js

<Routes>
  <Route path="*" element={ <NotFound />} />
</Routes>
```
* `Navigate` 컴포넌트는 페이지를 리다이렉트 할 때 사용


- - - - - -


## React-Query
* 리액트에서 비동기를 쉽게 다루는 라이브러리
* 상태 관리 라이브러리 없이 서버에서 데이터를 가져
* 데이터를 컴포넌트에서 사용 가능하게 캐싱
* 주기적으로 데이터 패칭
* Optimistic Update
  * 데이터 변경을 요청 후 

### 설치
```js
$ npm i -D react-query
$ npm i axios
```

### 사용
* `reqct-query`를 사용하려는 컴포넌트를 `QueryClientProvider` 컴포넌트로 랩핑
  * 앱 전체에서 사용하려면 최상위 컴포넌트를 랩핑
* `QueryClient` 값을 `client`라는 props로 전달

```js
// App.js
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={ queryClient }>
      <div className="App"></div>
    </QueryClientProvider>
  )
}
```

### DevTools
```js
import { ReactQueryDevTools } from 'react-query/devtools'

return (
  <QueryClientProvider client={ queryClient }>
    <ReactQueryDevTools initialIsOpen={ false } position="bottom-right" />
  </QueryClientProvider>
)
```


* react-query으로 데이터 패칭을 할때는 `useQuery` Hook 사용
* `uesQuery` 첫 번째 인자는 문자열 또는 배열에 queryKey를 전달하고, queryKey로 데이터를 캐싱
* `useQuery` 두 번째 인자는 queryFn으로 데이터를 패칭할 함수를 인자로 받음
  * `Promise`를 반호나하는 함수를 전달
* `useQuery` 세 번째 인자는 옵션




1. `useState`의 `setState`로 함수형 업데이트 관해 알아 볼 것: 최적화 기타 등등
2. `useRef`로 랜더링 되지 않는 변수를 관리할 수 있는데 `useState`와 차이점: 장점 단점 등등
3. 변수나 함수를 함수 컴포넌트 밖에 선언하면 어떻게 되는걸까: 전역으로 관리되는 걸까
4. useReducer로 users 앱 만들어보기
5. ContextAPI와 useReducer 중 어느 것을 사용

