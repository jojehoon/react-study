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