# PRD: 정랩 연구실 소개 사이트 (lab_site)

## 1. 개요

BuildWork 홈페이지(`C:\Users\user\Dropbox\web_site`)의 디자인과 컴포넌트를 그대로 가져와 별도 프로젝트로 연구실(정랩) 소개 사이트를 만든다. 개인 홈페이지와 섞이지 않도록 폴더·저장소·배포를 모두 나눈다. 바뀌는 것은 내용뿐이다.

콘텐츠 구성은 `C:\Users\user\Dropbox\2026_step_persona\랩소개 (정랩).txt`에 정리한 메뉴를 따른다. 연구 성과는 한 페이지("연구")에 모은다. KCI Open API로 정혜경 교수의 논문을 받아 7개 연구 분야로 나누고, 논문마다 어떤 연구였는지 알려 주는 짧은 요약과 원문 링크, 참여자를 붙인다. 참여자 이름을 누르면 People 페이지의 그 사람 카드로 이동한다.

사이트에 들어갈 내용은 입력용 HTML 폼 두 개로 받는다. 교수 이력·구성원 명단은 `lab-intake.html`, 논문·보고서·학위논문 목록은 `research-edit.html`에서 고친다. 저장하면 md·csv 파일이 나오고, 스크립트가 그 파일을 사이트 데이터로 바꾼다.

### 변경 이력

