# simple_node_app
나는 nodejs는 모르겠다, 그런데 내가 쓰는 언어로 서버 하나 띄우기 귀찮다, 그럴때 쓰심 됩니다.
6번 위치의 소스에서 실행시킬 스크립트(python..)만 지정해주시면 됩니다.

1. node.js 설치하기.
https://nodejs.org/ko/
혹은
https://github.com/creationix/nvm#installation-and-update

2. 소스 다운로드.
4. node module 인스톨 및 서버 실행.
$ npm install
$ node bin/www

그러면 서버가 띄워짐.

5. 서버 접근 확인
터미널 하나 더 띄워서 
$ curl http://localhost:3000

6. 원하는 스크립트 실행하기.
여기서부터는 소스 수정이 필요한데, 그냥 복붙하면 됨.
route/index.js 파일 열기.

아래 라인이 우리가 5번에서 접근한 url임.
router.get('/', getProject);

getProject 함수에서 cmd 부분에 원하는 스크립트 절대경로를 넣어주면 됨.
function getProject(req, res) {
	let p = rea.params;
    logger.info('on getProject', req.sessionID, p);

	let cmd = 'python ' + rootdir + '/routes/process/test.py '+ p.id;
    
    
7. 내가 원하는 스크립트가 한개가 아니다, 위랑 다른 url을 쓰고 싶다.
router.get('/function1', function1);
이러면 http://localhost:3000/function1 로 접근하면 됨.

그리고 getProject 함수 리팩토링해서 cmd 부분만 다르게 들어가게 만들면 됨.

8. 인자를 받는 경우.
index.js 파일에 아래와 같은 코드가 있는데,
router.get('/project/:id', getProject);
http://localhost:3000/project/ 이후에 id에 인자를 넣을 수 있음.
인자는 req.params에 담겨있음.
function getProject(req, res) {
	let p = req.params;

    
9 post를 사용하는 경우.
위와 똑같은 url을 사용하지만 post method를 사용했을 경우는 아래 함수를 타게 됨.
router.post('/project/:id', addProject);
인자는 req.body에 들어 있음.
function addProject(req, res) {
    let p = req.body;


10 파라메터 하나씩 잘라서 넘기기 싫다 혹은 쿼리를 사용하겠다.
get : curl 'http://localhost:3000/get-test?p=1&pwd2'
post : curl -X POST -d 'id=1&pwd=2' http://localhost:3000/post-body

11. 브라우저에서도 확인 가능.
서버에서 사용할 것이라고 예상해서 curl 명령어로 예제를 적었지만
브라우저에서 http://localhost:3000 로 접근하면 가능.


FAQ( 일 것으로 예상 )
1. Error: Not found! 가 떠요
저도 그래요. 오타에요.

index.js에서 url을 잘못 넣었거나,
curl에서 url을 잘못 적었거나, 
파라메터가 모자랄 경우.

2. port를 바꾸려면?
export PORT=3333; node bin/www

3. rootdir? 
현재 프로젝트 위치를 반환.
보통 실행파일들을 $rootdir/routes/process/ 하위에 위치시켜서 코드가 저렇게 들어간것.
다른 위치 파일을 실행시키려면 해당 파일경로를 넣어주면 됨.

4. 프로세스를 계속 띄워놓으려면?
nohup을 사용하시거나,
nodejs용 forever나 pm2를 사용하시면 됨다.
https://expressjs.com/ko/advanced/pm.html

5. 제가 사용한 노드 버전은 8.9.3 이네요.
뭐.. 그냥 그렇다구요.

test.py지만 실은 print만 들었으므로 딱히 스크립트를 만든 것도 아니라서
하지만 원래 우리는 hello world를 찍으면 할 줄 안다고 착각하기 때문에,
hello world는 정상적으로 찍히기에 최소한은 동작한다고 판단했슴다.
이 말은 테스트용 코드란 말이고, 그 말은 버그가 있을수도 있다는 말이죠 네네.

문제가 있으면 문의주시거나,
저녀석은 안되겠다, 내가 하는게 낫겠다 하면 구글신께 아뢰시면 됩니다.

저는 후자에 더 신뢰가 가네요.
