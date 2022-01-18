### Context API
* 반복적이고 복잡한 상태관리에는 Provider 가 중첩되는 단점이 있다

### RecoilRoot
* recoil 상태를 사용하는 컴포넌트는 부모 트리를 RecoilRoot 랩핑 
* 루트 컴포넌트가 RecoilRoot를 넣기에 가장 좋은 장소

### Atom
* Atom은 상태(state)의 일부를 나타낸다
* Atom는 어느 컴포넌트에서나 읽고 사용 가능
* Atom을 사용 중인 컴포넌트들은 암묵적으로 Atom을 구독
* Atom이 업데이트 되면 Atom을 구독하는 모든 컴포넌트들은 리랜더링
* Atom을 사용하기 위해서는 `useRecoilState()` 사용
* Atom은 state를 정의하는 `recoil` 함수
  * `key`는 `recoil`의 state 중 유니크 한 값이어야 한다
  * `default`로 기본값 정의

#### useRecoilState
* Atom을 구독
* `useState`와 비슷한 맥락
* value와 setter 사용 가능

#### useRecoilValue
* Atom 값 사용 (getter)
* read-only Hook
* getter만 사용

#### useSetRecoilState
* Atom 값 지정 및 변경 (setter)
* setter 함수에 값이 아닌 callback 함수를 전달 한다면 첫 번째 parameter로 state를 받아 올 수 있다
* callback 함수의 return 값으로 state를 업데이트 한다
* setter만 사용

### Selector
* 파생된 상태(derived state)의 일부를 나타낸다
* 파생된 상태는 상태의 변화이다
* `get`으로 `getter` 정의
* `selector`는 `atom`과 같이 state를 표현하지만, 다른 state에 **의존**
* **의존관계**는 `({get})`으로 전달받은 `get` 함수로 연결, 즉 다른 state를 구독
* 구독 중인 state가 업데이트 될 때마다 `selector`가 동작
* 구독 중인 state가 업데이트 되지 않으면 이전 state의 값을 반환
  * cache 처리, Vue.js의 `computed`와 비슷한 맥락







**atom**  
* recoil 에서 사용하는 state 개념
* state : useRecoilState    = useState = state of vuex
* setter: useSetRecoilState =          = dispatch of vuex
* getter: useRecoilValue    =          = getters of vuex





## 참고
* [react-recoil-todo](https://velog.io/@undefcat/4-react-recoil-todo)



js에서는 함수 또한 객체로 취급되어 메모리에 할당되기 때문에, 리렌더링이 일어날 때마다 새로운 함수가 생성

### useMemo
* 컴포넌트 내의 compute함수가 만약 복잡한 연산을 수행하기 때문에 결과값을 리턴하는데 오랜시간이 걸린다면 컴포넌트가 리렌더링될 때마다 함수가 호출되므로, UI 지연을 경험
* 만약 compute 함수에 넘겨줄 x, y의 값이 이전과 동일하다면 컴포넌트가 리렌더링되더라도 연산을 다시 할 필요는 없을 것입니다.
* 의존성 배열에 추가된 값이 이 전에 랜더링했을 때와 동일할 경우, 이 전 랜더링 때 저장해두었던 결과값을 재활용
* 의존성 값이 이 전에 랜더링했을 때와 달라졌을 경우, compute 함수를 호출하여 결과값을 새롭게 구해 할당

* Returns a memoized value.
* 메모리제이션 된 값을 반환한다



### useCallback
* Returns a memoized callback.
* 메모리제이션 된 함수를 반환한다
* 주로 상위 컴포넌트에서 하위 컴포넌트에 함수를 props로 넘겨줄 때 사용
* 컴포넌트가 리렌더링 되면 컴포넌트 안에 선언된 함수도 재선언 되어 사용되기 때문에 메모리 낭비를 야기
* state, props가 변경 될때마다 리렌더링 된다

* useCallback은 콜백 함수와 의존성 배열을 인자로 받습니다.
* 함수 내에서 참조하는 state, props가 있다면 의존성 배열에 추가해줘야합니다.
* 해당 코드에서는 a, b의 값의 변경이 없는 한 함수가 새로 생성되지 않음을 보장합니다.
* 새로 생성되지 않는다함은 메모리에 새로 할당되지 않고 동일 참조 값을 사용하게 된다는 것을 의미하고, 이는 최적화된 하위 컴포넌트에서 불필요한 렌더링을 줄일 수 있다는 것을 뜻합니다.
* dependency가 없을 경우 컴포넌트가 렌더링 되는 최초에 한번만 생성되며 이후에는 동일한 참조 값을 사용하게 됩니다.


### React.memo
* React는 먼저 컴포넌트를 렌더링(rendering) 한 뒤, 이전 렌더된 결과와 비교하여 DOM 업데이트를 결정합니다. 만약 렌더링 결과가 이전과 다르다면, React는 DOM을 업데이트합니다. 다음 렌더링 결과와 이전 결과의 비교는 빠릅니다만, 어떤 상황에서는 이 과정의 속도를 좀 더 높일 수 있습니다.
* Pure Functional Component에서
* Rendering이 자주일어날 경우
* re-rendering이 되는 동안에도 계속 같은 props값이 전달될 경우
* UI element의 양이 많은 컴포넌트의 경우

* 메모이징된 컴포넌트를 반환
* props 등이 변경되지 않으면 리렌더링하지 않음
* React.memo()는 props 혹은 props의 객체를 비교할 때 얕은(shallow) 비교
  * 비교 방식을 수정하고 싶다면 React.memo() 두 번째 매개변수로 비교함수를 만들어 넘겨주면 된다
* 성능적인 이점을 얻지 못한다면 메모이제이션을 사용하지 않는것이 좋다
  * 성능 관련 변경이 잘못 적용 된다면 성능이 오히려 악화될 수 있다. `React.memo()`를 현명하게 사용하라.
```
React.memo(Component, [areEqual(prevProps, nextProps)]);

function moviePropsAreEqual(prevMovie, nextMovie) {
  return (
    prevMovie.title === nextMovie.title &&
    prevMovie.releaseDate === nextMovie.releaseDate
  );
}

function MovieViewsRealtime({ title, releaseDate, views }) {
  return (
    <div>
      <MemoizedMovie title={title} releaseDate={releaseDate} />
      Movie views: {views}
    </div>
  );
}

const MemoizedMovie2 = React.memo(MovieViewsRealtime, moviePropsAreEqual);
```


### useRef
* DOM 선택시 사용
* 컴포넌트 안에서 조회 및 수정가능한 변수를 관리하는 용도로 사용
  * `useRef`로 관리하는 변수는 업데이트 되어도 컴포넌트가 리렌더링 되지 않는다
  * state는 setter 함수로 state를 업데이트 하고 리렌더링이 된 이후 업데이트 된 state 조회 가능
  * `useRef`로 관리하는 변수는 업데이트 후 바로 조회 가능
* `useRef`로 관리할 수 있는 변수
  * `setTimeout`, `setInterval`을 통해 만들어진 id
  * 외부 라이브러리를 사용하여 생성된 인스턴스
  * scroll 위치