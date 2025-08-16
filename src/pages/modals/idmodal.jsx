// src/pages/modals/idmodal.jsx
import React, { useState, useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import styled, { createGlobalStyle } from "styled-components";

// ===== 폰트 & 이미지 =====
import JoyM from "../../fonts/TJJoyofsingingM_TTF.ttf"; // Medium
import JoyB from "../../fonts/TJJoyofsingingB_TTF.ttf"; // Bold
import mascot from "../../assets/연필조아용.png";        // 마스코트 이미지

// ===== 전역 폰트 + 스크롤 잠금 =====
const GlobalFonts = createGlobalStyle`
  @font-face { font-family: "TJJoyofsingingM"; src: url(${JoyM}) format("truetype"); font-weight: 500; font-display: swap; }
  @font-face { font-family: "TJJoyofsingingB"; src: url(${JoyB}) format("truetype"); font-weight: 700; font-display: swap; }
`;
const ScrollLock = createGlobalStyle`
  body { overflow: hidden; touch-action: none; }
`;

/* =========================================
 * ① 목데이터(가짜 API) — 개발용
 *    - 실제 연동 시 아래 함수들을 axios 호출로 교체
 * ========================================= */

// (목) 아이디 중복확인: "test", "admin"은 이미 사용 중이라고 가정
async function checkNewIdAvailabilityMock(newId) {
  await new Promise((r) => setTimeout(r, 400)); // 지연 흉내
  const taken = ["test", "admin"];              // 예약/중복된 아이디 예시
  const ok = !!newId && !taken.includes(newId.trim().toLowerCase());
  return { ok, message: ok ? "사용 가능한 아이디입니다!" : "이미 사용 중입니다!" };
}

// (목) 아이디 변경: prevId와 currentId가 맞으면 성공
async function updateIdMock({ currentId, prevId, newId }) {
  await new Promise((r) => setTimeout(r, 500)); // 지연 흉내
  if (!prevId || prevId !== currentId) {
    return { ok: false, message: "기존 아이디가 일치하지 않습니다." };
  }
  // 여기서 실제로는 서버에 PATCH/PUT 요청
  return { ok: true };
}

/* =========================================
 * ② 실제 연동 시 교체할 포인트 (참고)
 *    - 위 목 함수를 아래처럼 바꾸면 됨
 * -----------------------------------------
 * import { api } from "../../lib/api";
 * 
 * async function checkNewIdAvailability(newId) {
 *   const { data } = await api.get("/auth/check-id", { params: { id: newId }});
 *   // 백엔드 명세 예: { ok:true, data:{ available:true|false } }
 *   return {
 *     ok: data.ok && data.data.available,
 *     message: data.data.available ? "사용 가능한 아이디입니다!" : "이미 사용 중입니다!"
 *   };
 * }
 * 
 * async function updateId({ currentId, prevId, newId }) {
 *   const { data } = await api.patch("/user/id", { currentId, prevId, newId });
 *   // 백엔드 명세 예: { ok:true }
 *   return { ok: data.ok, message: data.message };
 * }
 * ========================================= */

/**
 * props:
 * - currentId: 기존 아이디(비교/검증용)
 * - onClose: 모달 닫기 핸들러
 * - onChanged?: (newId) => void  // 변경 성공 시 부모에 새 아이디 전달하고 싶으면 사용
 */
export default function IdModal({ currentId = "1234", onClose = () => {}, onChanged }) {
  const [prevId, setPrevId] = useState("");      // 기존 아이디 입력
  const [newId, setNewId] = useState("");        // 변경할 아이디

  const [isNewIdAvailable, setIsNewIdAvailable] = useState(null); // null | true | false
  const [helpText, setHelpText] = useState("");  // 헬퍼 문구
  const [loading, setLoading] = useState(false); // 버튼 로딩 상태
  const [error, setError] = useState("");        // 상단 에러 메시지

  // ESC 닫기
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // 기존 아이디 일치 여부
  const isPrevIdMatch = useMemo(
    () => prevId.length > 0 && prevId === currentId,
    [prevId, currentId]
  );

  // 입력 바뀌면 중복확인 상태 초기화
  useEffect(() => {
    setIsNewIdAvailable(null);
    setHelpText("");
  }, [newId]);

  // ===== 중복확인 (목 API 호출) =====
  const handleCheckNewId = async () => {
    setError("");
    const v = newId.trim();
    if (!v) {
      setIsNewIdAvailable(false);
      setHelpText("아이디를 입력해 주세요.");
      return;
    }

    setLoading(true);
    try {
      // (목) 호출
      const res = await checkNewIdAvailabilityMock(v);

      // (실제) 호출 예:
      // const res = await checkNewIdAvailability(v);

      setIsNewIdAvailable(res.ok);
      setHelpText(res.message);
    } catch (e) {
      setIsNewIdAvailable(false);
      setHelpText("중복확인 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 변경하기 활성 조건
  const canSubmit = isPrevIdMatch && isNewIdAvailable === true && !loading;

  // ===== 변경하기 (목 API 호출) =====
  const handleConfirm = async () => {
    if (!canSubmit) return;
    setError("");
    setLoading(true);
    try {
      // (목) 호출
      const res = await updateIdMock({ currentId, prevId, newId });

      // (실제) 호출 예:
      // const res = await updateId({ currentId, prevId, newId });

      if (!res.ok) {
        setError(res.message || "아이디 변경에 실패했습니다.");
        return;
      }
      // 성공: 부모에 알리고 닫기
      onChanged?.(newId);
      onClose();
    } catch (e) {
      setError("아이디 변경 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => onClose();

  // === 포털로 body 최상단에 그려서 부모 레이아웃 영향 X ===
  const modal = (
    <>
      <GlobalFonts />
      <ScrollLock />
      <Backdrop onClick={onClose}>
        <Dialog role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
          <Mascot src={mascot} alt="연필조아용" />

          <Inner>
            {/* 상단 에러 표시 (서버 오류/검증 실패 등) */}
            {error && <TopError>{error}</TopError>}

            {/* 기존 아이디 입력 */}
            <TopInput
              placeholder="기존 아이디"
              value={prevId}
              onChange={(e) => setPrevId(e.target.value)}
            />
            {prevId.length > 0 && (
              <Helper $ok={isPrevIdMatch}>
                {isPrevIdMatch ? "기존 아이디가 맞아요!" : "기존 아이디가 일치하지 않습니다!"}
              </Helper>
            )}

            {/* 변경 아이디 + 중복확인 */}
            <IdRow style={{ marginTop: "1.25rem" }}>
              <IdInput
                placeholder="변경할 아이디"
                value={newId}
                onChange={(e) => setNewId(e.target.value)}
                disabled={loading}
              />
              <CheckButton type="button" onClick={handleCheckNewId} disabled={loading}>
                {loading ? "확인중" : <>중복<br />확인</>}
              </CheckButton>
            </IdRow>
            {isNewIdAvailable !== null && (
              <Helper $ok={!!isNewIdAvailable}>{helpText}</Helper>
            )}

            {/* 액션 버튼 */}
            <Buttons>
              <Button data-variant="cancel" onClick={handleCancel} disabled={loading}>취소</Button>
              <Button
                data-variant="confirm"
                disabled={!canSubmit}
                onClick={handleConfirm}
                title={!canSubmit ? "기존 아이디 확인/중복확인을 완료해주세요" : "아이디 변경"}
              >
                {loading ? "변경중..." : "변경하기"}
              </Button>
            </Buttons>
          </Inner>
        </Dialog>
      </Backdrop>
    </>
  );

  return ReactDOM.createPortal(modal, document.body);
}

/* ===== styled-components ===== */

/* 화면 전체 덮는 배경 + 중앙정렬 */
const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

/* 모달 카드 */
const Dialog = styled.div`
  position: relative;
  width: 18.75rem;                  /* 300px */
  max-width: calc(100vw - 2rem);
  background: #fff;
  border-radius: 1.25rem;           /* 20px */
  box-shadow: 0 0.25rem 0.75rem rgba(0,0,0,.15);
  padding: 4.125rem 1rem 1rem;      /* 마스코트 공간 + 좌우 패딩 */
  transform: translateY(-5%);       /* 마스코트 시각 중심 보정(살짝 위로) */
`;

/* 상단 마스코트 (모달 밖으로 살짝) */
const Mascot = styled.img`
  position: absolute;
  top: -2.8125rem;                  /* -45px */
  left: 50%;
  transform: translateX(-50%);
  width: 9.375rem;                  /* 150px */
  height: auto;
  pointer-events: none;
  user-select: none;
`;

/* 내부 컨텐츠 래퍼 */
const Inner = styled.div`
  --form-w: 17.25rem; /* 276px */
  --gap: 0.3125rem;   /* 5px  */
  --btn-w: 3.125rem;  /* 50px */
  --btn-h: 3rem;      /* 48px */
  --input-h: 3rem;
  --pad-x: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

/* 상단 에러 메시지 */
const TopError = styled.p`
  width: var(--form-w);
  margin: 0 0 0.5rem;
  color: #ff5656;
  font-size: 0.9375rem;
  font-family: "TJJoyofsingingM", sans-serif;
  text-align: left;
`;

/* 기존 아이디 인풋 */
const TopInput = styled.input`
  width: var(--form-w);
  height: var(--input-h);
  box-sizing: border-box;
  border: 0.125rem solid #8F8F8F;
  border-radius: 0.625rem;
  font-size: 1rem;
  padding-left: var(--pad-x);
  outline: none;
  font-family: "TJJoyofsingingM", sans-serif;

  &::placeholder { font-family: "TJJoyofsingingM", sans-serif; }
`;

/* 변경 아이디 행 */
const IdRow = styled.div`
  width: var(--form-w);
  display: flex;
  align-items: center;
  gap: var(--gap);
`;

/* 변경 아이디 입력 */
const IdInput = styled.input`
  height: var(--input-h);
  flex: 1;
  box-sizing: border-box;
  border: 0.125rem solid #8F8F8F;
  border-radius: 0.625rem;
  font-size: 1rem;
  padding-left: var(--pad-x);
  outline: none;
  font-family: "TJJoyofsingingM", sans-serif;
`;

/* 중복확인 버튼 */
const CheckButton = styled.button`
  width: var(--btn-w);
  height: var(--btn-h);
  background-color: #32885D;
  color: #fff;
  font-size: 0.8125rem;
  border: none;
  border-radius: 0.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1.1;
  text-align: center;
  font-family: "TJJoyofsingingB", sans-serif;
  cursor: pointer;
  &:disabled { opacity: 0.7; cursor: default; }
`;

const Helper = styled.p`
  width: var(--form-w);
  margin: 0;
  padding-top: 0.625rem;
  font-size: 1rem;
  font-family: "TJJoyofsingingM", sans-serif;
  text-align: left;
  color: ${({ $ok }) => ($ok ? "#00CA98" : "#FF5656")};
`;

/* 하단 버튼 영역 */
const Buttons = styled.div`
  display: flex;
  gap: 0.75rem;
  margin: 1rem 0 0.25rem;
  width: var(--form-w);
`;

const Button = styled.button`
  flex: 1;
  height: 2.5rem;
  border: none;
  border-radius: 1.25rem;
  font-size: 0.875rem;
  font-family: "TJJoyofsingingB", sans-serif;
  font-weight: 700;
  cursor: pointer;

  &[data-variant="cancel"] { background: #e8e8e8; color: #32885d; }
  &[data-variant="confirm"] { background: #32885d; color: #fff; }
  &:disabled[data-variant="confirm"] { background: #ccc; color: #666; cursor: not-allowed; }
`;