| 날짜 | 바뀐 내용 |
|---|---|
| 2026-10-29 | 메뉴를 Home / People / Project / Workshop으로 바꾸고 주소도 `/people`, `/project`, `/workshop`으로 맞춤. 예전 주소(`/about`, `/research`, `/activities`)는 308 리다이렉트 |
| 2026-10-29 | 연구 목록(논문·저서, 보고서, 학위논문) 편집을 `_intake/research-edit.html`로 분리. `lab-intake.html`은 랩 정보·교수·구성원·KCI 설정·워크숍만 다룸 |
| 2026-10-29 | 논문 30편·저서 1권·과제 22건을 교수 CV(`../lab_site_private/tasks/정교수님.pdf`(저장소 밖))에서 시드로 넣음. KCI 수집(US-009) 전까지 이 목록이 기준 |
| 2026-10-29 | People 카드: 해시 진입 시 강조 테두리는 넣지 않음(스크롤만). 구성원 학위논문(학위·연도·제목)을 카드에 표시 |
| 2026-10-29 | Vercel 배포(https://junglab.vercel.app). GitHub 연동 배포로 바꾸고, 첫 CLI 배포는 비공개 PDF가 소스에 섞여 삭제함 |
| 2026-10-29 | 논문 원문 링크 버튼 이름을 주소로 구분: kci.go.kr은 "KCI에서 보기", 그 밖의 주소는 "원문 링크" |
| 2026-10-29 | 교수 사진을 SCM 특강 포스터 원본(`public/people/jung-hyekyung.jpg`)으로 교체. 파비콘·PWA 아이콘은 초록 바탕 "E" 텍스트 아이콘 |

### 결정 사항

| 항목 | 결정 |
|---|---|
| 프로젝트 위치 | `C:\Users\user\Dropbox\lab_site` (web_site와 같은 단계의 별도 폴더) |
| 콘텐츠 관리 | 정적 데이터 파일(`src/data/*.json`, `*.ts`). Notion 연동 코드는 지운다 |
| 메뉴 | Home(`/`) / People(`/people`, 교수 소개 + 구성원) / Project(`/project`, 연구) / Workshop(`/workshop`, 워크숍·컨설팅) — 4개 |
| 로고·색상 | 로고 이미지 없이 텍스트 로고. 색상·타이포·간격은 BuildWork 그대로 |
| 내용 입력 | HTML 폼 두 개. `_intake/lab-intake.html`(랩·교수·구성원·워크숍 → md 1개 + csv 2개), `_intake/research-edit.html`(논문·보고서·학위논문 → csv 3개). 둘 다 브라우저 자동 임시저장, "저장"으로 다운로드 |
| 논문 수집 범위 | 정혜경 교수가 저자인 KCI 논문만. 구성원 단독·타 공저 논문은 넣지 않는다 |
| 연구 페이지 | 분야별 상세 페이지 없이 `/project` 한 페이지에 모으고 분야 탭으로 거른다 |
| 분야 분류 | 7개 분야. Claude가 논문 제목·키워드·초록을 보고 판단하며, 해당하는 분야가 여러 개면 모두에 표시한다 |
| 논문 요약 | Claude가 초록을 바탕으로 "어떤 연구였고 무엇을 다뤘는지" 2~3문장으로 쓴다 |
| 참여자 링크 | 랩 구성원 저자는 `/people#member-{slug}`로 연결. 랩 밖 공저자는 이름만 표시 |
| 교수 소속 | 한국기술교육대학교 HRD학과, 한국기술교육대학교 테크노인력개발전문대학원, 한국교육과정평가원(이전 소속). KCI 결과를 이 세 소속으로 거른다 |
| 교수 정보 | 출처: KOREATECH TLO 연구자 페이지(https://tlo.koreatech.ac.kr/researcher/1458), SCM 특강 포스터(`../lab_site_private/tasks/SCM_특강포스터_v3.pdf`(저장소 밖)). 사진은 SCM 특강 포스터 원본 사진을 쓴다(TLO 사진은 해상도가 낮음) |
| 랩 이름 후보 | TLO 페이지 표기 "Educational Evaluation Lab". 폼 기본값으로 넣고 확정은 폼에서 한다 |
| 구성원 | 박사 졸업: 박민주, 윤중헌, 유다선 / 박사과정: 이수진, 노창균, 권수현 / 석사과정: 김용운. 졸업생도 People 페이지에 카드를 두고 참여자 링크를 건다 |
| 배포 | GitHub 저장소 `kwonsuhyeon/junglab` + Vercel. 도메인은 배포 단계에서 정한다 |
| 구성원 주소 | 로마자 slug(`/people#member-kwon-suhyeon`) |
| people | 랩 구성원과 같은 뜻. People 페이지(`/people`)의 구성원 섹션으로 다룬다 |
| 원문 | 사이트에는 저작권 확인 전까지 KCI·기관 링크만 건다. 원문 PDF는 내부 폴더(`_papers/`, 비공개)에 모아 분류에 참고한다. 분류는 초록 기준이고, PDF는 초록이 없거나 부족할 때 쓴다 |

## 2. 목표

- BuildWork와 같은 디자인의 연구실 사이트를 별도 폴더·별도 저장소로 만든다.
- 랩소개 txt의 항목(교수 소개, 구성원, 연구 분야 7개, 워크숍, 컨설팅)을 빠짐없이 옮긴다.
- 연구실 논문을 한 페이지에서 분야별로 보고, 요약·원문·참여자까지 바로 확인하게 한다.
- 사이트 내용은 HTML 폼으로 입력받아 파일로 남기고, 데이터 변환은 스크립트로 한다.
- 논문 목록은 스크립트를 한 번 실행해 KCI에서 다시 받아 갱신한다.

## 3. 사용자 스토리

### US-001: 프로젝트 복사와 분리
**설명:** 개발자로서 web_site를 복사해 독립된 lab_site 프로젝트를 만들고 싶다. 그래야 개인 홈페이지와 섞이지 않는다.

**수용 조건:**
- [x] `C:\Users\user\Dropbox\lab_site`를 만들고 web_site의 소스·설정 파일을 복사한다
- [x] 다음은 복사하지 않는다: `node_modules`, `.next`, `.git`, `.env.local`, `_workspace`, `tasks`, `2x`, `경력증명서_권수현.pdf`, `로고 수정필.png`, `로고수정필2.png`, `public/logos/*`, `tsconfig.tsbuildinfo`
- [x] `package.json`의 `name`을 `lab-site`로 바꾼다
- [x] `git init`으로 새 저장소를 만든다(web_site 저장소와 이력을 공유하지 않음)
- [x] dev 서버 포트를 `.env.local`의 `PORT`(기본 3100)로 지정해 web_site(3000)와 동시에 띄울 수 있다
- [x] `npm install` 뒤 `npm run dev`가 오류 없이 뜬다
- [x] Typecheck/lint 통과

### US-002: 내용 입력용 HTML 폼
**설명:** 연구실 관리자로서 사이트에 들어갈 내용을 빈칸 채우기로 입력하고 파일로 남기고 싶다. 그래야 코드를 열지 않고도 내용을 넘길 수 있다.

**수용 조건:**
- [x] `lab_site/_intake/lab-intake.html` 단일 파일로 만든다(외부 서버 없이 브라우저에서 바로 열림)
- [x] 섹션과 입력 칸:
  - 랩 기본 정보: 정식 이름, 텍스트 로고 표기, 소속(대학·학과), 한 줄 소개, 연락처 이메일, 주소
  - 교수 소개: 이름(기본값 정혜경), 직위, 학력(행 추가), 경력(행 추가), 연구 분야, 이메일, 사진 파일명
  - 구성원: 행 추가형 표. 이름, 과정(박사/석사/연구원/졸업생), 연구 주제, 이메일(선택), 사진 파일명(선택), KCI 저자 표기(다르면 입력)
  - 구성원 칸에 slug(로마자) 열을 둔다. 이름을 입력하면 로마자 기본값을 자동으로 채우고 수정할 수 있다
  - KCI 검색 설정: 교수 KCI 저자 표기, 소속 기관명(여러 개, 행 추가형), 검색 시작 연도
  - ~~학위논문, 연구보고서~~ → US-015 `research-edit.html`로 옮김
  - 워크숍·컨설팅: 행 추가형 표. 유형, 제목, 날짜, 기관, 설명, 링크
- [x] 이미 정해진 값은 기본값으로 미리 채운다:
  - 랩 이름: Educational Evaluation Lab
  - 교수: 정혜경(`jung-hyekyung`), 한국기술교육대학교 HRD학과 부교수, hjung@koreatech.ac.kr, 041-560-1108, 사진 `public/people/jung-hyekyung.jpg`
    - 학력: UCLA 교육학 박사(교육평가, 양적연구방법) / 연세대학교 교육학과 석사(교육평가) / 연세대학교 교육학 학사
    - 경력: 한국기술교육대학교 HRD학과 부교수(현) / 한국교육과정평가원 연구위원 / American Institutes for Research, Researcher / 연세대학교 교육개발지원센터 전문연구원
    - 연구 분야: HRD·직업훈련 정책과 역량평가 / 교육평가와 인과추론 방법론(PSM, 다층분석, LPA, BART, SEMtree) / 국제비교교육과 국가수준 학업성취도 평가(PISA, 표집설계, ILO 협력)
    - 수상: 2021 한국인력개발학회 우수 HRD 논문상(교신저자)
    - 특강: 2026 글로벌 인문사회융합연구 세미나 "SEM 연구자를 위한 인과추론: AI 시대의 구조적 인과 모델(SCM) 입문"(2026-10-16, 인하대학교) → 워크숍 행 기본값
  - 소속 기관명: 한국기술교육대학교 HRD학과, 한국기술교육대학교 테크노인력개발전문대학원, 한국교육과정평가원
  - 구성원(이름 · 과정 · slug):
    - 박민주 · 박사 졸업 · `park-minju`
    - 윤중헌 · 박사 졸업 · `yoon-jungheon`
    - 유다선 · 박사 졸업 · `yu-daseon`
    - 이수진 · 박사과정 · `lee-sujin`
    - 노창균 · 박사과정 · `noh-changgyun`
    - 권수현 · 박사과정 · `kwon-suhyeon`
    - 김용운 · 석사과정 · `kim-yongwoon`
- [x] 입력할 때마다 localStorage에 자동 저장하고, 다시 열면 그대로 복원한다. "입력 초기화" 버튼은 확인 창을 띄운 뒤 지운다
- [x] "저장" 버튼을 누르면 파일 3개를 내려받는다: `lab-content.md`(기본 정보·교수 소개), `members.csv`, `activities.csv`
- [x] CSV는 UTF-8 BOM을 붙여 엑셀에서 한글이 깨지지 않게 한다
- [x] 같은 파일을 다시 불러오는 "불러오기" 버튼이 있다(md·csv 선택 → 폼 채움)
- [x] 진행 상황 체크리스트(섹션별 완료 여부)는 실제 `<input type="checkbox">`로 만들고 상태를 localStorage에 저장한다
- [x] 본문 폭 max-width 1280px 이상, 표 셀 `vertical-align: middle`, 색상은 CSS 변수로 정의한다
- [x] 브라우저에서 입력 → 새로고침 → 복원 → 저장 → 불러오기까지 확인

### US-003: 입력 파일을 사이트 데이터로 변환
**설명:** 개발자로서 폼에서 받은 md·csv를 사이트 데이터 파일로 바꾸고 싶다.

**수용 조건:**
- [x] 사용자는 내려받은 파일을 `lab_site/_intake/`에 넣는다
- [x] `npm run intake`가 `_intake/`의 파일을 읽어 `src/data/site.json`, `professor.json`, `members.json`, `publications.json`, `theses.json`, `reports.json`, `activities.json`을 만든다
- [x] csv가 아직 없으면 각 폼(`lab-intake.html`, `research-edit.html`)의 `DEFAULTS`를 읽어 쓴다. 기본값은 폼 한 곳에만 둔다
- [x] 구성원 `slug`는 폼에 입력한 로마자 표기를 그대로 쓴다(소문자, 성-이름, 하이픈 연결). 형식이 맞지 않거나 같은 slug가 둘이면 오류로 멈춘다
- [x] 필수 칸(랩 이름, 교수 이름, 구성원 이름·과정)이 비어 있으면 어느 파일 몇째 줄인지 출력하고 종료 코드 1을 낸다
- [x] Typecheck 통과

### US-004: Notion 연동 제거
**설명:** 개발자로서 Notion 코드를 걷어내고 싶다. 연구실 사이트는 정적 데이터만 쓰기 때문이다.

**수용 조건:**
- [x] `src/lib/notion.ts`, `src/types/notion.ts`, `src/components/notion/`을 지운다
- [x] `@notionhq/client` 의존성을 지운다
- [x] `src/app/insights`, `src/app/resources`, `src/app/curation` 라우트를 지운다
- [x] 코드 어디에도 `notion` import가 남지 않는다(`grep -ri notion src`가 빈 결과)
- [x] Typecheck/lint 통과

### US-005: 브랜드 교체 (텍스트 로고, 메타데이터, PWA)
**설명:** 방문자로서 이 사이트가 BuildWork가 아니라 정랩 사이트라는 것을 바로 알고 싶다.

**수용 조건:**
- [x] 랩 이름·소속·연락처는 `src/data/site.json`(US-003 산출물)에서 읽는다
- [x] Header·Footer의 로고 이미지를 텍스트 로고로 바꾼다. 높이는 기존 로고와 같은 32px(`h-8`) 안에 맞춘다
- [x] `layout.tsx`의 title·description·OpenGraph 값을 `site.json`에서 읽는다
- [x] `manifest.ts`의 name·short_name을 랩 이름으로 바꾼다
- [x] `public/sw.js`의 캐시 이름을 `lab-site-v1`처럼 바꿔 BuildWork 캐시와 겹치지 않게 한다
- [x] 화면 어디에도 "BuildWork" 문자열이 보이지 않는다(`grep -r BuildWork src public`이 빈 결과)
- [x] 파비콘은 임시로 텍스트 이니셜 아이콘을 쓴다(로고가 생기면 교체)
- [x] Typecheck/lint 통과
- [x] 브라우저에서 확인

### US-006: 내비게이션 4개 메뉴
**설명:** 방문자로서 상단 메뉴에서 연구실 정보를 바로 찾고 싶다.

**수용 조건:**
- [x] 메뉴 항목은 `src/data/nav.ts`의 배열 하나에서 관리하고, `Navigation.tsx`·`MobileNav.tsx`·`Footer.tsx`가 같은 배열을 쓴다(지금은 세 파일에 따로 적혀 있음)
- [x] 항목: Home(`/`), People(`/people`), Project(`/project`), Workshop(`/workshop`)
- [x] 예전 주소 `/about`, `/research`, `/activities`는 `next.config.mjs`에서 새 주소로 308 리다이렉트
- [x] 현재 페이지 메뉴가 기존 디자인의 활성 스타일로 표시된다
- [x] 모바일 메뉴에서도 4개 항목이 보인다
- [x] Typecheck/lint 통과
- [x] 브라우저에서 확인

### US-007: 홈 페이지
**설명:** 방문자로서 첫 화면에서 연구실이 무엇을 연구하는지 한눈에 보고 싶다.

**수용 조건:**
- [x] 기존 `HeroSection`을 그대로 쓰고, 문구는 `site.json`의 랩 이름·한 줄 소개를 쓴다
- [x] 연구 분야 7개를 카드로 보여 준다. 카드에는 분야 이름, 한 줄 설명, 논문 수가 나오고, 누르면 `/project?area={slug}`로 간다
- [x] 최근 논문 3편(연도 내림차순)을 보여 주고 "전체 보기"는 `/project`로 간다
- [x] 문구는 브랜드 카피 톤(권유형, 부정형 금지)을 따른다
- [x] Typecheck/lint 통과
- [x] 브라우저에서 확인

### US-008: People 페이지 (교수 소개 + 구성원)
**설명:** 방문자로서 지도교수의 이력과 연구실 구성원을 한 페이지에서 보고 싶다.

**수용 조건:**
- [x] 교수 소개 섹션은 기존 about 페이지의 학력·경력 타임라인 레이아웃을 그대로 쓴다. 섹션 id는 `member-professor`
- [x] 구성원은 과정별로 묶어 카드 그리드로 보여 준다. 졸업생은 맨 아래 따로 묶는다
- [x] 각 카드의 id는 `member-{slug}`이고, `/people#member-{slug}`로 들어오면 그 카드로 스크롤된다. 고정 헤더에 가리지 않도록 `scroll-margin-top`을 헤더 높이만큼 준다
- [x] ~~해시로 들어온 카드는 2초 동안 강조 테두리를 보여 준다~~ → 2026-10-29 사용자 요청으로 뺌. 스크롤만 한다
- [x] 구성원 카드에 학위논문(학위·연도·제목, 원문 링크가 있으면 연결)을 보여 준다
- [x] 각 카드 아래에 "참여 논문 N편" 링크가 있고, 누르면 `/project?member={slug}`로 간다
- [x] 사진이 없으면 이름 첫 글자 아바타를 보여 준다
- [x] Typecheck/lint 통과
- [x] 브라우저에서 확인

### US-009: KCI 논문 수집 스크립트
**설명:** 개발자로서 정혜경 교수의 KCI 논문을 받아 JSON으로 저장하고 싶다. 그래야 논문 목록을 손으로 옮겨 적지 않아도 된다.

**수용 조건:**
- [ ] `scripts/fetch-kci.mjs`를 만든다. `npm run kci`로 실행한다
- [ ] 키는 `.env.local`의 `KCI_API_KEY`에서 읽는다. 값은 `C:\Users\user\Dropbox\2026_phd\Dragon_up\study_helper\.env`의 같은 이름 키를 쓴다. 키는 클라이언트 코드에 들어가지 않는다
- [ ] 엔드포인트는 `https://open.kci.go.kr/po/openapi/openApiSearch.kci?apiCode=articleSearch`를 쓴다
- [ ] 검색 조건은 `site.json`의 KCI 검색 설정(교수 저자 표기, 소속 기관명, 시작 연도)에서 읽는다. 저자 파라미터 이름(`author` 등)과 소속 필터 가능 여부는 구현 첫 단계에서 실제 호출로 확인하고, 결과를 스크립트 상단 주석에 적는다
- [ ] 저자 목록에 정혜경이 있는 논문만 남긴다. 저자 목록을 `members.json`의 이름(또는 KCI 저자 표기)과 맞춰 각 저자에 `memberSlug`를 붙인다. 맞는 구성원이 없으면 `memberSlug: null`(랩 밖 공저자)
- [ ] 쪽(page)을 넘기며 결과를 끝까지 받는다
- [ ] 응답에서 제목, 저자 목록, 학술지, 권호, 발행연도, DOI, KCI 논문 ID, KCI 상세 URL, 키워드, 초록, `citation-count`(kci·wos)를 뽑아 `src/data/kci-raw.json`에 저장한다
- [ ] 키 오류는 응답 메시지로 구분해 알린다: "등록되지 않은 key"는 키 확인 안내, "사용기간이 종료"는 연장 신청 안내. 두 경우 모두 기존 `kci-raw.json`을 지우지 않는다
- [ ] 로그·예외 메시지에 키 값이 찍히지 않는다(URL 출력 시 `key=***`로 가림)
- [ ] 같은 KCI 논문 ID는 한 번만 저장한다
- [ ] 실행 끝에 전체 건수, 구성원 공저 건수, 소속 불일치로 뺀 건수를 출력한다

### US-010: 논문 분류·요약 (Claude 판단)
**설명:** 연구실 관리자로서 논문마다 분야와 짧은 요약이 붙어 있기를 바란다. 그래야 방문자가 제목만 보고 짐작하지 않아도 된다.

**수용 조건:**
- [ ] `src/data/publications.json`이 사이트에 실리는 최종 목록이다. 각 항목은 `kci-raw.json`의 필드에 다음을 더한다:
  - `areas`: 분야 slug 배열(1개 이상, 해당하면 여러 개)
  - `summary`: 2~3문장. 첫 문장은 연구 목적·대상, 다음 문장은 방법과 주요 결과
  - `summaryBy`: `"claude"` 또는 `"human"`
  - `approved`: boolean
  - `pdf`: 원문 경로(선택)
- [ ] 분야는 아래 7개 중에서 고른다. 기준은 `src/data/areas.ts`에 적는다:
  - 인과추론(`causal-inference`): SEM, 다층모형, 경향점수추정, 표집, 인과 그래프(DAG)
  - 통계모형 적용(`statistical-modeling`)
  - 교육훈련정책연구(`education-training-policy`)
  - AI 데이터 학습분석(`ai-learning-analytics`)
  - 직업훈련(`vocational-training`): 고직능연·능개원 과제
  - 고등교육(`higher-education`): 데이터성과센터 과제, 입학연구, 성과분석
  - ODA(`oda`): ILO, TVET
- [ ] 분류·요약은 Claude Code 세션에서 한다. `npm run kci` 뒤 `areas`나 `summary`가 빈 논문을 `_workspace/classify-pending.json`으로 뽑고, Claude가 제목·키워드·초록을 읽고 채운 뒤 `npm run merge-classify`로 `publications.json`에 합친다. 사이트 빌드에 LLM 호출은 들어가지 않는다
- [ ] 분류·요약의 기본 근거는 KCI 초록이다. 초록이 없거나 두 문장이 안 되면 `_papers/{KCI ID}.pdf`가 있을 때 그 원문의 초록·서론을 읽고 쓴다. 원문도 없으면 제목·키워드만으로 분류하고 `summary`는 비운다(지어내지 않는다). 화면에는 요약 칸을 숨긴다
- [ ] 원문 PDF는 `lab_site/_papers/`에 모은다. 파일명은 `{KCI ID}.pdf`. 이 폴더는 git에 올리지 않고 사이트에도 실리지 않는다(공개 게시는 US-012에서 저작권 확인 후)
- [ ] `npm run kci` 끝에 "원문 PDF 없음 N건" 목록과 각 논문의 KCI 상세 URL을 출력해 사용자가 내려받을 수 있게 한다
- [ ] `npm run kci`를 다시 실행해도 `areas`·`summary`·`summaryBy`·`approved`·`pdf`는 지워지지 않는다(KCI 논문 ID 기준 병합). 새 논문은 `approved: false`로 들어온다
- [ ] 사용자가 고친 요약은 `summaryBy: "human"`으로 바꾸고, 이후 Claude 재분류 대상에서 뺀다
- [ ] 사이트에는 `approved: true`인 논문만 나온다
- [ ] KCI에 없는 논문(해외 학술지 등)은 `src/data/publications-manual.json`에 같은 형식으로 직접 넣는다
- [ ] Typecheck 통과

### US-011: 연구 페이지 (`/project`)
**설명:** 방문자로서 연구실 논문과 보고서를 한 페이지에서 분야별로 보고, 요약·원문·참여자를 바로 확인하고 싶다.

**수용 조건:**
- [x] 상단에 분야 탭 8개(전체 + 7개 분야)를 두고 탭마다 건수를 표시한다. 탭 선택은 URL `?area={slug}`에 반영돼 링크 공유와 뒤로가기가 된다
- [x] 탭 아래에 선택한 분야의 소개(`areas.ts`의 설명, 세부 주제, 참고 링크. 인과추론은 https://www.dagitty.net/)를 짧게 보여 준다
- [x] 목록은 논문·학위논문·보고서를 함께 보여 주고 항목마다 유형 배지(논문/학위논문/보고서)를 단다. 정렬은 연도 내림차순
- [x] 한 논문의 `areas`가 여러 개면 해당 분야 탭 모두에 나온다. "전체" 탭에서는 한 번만 나온다
- [x] 항목 구성:
  - 제목, 연도, 학술지·권호(보고서는 발주기관)
  - 분야 배지(해당 분야 모두)
  - 요약(`summary`, 있을 때)
  - 원문 버튼: "원문 PDF"(pdf가 있을 때), "KCI에서 보기", "DOI"(있을 때). 보고서·학위논문은 "원문 PDF" 또는 "외부 링크"
  - 참여자: 저자 순서대로. `memberSlug`가 있는 저자는 링크(`/people#member-{slug}`), 없는 저자는 일반 글자
- [x] `?member={slug}`로 들어오면 그 구성원이 참여한 항목만 보여 주고 상단에 "OOO 참여 연구 N건 · 필터 해제"를 표시한다
- [x] 결과가 없는 분야는 "준비 중" 문구를 보여 준다
- [x] 외부 링크는 새 탭으로 연다(`target="_blank" rel="noopener noreferrer"`)
- [x] 정적 페이지로 생성하고 필터는 클라이언트에서 처리한다
- [x] Typecheck/lint 통과
- [x] 브라우저에서 확인: 탭 전환, 중복 분야 논문 표시, 참여자 클릭 → People 카드 이동, member 필터

### US-012: 원문 PDF 게시
**설명:** 방문자로서 논문·보고서 원문을 사이트에서 바로 내려받고 싶다.

**수용 조건:**
- [ ] 원문은 `public/papers/{연도}-{KCI ID 또는 짧은 영문 이름}.pdf`, `public/reports/{연도}-{짧은 영문 이름}.pdf`에 둔다. 파일명에 한글·공백을 쓰지 않는다
- [ ] `pdf` 필드가 가리키는 파일이 실제로 있는지 검사하는 스크립트(`npm run check-pdf`)를 둔다. 없는 파일이 있으면 목록을 출력하고 종료 코드 1을 낸다
- [ ] 파일 하나가 20MB를 넘으면 경고한다(Vercel 정적 파일 제한 대비)
- [ ] 저작권 확인을 마친 파일만 올린다(9절 미결 사항 1). 확인 전에는 `pdf` 필드를 비워 "KCI에서 보기"만 나오게 한다
- [ ] 브라우저에서 PDF 링크가 열리는지 확인

### US-013: 워크숍·컨설팅 페이지
**설명:** 방문자로서 연구실이 진행한 워크숍과 컨설팅 이력을 보고 싶다.

**수용 조건:**
- [x] 데이터는 `src/data/activities.json`(US-003 산출물)에서 읽는다
- [x] `/workshop` 한 페이지에 섹션 두 개(워크숍, 컨설팅)로 나눈다
- [x] 날짜 내림차순 정렬
- [x] 항목이 없으면 "준비 중" 문구
- [x] 기관명만 쓰고 내부 대시보드·대외비 링크는 넣지 않는다
- [x] Typecheck/lint 통과
- [x] 브라우저에서 확인

### US-015: 연구 목록 편집 폼
**설명:** 연구실 관리자로서 논문·보고서·학위논문 목록과 공동연구자를 코드 없이 고치고 싶다.

**수용 조건:**
- [x] `_intake/research-edit.html` 단일 파일. 표 세 개: 논문·저서, 연구보고서, 학위논문
- [x] 논문 칸: id(읽기 전용), 표시, 유형, 제목, 학술지·출판사, 권호, 발행, 교수 역할, 참여자, 분야(체크박스 7개), DOI, 원문 링크·PDF, 요약
- [x] 참여자는 저자 순서대로 쉼표 구분. 구성원 이름과 같으면 People 카드로 링크, 아니면 이름만
- [x] "표시"를 끄면 `approved: false`가 되어 사이트에서 숨김
- [x] 새 논문 행은 `manual-NN` id를 자동으로 받는다. id는 KCI 재수집 때 병합 기준이라 바꾸지 않는다
- [x] 검색창(제목·학술지·참여자), 자동 저장(localStorage), 불러오기, 입력 초기화, 맨 위로 버튼
- [x] "저장"을 누르면 `publications.csv`, `reports.csv`, `theses.csv`(UTF-8 BOM)를 내려받는다 → `_intake/`에 넣고 `npm run intake`
- [x] 브라우저에서 편집 → 저장 → 변환까지 확인(참여자 링크, 분야 추가, 따옴표·줄바꿈 제목)

### US-014: 배포 준비
**설명:** 개발자로서 lab_site를 web_site와 별도로 배포하고 싶다.

**수용 조건:**
- [x] `.env.local.example`에 `PORT`, `KCI_API_KEY` 항목만 남긴다(값은 비움)
- [x] `.gitignore`에 `.env.local`, `src/data/kci-raw.json`, `_intake/*.md`, `_intake/*.csv`, `_workspace/`, `_papers/`를 넣는다(`publications.json`과 `src/data/*.json`은 커밋 대상)
- [x] 별도 GitHub 저장소(`https://github.com/kwonsuhyeon/junglab`)와 별도 Vercel 프로젝트로 배포한다. 도메인은 9절 미결 사항
- [x] 공개 저장소에 올리지 않는 것: `.env.local`(KCI 키), `_intake/*.md·*.csv`, `inbox/`, `_papers/`, `_workspace/`, 교수 CV·포스터 원본 PDF(저장소 밖 `lab_site_private/`로 옮김)
- [x] 로컬 빌드 검증은 Dropbox 잠금(EBUSY)을 피해 scratchpad 복사본에서 `next build`로 한다. dev 서버를 켠 채 같은 폴더에서 build하지 않는다
- [x] 빌드 성공, 모든 정적 페이지 생성 확인
- [x] 배포는 GitHub `main` 푸시 → Vercel 자동 배포로만 한다. CLI 배포(`vercel deploy`)는 로컬 파일까지 올라갈 수 있어 쓰지 않는다(2026-10-29 CV PDF 업로드 사고 후 결정)
- [x] 프로덕션 주소: https://junglab.vercel.app · 연구 목록 편집 폼: https://junglab.vercel.app/edit/research.html (noindex)

## 4. 기능 요구사항

- FR-1: lab_site는 web_site와 폴더, git 저장소, Vercel 프로젝트를 공유하지 않는다.
- FR-2: 디자인 토큰(`tailwind.config.ts`, `globals.css`)과 공통 컴포넌트(`ui/*`, `sections/*`, `layout/*`)는 값을 바꾸지 않고 그대로 쓴다. 바뀌는 것은 텍스트·데이터·라우트다.
- FR-3: 모든 내용은 `src/data/` 아래 파일에서 읽는다. 페이지 컴포넌트에 내용 문자열을 직접 쓰지 않는다.
- FR-4: 사이트 내용의 원본은 입력 폼이 만든 `_intake/` 파일이고, `npm run intake`로 `src/data/`를 만든다.
- FR-5: 메뉴는 Home, People, Project, Workshop 4개이고 배열 하나(`src/data/nav.ts`)로 관리한다.
- FR-6: 연구 분야는 인과추론, 통계모형 적용, 교육훈련정책연구, AI 데이터 학습분석, 직업훈련, 고등교육, ODA 7개다. 한 논문은 여러 분야에 속할 수 있다.
- FR-7: KCI 논문은 정혜경 교수가 저자인 것만 수집한다. 빌드 시점이 아니라 `npm run kci`를 수동으로 실행할 때만 받는다. 사이트 빌드·실행은 KCI API 없이 동작한다.
- FR-8: 분야 분류와 요약은 Claude가 초록·제목·키워드를 근거로 쓰고, 초록에 없는 내용은 쓰지 않는다.
- FR-9: 사이트에는 사용자가 `approved: true`로 표시한 논문만 나온다. 재수집할 때 사용자가 입력하거나 확정한 값을 보존한다.
- FR-10: 참여자 중 랩 구성원은 `/people#member-{slug}`로 연결하고, 랩 밖 공저자는 링크 없이 이름만 표시한다.
- FR-11: 논문·보고서는 원문 PDF가 있으면 PDF를, 없으면 KCI 상세 페이지나 외부 링크를 연결한다.
- FR-12: KCI API 키는 서버 측 스크립트에서만 쓰고 로그에 노출하지 않는다.
- FR-13: dev 서버 포트는 환경변수로 지정하고 기본값은 3100이다(web_site 3000과 겹치지 않음).

## 5. 비목표 (범위 제외)

- 관리자 화면, 로그인, CMS(Notion 포함)는 만들지 않는다. 내용은 입력 폼과 데이터 파일로 바꾼다.
- 분야별 상세 페이지, 구성원 개인 페이지는 만들지 않는다.
- 구성원이 정혜경 교수 없이 쓴 논문은 수집하지 않는다.
- 디자인 변경(색상, 폰트, 레이아웃 재설계)은 하지 않는다.
- 로고 이미지 제작은 하지 않는다.
- 영문 버전(다국어)은 만들지 않는다.
- KCI 외 데이터베이스(RISS, Scopus, Google Scholar) 자동 수집은 하지 않는다. 필요하면 수동 목록으로 넣는다.
- 피인용 수 표시·순위 기능은 넣지 않는다(데이터는 저장하되 화면에는 쓰지 않음).
- 입력 폼이 파일을 직접 덮어쓰는 기능은 넣지 않는다(다운로드 방식).

## 6. 디자인 고려사항

- 원본 디자인은 web_site의 `tailwind.config.ts`, `src/app/globals.css`, `src/components/`를 그대로 쓴다.
- 기존 컴포넌트 재사용 대응:
  - `HeroSection` → 홈 상단
  - `ProjectCard` → 홈의 연구 분야 카드
  - `ContentCard` → 연구 페이지의 논문·보고서 항목, 워크숍 항목
  - `Badge` → 유형(논문/보고서), 분야, 과정(박사/석사)
  - `Button` → "원문 PDF", "KCI에서 보기", 분야 탭
  - `ScrollToTop` → 모든 페이지 유지
- 기존 about 페이지의 학력·경력 타임라인 레이아웃을 교수 소개에 쓴다.
- 텍스트 로고는 기존 로고 자리(높이 32px)에 랩 이름을 굵은 글씨로 넣는다.
- 입력 폼(`lab-intake.html`)은 사이트가 아니라 내부 도구이므로 사이트 디자인을 따르지 않아도 된다. 섹션별 카드, 넓은 표, 상단 진행 체크리스트로 구성한다.

## 7. 기술 고려사항

- 스택: Next.js 14.2.3 App Router, React 18, Tailwind 3.4, TypeScript. 버전은 web_site와 같게 유지한다.
- KCI Open API 근거: `Dragon_up/tasks/prd-study-helper-english-reader.md` US-613. 여기서 확인한 사항은 다음과 같다.
  - 2026-10-25 기준 키 정상 동작. 응답 `articleInfo/citation-count`에 kci·wos 피인용 수가 있다.
  - 신청서상 이용 종료일(2026-05-31)이 지났는데도 동작 중이다. 언제든 막힐 수 있으므로 FR-7처럼 사이트는 API 없이도 돌아가야 한다.
  - 오류 메시지 "등록되지 않은 key 입니다"(키 오류)와 "사용기간이 종료되었습니다"(기간 만료)를 구분한다.
  - 응답은 XML이다. 스크립트에서 XML 파싱 라이브러리(`fast-xml-parser` 등)를 devDependency로 추가한다.
- 동명이인: 정혜경은 흔한 이름이라 KCI 저자 검색만으로는 다른 사람 논문이 섞인다. 소속 기관명 세 개(한국기술교육대학교 HRD학과, 한국기술교육대학교 테크노인력개발전문대학원, 한국교육과정평가원) 중 하나와 맞는 논문만 남기고, 최종 판단은 `approved`로 사람이 한다. KCI 소속 표기는 "한국기술교육대학교", "한국기술교육대학교 HRD학과", "Korea University of Technology and Education"처럼 흔들리므로 기관명 부분 일치로 비교한다.
- 구성원 매칭: KCI 저자 표기와 구성원 이름이 다를 수 있다(영문 표기, 띄어쓰기). 폼의 "KCI 저자 표기" 칸을 우선 쓰고, 없으면 이름으로 맞춘다.
- 참여자 링크는 같은 사이트 안의 해시 이동이다. Next.js `Link`로 `/people#member-{slug}`에 갈 때 스크롤이 되는지 확인하고, 안 되면 People 페이지의 `useEffect`에서 해시 위치로 스크롤한다.
- 분야 필터를 클라이언트에서 처리하면 논문이 수백 편이어도 JSON을 한 번 불러오면 충분하다. 1,000편을 넘으면 분야별로 데이터를 나누는 방안을 검토한다.
- 로컬 빌드: Dropbox 폴더에서 `next build`가 EBUSY로 실패할 수 있다. scratchpad 복사본과 정션으로 검증한다.
- PDF 용량: 원문이 많아져 Vercel 배포 크기 한도에 가까워지면 외부 저장소(GitHub Releases, 기관 리포지토리)로 옮기는 방안을 검토한다.

## 8. 성공 지표

- 랩소개 txt의 모든 항목(교수 소개, 구성원, 연구 분야 7개와 세부 주제, 워크숍, 컨설팅)이 사이트 어딘가에 보인다.
- 입력 폼만으로 사이트 내용을 채울 수 있고, 저장한 파일을 다시 불러와 이어서 고칠 수 있다.
- `npm run kci` 한 번으로 논문 목록이 갱신되고, 사용자가 확정한 값이 보존된다.
- 연구 페이지에서 논문 원문(또는 KCI 페이지)까지 클릭 한 번, 참여자 소개까지 클릭 한 번에 닿는다.
- web_site와 lab_site를 동시에 띄워도 포트·캐시·서비스워커가 충돌하지 않는다.
- 화면에 "BuildWork"나 Notion 흔적이 남지 않는다.

## 9. 미결 사항

1. **원문 PDF 게시 권한.** 저자라도 학술지에 저작권을 양도했다면 학회 규정에 따라 사이트 게시가 제한될 수 있다. 논문마다 해당 학회가 셀프 아카이빙을 허용하는지 확인해야 한다. 연구보고서(고직능연, 능개원, 데이터성과센터 등)는 발주기관에 저작권이 있는 경우가 많아 기관 공개본 링크가 더 안전할 수 있다. 확인 전까지는 KCI·기관 링크만 연결한다.
2. 로마자 표기. 기본값(`yoon-jungheon`, `noh-changgyun` 등)은 추정값이다. 사이트를 연 뒤 구성원 본인이 폼에서 고친다.
3. 랩 정식 이름. TLO 표기 "Educational Evaluation Lab"을 기본값으로 쓰고, 한글 이름을 따로 둘지는 폼에서 정한다.
4. Vercel 도메인(배포 단계). 저장소는 `kwonsuhyeon/junglab`로 정함.
5. **원문 PDF 업로드 방식(보류).** 편집 폼에서 PDF를 올리는 기능은 2026-10-29 논의 후 보류했다. 후보는 두 가지다. (가) 구글 폼: 올라온 PDF가 관리자 드라이브에 비공개로 쌓이고, 공개를 확인한 것만 공유 링크를 편집 폼에 붙인다. 코드가 필요 없다. (나) 편집 폼 업로드: Vercel Blob + 공유 비밀번호 + 서버 함수로 링크 칸을 자동으로 채운다. 다만 Blob 주소는 알면 열린다. 정해진 원칙은 "공개는 저작권을 확인한 것만"과 "업로드 권한은 공유 비밀번호"다. 그때까지는 원문 링크 칸에 KCI·RISS·기관 주소를 넣고, 필요한 PDF는 관리자가 직접 받는다.
