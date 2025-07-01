<div align="center">

# 🎬 DaBom

### 영상 스트리밍을 중심으로 한 멀티 플랫폼 커뮤니케이션 서비스

<img src="image/readme/Dabom.png" alt="DaBom Logo" width="300"/>

---

## 🌌 Team FlowBox

![TeamFlowBox](https://img.shields.io/badge/Team-FlowBox-blueviolet?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K)

</div>

## 👥 팀원 소개

<table align="center">
<tr>
<td align="center"><strong>🧑‍💻 강병욱</strong></td>
<td align="center"><strong>🧑‍💻 김륜환</strong></td>
<td align="center"><strong>🧑‍💻 김성인</strong></td>
<td align="center"><strong>🧑‍💻 양형모</strong></td>
<td align="center"><strong>🧑‍💻 최민성</strong></td>
</tr>
</table>

---

## 📋 목차

- [프로젝트 개요](#-프로젝트-개요)
- [주요 기능](#-주요-기능)
- [기술 스택](#️-기술-스택)
- [시스템 아키텍처](#-시스템-아키텍처)
- [데이터베이스 설계](#-데이터베이스-설계)
- [성능 최적화](#-성능-최적화)
- [문서](#-문서)

---

## 🎯 프로젝트 개요

> **SNS와 영상 스트리밍 서비스가 합쳐진 새로운 패러다임의 서비스**

DaBom은 기존 영상 플랫폼의 한계를 극복하고 창작자와 시청자 간의 소통을 강화하는 혁신적인 플랫폼입니다.

### ✨ 핵심 가치

- **🌟 별점 기반 평가 시스템**: 기존의 단순한 '좋아요/싫어요'를 넘어선 세분화된 평가
- **💬 통합 커뮤니케이션**: 창작자와 구독자 간의 직접적인 소통 채널 제공
- **🤝 실시간 상호작용**: Together 기능을 통한 동시 시청 및 채팅

---

## 🚀 주요 기능

<div align="center">

| 기능 | 설명 | 상태 |
|:---:|:---|:---:|
| **별점 평가** | 1~5점 세분화된 영상 평가 시스템 | ✅ |
| **DM 시스템** | 창작자-구독자 간 직접 소통 | ✅ |
| **Together 모드** | 실시간 동시 시청 기능 | ✅ |
| **플레이리스트** | 개인화된 영상 컬렉션 | ✅ |
| **실시간 스트리밍** | 라이브 방송 및 채팅 | 🔄 |

</div>

---

## 🛠️ 기술 스택

<div align="center">

### 🖥️ 운영 환경
![VMware](https://img.shields.io/badge/VMware-607078?style=for-the-badge&logo=vmware&logoColor=white)
![Linux](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black)

### 🗄️ 데이터베이스
![MariaDB](https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white)

### 📊 모니터링
![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=Prometheus&logoColor=white)
![Grafana](https://img.shields.io/badge/Grafana-F46800?style=for-the-badge&logo=grafana&logoColor=white)

### 🤝 협업 도구
![Git](https://img.shields.io/badge/Git-F05033?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-121011?style=for-the-badge&logo=github&logoColor=white)

</div>

---

## 📚 프로젝트 배경

<details>
<summary><strong>📖 프로젝트 기획 배경</strong></summary>

### 🎯 문제 인식

> 기존 영상 플랫폼의 '좋아요/싫어요' 중심 평가 시스템으로는 콘텐츠에 대한 정교한 피드백을 제공하기 어렵습니다.

### 💡 해결 방안

**1️⃣ 별점 기반 평가 시스템**
- 1~5점의 세분화된 평가 시스템 도입
- '썸네일 어그로' 등의 문제 해결
- 콘텐츠 품질 향상 및 플랫폼 신뢰도 제고

**2️⃣ 통합 커뮤니케이션**
- 창작자-구독자 간 DM(쪽지) 기능
- Q&A, 피드백, 팬레터 등 다양한 활용
- 플랫폼 충성도 향상

</details>

<details>
<summary><strong>🔍 상세 시나리오</strong></summary>

### 👤 사용자 기능

#### 1️⃣ 계정 관리
- ✅ 회원가입 및 이메일 인증
- ✅ 로그인 및 프로필 관리
- ✅ 통합 검색 기능 (영상, 채널, 태그, 플레이리스트)

#### 2️⃣ 채널 관리
- ✅ 채널 정보 관리 및 구독 시스템
- ✅ 게시글 작성 및 댓글/대댓글 기능
- ✅ 구독자 통계 및 세분화 검색

#### 3️⃣ 영상 기능
- ✅ 영상 업로드 및 스트리밍
- ✅ 별점 평가 및 통계 확인
- ✅ 댓글 시스템 및 플레이리스트 관리

#### 4️⃣ 소셜 기능
- ✅ DM(쪽지) 시스템 (일일 제한 및 필터링)
- ✅ Together 기능 (실시간 동시 시청)
- ✅ 신고 시스템

</details>

---

## 💻 시스템 아키텍처
<div align="center"> <img src="image/readme/systemArchitecture.png" alt="System Architecture" width="90%"/> </div>

### 📊 데이터베이스 최적화 전략
DaBom 서비스는 실시간 채팅과 영상 스트리밍이라는 두 가지 핵심 기능을 지원하기 위해 특화된 데이터베이스 아키텍처를 채택했습니다.

### 📈 성능 요구사항 분석
**실시간 채팅 시스템**: 다수 사용자의 동시 메시지 전송으로 인한 높은 쓰기(Write) 부하 발생

**영상 스트리밍 서비스**: 콘텐츠 소비에 따른 대량의 읽기(Read) 작업 필요

**Together 기능**: 동시 시청 및 실시간 상호작용으로 인한 복합적 부하 처리 요구

### 🔄 하이브리드 데이터베이스 아키텍처
DaBom은 이러한 복합적인 요구사항을 충족하기 위해 Clustering과 Replication을 결합한 하이브리드 아키텍처를 구현했습니다.

### 1️⃣ 데이터베이스 클러스터링 (Write 최적화)
다중 노드 간 작업 분산을 통한 쓰기 성능 향상

실시간 채팅 메시지와 사용자 상호작용 데이터의 빠른 처리

노드 간 동기화를 통한 데이터 일관성 유지

### 2️⃣ 데이터베이스 복제 (Read 최적화)
읽기 전용 복제본을 통한 조회 성능 최적화

영상 메타데이터 및 사용자 프로필 정보의 빠른 접근

지리적으로 분산된 사용자에게 낮은 지연 시간 제공

### 🌐 통합 아키텍처의 이점
이러한 하이브리드 접근 방식은 다음과 같은 이점을 제공합니다:

**균형 잡힌 성능**: 읽기와 쓰기 작업 모두에서 최적의 성능 보장

**확장성**: 사용자 증가에 따른 유연한 시스템 확장 가능

**고가용성**: 노드 장애 시에도 서비스 중단 없이 운영 지속

**지연 시간 최소화**: 실시간 상호작용에 필수적인 빠른 응답 시간

MariaDB의 클러스터링 및 복제 기능을 활용하여, DaBom은 실시간 채팅의 높은 쓰기 부하와 영상 스트리밍의 대량 읽기 요청을 효율적으로 처리할 수 있는 견고한 데이터베이스 인프라를 구축했습니다.

---

## 🗃️ 데이터베이스 설계

<div align="center">
<img src="image/readme/ERD_version_1.png" alt="ERD Diagram" width="80%"/>
</div>

### 📋 DDL 스크립트
📁 **[DDL.sql](./db/DDL.sql)** - 데이터베이스 스키마 정의

---

## 📈 성능 최적화

<details>
<summary><strong>⚡ 성능 개선 사례</strong></summary>

### 🔍 INDEX 최적화

**적용 배경**
- 채널 이름 검색 빈도가 높음
- MariaDB varchar 컬럼의 B+tree 탐색 최적화 필요

**성과**
Before: 0.157 sec → After: 0.063 sec
⚡ 약 60% 성능 향상 (0.094초 단축)

<div align="center">
<img src="image/readme/name_index_전.png" alt="Before Index" width="45%"/>
<img src="image/readme/name_index_후.png" alt="After Index" width="45%"/>
</div>

**성과** Before: CPU 70% 부하 → After: CPU 12% 부하
⚡ 약 80% 성능 향상
<div align="center">
<img src="image/readme/notIndex.png" alt="Before Index" width="45%"/>
<img src="image/readme/afterIndex.png" alt="After Index" width="45%"/>
</div>

### 🔍 PAGING 최적화

**적용 배경**
- 채널 이름 검색 빈도가 높음
- MariaDB varchar 컬럼의 INDEX인 경우 %%조회 시 사용 불가
- 따라서 PAGING을 통한 성능 개선 필요

<div align="center">
<img src="image/readme/Index_걸기_전.png" alt="BeforeIndex" width="45%"/>
<img src="image/readme/Index_추가_후.png" alt="AfterIndex" width="45%"/>
</div>

- 위 사진처럼 row 탐색 수도 차이가 없고, 시간도 차이가 없음.

<div align="center">
<img src="image/readme/CPU_Index_부하_전.png" alt="BeforeIndex" width="45%"/>
<img src="image/readme/CPU_Index_부하_후.png" alt="AfterIndex" width="45%"/>
</div>

- 따라서 PAGING을 통해서 성능 개선을 해야 한다.

### 🗑️ SOFT DELETE 구현

**적용 배경**
- 다중 테이블 JOIN으로 인한 DELETE 연산 지연
- 실시간 서비스에서의 응답성 개선 필요

**성과**
Before: 0.062 sec → After: 0.016 sec
⚡ 약 74% 성능 향상 (0.046초 단축)

<div align="center">
<img src="image/readme/softDelete.png" alt="Soft Delete Performance" width="60%"/>
</div>

</details>

---

## 📄 문서

### 📑 프로젝트 문서
- **[요구사항 정의서](./doc/Dabom_요구사항_정의서.pdf)** - 상세 기능 명세

---

### 🎉 Thank you for visiting DaBom!
